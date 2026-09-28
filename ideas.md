# Cryptita Plays Design Direction

## Three initial directions

### Theme Name: Learning Constellation
**Very Brief Intro:** An editorial social-impact site where books, people, and future technologies connect through luminous 3D nodes. Warm humanity keeps the Web3 story grounded and approachable.

**Probability:** 0.07

### Theme Name: Purple Field Notes
**Very Brief Intro:** A tactile field-journal direction using paper textures, handwritten annotation cues, and documentary-style blocks to make the organization feel local, practical, and community-led.

**Probability:** 0.04

### Theme Name: Quiet Orbit
**Very Brief Intro:** A calm, spacious, gallery-like experience with generous white space, soft lilac surfaces, and slow orbital motion for an education-first, trust-building presence.

**Probability:** 0.09

## Chosen Direction: Learning Constellation

### Design Movement
Contemporary editorial humanism with soft 3D sculpture, inspired by museum education campaigns and premium mission-led product storytelling rather than crypto trading interfaces.

### Core Principles
1. **People before protocol:** Human learning, community, and access always appear before blockchain terminology.
2. **Light as a guide:** Signature violet marks connections, progress, and action, not speculation or hype.
3. **Depth with restraint:** 3D layers, perspective, and motion add meaning to sections without turning the site into a visual demo.
4. **Editorial clarity:** Strong headings, short paragraphs, and generous whitespace let complex ideas feel beginner-friendly.

### Color Philosophy
The core `#971CE6` violet is treated as a signal of possibility and connected learning. It is surrounded by near-black ink for focus, warm white for trust and readability, and pale lilac surfaces for soft transitions. The page should feel luminous but not futuristic for its own sake: color is used to make pathways visible.

### Layout Paradigm
A scroll-led editorial journey with an asymmetric hero, alternating wide and offset content compositions, and occasional full-bleed moments. Sections should feel like chapters in a field guide, not a stack of identical cards. Programs use varied feature layouts; events use a horizontal story carousel.

### Signature Elements
- **Constellation threads:** thin orbital lines and small nodes connecting content around the hero and impact sections.
- **Beveled learning objects:** open-book, orb, and card forms with dimensional highlights that echo the supplied bevel logo.
- **Chapter markers:** compact violet labels and numbered rails that make the long homepage easy to navigate.

### Interaction Philosophy
Interactions should feel like a calm invitation to explore: hover reveals clarify rather than decorate, buttons respond with a slight physical press, and carousel navigation is obvious and keyboard-friendly. Donation actions should be the most direct and least animated path on the site.

### Animation
Use opacity and transform only. Entrance sequences should rise 16–24px with a soft cubic-bezier ease-out, staggered by 40–70ms for grouped items. Hero orbit lines drift slowly and pause under reduced motion. Program imagery gets a subtle depth lift on hover. Event slides transition with a short horizontal translate and opacity blend. No looping effects on critical donation content.

### Typography System
Use Poppins throughout, with 700–800 weight for headlines, 600–700 for labels and calls to action, and 400–500 for body copy. Headline line lengths should remain tight and editorial, with body measure limited to approximately 60–70 characters for readability. Use uppercase micro-labels with increased tracking sparingly for chapter markers.

### Brand Essence
Cryptita Plays equips underserved communities in the Philippines with approachable education, physical learning access, and responsible Web3 awareness so people can thrive in a digital future. Personality: **luminous, grounded, generous**.

### Brand Voice
Headlines should be direct, hopeful, and human. CTAs should describe the real action and outcome rather than use generic conversion language. Microcopy should explain unfamiliar Web3 steps without assuming expertise.

Example lines:
- “A future-ready education starts with a book in reach.”
- “Put learning in more hands.”

### Wordmark & Logo
Use the supplied Cryptita Plays bevel logo as the primary wordmark. Use the generated compact face/head-and-orbit mark for the mobile/favicon treatment only, preserving the brand’s recognizable silhouette without redrawing the wordmark in a default font.

### Signature Brand Color
**Cryptita Violet — `#971CE6`**. It is the visible thread that connects education, community, and the next generation of digital possibility.

## Implementation reminders

- Keep the supplied logo and generated visual assets as deployment-safe external asset URLs; never reference local filesystem paths from the app.
- All page/component files should begin with a short style comment reminding contributors of the Learning Constellation direction.
- The website must not claim numeric impact, nonprofit status, tax deductibility, or wallet details that Cryptita Plays has not verified.
- “Inspired by Binance Charity’s transparency-oriented donation UX” is acceptable; copying brand identity, code, or proprietary content is not.
