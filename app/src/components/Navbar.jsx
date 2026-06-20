import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import portfolioItems from '../data/portfolioItems';
import { useContent } from '../contexts/ContentContext';

const defaultNavItems = [
  { label: 'About', to: '/about' },
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const { content } = useContent();
  const navItems = content.navbar?.items ?? defaultNavItems;

  const pages = navItems.map((item) => ({ title: item.label, path: item.to }));

  useEffect(() => {
    // debounce search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!search.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const term = search.trim().toLowerCase();
      const pageMatches = pages
        .filter((p) => p.title.toLowerCase().includes(term))
        .slice(0, 4)
        .map((p) => ({ type: 'page', title: p.title, term: term, path: p.path }));

      const portfolioMatches = portfolioItems
        .filter((it) => it.title.toLowerCase().includes(term) || it.category.toLowerCase().includes(term))
        .slice(0, 6)
        .map((it) => ({ type: 'portfolio', title: it.title, term: term, category: it.category, slug: it.slug, image: it.image }));

      setSuggestions([...pageMatches, ...portfolioMatches]);
      setActiveIndex(-1);
    }, 180);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const pagesList = suggestions.filter((s) => s.type === 'page');
  const portfolioList = suggestions.filter((s) => s.type === 'portfolio');

  const highlight = (text, term) => {
    if (!term) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(term.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        <span className="opacity-80">{text.slice(0, idx)}</span>
        <span className="text-secondary font-semibold">{text.slice(idx, idx + term.length)}</span>
        <span className="opacity-80">{text.slice(idx + term.length)}</span>
      </>
    );
  };

  const trackEvent = (name, payload = {}) => {
    const body = { name, payload, ts: Date.now() };
    try {
      if (navigator && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
      }
    } catch (e) {
      // ignore
    }
    // local fallback log
    console.log('trackEvent', body);
  };

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 shadow-[0_20px_120px_-40px_rgba(0,0,0,0.75)] backdrop-blur-3xl">
      <div className="relative mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 pt-6 pb-4 text-base md:px-12">
        <div className="flex items-center overflow-visible">
          <img
            src={logo}
            alt="The Alka Events logo"
            className="h-8 w-auto cursor-pointer object-contain transition duration-300 hover:scale-[1.02] md:h-12 md:scale-125 lg:h-14"
            onClick={() => navigate('/')}
          />
        </div>

        {/* mobile center animation removed */}

        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `nav-link whitespace-nowrap ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = search.trim();
              if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
            }}
            className={`search-form group flex relative items-center justify-center bg-transparent border border-white/10 rounded-full px-3 py-2 w-12 min-w-[3rem] max-w-full focus-within:w-full md:w-12 md:hover:w-72 md:focus-within:w-72 focus-within:border-secondary md:hover:border-secondary transition-all duration-300 ease-out ${showSuggestions ? 'overflow-visible' : 'overflow-hidden'}`}
            role="search"
            aria-label="Site search"
          >
            <label htmlFor="header-search" className="sr-only">Search</label>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="search-icon h-4 w-4 text-on-surface-variant transition-colors duration-200 md:group-hover:text-on-surface group-focus-within:text-on-surface" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
            <input
              id="header-search"
              ref={inputRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => { setShowSuggestions(true); }}
              onBlur={() => { setTimeout(() => setShowSuggestions(false), 150); }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === 'Enter') {
                  if (activeIndex >= 0 && suggestions[activeIndex]) {
                    const s = suggestions[activeIndex];
                    if (s.type === 'portfolio' && s.slug) navigate(`/portfolio/${s.slug}`);
                    else if (s.type === 'page' && s.path) navigate(s.path);
                    else navigate(`/search?q=${encodeURIComponent(s.term)}`);
                  } else {
                    const q = search.trim();
                    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                  }
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
              placeholder="Search"
              className="search-input bg-transparent placeholder:text-on-surface-variant text-on-surface outline-none w-0 opacity-0 ml-0 text-sm transition-all duration-300 ease-out md:group-hover:w-full md:group-hover:opacity-100 md:group-hover:ml-2 group-focus-within:w-full group-focus-within:opacity-100 group-focus-within:ml-2 focus:w-full focus:opacity-100 focus:ml-2 placeholder:opacity-0 focus:placeholder:opacity-80"
            />

            {showSuggestions && (pagesList.length > 0 || portfolioList.length > 0) && (
              <ul className="search-suggestions absolute left-0 top-full mt-2 w-full max-h-52 overflow-auto rounded-md p-1 text-sm shadow-xl z-50">
                {pagesList.length > 0 && (
                  <li className="search-section-header">Pages</li>
                )}
                {pagesList.map((s) => {
                  const i = suggestions.indexOf(s);
                  return (
                    <li
                      key={`page-${s.title}`}
                      className={i === activeIndex ? 'search-suggestion active' : 'search-suggestion'}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        trackEvent('search.select', { suggestion: s });
                        if (s.path) navigate(s.path);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="truncate">{highlight(s.title, s.term)}</span>
                      </div>
                      <span className="search-meta">Page</span>
                    </li>
                  );
                })}

                {portfolioList.length > 0 && (
                  <li className="search-section-header">Portfolio</li>
                )}
                {portfolioList.map((s) => {
                  const i = suggestions.indexOf(s);
                  return (
                    <li
                      key={`pf-${s.slug}`}
                      className={i === activeIndex ? 'search-suggestion active' : 'search-suggestion'}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        trackEvent('search.select', { suggestion: s });
                        if (s.slug) navigate(`/portfolio/${s.slug}`);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="flex items-center gap-3 truncate">
                        {s.image && <img src={s.image} alt="" className="w-10 h-10 rounded-sm object-cover shrink-0" />}
                        <div className="truncate">
                          <div className="truncate">{highlight(s.title, s.term)}</div>
                          <div className="text-[11px] opacity-70">{s.category}</div>
                        </div>
                      </div>
                      <span className="search-meta">Item</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </form>
          

          <button
            type="button"
            onClick={() => navigate('/search')}
            className="hidden"
            aria-label="Open search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-on-surface transition hover:border-secondary hover:text-secondary md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      <div className={`absolute inset-x-0 top-full z-40 nav-panel border-t border-white/10 shadow-[0_35px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-3xl transition-all duration-300 md:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 text-sm">
          <nav className="nav-list flex flex-col gap-4">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              >
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className="pt-4"
          >
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-secondary nav-button"
            >
              Enquire
            </NavLink>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
