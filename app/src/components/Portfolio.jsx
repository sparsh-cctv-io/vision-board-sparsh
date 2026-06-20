import { useEffect, useRef, useState } from 'react';
import { useContent } from '../contexts/ContentContext';

const wrapIndex = (value, max) => ((value % max) + max) % max;
const lerp = (a, b, t) => a + (b - a) * t;

class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  lerp(v, t) {
    this.x = lerp(this.x, v.x, t);
    this.y = lerp(this.y, v.y, t);
  }
}

const vec2 = (x = 0, y = 0) => new Vec2(x, y);

const createTilt = (trigger, targets) => {
  const rotCurrent = vec2();
  const rotTarget = vec2();
  const bgCurrent = vec2();
  const bgTarget = vec2();

  let rafId;
  let running = true;

  const onMouseMove = (event) => {
    const rect = trigger.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
    const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);

    rotTarget.set(ox, oy);
    bgTarget.set(-ox * 0.3, oy * 0.3);
  };

  const onMouseLeave = () => {
    rotTarget.set(0, 0);
    bgTarget.set(0, 0);
  };

  const tick = () => {
    if (!running) return;

    rotCurrent.lerp(rotTarget, 0.1);
    bgCurrent.lerp(bgTarget, 0.1);

    const rotX = `${rotCurrent.y.toFixed(2)}deg`;
    const rotY = `${rotCurrent.x.toFixed(2)}deg`;
    const bgPosX = `${bgCurrent.x.toFixed(2)}%`;
    const bgPosY = `${bgCurrent.y.toFixed(2)}%`;

    targets.forEach((target) => {
      if (!target) return;
      target.style.setProperty('--rotX', rotX);
      target.style.setProperty('--rotY', rotY);
      target.style.setProperty('--bgPosX', bgPosX);
      target.style.setProperty('--bgPosY', bgPosY);
    });

    rafId = requestAnimationFrame(tick);
  };

  trigger.addEventListener('mousemove', onMouseMove);
  trigger.addEventListener('mouseleave', onMouseLeave);
  tick();

  return () => {
    running = false;
    trigger.removeEventListener('mousemove', onMouseMove);
    trigger.removeEventListener('mouseleave', onMouseLeave);
    cancelAnimationFrame(rafId);
  };
};

const Portfolio = () => {
  const { content } = useContent();
  const slides = content.portfolio.slides;
  const [filter, setFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', ...Array.from(new Set(slides.map((item) => item.category)))];
  const filteredSlides = filter === 'All' ? slides : slides.filter((slide) => slide.category === filter);

  const slideRefs = useRef([]);
  const slideInnerRefs = useRef([]);
  const infoInnerRefs = useRef([]);
  const destroyTilt = useRef([]);

  useEffect(() => {
    destroyTilt.current.forEach((destroy) => destroy());
    destroyTilt.current = [];

    filteredSlides.forEach((_, index) => {
      const slide = slideRefs.current[index];
      const slideInner = slideInnerRefs.current[index];
      const infoInner = infoInnerRefs.current[index];

      if (slide && slideInner && infoInner) {
        destroyTilt.current.push(createTilt(slide, [slideInner, infoInner]));
      }
    });

    return () => {
      destroyTilt.current.forEach((destroy) => destroy());
      destroyTilt.current = [];
    };
  }, [slides, filter]);

  useEffect(() => {
    if (currentIndex >= filteredSlides.length) {
      setCurrentIndex(0);
    }
  }, [filteredSlides.length, currentIndex]);

  const changeSlide = (direction) => {
    setCurrentIndex((prev) => wrapIndex(prev + direction, filteredSlides.length));
  };

  const current = currentIndex;
  const next = wrapIndex(current + 1, filteredSlides.length);
  const previous = wrapIndex(current - 1, filteredSlides.length);

  return (
    <section className="portfolio-page" id="portfolio">
      <div className="portfolio-header max-w-4xl mx-auto px-6 md:px-0 text-center mb-12">
        <p className="uppercase tracking-[0.35em] text-sm text-[#D4AF37]">{content.portfolio.headerLabel}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl mt-4">
          {content.portfolio.headerHeading}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-200">
          {content.portfolio.headerDescription}
        </p>
      </div>
      <div className="category-filter mb-10">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setFilter(category);
              setCurrentIndex(0);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category === filter ? 'border-secondary bg-secondary/15 text-secondary' : 'border-white/10 text-white hover:border-secondary hover:text-secondary'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="slider">
        <button className="slider--btn slider--btn__prev" type="button" onClick={() => changeSlide(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="slides__wrapper">
          <div className="slides">
            {filteredSlides.map((slide, index) => {
              const status = index === current ? 'current' : index === next ? 'next' : index === previous ? 'previous' : undefined;

              return (
                <div
                  key={slide.slug}
                  className="slide"
                  data-current={status === 'current' ? '' : undefined}
                  data-next={status === 'next' ? '' : undefined}
                  data-previous={status === 'previous' ? '' : undefined}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                >
                  <div className="slide__inner" ref={(el) => (slideInnerRefs.current[index] = el)}>
                    <div className="slide--image__wrapper">
                      <img className="slide--image" src={slide.image} alt={slide.title} />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredSlides.map((slide, index) => {
              const status = index === current ? 'current' : index === next ? 'next' : index === previous ? 'previous' : undefined;

              return (
                <div
                  key={`${slide.slug}-bg`}
                  className="slide__bg"
                  data-current={status === 'current' ? '' : undefined}
                  data-next={status === 'next' ? '' : undefined}
                  data-previous={status === 'previous' ? '' : undefined}
                  style={{ '--bg': `url(${slide.image})` }}
                />
              );
            })}
          </div>

          <div className="slides--infos">
            {filteredSlides.map((slide, index) => {
              const status = index === current ? 'current' : index === next ? 'next' : index === previous ? 'previous' : undefined;

              return (
                <div
                  key={`${slide.slug}-info`}
                  className="slide-info"
                  data-current={status === 'current' ? '' : undefined}
                  data-next={status === 'next' ? '' : undefined}
                  data-previous={status === 'previous' ? '' : undefined}
                >
                  <div className="slide-info__inner" ref={(el) => (infoInnerRefs.current[index] = el)}>
                    <div className="slide-info--text__wrapper">
                      <div data-title className="slide-info--text">
                        <span>{slide.title}</span>
                      </div>
                      <div data-subtitle className="slide-info--text">
                        <span>{slide.category}</span>
                      </div>
                      <div data-description className="slide-info--text">
                        <span>{slide.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="slider--btn slider--btn__next" type="button" onClick={() => changeSlide(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

    </section>
  );
};

export default Portfolio;
