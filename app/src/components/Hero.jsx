import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_kuxEq4c_rmc-VTu7MOdzphPOJpZkPSXYUz3-zlXKVc62BlYo0MBb3SUVQwvR1a67hHhbNyzpfmH95hvG12Lvk6AjHYJMZcUS7D-9BaosmC8x2fprBYAhNE2ulGinr03REiMEUlMFlTeHPiuw1GYVWFwvCkPjHJMT3UYzP-5IloUBqpsBQMxBhvZSwZan2KSUhw8u6mKsZI4xHOn6xqSgBu1USCebOmPdepKEgtU_CtpeorLClQUFUrz-bKeqgwohXH4yiz5tDl0';

const Hero = () => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="An elegant luxury ballroom with dramatic golden lighting and premium event styling."
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl space-y-8"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-secondary">{hero.label}</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-white sm:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary button-text">
              {hero.primaryCta}
            </Link>
            <Link to="/portfolio" className="btn-secondary button-text">
              {hero.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
