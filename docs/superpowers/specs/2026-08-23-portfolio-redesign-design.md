# Nikku Kumar Portfolio Redesign

## Goal

Redesign the existing portfolio into a polished, recruiter-focused Java backend engineering site. The experience should follow the clarity and long-scroll information architecture of the supplied reference while using an original visual identity, stronger proof of professional impact, and reliable static hosting.

## Success Criteria

- A recruiter can identify Nikku as a Java backend engineer and understand his strongest evidence within 15 seconds.
- The page presents the existing profile, skills, experience, projects, education, and contact information as one natural scrolling narrative.
- The public frontend works without a running Spring Boot server.
- The design is responsive, keyboard accessible, readable at common viewport sizes, and respectful of reduced-motion preferences.
- The frontend passes its automated tests and production build.
- The repository contains a GitHub Pages workflow suitable for publishing the frontend from `main`.

## Chosen Direction

The visual concept is **Backend Systems Console**. It borrows the reference site's strong hierarchy and section ordering, but not its source code, exact styling, or wording.

The site will use a graphite and near-black foundation, warm off-white typography, an electric green primary accent, and a restrained blue secondary accent. Fine grid textures, soft glows, thin borders, and code-oriented details will create technical character without turning the page into a novelty terminal interface.

Typography will combine a bold modern sans-serif for editorial headings with a monospace face for labels, metrics, code, and technical metadata. Motion will be restrained: entrance transitions, hover feedback, navigation state, and a small amount of hero-panel animation. All essential content remains available when motion is disabled.

## Information Architecture

The current chapter/reel interface will be replaced with a conventional single-page scroll.

1. **Navigation** — sticky brand and links for About, Expertise, Experience, Projects, Education, and Contact. Desktop navigation remains visible; mobile uses an accessible menu.
2. **Hero** — explicit Java Backend Engineer positioning, a concise value proposition, GitHub and contact actions, availability/location metadata, quantified proof points, and a Java-inspired developer profile panel.
3. **About** — a focused professional narrative supported by principles such as reliable structure, performance thinking, and production ownership.
4. **Expertise** — curated skill-system cards rather than an undifferentiated list. Core Java, Spring ecosystem, data, API quality, delivery/tooling, and integration are the primary groups.
5. **Experience** — chronological roles with scannable impact highlights. Existing verified metrics—30+ APIs, 70% workflow reduction, 25% performance improvement, 15+ production fixes, and 8+ modules—receive prominent treatment.
6. **Projects** — two richer case-study cards. Each describes the problem, implementation/architecture, outcome, and technology stack using only facts supported by the current portfolio data.
7. **Education** — compact academic foundation and continued-learning framing without inventing credentials.
8. **Contact** — clear availability, direct email action, LinkedIn, and GitHub. The static site uses a prefilled mail link rather than a server-dependent form.
9. **Footer** — concise identity, current year, and social links.

## Content and Data Flow

Public portfolio content will be represented as a frontend data module. Components receive structured data through props, keeping content separate from presentation and easy to update.

The Spring Boot backend remains in the repository for demonstration and local full-stack work, but the public portfolio will not depend on it. This prevents GitHub Pages from displaying an API connection error. The redesign will not claim projects, technologies, outcomes, employers, credentials, or links that are absent from the existing repository data.

Contact uses a `mailto:` link addressed to `nikku.india05@gmail.com` with a useful prefilled subject. No fake success state will be shown because GitHub Pages cannot process or persist a contact submission.

## Components

Components will remain small and section-oriented:

- `Navbar` owns responsive navigation and current-section presentation.
- `Hero` owns positioning, primary actions, proof metrics, and the Java profile visual.
- `About`, `Skills`, `ExperienceTimeline`, `Projects`, and `Education` render their corresponding content sections.
- `Contact` provides direct communication and external profile actions.
- `Footer` closes the narrative.
- `App` composes sections and supplies portfolio data; it no longer manages reel playback or remote loading state.

Shared visual patterns—section labels, chips, cards, buttons, and metrics—will use common CSS classes and design tokens rather than duplicated inline styles.

## Interaction and Responsive Behavior

- Anchor navigation uses smooth scrolling where motion is allowed and correct sticky-header offsets.
- The active navigation item updates as sections enter the viewport; links remain usable if observation APIs are unavailable.
- The mobile menu exposes an explicit button with an accessible label and expanded state, closes after navigation, and does not obscure page actions.
- Cards use hover/focus elevation and border treatment without hiding content behind hover.
- Project information is visible directly in the page. Optional visual expansion may enhance detail, but no core content depends on it.
- At narrow widths, multi-column layouts collapse into a clear single-column reading order. Hero metrics, action buttons, experience entries, and contact links remain usable without horizontal overflow.

## Accessibility

- Semantic landmarks and heading order communicate the page structure.
- Navigation and interactive controls work with a keyboard and show visible focus indicators.
- Text and controls meet practical contrast requirements against the dark surfaces.
- Decorative visuals are hidden from assistive technology.
- External links identify their purpose through link text.
- `prefers-reduced-motion` removes nonessential animation and smooth scrolling.

## Testing

Development will follow test-first changes.

Automated frontend tests will verify:

- the hero communicates Nikku's name and Java backend role;
- the long-scroll section structure renders instead of reel controls;
- quantified professional evidence appears;
- project and skill data render from the local portfolio model;
- navigation exposes the expected destinations;
- the contact action uses the correct email address;
- mobile navigation exposes correct accessible state where implemented.

The full frontend test suite and production build must pass. Browser verification will cover desktop and mobile viewport rendering, anchor navigation, menu behavior, visible focus, overflow, and reduced-motion-safe behavior.

## Deployment

Vite will use the `/portfolio/` production base path needed by the repository's GitHub Pages URL while preserving local development behavior. A GitHub Actions workflow will install dependencies, run tests, build `frontend/dist`, and deploy that artifact to GitHub Pages on pushes to `main` and through manual dispatch.

The intended public URL is `https://nikku-kumar.github.io/portfolio/`. The URL becomes live only after the workflow is pushed and GitHub Pages is enabled for GitHub Actions in the repository settings.

## Out of Scope

- Copying the reference site's code, exact layout, or wording.
- Inventing additional employment history, certifications, project outcomes, or technology expertise.
- Hosting the Spring Boot API or a database on GitHub Pages.
- Adding a portrait or downloadable résumé until real assets are supplied.
- Adding analytics, a CMS, authentication, or a third-party form service.
