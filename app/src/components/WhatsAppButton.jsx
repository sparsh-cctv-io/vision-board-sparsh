import { useContent } from '../contexts/ContentContext';

const formatPhone = (phone) => phone.replace(/[^0-9]/g, '');

const WhatsAppButton = () => {
  const { content } = useContent();
  const phone = formatPhone(content.contact.phone || '919855373712');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hello Alka Events, I would like to discuss an upcoming event.')}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
      aria-label="Contact Alka Events on WhatsApp"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.56 4.15 1.62 5.92L0 24l6.31-1.65A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.24-6.2-3.48-8.52Zm-8.52 17.64c-1.82 0-3.59-.49-5.14-1.42l-.37-.22-3.74.98.99-3.64-.24-.38A9.4 9.4 0 0 1 2.6 12c0-5.15 4.19-9.33 9.33-9.33 2.5 0 4.84.98 6.61 2.76A9.32 9.32 0 0 1 21.33 12c0 5.15-4.18 9.33-9.33 9.33Zm5.39-7.66c-.27-.13-1.6-.79-1.85-.88-.25-.09-.44-.13-.63.13-.19.26-.73.88-.9 1.06-.16.19-.31.21-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.54.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.06-.13-.63-1.52-.86-2.08-.23-.55-.46-.48-.63-.49h-.54c-.18 0-.47.07-.71.34-.24.27-.92.9-.92 2.2 0 1.29.94 2.54 1.07 2.72.12.18 1.85 2.88 4.49 4.04 1.72.74 2.44.83 3.31.71.51-.07 1.6-.65 1.82-1.28.22-.64.22-1.19.16-1.3-.05-.1-.19-.16-.4-.28Z" />
        </svg>
      </span>
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
