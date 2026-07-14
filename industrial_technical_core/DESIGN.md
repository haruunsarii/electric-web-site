---
name: Industrial Technical Core
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a professional B2B and high-end B2C electrical equipment environment. It prioritizes clarity, reliability, and technical precision. The visual narrative is rooted in a **Corporate/Modern** style with subtle **Minimalist** influences to ensure high-density information remains legible and actionable.

The target audience consists of engineers, contractors, and industrial procurement officers who value efficiency over ornamentation. The emotional response should be one of "total reliability"—the digital equivalent of a well-organized, high-spec electrical panel. Every element is designed to feel structured, deliberate, and high-tech.

## Colors

The palette is derived from industrial environments. 
- **Primary (Industrial Blue):** A deep, authoritative navy used for headers, navigation, and primary brand surfaces. It evokes trust and corporate stability.
- **Secondary (Safety Orange):** Reserved strictly for high-priority calls to action, alerts, and critical technical highlights. It provides an immediate visual signal for "action" or "importance."
- **Tertiary (Slate Grey):** Used for technical specifications, secondary UI elements, and supporting information.
- **Neutral:** A clean, slightly cool white and light grey system to maintain a "clean room" aesthetic, ensuring product photography and technical diagrams remain the focal point.

## Typography

The typography strategy focuses on maximum legibility for complex data. **Inter** is the primary typeface for its exceptional clarity and professional tone. 

For technical specifications, SKU numbers, and electrical values (Voltage, Wattage, etc.), **JetBrains Mono** is introduced. This monospaced font provides a "high-tech" feel and ensures that numerical data aligns perfectly, aiding quick comparison of equipment specs. Use uppercase for button labels to reinforce the industrial, assertive brand voice.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop (1280px max-width) and a **fluid 4-column grid** for mobile. 

The spacing rhythm is strictly based on a **4px baseline**, ensuring a mathematical and precise feel. Large sections should be separated by `lg` (40px) or `xl` (64px) spacing to prevent the interface from feeling cluttered, which is a common risk in industrial catalogs. Technical data tables should use compact `xs` (8px) padding to allow for high information density without sacrificing readability.

## Elevation & Depth

Elevation is handled through **Low-Contrast Outlines** and **Ambient Shadows**. 

- **Surface Level (0dp):** The main background (`#F8FAFC`).
- **Card Level (1dp):** White surfaces with a 1px border in `#E2E8F0`. 
- **Hover/Active State (2dp):** A soft, diffused shadow (0px 4px 12px rgba(15, 23, 42, 0.08)) to indicate interactivity.

Avoid heavy dropshadows. The goal is to simulate a flat, precision-machined surface where depth is indicated by subtle layering and crisp borders rather than physical height.

## Shapes

The shape language is **Soft (Level 1)**. Elements use a 4px (0.25rem) corner radius. This choice balances the "hard" nature of industrial equipment with the "modern" approach of a digital tool. It feels professional and engineering-focused without being aggressively sharp. Buttons, input fields, and product cards follow this 4px standard to maintain a consistent structural rhythm.

## Components

### Buttons
- **Primary ('Kurumsal'):** Industrial Blue background, white text. Solid, dependable.
- **Action ('Kategoriler'):** Ghost style (Industrial Blue border, transparent background). Used for navigation-heavy tasks.
- **Catalog ('Katalog'):** Industrial Blue background with a PDF/Download icon. 
- **Call-to-Action ('İletişim'):** Safety Orange background, white text. Used for lead generation and urgent contact.
- *Styling:* 4px radius, uppercase Inter 600, 12px vertical padding.

### Input Fields
- White background, 1px `#CBD5E1` border.
- On focus, the border changes to Industrial Blue with a 2px outer "glow" in a lighter blue tint.
- Labels use `body-sm` in Slate Grey.

### Product Cards
- White background, 1px border. 
- Image area is light grey `#F1F5F9`.
- Technical specs are listed at the bottom using `label-technical` (JetBrains Mono).

### Chips/Status
- Used for "In Stock", "New", or "Technical Grade".
- Rounded-sm (2px), lowercase, bold monospace text.