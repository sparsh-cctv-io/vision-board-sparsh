import { useContent } from '../contexts/ContentContext';
import Pricing from '../components/Pricing';
import Services from '../components/Services';
import usePageMeta from '../hooks/usePageMeta';

const ServicesPage = () => {
  const { content } = useContent();
  usePageMeta(
    content.seo?.title || 'Services | The Alka Events | Wedding & Corporate Event Planning',
    content.seo?.description || 'Premium event planning services including weddings, corporate events, private parties, concerts, decoration, and artist management. Bespoke solutions for luxury occasions.',
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  return (
    <>
      <Services />
      <Pricing />
    </>
  );
};

export default ServicesPage;
