import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

const Footer = () => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <footer className="border-t border-white/10 bg-surface py-24 px-6 text-on-surface-variant md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-2xl font-semibold text-white">{footer.brand}</div>
          <p className="max-w-sm text-sm leading-relaxed">{footer.description}</p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.35em] text-secondary">Quick Links</h4>
          <ul className="mt-6 space-y-3 text-sm">
            {footer.quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition hover:text-secondary">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.35em] text-secondary">Services</h4>
          <ul className="mt-6 space-y-3 text-sm">
            {footer.servicesLinks.map((link) => (
              <li key={link.label}>
                <a href={link.to} className="transition hover:text-secondary">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.35em] text-secondary">Contact Info</h4>
          <p className="mt-6 text-sm leading-relaxed">
            {footer.contactEmail}<br />{footer.contactPhone}
          </p>
          <div className="mt-6 flex gap-3 text-on-surface">
            <a
              href={footer.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 p-2 transition-colors text-on-surface hover:text-secondary hover:border-secondary hover:bg-[rgba(212,175,55,0.04)] rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
            </a>

            <a
              href={footer.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 p-2 transition-colors text-on-surface hover:text-secondary hover:border-secondary hover:bg-[rgba(212,175,55,0.04)] rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a6 6 0 0 0-6 6v9a9 9 0 0 0 9-9V4a2 2 0 0 0-2-2z" /><path d="M20 13a6 6 0 0 1-6 6H9v-3h5a3 3 0 0 0 3-3v-1" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl border-t border-white/5 pt-8 text-center text-xs uppercase tracking-[0.28em] text-on-surface-variant">
        {footer.copyright}
      </div>
    </footer>
  );
};

export default Footer;
