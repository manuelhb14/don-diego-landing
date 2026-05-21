---
name: "Don Diego Club Residencial"
description: "A modern, complete, smart brand system for a San Miguel residential ecosystem."
colors:
  ink: "#222222"
  deep-ink: "#1C1713"
  night: "#111111"
  charcoal: "#2A2826"
  cream: "#FFF3E1"
  page-cream: "#FFF8ED"
  paper: "#FFF9F2"
  sand: "#EDE5DA"
  soft-sand: "#F6F0E8"
  clay: "#AA7D69"
  terracotta: "#E1B19B"
  adobe: "#B76D4B"
  blush: "#DEBEBF"
  sage: "#D7D7AA"
  sky: "#C8D7E6"
  water: "#5A7A8A"
  olive: "#5A6B52"
  sms-blue: "#78AEB8"
typography:
  display:
    fontFamily: "Louize, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Louize, Georgia, serif"
    fontSize: "clamp(2.75rem, 5.6vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0"
  title:
    fontFamily: "Louize, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0"
  body:
    fontFamily: "Apercu Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Apercu Pro, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  sm: "2px"
  md: "6px"
  lg: "10px"
  xl: "14px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-sm: "56px"
  section-lg: "96px"
  page-x-mobile: "24px"
  page-x-tablet: "40px"
  page-x-desktop: "64px"
components:
  button-primary:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
  button-primary-hover:
    backgroundColor: "#956955"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  field-underline:
    backgroundColor: "transparent"
    textColor: "{colors.deep-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  image-panel:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0"
  editorial-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: Don Diego Club Residencial

## 1. Overview

**Creative North Star: "The Intelligent Hacienda Ecosystem"**

Don Diego is not a generic residential launch. The interface should feel like a complete place with its own operating logic: land, water, agriculture, architecture, hospitality, ownership, and service all working as one ecosystem. The system is modern, complete, and smart, but it should stay warm enough to feel rooted in San Miguel rather than like a corporate investment deck.

The visual language is image-led, typographic, and deliberately paced. Pages use warm architectural neutrals, clay accents, large Louize display type, Apercu Pro labels, editorial spacing, and real project imagery. Surfaces should feel considered and site-specific, not templated.

This system explicitly rejects common, boring pages for new real-estate projects: vague render heroes, interchangeable amenity grids, hollow luxury language, beige brochure sameness, and repetitive sections that could belong to any residential development.

**Key Characteristics:**
- Image-first storytelling with real project, landscape, architectural, and lifestyle assets.
- Warm cream and clay foundations, with blush, sage, sky, and water accents mapped to project components.
- Square or near-square editorial surfaces, thin borders, and ambient shadows.
- Large serif display moments balanced by precise, uppercase sans labels.
- Service-like product surfaces that feel quiet, useful, and still unmistakably Don Diego.

## 2. Colors

The palette is a warm San Miguel material system: cream plaster, clay, adobe, muted botanicals, water, and evening ink.

### Primary
- **Don Diego Clay** (`#AA7D69`): Primary brand accent for CTAs, labels, section emphasis, form focus states, social buttons, and key active states.
- **Adobe Terracotta** (`#E1B19B`): Softer warm highlight used in selection states, gradients, botanical overlays, and quiet emphasis.
- **Residencial Adobe** (`#B76D4B`): Stronger component accent for Club Residencial, property accents, numbers, and warm active markers.

### Secondary
- **Farm Blush** (`#DEBEBF`): Organic Farm and floral component accent. Use as a muted, warm-pink support color, not as decorative sweetness.
- **Wellness Sage** (`#D7D7AA`): Wellness and landscape support color. Use for calm health and nature signals.
- **Cantera Sky** (`#C8D7E6`): Presa, water, map, and atmospheric component accent. Use where the design needs air or distance.
- **Water Blue** (`#5A7A8A`): Deepened water/system blue for maps, SMS/contact utilities, and cooler contrast moments.

