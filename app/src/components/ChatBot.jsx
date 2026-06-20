import { useEffect, useRef, useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import chatLogo from '../assets/ChatGPT Image Jun 6, 2026, 05_37_00 PM.svg';

const getLocalFallback = (message, content) => {
  const normalized = message.trim().toLowerCase();
  const essential = content.pricing.tiers[0];
  const exquisite = content.pricing.tiers[1];

  if (normalized.includes('wedding')) return 'For weddings, we create editorial ceremonies and premium celebrations with refined styling, seamless coordination, and memorable details.';
  if (normalized.includes('corporate')) return 'Our corporate events combine strategic production, elegant presentation, and guest hospitality to reflect your brand with quiet luxury.';
  if (normalized.includes('party')) return 'Private celebrations are crafted to feel intimate, polished, and unforgettable, with every detail curated for a premium guest experience.';
  if (normalized.includes('concert')) return 'We manage concerts and live performances with world-class staging, artist coordination, and premium hospitality so the event feels exceptional.';
  if (normalized.includes('decoration')) return 'Our spatial design and floral artistry elevates every venue with elegant restraint and premium aesthetics.';
  if (normalized.includes('artist')) return 'We coordinate talent and manage artist relations for premium curated programs and unforgettable performances.';
  if (normalized.includes('price') || normalized.includes('cost') || normalized.includes('budget')) {
    return `Our packages: Essential (${essential.price}) covers concept, venue styling, vendor coordination. Exquisite (${exquisite.price}) adds A-Z planning, custom styling, guest management. Imperial is custom pricing.`;
  }
  if (normalized.includes('portfolio') || normalized.includes('work')) return 'Our portfolio includes luxury weddings, corporate galas, and private celebrations. Visit the portfolio page to explore our signature events.';
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('phone')) return `Contact us: Email: ${content.contact.email}, Phone: ${content.contact.phone}. We serve India and have offices in Paris and New York.`;
  if (normalized.includes('about') || normalized.includes('philosophy')) return 'Alka Events blends consult, curate, and deliver: thoughtful planning, elegant design, and discreet coordination to create luxury that feels effortless.';
  return 'Welcome to Alka Events! Select an option above to learn more.';
};

const mainOptions = [
  { label: 'Services', value: 'services' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' }
];

const serviceOptions = [
  { label: 'Wedding Planning', value: 'wedding' },
  { label: 'Corporate Events', value: 'corporate' },
  { label: 'Parties', value: 'party' },
  { label: 'Concerts', value: 'concert' },
  { label: 'Decoration', value: 'decoration' },
  { label: 'Artist Management', value: 'artist' }
];

const ChatBot = () => {
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Welcome to Alka Events! What would you like to know?',
      options: mainOptions,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, open]);

  const handleOptionClick = async (option) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: option.label,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    let replyText = '';
    let nextOptions = mainOptions;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: option.label }),
      });

      const data = await response.json().catch(() => ({}));
      replyText = data.reply || getLocalFallback(option.label, content);
    } catch (error) {
      replyText = getLocalFallback(option.label, content);
    }

    if (option.value === 'services') {
      nextOptions = serviceOptions;
    } else if (option.value === 'pricing' || option.value === 'portfolio' || option.value === 'about' || option.value === 'contact') {
      nextOptions = [{ label: '← Back to Menu', value: 'back' }, ...mainOptions.filter(o => o.value !== option.value)];
    } else if (option.value === 'back') {
      replyText = 'What would you like to know?';
      nextOptions = mainOptions;
    } else {
      nextOptions = [{ label: '← Back to Menu', value: 'back' }, ...mainOptions];
    }

    const botResponse = {
      id: Date.now() + 1,
      sender: 'bot',
      text: replyText,
      options: nextOptions,
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 text-sm">
      <div className={`w-[320px] max-w-[92vw] overflow-hidden rounded-3xl border border-white/10 bg-surface2 text-on-surface shadow-2xl transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
        <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-3 text-white">
          <div>
            <p className="font-semibold">AURA by Alka</p>
            <p className="text-[11px] text-white/70">Browse services & information</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <div className="flex h-[310px] flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] ${message.sender === 'bot' ? 'self-start rounded-2xl bg-white/5 px-4 py-3 text-white' : 'self-end rounded-2xl bg-black px-4 py-3 text-white'}`}
            >
              <div>{message.text}</div>
              {message.options ? (
                <div className="mt-3 flex flex-col gap-2">
                  {message.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      disabled={isTyping}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-left text-xs text-white transition hover:bg-white/10 hover:border-secondary disabled:opacity-50"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {isTyping && (
            <div className="self-start rounded-2xl bg-white/5 px-4 py-3 text-white/80">Typing...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-white/10 bg-surface px-4 py-3" />
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-glow transition-transform hover:-translate-y-1 hover:scale-105 focus:outline-none"
        aria-expanded={open}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
      >
        <img src={chatLogo} alt="Alka chat logo" className="h-10 w-10 rounded-full" />
      </button>
    </div>
  );
};

export default ChatBot;
