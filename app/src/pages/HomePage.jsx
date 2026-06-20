import { useContent } from '../contexts/ContentContext';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import usePageMeta from '../hooks/usePageMeta';

const HomePage = () => {
  const { content } = useContent();
  usePageMeta(
    content.seo?.title || 'The Alka Events | Luxury Event Planning & Design',
    content.seo?.description || 'Luxury event planning for weddings, corporate galas, and private celebrations. 12+ years of expertise, 100+ events curated. Elevated experiences with flawless execution.',
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  return (
    <>
      <Hero />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;
