import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import portfolioItems from '../data/portfolioItems';
import usePageMeta from '../hooks/usePageMeta';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const pages = [
  { title: 'About', path: '/about' },
  { title: 'Home', path: '/' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Services', path: '/services' },
  { title: 'Contact', path: '/contact' }
];

const SearchPage = () => {
  const { content } = useContent();
  const q = useQuery().get('q') || '';
  const term = q.trim().toLowerCase();

  usePageMeta(
    content.seo?.title || `Search | The Alka Events | Find Events and Services`,
    content.seo?.description || `Search The Alka Events website for luxury event planning services, weddings, corporate events, and portfolio items.`,
    content.seo?.keywords,
    content.seo?.ogTitle,
    content.seo?.ogDescription,
    content.seo?.ogImage
  );

  const results = useMemo(() => {
    if (!term) return { pages: [], portfolio: [] };

    const pageResults = pages.filter((p) => p.title.toLowerCase().includes(term));
    const portfolioResults = portfolioItems.filter((item) => (
      item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
    ));

    return { pages: pageResults, portfolio: portfolioResults };
  }, [term]);

  return (
    <section className="mx-auto max-w-6xl py-28 px-6 md:px-10">
      <h1 className="text-2xl font-semibold text-white mb-6">Search results for "{q}"</h1>

      {term === '' && (
        <p className="text-on-surface-variant">Enter a search term to find pages and portfolio items.</p>
      )}

      {term !== '' && (
        <div className="grid gap-12">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Pages</h3>
            {results.pages.length === 0 ? (
              <p className="text-on-surface-variant">No pages found.</p>
            ) : (
              <ul className="space-y-2">
                {results.pages.map((p) => (
                  <li key={p.path}>
                    <Link to={p.path} className="text-secondary hover:underline">{p.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio</h3>
            {results.portfolio.length === 0 ? (
              <p className="text-on-surface-variant">No portfolio items found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {results.portfolio.map((item) => (
                  <Link key={item.title} to={`/portfolio/${item.slug}`} className="group block overflow-hidden rounded-md bg-surface2 p-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="h-20 w-28 object-cover rounded-md" />
                      <div>
                        <p className="text-sm uppercase text-secondary">{item.category}</p>
                        <h4 className="mt-2 text-lg font-semibold text-white">{item.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
