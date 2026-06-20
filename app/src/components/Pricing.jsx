import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const Pricing = () => {
  const { content } = useContent();
  const { pricing } = content;

  return (
    <section id="pricing" className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="uppercase tracking-[0.35em] text-sm text-secondary">{pricing.label}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl mt-4">
          {pricing.heading}
        </h1>
      </div>
      <div className="mx-auto mt-14 grid gap-6 md:grid-cols-3 max-w-6xl">
        {pricing.tiers.map((tier, index) => (
          <motion.div
            key={`${tier.title}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className={`section-card border ${tier.highlighted ? 'border-secondary/80 bg-surfaceVariant/95 scale-[1.02]' : 'border-secondary/10'} p-10`}
          >
            {tier.highlighted && (
              <div className="mb-6 inline-flex rounded-sm border border-secondary bg-secondary/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-secondary">
                Most Popular
              </div>
            )}
            <h3 className="font-display text-2xl font-semibold text-white">{tier.title}</h3>
            <div className="mt-4 text-4xl font-bold text-secondary">
              {tier.price} <span className="text-sm font-normal text-on-surface-variant">{tier.label}</span>
            </div>
            <ul className="mt-8 space-y-4 text-on-surface-variant">
              {tier.features.map((feature) => (
                <li key={`${feature}-${index}`} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`mt-10 w-full rounded-full py-4 uppercase tracking-[0.24em] transition ${tier.highlighted ? 'bg-secondary text-[#0A0A0A]' : 'border border-secondary text-secondary hover:bg-secondary hover:text-[#0A0A0A]'}`}>
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