### Neutral
- **Estate Ink** (`#222222`): Default text and dark graphic color.
- **Deep Interior Ink** (`#1C1713`): Richer contact/form text on warm paper panels.
- **Night Field** (`#111111`): Footer, dark hero overlays, and immersive image sections.
- **Hacienda Cream** (`#FFF3E1`): Global warm cream, hero title color, and text on dark imagery.
- **Page Cream** (`#FFF8ED`): Main page background for editorial sections.
- **Paper Warmth** (`#FFF9F2`): Form panels, overlays, and high-contrast warm surfaces.
- **Adobe Sand** (`#EDE5DA`): Video and map-section background, neutral image support.
- **Soft Sand** (`#F6F0E8`): Banner and transition sections.

### Named Rules

**The Place-First Color Rule.** Color should signal project reality first: clay for architecture and action, blush for farm and flowers, sage for wellness and landscape, sky for water and Presa.

**The Warm Neutral Rule.** Avoid pure white and pure black for brand surfaces. Use `#FFF8ED`, `#FFF3E1`, `#FFF9F2`, `#222222`, `#1C1713`, or image-derived overlays.

**The Accent Discipline Rule.** The four component colors are meaningful. Do not scatter them randomly across decorative cards or icons.

## 3. Typography

**Display Font:** Louize, with Georgia and serif fallback  
**Body Font:** Apercu Pro, with system-ui and sans-serif fallback  
**Label/Mono Font:** Apercu Pro, no mono default

**Character:** Louize gives Don Diego its residential, editorial, and place-sensitive voice. Apercu Pro keeps navigation, labels, forms, and product-like tools precise and contemporary. The pairing should feel warm and intelligent, never default SaaS.

### Hierarchy

- **Display** (400, fluid 3rem to 6rem, line-height 1): Major section titles such as "El Proyecto", location headlines, gallery titles, and large brand moments.
- **Headline** (400, fluid 2.75rem to 5.5rem, line-height 0.95): Hero-adjacent editorial headlines and landing-page section introductions.
- **Title** (400, fluid 1.75rem to 2.75rem, line-height 1.05): Component titles, card titles, form success messages, and compact content blocks.
- **Body** (500, `1rem`, line-height `1.75`): Descriptive copy, contact text, service descriptions, FAQ content, and product-like tool text. Keep long copy around 65-75ch.
- **Label** (700, `10px`, tracking `0.14em` to `0.32em`, uppercase): Kicker labels, nav labels, status text, form labels, carousel counters, and tiny utility copy.

### Named Rules

**The Serif Carries Place Rule.** Use Louize for narrative weight, place, and emotional pacing. Do not replace it with a generic display serif.

**The Label Restraint Rule.** Uppercase tracked labels are part of the system, but repeated labels above every section become scaffolding. Use them where they orient the visitor.

**The No Mono Costume Rule.** Do not use monospace as a shortcut for "smart" or "technical." Product-like tools stay in Apercu Pro unless there is a functional reason otherwise.

## 4. Elevation

The system uses a hybrid of tonal layering, thin borders, image contrast, and soft ambient shadows. Surfaces are not heavy cards by default. Shadows should feel like natural light on paper, image panels, and form modules, not floating SaaS panels.

### Shadow Vocabulary

- **Editorial Image Lift** (`0 24px 48px rgba(47,39,33,0.1)`): Default large image panel and residential content shadow.
- **Clay Form Glow** (`0 22px 65px rgba(170,125,105,0.16)`): Contact and form panels on warm backgrounds.
- **Map/Image Float** (`0 15px 40px -12px rgba(0,0,0,0.12)`): Small inset videos, map details, and layered image fragments.
- **Deep Feature Lift** (`0 30px 60px rgba(26,25,23,0.18)`): Dark or high-emphasis feature surfaces.
- **Video Ambient** (`0 24px 60px -22px rgba(36,24,18,0.35)`): Embedded video and media frames.
- **Glass Control Edge** (`inset 0 1px 0 rgba(255,255,255,0.16)`): Carousel arrow controls on imagery.

