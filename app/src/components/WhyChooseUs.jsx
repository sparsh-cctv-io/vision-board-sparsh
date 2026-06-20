import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: '✨',
      title: 'Editorial Precision',
      description: 'Every detail is curated with the eye of a creative director. From concept to execution, nothing is left to chance.'
    },
    {
      icon: '🤝',
      title: 'Personalized Partnership',
      description: 'We don\'t plan events—we compose symphonies. Your vision becomes our obsession. Full transparency, constant collaboration.'
    },
    {
      icon: '🔐',
      title: 'Discreet Luxury',
      description: 'Quiet elegance that speaks for itself. Confidentiality and refinement are woven into everything we do.'
    },
    {
      icon: '⚡',
      title: 'Flawless Execution',
      description: 'With 12+ years of expertise and 100+ curated events, we\'ve mastered every variable. Your event unfolds perfectly.'
    },
    {
      icon: '🌐',
      title: '24/7 Concierge',
      description: 'From pre-event planning to day-of coordination, we\'re always available. Your peace of mind is our priority.'
    },
    {
      icon: '🎨',
      title: 'Creative Vision',
      description: 'Beyond standard templates. We create bespoke experiences that reflect your unique story and aesthetic.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="mx-auto max-w-6xl py-28 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <p className="uppercase tracking-[0.35em] text-sm text-secondary">Why Alka Events</p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          What Sets Us Apart
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-on-surface-variant">
          In a world of standard event planning, we offer something rare: the confidence of refined expertise paired with genuine care for your vision.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group rounded-2xl border border-white/10 bg-surface2 p-8 shadow-lg shadow-black/20 transition-all hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/10"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-3xl transition-transform group-hover:scale-110">
              {reason.icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-white">
              {reason.title}
            </h3>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-20 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 to-secondary/0 p-12 text-center"
      >
        <p className="font-display text-2xl font-semibold text-white">
          "Luxury is not about excess. It's about the profound confidence of impeccable taste, meticulous care, and moments that matter."
        </p>
        <p className="mt-6 text-sm text-on-surface-variant">— The Alka Events Philosophy</p>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
