import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const aboutImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtvcZ192lTca64aIOT51kTe2FlylefVir5-0NdYWqbclONevAX5GR-sy7o8CuJAT-tNQsmIuvaKpZc1_01oDjD0nNkEiHvhGBsb6E1t4qxM-vbVqHQWg_Wm4KrkF-oKwaFhq6IQl4nVdXMtNXNVRE6U-GjcqsINGEOTxu94xWhYuyjeLfu-VDK1eNQhsxNxHWTz5zCs6syklltp-kQR-B3MXiha6UxNxzxpwga7ToDvs6yKEbXRnVFZgwX3eFtf4fqdpKHXn8kuEE';

const About = () => {
  const { content } = useContent();
  const { about } = content;

  const [counts, setCounts] = useState(about.metrics.map(() => 0));
  const [metricsStarted, setMetricsStarted] = useState(false);
  const metricsStartedRef = useRef(false);

  useEffect(() => {
    if (!metricsStarted || metricsStartedRef.current) return;
    metricsStartedRef.current = true;

    const duration = 900;
    const frameDuration = 20;
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
    const delayBetween = 140;
    const timers = [];

    about.metrics.forEach((metric, index) => {
      const startDelay = index * delayBetween;
      let frame = 0;
      const interval = window.setInterval(() => {
        const elapsed = frame * frameDuration;
        if (elapsed < startDelay) {
          frame += 1;
          return;
        }

        const progress = easeOutQuad(Math.min((elapsed - startDelay) / duration, 1));
        setCounts((prev) => {
          const next = [...prev];
          next[index] = Math.round(metric.value * progress);
          return next;
        });

        if (elapsed >= startDelay + duration) {
          window.clearInterval(interval);
          setCounts((prev) => {
            const next = [...prev];
            next[index] = metric.value;
            return next;
          });
        }

        frame += 1;
      }, frameDuration);

      timers.push(interval);
    });

    return () => timers.forEach((timer) => window.clearInterval(timer));
  }, [metricsStarted, about.metrics]);

  return (
    <section id="about" className="mx-auto max-w-6xl py-28 px-6 md:px-10">
      <div className="space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/25">
            <img src={aboutImage} alt="Luxury event planner arranging glassware on a premium table setting." className="h-full w-full object-cover" />
          </div>
          <div className="space-y-8">
            <p className="uppercase tracking-[0.35em] text-sm text-secondary">{about.smallLabel}</p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {about.heading}
            </h1>
            <p className="max-w-xl text-base leading-8 text-on-surface-variant">
              {about.introOne}
            </p>
            <p className="max-w-xl text-base leading-8 text-on-surface-variant">
              {about.introTwo}
            </p>
            <motion.div
              className="grid gap-4 sm:grid-cols-3"
              onViewportEnter={() => setMetricsStarted(true)}
            >
              {about.metrics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="section-card p-6"
                >
                  <p className="text-3xl font-semibold text-secondary">
                    {counts[index]}
                    {item.suffix}
                  </p>
                  <p className="mt-3 text-white/70">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
            <Link to="/contact" className="btn-secondary button-text">
              Discover our process
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div className="space-y-6">
            <p className="uppercase tracking-[0.35em] text-sm text-secondary">{about.approachLabel}</p>
            <h3 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {about.approachHeading}
            </h3>
            <p className="max-w-xl text-base leading-8 text-on-surface-variant">
              {about.approachDescription}
            </p>
            <div className="space-y-4">
              {about.process.map((item, index) => (
                <div key={item.step} className="flex gap-4 rounded-3xl border border-white/10 bg-surface2 p-5 shadow-sm shadow-black/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{item.step}</p>
                    <p className="mt-2 text-on-surface-variant">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {about.metrics.slice(0, 3).map((feature, index) => (
              <motion.div
                key={`${feature.label}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="section-card p-8"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Feature</p>
                <h4 className="mt-4 text-2xl font-semibold text-white">{feature.label}</h4>
                <p className="mt-4 text-on-surface-variant leading-8">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid gap-16 lg:grid-cols-2"
        >
          <div className="space-y-8">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-secondary">{about.mission.label}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {about.mission.heading}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-on-surface-variant">
                {about.mission.description}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-secondary">{about.vision.label}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {about.vision.heading}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-on-surface-variant">
                {about.vision.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
