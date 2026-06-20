import { useContent } from '../contexts/ContentContext';
import Contact from '../components/Contact';
import usePageMeta from '../hooks/usePageMeta';

const ContactPage = () => {
  const { content } = useContent();
  usePageMeta(
    content.seo?.title || 'Contact The Alka Events | Book Your Luxury Event',
    content.seo?.description || 'Get in touch with The Alka Events for wedding planning, corporate events, or private celebrations. Phone: +91 9855373712. Luxury event coordination across India.',
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  return <Contact />;
};

export default ContactPage;
