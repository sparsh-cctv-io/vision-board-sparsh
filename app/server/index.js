import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import portfolioItems from '../src/data/portfolioItems.js';
import defaultContent from '../src/data/defaultContent.js';

const persistedContentPath = path.join(__dirname, 'content.json');

const loadPersistedContent = async () => {
  try {
    if (existsSync(persistedContentPath)) {
      const raw = await fs.readFile(persistedContentPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Failed to load persisted content:', error);
  }
  return defaultContent;
};

const savePersistedContent = async (content) => {
  try {
    await fs.writeFile(persistedContentPath, JSON.stringify(content, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Failed to save content:', error);
    return false;
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const updateHtmlMeta = (html, nameOrProperty, value, attributeType = 'name') => {
  if (!value) return html;
  const selector = attributeType === 'property' ? `property="${nameOrProperty}"` : `name="${nameOrProperty}"`;
  const regex = new RegExp(`<meta\s+${selector}[^>]*content="[^"]*"[^>]*>`, 'i');
  const replacement = `<meta ${attributeType}="${nameOrProperty}" content="${value}" />`;
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `  ${replacement}
</head>`);
};

const replaceTitle = (html, title) => {
  if (!title) return html;
  const regex = /<title>[^<]*<\/title>/i;
  const replacement = `<title>${title}</title>`;
  return regex.test(html) ? html.replace(regex, replacement) : html.replace('</head>', `  ${replacement}
</head>`);
};

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (!q) return res.json({ pages: [], portfolio: [] });

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  const pageResults = pages.filter((p) => p.title.toLowerCase().includes(q));
  const portfolioResults = portfolioItems.filter((it) => it.title.toLowerCase().includes(q) || it.category.toLowerCase().includes(q));

  res.json({ pages: pageResults, portfolio: portfolioResults });
});

const getLocalBotReply = (message, content) => {
  const normalized = message.trim().toLowerCase();
  const services = content.services.items.map((item) => item.title).join(', ');
  const essential = content.pricing.tiers[0];
  const exquisite = content.pricing.tiers[1];
  const imperial = content.pricing.tiers[2];

  if (!normalized) {
    return 'Hi there! I’m your Alka Events assistant. Ask me about services, pricing, portfolio highlights, or how to get in touch.';
  }

  if (/\b(hi|hello|hey|yo|greetings|good morning|good evening)\b/.test(normalized)) {
    return 'Hello! I’m your friendly event advisor. Ask me anything about our services, packages, portfolio, or how to book.';
  }

  if (/\b(service|offer|provide|what can you|what do you|help with|do for me)\b/.test(normalized)) {
    return `We offer ${services}. Each service is delivered with quiet luxury, intelligent planning, and flawless execution. Which one would you like to explore?`;
  }

  if (/\b(price|cost|budget|investment|fee|starting at|how much)\b/.test(normalized)) {
    return `Our packages start at ${essential.price} for Essential, ${exquisite.price} for Exquisite, and Imperial is custom. Essential covers concept, venue styling, and vendor coordination, while Exquisite includes A-Z planning, custom styling, and guest management.`;
  }

  if (/\b(portfolio|examples|work|events|gallery|weddings|corporate|private)\b/.test(normalized)) {
    return 'Our portfolio includes luxury weddings, corporate gala experiences, and intimate private celebrations. Browse the portfolio page to see our signature events and how we bring quiet luxury to life.';
  }

  if (/\b(contact|email|phone|reach|location|office|address)\b/.test(normalized)) {
    return `You can reach us by email at ${content.contact.email} or by phone at ${content.contact.phone}. We serve clients all over India and have offices in Paris and New York.`;
  }

  if (/\b(wedding|bridal|ceremony|reception)\b/.test(normalized)) {
    return 'For weddings, we focus on editorial precision, premium styling, and an elevated guest experience so each moment feels timeless and beautifully curated.';
  }

  if (/\b(corporate|conference|launch|brand activation|summit|gala)\b/.test(normalized)) {
    return 'Our corporate events are designed for high-impact presentations, strategic production, and premium hospitality that reflects your brand with quiet luxury.';
  }

  if (/\b(party|celebration|private celebration|social event)\b/.test(normalized)) {
    return 'Private celebrations are crafted to feel intimate and unforgettable, with elegant design, thoughtful logistics, and seamless service from start to finish.';
  }

  if (/\b(concert|live performance|stage|artist|talent)\b/.test(normalized)) {
    return 'We manage high-production concerts and artist-driven programs with expert coordination, hospitality, and premium staging so every performance feels exceptional.';
  }

  if (/\b(about|philosophy|approach|process|story|why)\b/.test(normalized)) {
    return 'Alka Events brings a thoughtful process to every project: consult, curate, and deliver. We shape your story with intentional design, seamless coordination, and refined luxury.';
  }

  return 'I can help with services, pricing, portfolio highlights, contact details, or planning a luxury event. What would you like to know more about?';
};

app.post('/api/chat', async (req, res) => {
  const message = (req.body?.message || '').trim();
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const content = await loadPersistedContent();
  const token = process.env.HF_API_TOKEN;
  const fallbackReply = getLocalBotReply(message, content);

  if (!token) {
    return res.json({ reply: fallbackReply, source: 'fallback' });
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `You are Alka Events’ intelligent assistant. Answer as a friendly, polished event advisor in the brand tone of quiet luxury and refined service. Use the website information when relevant. If the question is outside the website content, answer in the brand tone without inventing false details.\n\nWebsite information:\nBrand: ${content.footer.brand}\nTagline: ${content.hero.title}\nDescription: ${content.hero.description}\nAbout: ${content.about.introOne} ${content.about.introTwo}\nApproach: ${content.about.approachHeading} ${content.about.approachDescription}\nServices:\n${content.services.items.map((item) => `- ${item.title}: ${item.description}`).join('\n')}\nPricing tiers:\n${content.pricing.tiers.map((tier) => `- ${tier.title}: ${tier.label} ${tier.price} (${tier.features.join(', ')})`).join('\n')}\nPortfolio highlights:\n${content.portfolio.slides.map((slide) => `- ${slide.title} (${slide.category}): ${slide.description}`).join('\n')}\nContact: ${content.contact.email}, ${content.contact.phone}, ${content.contact.locations}\n\nQuestion: ${message}\nAnswer:`,
        parameters: {
          max_new_tokens: 180,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      console.error('Hugging Face chat error', data);
      return res.json({ reply: fallbackReply, source: 'fallback' });
    }

    const reply = data.generated_text || (Array.isArray(data) && data[0]?.generated_text) || '';
    return res.json({ reply: reply.trim() || fallbackReply, source: 'remote' });
  } catch (error) {
    console.error('CHAT ERROR', error);
    return res.json({ reply: fallbackReply, source: 'fallback' });
  }
});

app.post('/api/track', (req, res) => {
  console.log('TRACK', req.body);
  res.status(204).end();
});

app.get('/api/content', async (req, res) => {
  const content = await loadPersistedContent();
  res.json(content);
});

app.post('/api/content', async (req, res) => {
  const content = req.body;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Invalid content payload' });
  }

  const saved = await savePersistedContent(content);
  if (!saved) {
    return res.status(500).json({ error: 'Unable to save content' });
  }

  res.json({ status: 'ok' });
});

app.get('*', async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  try {
    const htmlPath = path.join(__dirname, '../dist/index.html');
    const templatePath = await fs.readFile(htmlPath, 'utf8').catch(async () => fs.readFile(path.join(__dirname, '../index.html'), 'utf8'));
    const content = await loadPersistedContent();
    const seo = content.seo || {};

    let html = templatePath;
    html = replaceTitle(html, seo.title || 'The Alka Events | Creating Unforgettable Experiences');
    html = updateHtmlMeta(html, 'description', seo.description || 'Luxury event planning for weddings, corporate galas, and private celebrations. 12+ years of expertise in bespoke event design with flawless execution.');
    html = updateHtmlMeta(html, 'keywords', seo.keywords || 'luxury event planning, wedding planning, corporate events, bespoke celebrations, destination weddings, event coordination');
    html = updateHtmlMeta(html, 'og:title', seo.ogTitle || seo.title || 'The Alka Events | Creating Unforgettable Experiences', 'property');
    html = updateHtmlMeta(html, 'og:description', seo.ogDescription || seo.description || 'Elevated event planning for weddings, corporate galas, and private celebrations crafted with quiet luxury, timeless style, and flawless execution.', 'property');
    html = updateHtmlMeta(html, 'og:image', seo.ogImage, 'property');

    res.send(html);
  } catch (error) {
    console.error('HTML injection error:', error);
    next(error);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
