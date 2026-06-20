import { useParams, Link } from 'react-router-dom';
import portfolioItems from '../data/portfolioItems';
import usePageMeta from '../hooks/usePageMeta';

const PortfolioItem = () => {
  const { content } = useContent();
  const { slug } = useParams();
  const item = portfolioItems.find((portfolioItem) => portfolioItem.slug === slug);

  usePageMeta(
    item ? `${item.title} | The Alka Events` : 'Portfolio Item | The Alka Events',
    item ? `Explore ${item.title} - a ${item.category} event showcasing luxury event planning expertise from The Alka Events. Editorial design and flawless execution.` : 'Portfolio item not found',
    content.seo?.keywords,
    item ? `${item.title} | The Alka Events` : content.seo?.ogTitle,
    item ? `Explore ${item.title} - a ${item.category} event showcasing luxury event planning expertise from The Alka Events. Editorial design and flawless execution.` : content.seo?.ogDescription,
    content.seo?.ogImage
  );

  if (!item) {
    return (
      <section className="mx-auto max-w-6xl py-28 px-6 md:px-10">
        <h2 className="text-2xl font-semibold text-white">Not found</h2>
        <p className="mt-4 text-on-surface-variant">No portfolio item matches that link.</p>
        <Link to="/portfolio" className="text-secondary mt-4 inline-block">Back to portfolio</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl py-28 px-6 md:px-10">
      <div className="mb-6">
        <p className="uppercase tracking-[0.35em] text-sm text-secondary">{item.category}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl mt-4">{item.title}</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <img src={item.image} alt={item.title} className="w-full rounded-md object-cover" />
        </div>
        <div className="p-6 bg-surface2 rounded-md">
          <h3 className="text-lg font-semibold text-white">Overview</h3>
          <p className="mt-4 text-on-surface-variant">A detailed presentation for {item.title}. Add more content here about the event, challenges, and highlights.</p>
          <Link to="/portfolio" className="text-secondary mt-4 inline-block">Back to portfolio</Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioItem;
