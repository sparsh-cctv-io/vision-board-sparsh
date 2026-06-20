const rawItems = [
  {
    title: 'Grand Crystal Wedding',
    category: 'Weddings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqeEIx9IlSoh2W96O8DMETiDL0o6Lz9yrHySQlI__FCiLRd2RF4yIVma7zt-A5SVw5T_dnVh0HIspT6UF0ov8ucepNRc5VGlQsxE2Xau2JjDGWBhjd1av-JIXHEqmFR8XKJbDB104ks4KinQKFqa5mPgCKOUEGbPIPS2t8D4jtjMmrOBo6uaYf8O2gCLaAULKMC_5Cnp4gtn80yV6LbBriFtg8qFOzmx0KHa_rxhyLf_wCt4b-SpYy4qvvLWAAXzNSrB3vN4bO_Rw',
    span: 'md:col-span-8'
  },
  {
    title: 'Elite Nightlife Gala',
    category: 'Private',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnrXhG7sWFSFH05A9rqX9de1JDaFDQAYaJELah62Zq_H5puter_mZZ-vgUnrbDG9guk82FI7B9co54GhOJgpHBzj23pp9AlTvzkKNA3Gyt7vFrtF1E_Hka1hw2oKc3-puFS8hQsvLjrEMwJlFqihXb72brQH7M46U3_NnKOzhsFPGWZcxxwo6SB_ZXMV7hkS2LhK90qRyu5wHnxEirS-6_Uu6TDoeR_m1kZyeHQuGl-bG55ir6Ljyn0WmyEQz8TWEv6mYloa0_w-w',
    span: 'md:col-span-4'
  },
  {
    title: 'Tech Summit Gala',
    category: 'Corporate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLIE0LcJfWuXiRuZJkFL9hH_blw2erYZ9y8HiA7AZReQSpuecKDWfu2UqAxADLjvPAKUJ8lWry1A14RTpaLm9CN8J9YOLlHUBthf8qWcFr3he-nNjEdHtYSRBvgTTgO3P6bXvZm8zP0I_3yrft-ms9WolCWSpU74leyRrTXbEeZ0MMkHDn3U1tYin4TYHBtUyuz8qgmeMlT7ZGjQ3eHsJ_8oAyjtFw8A6hRgEoEIk4dsa9SeFmbqn6cIJyr6tLKhMmUAr4oou6B0',
    span: 'md:col-span-4'
  },
  {
    title: 'Historic Estate Garden Party',
    category: 'Weddings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxSrRp68thJwBWQMXvngki2NrjpiSpQvlnT_HU8S7XBa-Nap9-nKzY4bd6ICM16QlDCa4b-kylSKVMjGLyayMkL0kSzaMX4QiXEz_wI36aIrH_m_-1yPA0wJ327i9ODuFE9I-mKgGhfqcnnya1ezcd0pBxbFOKKXZZtuSgyS3VOX0MRGRfoATHw-q3LfNF9h4LGWet5hWfnrWj3EsDHXD0Wm5yoyI_sHiX8TiRc4wCJufdf2Qf9Vtc_vOE2F73-D2TnsJUfgqPgoA',
    span: 'md:col-span-8'
  },
  {
    title: 'Seaside Vow Exchange',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    span: 'md:col-span-8'
  },
  {
    title: 'Executive Awards Gala',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80',
    span: 'md:col-span-4'
  },
  {
    title: 'Rooftop Cocktail Premiere',
    category: 'Private',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
    span: 'md:col-span-4'
  },
  {
    title: 'Lakeside Festival Reception',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    span: 'md:col-span-8'
  }
];

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const portfolioItems = rawItems.map((it) => ({
  ...it,
  slug: it.slug || slugify(it.title)
}));

export default portfolioItems;
