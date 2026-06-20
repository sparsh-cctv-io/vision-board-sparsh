import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const Services = () => {
  const { content } = useContent();
  const { services } = content;

  return (
    <section id="services" className="border-t border-white/10 bg-surface2 py-28 px-6 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="uppercase tracking-[0.35em] text-sm text-secondary">{services.label}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl mt-4">
          {services.heading}
        </h1>
      </div>
      <div className="mx-auto mt-14 grid gap-6 md:grid-cols-3">
        {services.items.map((service, index) => (
          <motion.div
            key={`${service.title}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className="section-card p-8"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-secondary">Service</p>
            <h3 className="mt-5 text-2xl font-semibold text-white">{service.title}</h3>
            <p className="mt-4 text-base leading-8 text-on-surface-variant">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
