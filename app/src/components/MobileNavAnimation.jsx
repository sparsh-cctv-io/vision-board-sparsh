const MobileNavAnimation = () => (
  <div className="mobile-nav-animation pointer-events-none flex items-center justify-center md:hidden">
    <div className="h-12 w-[220px] max-w-full overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_10px_40px_-32px_rgba(255,255,255,0.8)] backdrop-blur-sm">
      <svg viewBox="0 0 220 48" className="h-full w-full" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mobile-nav-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="216" height="44" rx="22" fill="none" stroke="url(#mobile-nav-gradient)" strokeWidth="2" opacity="0.85" />
        <path d="M22 30C36 18 54 18 70 28C86 38 104 18 120 24C136 30 154 18 170 26C186 34 204 20 214 14"
          fill="none"
          stroke="url(#mobile-nav-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="16 12"
          className="animate-[dash_2.5s_linear_infinite]"
        />
      </svg>
    </div>
  </div>
);

export default MobileNavAnimation;
