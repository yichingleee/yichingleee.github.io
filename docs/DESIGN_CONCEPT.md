# Design Concept: Brutalist Modern

## Core idea
A technical, research-forward aesthetic emphasizing raw typography, geometric precision, and systematic structure. The design communicates expertise through restraint: hard edges, monospace fonts, and a cool monochromatic palette with a single electric accent.

## Visual language
- Palette: pure white background, near-black text, cool gray muted tones, electric blue accent.
- Typography: JetBrains Mono for display and headings (technical authority), Inter for body (neutral clarity).
- Composition: asymmetrical split hero, left navigation rail, numbered sections, and bordered panels.
- Motion: minimal transforms, border/color transitions only, offset shadows on hover.

## Color palette
```css
--bg: #ffffff         /* Pure white */
--bg-alt: #f5f5f5     /* Cool light gray */
--ink: #0a0a0a        /* Near-black */
--muted: #6b7280      /* Cool gray */
--accent: #2563eb     /* Electric blue */
--line: rgba(10, 10, 10, 0.18)
```

## Interaction highlights
- Section rail stays anchored with square, bordered items.
- CTAs are square-edged, heavy-bordered, uppercase monospace.
- Cards gain offset shadows on hover (brutalist shadow: 6-8px offset).
- No float/lift effects; interactions are border and color transitions only.

## Generative visual system: Bezier Ribbon Flow
Flowing bezier ribbons that traverse the viewport like organic threads or currents. The system creates a bold, dynamic backdrop with smooth animated curves following a noise-based flow field.

### Visual characteristics
- **Style**: Organic curved paths like flowing ribbons or threads
- **Layout**: Vector field flow - curves follow a consistent directional field
- **Intensity**: Bold - strong visual presence, part of the design identity

### Parameters
- seed: deterministic string hash ("Yi-Ching Lee")
- count: 20 ribbons across viewport
- points per ribbon: 40 segments for smooth paths
- stroke width: 2-4.5px for bold presence
- opacity: 0.15-0.40 per ribbon
- accent ratio: every 4th ribbon uses blue accent
- wave animation: 12px horizontal, 8px vertical displacement

### Algorithmic logic (Canvas 2D)
1. Hash a seed string to create a deterministic RNG.
2. Create a 2D noise-based flow field for direction.
3. Generate ribbon starting points along left edge.
4. Each ribbon follows the flow field, stepping through and recording points.
5. Convert points to smooth bezier curves using Catmull-Rom interpolation.
6. Animate control points with sinusoidal wave displacement.
7. Draw with varying stroke widths and opacity for depth.
8. Cap frame rate to ~20 fps for performance.

### Performance notes
- Regenerate ribbons on resize only.
- Clamp device pixel ratio to 2.
- Use globalAlpha for opacity.
- Throttle renders to 50ms minimum between frames.
- Catmull-Rom to Bezier conversion for GPU-friendly curves.

## Section mapping
- Home: monospace name hero with bordered info panel and offset shadow.
- About: narrative paragraph paired with a facts card (square edges).
- Publications: bordered list with year markers and monospace metadata.
- Projects: card grid with offset shadow hover, square corners.
- Contact: bordered block with offset shadow, electric blue email link.

## Typography hierarchy
- Hero title: JetBrains Mono, 700, clamp(2.8rem, 5.2vw, 4.8rem)
- Section title: JetBrains Mono, 600, uppercase, letter-spacing 0.02em
- Body: Inter, 400, line-height 1.7
- Labels: JetBrains Mono, 500, 10-11px, uppercase, letter-spacing 0.3em