### Named Rules

**The Flat-First Rule.** Use borders, cropping, typography, and color before adding elevation. Shadows are for important media and form surfaces.

**The No Decorative Glass Rule.** Backdrop blur is acceptable for functional overlays and image controls. It is not a default card material.

## 5. Components

### Buttons

Buttons are compact, typographic, and rectangular unless their shape is inherently icon-only.

- **Shape:** Brand CTAs are usually square (`0px`) or subtly squared (`2px`). Icon buttons may be square or circular when the affordance requires it.
- **Primary:** Clay background (`#AA7D69`) with warm paper text (`#FFF9F2`), 16px vertical padding, uppercase Apercu Pro at 11px, tracking around `0.2em`.
- **Hover / Focus:** Shift to deeper clay (`#956955`) or invert against the current surface. Use `transition-colors duration-300`; use visible focus outlines for icon/image controls.
- **Secondary / Ghost:** Use thin borders and transparent fills. On hero/nav surfaces, use white or black at controlled opacity and a subtle hover fill.

### Chips

Status and component chips are small, useful signals, not decorative badges.

- **Style:** 8-11px uppercase Apercu Pro labels with tracking around `0.16em`, paired with a small color dot.
- **State:** Active project dots may pulse and glow. Pending dots use reduced opacity or an inset ring.
- **Color:** Use the component accent directly: `#E1B19B`, `#DEBEBF`, `#D7D7AA`, or `#C8D7E6`.

### Cards / Containers

Containers should feel editorial and architectural, not like a generic card grid.

- **Corner Style:** Use `rounded-sm` (`2px`) for brand media and panels. Reserve large radii and pills for product-like widgets, chat, and mobile controls.
- **Background:** Prefer `#FFF8ED`, `#FFF9F2`, `#EDE5DA`, or dark image overlays. Do not default to white cards.
- **Shadow Strategy:** Use the Elevation vocabulary only when the surface needs hierarchy. Flat bordered grids are often better.
- **Border:** Thin warm borders such as `#AA7D69` at 10-30% opacity, or `#222222` at 8-18% opacity.
- **Internal Padding:** Brand panels typically use 24px on mobile, 40-64px on desktop sections.

### Inputs / Fields

Forms are quiet, underlined, and service-oriented.

- **Style:** Transparent background, bottom border in clay at low opacity, deep ink text, and Apercu Pro labels.
- **Focus:** Border shifts to solid clay (`#AA7D69`). Avoid bulky focus fills. Keep browser-visible focus affordances intact when possible.
- **Error / Disabled:** Error text uses red with restrained opacity. Disabled fields lower opacity without changing layout.

### Navigation

Navigation is overlay-first and typographic.

- **Desktop:** Fixed transparent nav, uppercase Apercu Pro at 11-13px, tracking `0.18em`, thin active underline around 32px, and blend-aware white or black states.
- **Dropdowns:** Warm white panels (`bg-white/90`) with thin black borders, 2px radius, backdrop blur used only for the menu surface.
- **Mobile:** Hamburger uses three 1px lines and a full-screen menu pattern. Maintain the same typographic restraint.
- **Locale / Chat / Contact:** Treat as utility actions with outline or transparent fills, not as oversized CTAs.

### Environment Carousel

The carousel is a signature content component for the four project environments.

- **Frame:** Full-bleed inside its grid cell, background `#EFE2D0`, no decorative card chrome.
- **Controls:** Square 32-36px arrow buttons over imagery, white border, dark translucent fill, inset highlight, and hover inversion.
- **Counter:** 10px bold uppercase Apercu Pro over a dark gradient at the bottom.
- **Dots:** 8px square markers. The selected marker takes the current environment accent.

### Hero / Imagery

Imagery is the core brand carrier.

