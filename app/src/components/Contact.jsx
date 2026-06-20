import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

const mapImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZN48zTHrP78Nt3Xgs6QhQJen6XkmbpknQ1asWftqFuKyR_U2xqnU7WFsj8i0JQg06-4YAWBzghL9WcH9nD4ZhSjgLyRGirVP5vF4Fx4APmZQEkbfe319wbdQEy-QrxJequri56h0U-_hgRYWPek-A-YhCq7ZDmCTjXxv5YVnue_g6WwbCinX89pOK-NatqQA38GRxW-cXw9u6cAwiqaqugMrjAglw3eUn2wf5p5G3dOzVszam1nKyrzyrBabuNnKtNmoqrWUu8Gg';

const Contact = () => {
  const { content } = useContent();
  const { contact } = content;
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'Wedding', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', type: 'Wedding', message: '' });
  };

  return (
    <section id="contact" className="border-t border-white/10 bg-surface2 py-28 px-6 md:px-10">
      <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <p className="uppercase tracking-[0.35em] text-sm text-secondary">{contact.smallLabel}</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {contact.heading}
          </h1>
          <p className="max-w-xl text-base leading-8 text-on-surface-variant">
            {contact.description}
          </p>
          <div className="grid gap-4 text-sm text-on-surface-variant">
            <p><span className="text-white">Email:</span> {contact.email}</p>
            <p><span className="text-white">Phone:</span> {contact.phone}</p>
            <p><span className="text-white">Locations:</span> {contact.locations}</p>
          </div>
        </div>

        <div className="space-y-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="section-card p-10"
          >
            <div className="space-y-6">
              <div className="grid gap-6">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="input-underline"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="input-underline"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="input-underline"
                />
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="input-underline bg-transparent text-on-surface"
                >
                  <option>Wedding</option>
                  <option>Corporate</option>
                  <option>Private Party</option>
                </select>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Vision"
                  className="input-underline"
                />
              </div>
              <button type="submit" className="btn-primary button-text">
                Send Inquiry
              </button>
              {submitted && (
                <p className="rounded-sm border border-secondary/20 bg-secondary/10 px-5 py-4 text-sm text-secondary">
                  Thank you. We will respond shortly.
                </p>
              )}
            </div>
          </motion.form>

          <div className="grid gap-6">
            <div className="overflow-hidden">
              <img src={mapImage} alt="Minimal luxury map illustration" className="h-80 w-full object-cover opacity-80" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {contact.offices.map((office) => (
                <div key={office.label}>
                  <p className="uppercase tracking-[0.35em] text-sm text-secondary">{office.label}</p>
                  <p className="mt-3 text-on-surface-variant text-sm leading-relaxed">{office.address.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < office.address.split('\n').length - 1 && <br />}
                    </span>
                  ))}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
