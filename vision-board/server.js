import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import os from 'os';
import ngrok from 'ngrok';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }
});

const dataDir = path.join(__dirname, 'data');
const boardPath = path.join(dataDir, 'board.json');
const publicPath = path.join(__dirname, 'public');

const defaultBoard = {
  ideas: [
    {
      id: 1,
      title: 'DND Mode — Peace of Mind',
      category: 'video',
      priority: 'high',
      status: 'developing',
      date: 'Jun 19, 2026',
      formats: ['Instagram Reel', 'YouTube Short', 'Brand TVC'],
      hook: "What if your phone blocking the world made us the heroes?",
      concept: "A person walks past a CCTV pole on a city street. Mid-shot, an iPhone DND screen animates into frame — the person taps DND on. Phone UI fades. Person exits frame. Camera stays on the empty street with the Sparsh CCTV pole standing guard.\n\nEnd card: \"While you're in DND mode — Sparsh CCTV ensures peace of mind, even in DND mode.\"",
      script: "[SCENE: Urban street, golden hour.]\n[iPhone UI floats in. Tap \"Do Not Disturb — ON\".]\n[UI fades. Person exits frame.]\n[WIDE: Sparsh CCTV pole stands guard.]\n[END CARD:]\n\"While you're in DND mode,\nSparsh CCTV ensures peace of mind\neven in DND mode.\"\n[LOGO + TAGLINE: Suraksha Sarhad Se Ghar Tak]",
      visual: 'Cinematic. Urban Indian street. Golden hour. Apple-style minimal iPhone UI. Desaturated cool tones. Ambient sound + soft music that quiets when DND activates.',
      audience: 'Urban homeowners & families, 25–45.',
      inspiration: 'Universal behaviour — everyone puts their phone on DND. This flips "tuning out" into a safety message.',
      notes: 'Under 30s for Reel. 60s cut for YouTube pre-roll.'
    },
    {
      id: 2,
      title: '"Blink and You Miss It"',
      category: 'social',
      priority: 'medium',
      status: 'spark',
      date: 'Jun 18, 2026',
      formats: ['Instagram Reel', 'Twitter/X'],
      hook: 'Human eyes miss 8 seconds every minute. Sparsh never does.',
      concept: 'Split-screen: left shows a human\'s blurry blink-interrupted POV. Right shows the same scene through a Sparsh AI camera — sharp, AI-annotated.\n\nText: \"You blink 15,000 times a day. We never do.\"',
      script: '',
      visual: '',
      audience: 'Tech-forward security buyers, SMB owners.',
      inspiration: '',
      notes: ''
    },
    {
      id: 3,
      title: 'Bharat Ka Apna CCTV — Brand Film',
      category: 'brand',
      priority: 'high',
      status: 'spark',
      date: 'Jun 16, 2026',
      formats: ['Brand TVC', 'YouTube'],
      hook: 'The only CCTV brand that\'s truly ours.',
      concept: '90-second film from India\'s borders to homes, cities, airports and factories secured by cameras designed and built in India. Ends: \"Made Here. Trusted Everywhere.\"',
      script: '',
      visual: 'Sweeping cinematic shots. Patriotic colour grade. Powerful score.',
      audience: 'B2G decision-makers, enterprise buyers, general public on national events.',
      inspiration: 'Tata brand films. Make in India.',
      notes: 'Time around Independence Day / Republic Day.'
    }
  ],
  gallery: []
};

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(boardPath); } catch { await saveBoard(defaultBoard); }
}

async function loadBoard() {
  try {
    await ensureDataFile();
    const json = await fs.readFile(boardPath, 'utf8');
    return JSON.parse(json);
  } catch (error) {
    console.warn('Failed to load board:', error);
    return defaultBoard;
  }
}

async function saveBoard(board) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(boardPath, JSON.stringify(board, null, 2), 'utf8');
}

app.use(express.json({ limit: '50mb' }));
app.use(express.static(publicPath));

app.get('/api/board', async (req, res) => {
  const board = await loadBoard();
  res.json(board);
});

app.post('/api/board', async (req, res) => {
  // Support both payload structure and direct structure
  const payload = req.body?.payload || req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  // Ensure valid structure
  if (!('ideas' in payload)) {
    return res.status(400).json({ error: 'Missing ideas array' });
  }
  await saveBoard(payload);
  io.emit('board:update', { clientId: req.body.clientId || null, data: payload });
  res.json({ status: 'ok' });
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 4000;
server.listen(port, '0.0.0.0', async () => {
  const ifaces = os.networkInterfaces();
  let ipAddress = 'localhost';
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }
  console.log(`\n🚀 Vision Board server running on:`);
  console.log(`   Local:   http://localhost:${port}`);
  console.log(`   Network: http://${ipAddress}:${port}\n`);
  
  // Create ngrok tunnel for persistent remote access
  try {
    const url = await ngrok.connect(port);
    console.log(`✅ PERMANENT PUBLIC URL (share with employees):`);
    console.log(`   ${url}`);
    console.log(`\n🌍 Employees worldwide can access the vision board at:`);
    console.log(`   ${url}\n`);
  } catch (err) {
    console.warn('⚠️  ngrok tunnel failed:', err.message);
    console.warn('   Using local/network access only.\n');
  }
});