- **Hero:** Use real Don Diego render or botanical scene assets with warm cream typography and dark vignettes where needed for legibility.
- **Gallery / Manifesto:** Use asymmetrical image placement, scroll-linked motion, and object cropping to make the place feel lived in.
- **Alt Text:** Describe the specific place, component, or experience. Avoid generic "image" or "render" labels when better context exists.

## 6. Homepage Lessons To Apply Everywhere

The homepage polish established the working rules for the rest of the site. Apply these before inventing new section-specific behavior.

### Section Typography

- **Major section titles:** Use Louize at `clamp(3rem, 6vw, 6rem)` with `line-height: 1` or slightly tighter. This is now the standard for primary brand sections such as Vision, Services, Things To Do, App, Team, Contact, and FAQ.
- **Compact titles:** Use smaller type only for compact sections or constrained footer panels. The footer newsletter heading should stay around `clamp(1.65rem, 2.5vw, 2.85rem)`, not full section-title scale.
- **Kickers:** Remove brackets and parentheses from section kickers. Use `text-xs`, uppercase, `tracking-[0.3em]`, and solid clay (`#AA7D69`) on light backgrounds. On dark sections use terracotta or cream with enough opacity, not washed-out `/40` labels.
- **Accent words:** Highlight one meaningful phrase in clay, not the whole title. Prefer localized `titleLead` / `titleAccent` keys when a title needs an emphasized fragment.
- **Body text:** Keep section intros in a consistent rhythm: `text-base md:text-xl`, medium weight, relaxed leading, and max width around `820px`. Smaller panels and cards can use tighter body sizes.

### Layout And Surfaces

- **Containers:** Keep page sections on the same maximum width family: `max-w-[1400px]` or `max-w-[1440px]`, with `px-6 md:px-10 lg:px-14/16`.
- **Cards:** Use cards only when the content is truly a repeated item, form, assistant block, or product surface. Avoid cards inside cards and avoid decorative section wrappers.
- **Team card pattern:** The Team section is the clean reference for repeated editorial cards: flat grid, thin borders, white/cream panels, subtle hover color, and no decorative chrome.
- **White/cream cards:** Team and Instagram-style cards should remain white/cream. Do not push them into clay squares or heavy tinted blocks.
- **Decorative effects:** Remove decorative radial blobs, gradient orbs, and default glass effects unless they are a functional overlay. They made Contact, FAQ, App, and forms feel generic.
- **Mobile imagery:** Mobile image panels should not become too tall. Use stable aspect ratios such as `16/9` for manifesto stacks and `16/10` for carousel cards.
- **Compact informational sections:** Sections like residential sustainability should not carry hero-level vertical space. Keep them tighter: `py-12 md:py-16 lg:py-18`, body copy around `text-base md:text-lg`, list gaps around `gap-3`, CTA margin around `mt-6`, and supporting media no taller than the copy needs, often `lg:aspect-[16/10]`.
- **Dark endings:** Footer and FAQ should feel warm and intentional, not default black. Use warm darks such as `#15120F` or `#2A2826`, cream text, and restrained borders.

### Motion System

