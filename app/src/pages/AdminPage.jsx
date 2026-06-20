import { useContent } from '../contexts/ContentContext';
import { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';

const AdminPage = () => {
  usePageMeta(
    'Admin | The Alka Events | Content Management',
    'Admin panel for managing The Alka Events website content including hero, portfolio, services, and pricing information.'
  );

  const { content, updateContent, resetContent, saveContent, saveError, loading } = useContent();
  const [statusMessage, setStatusMessage] = useState('');

  const handleSave = async () => {
    setStatusMessage('Saving...');
    const result = await saveContent(content);
    setStatusMessage(result.success ? 'Saved successfully.' : `Save failed. ${result.error || 'Unknown error.'}`);
    window.setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleChange = (path) => (event) => {
    updateContent(path, event.target.value);
  };

  const getValueByPath = (path) => path.reduce((node, key) => node?.[key], content);

  const handleArrayChange = (path, index, key) => (event) => {
    const pathArray = Array.isArray(path) ? path : [path];
    const array = getValueByPath(pathArray) ?? [];
    const next = [...array];
    next[index] = { ...next[index], [key]: event.target.value };
    updateContent(pathArray, next);
  };

  const handleImageUpload = (index) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      const next = [...content.portfolio.slides];
      next[index] = { ...next[index], image: reader.result };
      updateContent(['portfolio', 'slides'], next);
    };

    reader.readAsDataURL(file);
  };

  const handleAddSlide = () => {
    const next = [
      ...content.portfolio.slides,
      {
        slug: `portfolio-slide-${Date.now()}`,
        title: '',
        category: '',
        description: '',
        image: ''
      }
    ];
    updateContent(['portfolio', 'slides'], next);
  };

  const handleRemoveSlide = (index) => () => {
    const next = [...content.portfolio.slides];
    next.splice(index, 1);
    updateContent(['portfolio', 'slides'], next);
  };

  const handleFeaturesChange = (index) => (event) => {
    const next = [...content.pricing.tiers];
    next[index] = { ...next[index], features: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) };
    updateContent(['pricing', 'tiers'], next);
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/30 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">Content Portal</p>
            <h1 className="mt-4 text-4xl font-semibold">Edit website content live</h1>
            <p className="mt-2 text-on-surface-variant">Update hero text, portfolio slides, services, and pricing. Changes persist locally in your browser.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-primary button-text w-full justify-center md:w-auto"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={resetContent}
              className="btn-secondary button-text w-full justify-center md:w-auto"
            >
              Reset defaults
            </button>
          </div>
        </div>
        {statusMessage && (
          <div className="rounded-3xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-200">
            {statusMessage}
          </div>
        )}

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">SEO settings</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Page title</span>
            <input type="text" value={content.seo?.title || ''} onChange={handleChange(['seo', 'title'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Meta description</span>
            <textarea value={content.seo?.description || ''} onChange={handleChange(['seo', 'description'])} className="input-underline bg-transparent text-white w-full min-h-[100px] resize-none" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Meta keywords</span>
            <input type="text" value={content.seo?.keywords || ''} onChange={handleChange(['seo', 'keywords'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Open Graph title</span>
            <input type="text" value={content.seo?.ogTitle || ''} onChange={handleChange(['seo', 'ogTitle'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Open Graph description</span>
            <textarea value={content.seo?.ogDescription || ''} onChange={handleChange(['seo', 'ogDescription'])} className="input-underline bg-transparent text-white w-full min-h-[100px] resize-none" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Open Graph image URL</span>
            <input type="text" value={content.seo?.ogImage || ''} onChange={handleChange(['seo', 'ogImage'])} className="input-underline bg-transparent text-white w-full" />
          </label>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Hero section</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Top label</span>
            <input type="text" value={content.hero.label} onChange={handleChange(['hero', 'label'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Headline</span>
            <input type="text" value={content.hero.title} onChange={handleChange(['hero', 'title'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Description</span>
            <textarea value={content.hero.description} onChange={handleChange(['hero', 'description'])} className="input-underline bg-transparent text-white w-full min-h-[120px] resize-none" />
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Primary CTA</span>
              <input type="text" value={content.hero.primaryCta} onChange={handleChange(['hero', 'primaryCta'])} className="input-underline bg-transparent text-white w-full" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Secondary CTA</span>
              <input type="text" value={content.hero.secondaryCta} onChange={handleChange(['hero', 'secondaryCta'])} className="input-underline bg-transparent text-white w-full" />
            </label>
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Portfolio header</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section label</span>
            <input type="text" value={content.portfolio.headerLabel} onChange={handleChange(['portfolio', 'headerLabel'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section heading</span>
            <input type="text" value={content.portfolio.headerHeading} onChange={handleChange(['portfolio', 'headerHeading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section description</span>
            <textarea value={content.portfolio.headerDescription} onChange={handleChange(['portfolio', 'headerDescription'])} className="input-underline bg-transparent text-white w-full min-h-[100px] resize-none" />
          </label>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">About section</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Top label</span>
            <input type="text" value={content.about.smallLabel} onChange={handleChange(['about', 'smallLabel'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Heading</span>
            <input type="text" value={content.about.heading} onChange={handleChange(['about', 'heading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Intro paragraph one</span>
            <textarea value={content.about.introOne} onChange={handleChange(['about', 'introOne'])} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Intro paragraph two</span>
            <textarea value={content.about.introTwo} onChange={handleChange(['about', 'introTwo'])} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Approach label</span>
            <input type="text" value={content.about.approachLabel} onChange={handleChange(['about', 'approachLabel'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Approach heading</span>
            <input type="text" value={content.about.approachHeading} onChange={handleChange(['about', 'approachHeading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Approach description</span>
            <textarea value={content.about.approachDescription} onChange={handleChange(['about', 'approachDescription'])} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
          </label>
          <div className="grid gap-6 md:grid-cols-3">
            {content.about.process.map((item, index) => (
              <div key={`${item.step}-${index}`} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Step</span>
                  <input type="text" value={item.step} onChange={handleArrayChange(['about', 'process'], index, 'step')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Detail</span>
                  <textarea value={item.detail} onChange={handleArrayChange(['about', 'process'], index, 'detail')} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-3xl font-semibold">Portfolio slides</h2>
            <button
              type="button"
              onClick={handleAddSlide}
              className="btn-secondary button-text w-full justify-center md:w-auto"
            >
              Add new slide
            </button>
          </div>
          {content.portfolio.slides.map((slide, index) => (
            <div key={slide.slug || index} className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Slide {index + 1}</p>
              <label className="block space-y-2">
                <span className="text-sm text-on-surface-variant">Title</span>
                <input type="text" value={slide.title} onChange={handleArrayChange('portfolio', index, 'title')} className="input-underline bg-transparent text-white w-full" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-on-surface-variant">Category</span>
                <input type="text" value={slide.category} onChange={handleArrayChange('portfolio', index, 'category')} className="input-underline bg-transparent text-white w-full" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-on-surface-variant">Description</span>
                <input type="text" value={slide.description} onChange={handleArrayChange('portfolio', index, 'description')} className="input-underline bg-transparent text-white w-full" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-on-surface-variant">Image URL</span>
                <input type="text" value={slide.image} onChange={handleArrayChange(['portfolio', 'slides'], index, 'image')} className="input-underline bg-transparent text-white w-full" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-on-surface-variant">Upload photo from your PC</span>
                <input type="file" accept="image/*" onChange={handleImageUpload(index)} className="file-input bg-transparent text-white w-full" />
              </label>
              {slide.image && (
                <div className="mt-3 rounded-3xl overflow-hidden border border-white/10 bg-black/20">
                  <img src={slide.image} alt={`Preview ${slide.title}`} className="h-48 w-full object-cover" />
                </div>
              )}
              <button
                type="button"
                onClick={handleRemoveSlide(index)}
                className="btn-secondary button-text mt-3 w-full justify-center border border-red-500 text-red-200 hover:bg-red-600/15 md:w-auto"
              >
                Remove this slide
              </button>
            </div>
          ))}
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Testimonials</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section label</span>
            <input type="text" value={content.testimonials.label} onChange={handleChange(['testimonials', 'label'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section heading</span>
            <input type="text" value={content.testimonials.heading} onChange={handleChange(['testimonials', 'heading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Panel heading</span>
            <input type="text" value={content.testimonials.panelHeading} onChange={handleChange(['testimonials', 'panelHeading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <div className="grid gap-6">
            {content.testimonials.items.map((item, index) => (
              <div key={`${item.author}-${index}`} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm uppercase tracking-[0.32em] text-secondary">Testimonial {index + 1}</p>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Quote</span>
                  <textarea value={item.quote} onChange={handleArrayChange(['testimonials', 'items'], index, 'quote')} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Author</span>
                  <input type="text" value={item.author} onChange={handleArrayChange(['testimonials', 'items'], index, 'author')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Role</span>
                  <input type="text" value={item.role} onChange={handleArrayChange(['testimonials', 'items'], index, 'role')} className="input-underline bg-transparent text-white w-full" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Contact section</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Top label</span>
            <input type="text" value={content.contact.smallLabel} onChange={handleChange(['contact', 'smallLabel'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Heading</span>
            <input type="text" value={content.contact.heading} onChange={handleChange(['contact', 'heading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Description</span>
            <textarea value={content.contact.description} onChange={handleChange(['contact', 'description'])} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
          </label>
          <div className="grid gap-6 md:grid-cols-3">
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Email</span>
              <input type="text" value={content.contact.email} onChange={handleChange(['contact', 'email'])} className="input-underline bg-transparent text-white w-full" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Phone</span>
              <input type="text" value={content.contact.phone} onChange={handleChange(['contact', 'phone'])} className="input-underline bg-transparent text-white w-full" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Locations text</span>
              <input type="text" value={content.contact.locations} onChange={handleChange(['contact', 'locations'])} className="input-underline bg-transparent text-white w-full" />
            </label>
          </div>
          <div className="grid gap-6">
            {content.contact.offices.map((office, index) => (
              <div key={`${office.label}-${index}`} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Office label</span>
                  <input type="text" value={office.label} onChange={handleArrayChange(['contact', 'offices'], index, 'label')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Address</span>
                  <textarea value={office.address} onChange={handleArrayChange(['contact', 'offices'], index, 'address')} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Footer</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Brand name</span>
            <input type="text" value={content.footer.brand} onChange={handleChange(['footer', 'brand'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Description</span>
            <textarea value={content.footer.description} onChange={handleChange(['footer', 'description'])} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Footer email</span>
              <input type="text" value={content.footer.contactEmail} onChange={handleChange(['footer', 'contactEmail'])} className="input-underline bg-transparent text-white w-full" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-on-surface-variant">Footer phone</span>
              <input type="text" value={content.footer.contactPhone} onChange={handleChange(['footer', 'contactPhone'])} className="input-underline bg-transparent text-white w-full" />
            </label>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Quick links</p>
              <div className="mt-4 space-y-4">
                {content.footer.quickLinks.map((link, index) => (
                  <div key={`${link.label}-${index}`} className="space-y-2">
                    <input type="text" value={link.label} onChange={handleArrayChange(['footer', 'quickLinks'], index, 'label')} className="input-underline bg-transparent text-white w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Services links</p>
              <div className="mt-4 space-y-4">
                {content.footer.servicesLinks.map((link, index) => (
                  <div key={`${link.label}-${index}`} className="space-y-2">
                    <input type="text" value={link.label} onChange={handleArrayChange(['footer', 'servicesLinks'], index, 'label')} className="input-underline bg-transparent text-white w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Instagram URL</span>
            <input type="text" value={content.footer.instagram} onChange={handleChange(['footer', 'instagram'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Facebook URL</span>
            <input type="text" value={content.footer.facebook} onChange={handleChange(['footer', 'facebook'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Copyright text</span>
            <input type="text" value={content.footer.copyright} onChange={handleChange(['footer', 'copyright'])} className="input-underline bg-transparent text-white w-full" />
          </label>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Services</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section heading</span>
            <input type="text" value={content.services.heading} onChange={handleChange(['services', 'heading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            {content.services.items.map((service, index) => (
              <div key={service.title} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Service title</span>
                  <input type="text" value={service.title} onChange={handleArrayChange(['services', 'items'], index, 'title')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Description</span>
                  <textarea value={service.description} onChange={handleArrayChange(['services', 'items'], index, 'description')} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-surface2 p-8 shadow-xl shadow-black/20">
          <h2 className="font-display text-3xl font-semibold">Pricing</h2>
          <label className="block space-y-2">
            <span className="text-sm text-on-surface-variant">Section heading</span>
            <input type="text" value={content.pricing.heading} onChange={handleChange(['pricing', 'heading'])} className="input-underline bg-transparent text-white w-full" />
          </label>
          <div className="space-y-6">
            {content.pricing.tiers.map((tier, index) => (
              <div key={tier.title} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm uppercase tracking-[0.32em] text-secondary">Tier {index + 1}</p>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Title</span>
                  <input type="text" value={tier.title} onChange={handleArrayChange(['pricing', 'tiers'], index, 'title')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Price</span>
                  <input type="text" value={tier.price} onChange={handleArrayChange(['pricing', 'tiers'], index, 'price')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Label</span>
                  <input type="text" value={tier.label} onChange={handleArrayChange(['pricing', 'tiers'], index, 'label')} className="input-underline bg-transparent text-white w-full" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Features (comma separated)</span>
                  <textarea value={tier.features.join(', ')} onChange={handleFeaturesChange(index)} className="input-underline bg-transparent text-white w-full min-h-[80px] resize-none" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-on-surface-variant">Button text</span>
                  <input type="text" value={tier.cta} onChange={handleArrayChange(['pricing', 'tiers'], index, 'cta')} className="input-underline bg-transparent text-white w-full" />
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
