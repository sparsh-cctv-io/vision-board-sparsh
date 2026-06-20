---
name: Aura of Excellence
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#0a0a0a'
  on-primary-container: '#7b7979'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#e2c466'
  on-tertiary: '#3c2f00'
  tertiary-container: '#0f0a00'
  on-tertiary-container: '#907721'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffe082'
  tertiary-fixed-dim: '#e2c466'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#564500'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  section-padding: 120px
---

## Brand & Style

This design system is engineered for the high-end luxury event sector, targeting a clientele that demands exclusivity, precision, and timeless elegance. The brand personality is "Quiet Luxury"—it does not shout; it resonates through impeccable detail and intentional negative space.

The visual style is **Minimalist / High-Contrast**, blending the editorial authority of traditional fashion journals with the sleek, frictionless experience of modern digital interfaces. The UI should evoke a sense of calm confidence, utilizing generous whitespace to allow high-quality event photography to serve as the primary emotional driver. The aesthetic relies on the interplay between deep matte surfaces and shimmering metallic accents to create a virtual "Black Tie" environment.

## Colors

The palette is anchored in a **Deep Matte Black**, which serves as the canvas for the entire experience. This choice establishes an immediate sense of prestige and nocturnal sophistication.

- **Primary (Deep Matte Black):** Used for all major backgrounds to create a boundless, cinematic feel.
- **Accents (Metallic & Champagne Gold):** These are used sparingly for critical interactive elements, borders, and highlighting premium details. The Champagne Gold is reserved for hover states and subtle gradients to simulate light hitting metal.
- **Neutrals (Pure White & Soft Gray):** White is used exclusively for high-readability typography. Soft Gray is utilized for secondary information and subtle dividers to maintain a soft contrast against the black background.

## Typography

Typography is the cornerstone of the luxury narrative in this design system. We utilize a high-contrast pairing of **Playfair Display** and **Inter**.

- **Playfair Display:** Used for all headings and display text. Its sharp serifs and varying stroke weights provide a classic editorial feel. Letter spacing should be tightened slightly for larger displays to maintain a cohesive visual block.
- **Inter:** Chosen for its utilitarian precision and high legibility. It acts as a neutral companion to the expressive serif, ensuring that functional information (dates, prices, descriptions) is consumed without friction. 
- **Styling Note:** Use uppercase styling with generous letter spacing (0.1em) for labels and navigation items to evoke the feeling of high-fashion branding.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy on desktop to ensure a curated, "gallery-style" presentation of content. The layout is centered with significant outer margins to focus the user’s eye on the core narrative.

- **Desktop (1440px):** 12-column grid with 24px gutters. Use wide 80px side margins to frame the content.
- **Mobile:** Single column with 20px margins. Section spacing should be reduced, but whitespace remains high to avoid clutter.
- **Rhythm:** We follow an 8px base grid. However, for vertical section spacing, we use exaggerated values (120px+) to ensure each event or service feels like its own distinct chapter.

## Elevation & Depth

To maintain the "Minimalist but Rich" aesthetic, depth is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Levels:** The base layer is #0A0A0A. Surfaces that sit above the base (like cards or modals) should use a slightly lifted shade (#141414) or a 1px border in Metallic Gold at 20% opacity.
- **Hover States:** Interaction is signaled by "activating" borders. A card might transition from a transparent border to a crisp 1px #D4AF37 (Metallic Gold) border on hover.
- **Overlays:** When text appears over imagery, use a 40-60% black linear gradient (from bottom to top) to ensure legibility while maintaining the dark aesthetic.

## Shapes

The shape language for this design system is **Sharp (0px)**. 

Luxury is often defined by precision and architectural structure. By using sharp corners for buttons, input fields, and image containers, we create a sense of formality and high-end craftsmanship. This geometric rigidity contrasts beautifully with the organic curves of the serif typography and the fluid movement of event photography.

## Components

### Buttons
- **Primary:** Solid Metallic Gold (#D4AF37) background with Deep Matte Black text. No border. Sharp corners.
- **Secondary:** Transparent background with a 1px Metallic Gold border. On hover, the background fills with Metallic Gold and text flips to Black.
- **Text Link:** Uppercase Inter with 0.1em letter spacing and a 1px gold underline that expands from the center on hover.

### Cards
- **Event Card:** Image-heavy with a sharp 0px radius. The title uses Playfair Display. On hover, a subtle 1px Champagne Gold border appears, and the image scales slightly (1.05x) within its container.

### Navigation
- **Header:** Transparent at the top of the page. On scroll, it transitions to a solid Deep Matte Black with a thin Gold hair-line divider at the bottom.
- **Menu Items:** Pure White, transitioning to Metallic Gold on hover.

### Input Fields
- **Fields:** Bottom-border only (1px Soft Gray). When focused, the border transitions to Metallic Gold. Labels are floating and use the small uppercase Inter style.

### Lists
- **Service Lists:** Use a Gold "dot" or a thin horizontal Gold line as a bullet point to maintain the high-end aesthetic.