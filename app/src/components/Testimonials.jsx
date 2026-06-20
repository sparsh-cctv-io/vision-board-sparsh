import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const Testimonials = () => {
  const { content } = useContent();
  const { testimonials } = content;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.items.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [testimonials.items.length]);

  return (
    <section id="testimonials" className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="uppercase tracking-[0.35em] text-sm text-secondary">{testimonials.label}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl mt-4">
          {testimonials.heading}
        </h1>
      </div>
      <div className="mx-auto mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] max-w-6xl">
        <div className="section-card p-12">
          <motion.div
            key={testimonials.items[index].quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-3xl leading-relaxed text-white/90 italic">
              “{testimonials.items[index].quote}”
            </p>
            <div>
              <p className="text-lg font-semibold text-white">{testimonials.items[index].author}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-on-surface-variant">{testimonials.items[index].role}</p>
            </div>
          </motion.div>
        </div>
        <div className="section-card border border-white/10 bg-surfaceVariant/95 p-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-secondary">Client Stories</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{testimonials.panelHeading}</h3>
            </div>
            <div className="text-sm text-on-surface-variant">{index + 1}/{testimonials.items.length}</div>
          </div>
          <div className="mt-10 grid gap-4">
            <button onClick={() => setIndex((current) => (current - 1 + testimonials.items.length) % testimonials.items.length)} className="w-full rounded-full border border-white/10 bg-surface px-5 py-3 text-sm text-white transition hover:border-secondary hover:text-secondary">
              Previous
            </button>
            <button onClick={() => setIndex((current) => (current + 1) % testimonials.items.length)} className="w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#c79c31]">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
