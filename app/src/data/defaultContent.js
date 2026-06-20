const defaultContent = {
  hero: {
    label: 'An Aura of Excellence',
    title: 'Creating Unforgettable Experiences',
    description: 'Elevated event planning for weddings, corporate galas, and private celebrations crafted with quiet luxury, timeless style, and flawless execution.',
    primaryCta: 'Book Now',
    secondaryCta: 'View Portfolio'
  },
  seo: {
    title: 'The Alka Events | Creating Unforgettable Experiences',
    description: 'Luxury event planning for weddings, corporate galas, and private celebrations. 12+ years of expertise, 100+ events curated. Elevated experiences with flawless execution.',
    keywords: 'luxury event planning, wedding planning, corporate events, bespoke celebrations, destination weddings, event coordination, premium event design',
    ogTitle: 'The Alka Events | Creating Unforgettable Experiences',
    ogDescription: 'Elevated event planning for weddings, corporate galas, and private celebrations crafted with quiet luxury, timeless style, and flawless execution.',
    ogImage: ''
  },
  about: {
    smallLabel: 'The Alka Philosophy',
    heading: 'An Aura of Excellence',
    introOne: 'At Alka Events, luxury is defined by precision, subtlety, and the confidence of a refined experience. We design events that feel effortless while every detail is curated to perfection.',
    introTwo: 'Every celebration is shaped around your story and illuminated through intentional design, seamless service, and captivating atmosphere.',
    approachLabel: 'Our Approach',
    approachHeading: 'A thoughtful process for effortless luxury.',
    approachDescription: 'We combine editorial design, meticulous planning, and discreet coordination so each moment feels purposeful, polished, and profoundly memorable. With 12+ years of industry expertise, we have orchestrated over 100 bespoke events across diverse venues and occasions. Our 24/7 concierge support ensures seamless execution from conception through the final toast.\n\nEvery element is curated with precision: from vendor partnerships and spatial design to guest experience flow and contingency planning. We operate with the confidence of refined expertise, understanding that true luxury lies in the details no one notices because everything simply works.',
    metrics: [
      { value: 12, suffix: '+', label: 'Years of craft', description: 'Editorial precision meets creative vision. Our team masters the art of translating abstract dreams into tangible, breathtaking realities.' },
      { value: 100, suffix: '+', label: 'Events curated', description: 'From intimate gatherings to grand productions. Each celebration is uniquely designed—no two events are ever the same.' },
      { value: 24, suffix: '/7', label: 'Guest support', description: 'We don\'t just plan events; we architect experiences where every guest feels cherished, anticipated, and profoundly valued.' }
    ],
    process: [
      { step: 'Consult', detail: 'We listen, explore possibilities, and understand your vision down to the smallest detail.' },
      { step: 'Curate', detail: 'We select partners, materials, and moments that reflect your distinct style.' },
      { step: 'Deliver', detail: 'We manage every touchpoint with care so your event unfolds exactly as imagined.' }
    ],
    mission: {
      label: 'Our Mission',
      heading: 'Elevating moments through intentional design.',
      description: 'To create transformative experiences that celebrate life\'s most important moments with editorial elegance, meticulous execution, and a profound respect for your vision. We are committed to setting the standard for luxury event planning—where sophistication meets seamless service, and every detail reflects your unique story.'
    },
    vision: {
      label: 'Our Vision',
      heading: 'The global benchmark for refined events.',
      description: 'To be the most sought-after event planning partner for clients who value quiet luxury, flawless execution, and experiences that transcend the ordinary. We envision a world where luxury events are defined not by extravagance, but by the quiet confidence of impeccable design, genuine care, and moments that linger in memory forever.'
    }
  },
  services: {
    label: 'Our Services',
    heading: 'Bespoke services for every luxury occasion.',
    items: [
      { title: 'Wedding Planning', description: 'Timeless ceremonies crafted with editorial precision and premium event experiences.' },
      { title: 'Corporate Events', description: 'Executive launches, conferences, and brand activations with flawless execution.' },
      { title: 'Parties', description: 'Private celebrations designed to feel intimate, luxurious, and unforgettable.' },
      { title: 'Concerts', description: 'High-production live performances with world-class staging and hospitality.' },
      { title: 'Decoration', description: 'Spatial design and floral artistry that elevates every venue with elegant restraint.' },
      { title: 'Artist Management', description: 'Talent coordination and artist relations for premium curated programs.' }
    ]
  },
  pricing: {
    label: 'Investment Tiers',
    heading: 'Packages designed for events that demand perfection.',
    tiers: [
      {
        title: 'Essential',
        price: '$15,000',
        label: 'Starting at',
        features: ['Concept development', 'Basic venue styling', 'Vendor coordination'],
        cta: 'Inquire',
        highlighted: false
      },
      {
        title: 'Exquisite',
        price: '$45,000',
        label: 'Starting at',
        features: ['A-Z planning & execution', 'Custom floral & lighting', 'Guest management'],
        cta: 'Secure Your Date',
        highlighted: true
      },
      {
        title: 'Imperial',
        price: 'Custom',
        label: 'Contact Us',
        features: ['Multi-day destination planning', 'Private jet logistics', '24/7 concierge'],
        cta: 'Consultation',
        highlighted: false
      }
    ]
  },
  portfolio: {
    headerLabel: 'Our Portfolio',
    headerHeading: 'A curated selection of unforgettable events.',
    headerDescription: 'Discover elegant weddings, refined corporate experiences, and intimate private celebrations captured in every detail.',
    slides: [
      {
        slug: 'grand-crystal-wedding',
        title: 'Grand Crystal Wedding',
        category: 'Weddings',
        description: 'A luminous celebration of romance in an elevated crystal ballroom.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqeEIx9IlSoh2W96O8DMETiDL0o6Lz9yrHySQlI__FCiLRd2RF4yIVma7zt-A5SVw5T_dnVh0HIspT6UF0ov8ucepNRc5VGlQsxE2Xau2JjDGWBhjd1av-JIXHEqmFR8XKJbDB104ks4KinQKFqa5mPgCKOUEGbPIPS2t8D4jtjMmrOBo6uaYf8O2gCLaAULKMC_5Cnp4gtn80yV6LbBriFtg8qFOzmx0KHa_rxhyLf_wCt4b-SpYy4qvvLWAAXzNSrB3vN4bO_Rw'
      },
      {
        slug: 'elite-nightlife-gala',
        title: 'Elite Nightlife Gala',
        category: 'Private',
        description: 'An immersive after-dark experience with chic ambience and unforgettable energy.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnrXhG7sWFSFH05A9rqX9de1JDaFDQAYaJELah62Zq_H5puter_mZZ-vgUnrbDG9guk82FI7B9co54GhOJgpHBzj23pp9AlTvzkKNA3Gyt7vFrtF1E_Hka1hw2oKc3-puFS8hQsvLjrEMwJlFqihXb72brQH7M46U3_NnKOzhsFPGWZcxxwo6SB_ZXMV7hkS2LhK90qRyu5wHnxEirS-6_Uu6TDoeR_m1kZyeHQuGl-bG55ir6Ljyn0WmyEQz8TWEv6mYloa0_w-w'
      },
      {
        slug: 'tech-summit-gala',
        title: 'Tech Summit Gala',
        category: 'Corporate',
        description: 'A high-impact programming event with strategic production and a premium guest experience.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLIE0LcJfWuXiRuZJkFL9hH_blw2erYZ9y8HiA7AZReQSpuecKDWfu2UqAxADLjvPAKUJ8lWry1A14RTpaLm9CN8J9YOLlHUBthf8qWcFr3he-nNjEdHtYSRBvgTTgO3P6bXvZm8zP0I_3yrft-ms9WolCWSpU74leyRrTXbEeZ0MMkHDn3U1tYin4TYHBtUyuz8qgmeMlT7ZGjQ3eHsJ_8oAyjtFw8A6hRgEoEIk4dsa9SeFmbqn6cIJyr6tLKhMmUAr4oou6B0'
      },
      {
        slug: 'historic-estate-garden-party',
        title: 'Historic Estate Garden Party',
        category: 'Weddings',
        description: 'A timeless outdoor celebration among elegant gardens and refined details.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxSrRp68thJwBWQMXvngki2NrjpiSpQvlnT_HU8S7XBa-Nap9-nKzY4bd6ICM16QlDCa4b-kylSKVMjGLyayMkL0kSzaMX4QiXEz_wI36aIrH_m_-1yPA0wJ327i9ODuFE9I-mKgGhfqcnnya1ezcd0pBxbFOKKXZZtuSgyS3VOX0MRGRfoATHw-q3LfNF9h4LGWet5hWfnrWj3EsDHXD0Wm5yoyI_sHiX8TiRc4wCJufdf2Qf9Vtc_vOE2F73-D2TnsJUfgqPgoA'
      }
    ]
  },
  testimonials: {
    label: 'Testimonials',
    heading: 'What our clients say.',
    panelHeading: 'A premium feedback experience.',
    items: [
      {
        quote: 'The attention to detail was beyond anything we imagined. Alka transformed our vision into a masterpiece of elegance and grace.',
        author: 'H.R.H. Prince Julian',
        role: 'Royal Wedding Client'
      },
      {
        quote: 'Every moment felt perfectly placed. The team delivered a flawless, premium experience from concept to execution.',
        author: 'Maya Patel',
        role: 'Private Celebration'
      },
      {
        quote: 'A highly attentive and intelligent approach to event planning. Our corporate gala was both bold and impeccably refined.',
        author: 'Aaron Lee',
        role: 'Marketing Director'
      },
      {
        quote: 'Working with Alka was transformative. They didn\'t just plan our wedding—they composed a symphony of moments that felt effortlessly perfect.',
        author: 'Sophia & James Mitchell',
        role: 'Wedding Clients'
      },
      {
        quote: 'The team\'s discretion and professionalism were exceptional. They managed every detail with such refinement that nothing ever felt chaotic.',
        author: 'Victoria Hemsworth',
        role: 'Corporate Event Director'
      },
      {
        quote: 'Our anniversary celebration was intimate, luxurious, and deeply personal. Alka understood our vision without needing to ask.',
        author: 'David & Margaret Chen',
        role: 'Private Celebration Clients'
      },
      {
        quote: 'The production quality of our product launch was world-class. Alka\'s team handled 500+ guests with elegance and precision.',
        author: 'Rajesh Kumar',
        role: 'Startup Founder'
      },
      {
        quote: 'We received compliments for weeks. Every guest commented on how seamlessly everything flowed. That\'s the Alka difference.',
        author: 'Isabella Rodriguez',
        role: 'Private Gala Host'
      },
      {
        quote: 'Exceptional service from start to finish. They anticipated needs before we even expressed them. Truly five-star professionalism.',
        author: 'Christopher Walsh',
        role: 'Wedding Client'
      },
      {
        quote: 'The attention to ambient design, lighting, and spatial flow transformed our venue into something we didn\'t know was possible.',
        author: 'Ananya Gupta',
        role: 'Private Event Organizer'
      },
      {
        quote: 'Alka doesn\'t just execute events—they architect experiences. Our corporate gala was a strategic masterpiece.',
        author: 'Thomas Bennett',
        role: 'Fortune 500 Executive'
      },
      {
        quote: 'The level of cultural sensitivity and attention to tradition alongside contemporary elegance was remarkable. A truly refined partnership.',
        author: 'Priya & Arjun Sharma',
        role: 'Destination Wedding Clients'
      },
      {
        quote: 'From vendor coordination to guest experience management, every system worked flawlessly. That\'s the mark of true expertise.',
        author: 'Alexandra Frost',
        role: 'Event Planner'
      },
      {
        quote: 'Our charity gala raised record donations—but more importantly, guests felt genuinely moved. Alka crafted the perfect emotional arc.',
        author: 'Margaret & Richard Ashton',
        role: 'Philanthropic Gala Hosts'
      },
      {
        quote: 'In a world of standard event planning, Alka stands in a category of their own. Truly understands quiet luxury.',
        author: 'Natasha Volkov',
        role: 'International Client'
      }
    ]
  },
  contact: {
    smallLabel: "Let's Create Together",
    heading: 'Start planning your next unforgettable event.',
    description: 'Share your vision and we\'ll bring it to life with a refined design, thoughtful logistics, and premium execution.',
    email: 'alka.yadav37@gmail.com',
    phone: '+91 9855373712',
    locations: 'All Over India',
    offices: [
      {
        label: 'Paris Office',
        address: '124 Avenue des Champs-Élysées\n75008 Paris, France'
      },
      {
        label: 'New York Studio',
        address: '5th Avenue at 59th St\nNew York, NY 10022, USA'
      }
    ]
  },
  footer: {
    brand: 'The Alka Events',
    description: 'Quiet luxury for clients who value elevated experiences and flawless detail.',
    quickLinks: [
      { label: 'Our Portfolio', to: '/portfolio' },
      { label: 'The Philosophy', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Bookings', to: '/contact' }
    ],
    servicesLinks: [
      { label: 'Weddings', to: '/services' },
      { label: 'Corporate', to: '/services' },
      { label: 'Gala Events', to: '/services' },
      { label: 'Private Gala Events', to: '/services' }
    ],
    contactEmail: 'alka.yadav37@gmail.com',
    contactPhone: '+91 9855373712',
    instagram: 'https://www.instagram.com/alka.yadav37/',
    facebook: 'https://www.facebook.com/profile.php?id=61590540202496',
    copyright: '© 2026 Alka Events. All rights reserved.'
  },
  navbar: {
    items: [
      { label: 'About', to: '/about' },
      { label: 'Home', to: '/' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' }
    ]
  }
};

export default defaultContent;
