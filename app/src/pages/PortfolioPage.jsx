import { useContent } from '../contexts/ContentContext';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import usePageMeta from '../hooks/usePageMeta';

const PortfolioPage = () => {
  const { content } = useContent();
  usePageMeta(
    content.seo?.title || 'Portfolio | The Alka Events | Luxury Events & Celebrations',
    content.seo?.description || 'Explore our curated portfolio of luxury weddings, corporate galas, and private celebrations. Browse 100+ events showcasing editorial design and flawless execution.',
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  return (
    <>
      <Portfolio />
      <Testimonials />
    </>
  );
};

export default PortfolioPage;
