import { useContent } from '../contexts/ContentContext';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import usePageMeta from '../hooks/usePageMeta';

const AboutPage = () => {
  const { content } = useContent();
  usePageMeta(
    content.seo?.title || 'About The Alka Events | Our Philosophy & Approach',
    content.seo?.description || 'Learn about The Alka Events philosophy, 12+ years of expertise, and our approach to luxury event planning. Editorial design meets meticulous execution.',
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  return (
    <>
      <About />
      <Testimonials />
    </>
  );
};

export default AboutPage;