- **Team is the canonical reveal model.** The sections that felt best did not gate their animations behind `useHasVisited`. Use reduced-motion checks, but do not skip reveals just because the user has visited another section or page.
- **Default section reveal:** `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, duration around `0.8s`, ease-out cubic `[0.215, 0.61, 0.355, 1]`.
- **Repeated item reveal:** For grids like Team cards, animate each item individually: `y: 32`, duration `0.7s`, stagger `i * 0.08`. This feels more natural than moving a whole large block at once.
- **Supporting reveals:** Paragraphs, CTAs, and secondary blocks should use small delays, usually `0.16s` or `0.2s`. Avoid stacked delays that make sections feel slow or disconnected.
- **Accordions:** Use `gridTemplateRows` for FAQ expansion/collapse, not `height: auto`. Keep it around `0.32s` with an ease-in-out curve.
- **Scroll-linked motion:** Use sparingly. If a carousel image has parallax, keep it subtle, around `0%` to `-7%`. Anything stronger starts competing with section reveal motion.
- **Product demos:** App demo micro-animations can remain functional, but the outer section and card entrances must follow the same reveal language as Team, Contact, and FAQ.
- **Reduced motion:** Every reveal, pulse, scroll animation, parallax, accordion, and looping effect needs a reduced-motion path. Reduced motion disables motion; it should not be confused with `hasVisited`.

### Carousel Rules

- **Normalized carousel cards:** Use stable image ratios (`16/10` for activity cards), predictable widths (`280px`, `340px`, `460px`), and consistent gaps.
- **Controls:** Use compact image-centered controls. Arrows should be visually centered against the image area, not the whole section.
- **End CTA:** The final carousel CTA should be compact, centered in the same image-height slot, and use `Ver más` / `View more`. Keep the arrow, but make it small and intentional.
- **Progress:** Use a thin clay progress indicator, not a heavy bar.
- **Frames:** On mobile, avoid unnecessary outer frames around carousels or service grids when they make the component feel boxed in.

### Contact, FAQ, And Footer

- **Contact:** Keep it practical and service-like: light warm background, clear title, visible form, no decorative orbs. Preserve recognizable SMS and WhatsApp colors.
- **FAQ:** Keep the dark surface, normalize title/kicker scale, use calm accordion motion, and keep the assistant block as a clean warm paper panel.
- **Footer:** Treat it as a final brand moment. Use warm dark background, compact newsletter type, cleaner link rhythm, and no `mix-blend-difference`.

### Copy And Localization

- **No scaffolding labels:** Remove bracketed and parenthesized section labels from public copy. Avoid labels like "Hipotético" on live brand surfaces.
- **CTA language:** Prefer clear visitor actions: `Ver más`, `Ver Instagram`, `Enviar correo`, `Abrir asistente virtual`.
- **Bilingual parity:** When structure changes for Spanish, update English the same way. Use parallel keys for split titles and accent phrases.
- **No hollow luxury language:** Copy should point to the actual project, land, components, services, San Miguel, and ownership experience.

### Workflow Rule

- For broad page polishing, work component by component. Show the intended visual change first, get approval, apply it, then verify. Small corrections can be applied directly when they are scoped to an already-approved direction.

## 7. Do's and Don'ts

### Do:

- **Do** make every page carry signals of Don Diego, San Miguel, the land, water, agriculture, architecture, and the four-component ecosystem.
- **Do** use Louize for narrative and Apercu Pro for structure, labels, forms, nav, and product-like tools.
- **Do** use `#AA7D69` as the primary action/focus color and `#FFF8ED`, `#FFF3E1`, or `#FFF9F2` as warm surface colors.
- **Do** ground wellness, sustainability, community, and San Miguel in concrete details: imagery, services, maps, architecture, activities, and copy.
- **Do** preserve `prefers-reduced-motion` support for scroll-linked and animated experiences.
- **Do** use thin borders, image rhythm, and measured shadows before adding more card chrome.

### Don't:

- **Don't** make Don Diego look like a common, boring page for a new real-estate project.
- **Don't** use generic luxury-development templates: oversized render heroes with vague slogans, interchangeable amenity card grids, beige brochure layouts, stock-like lifestyle imagery, hollow exclusivity language, fake minimalism, or repetitive section structures.
- **Don't** treat San Miguel, wellness, sustainability, or community as decorative keywords. They need concrete project proof.
- **Don't** use identical card grids with icon, heading, and paragraph repeated endlessly.
- **Don't** use gradient text, decorative glassmorphism, or the hero-metric template.
- **Don't** use colored `border-left` or `border-right` stripes thicker than 1px as card accents.
- **Don't** introduce pure `#000000` or `#FFFFFF` as the main brand surfaces when warm ink and warm paper tokens already exist.
- **Don't** replace real project imagery with generic colored blocks, stock-like filler, or abstract diagrams.
