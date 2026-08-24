# Premium Backend Systems Console V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the existing Backend Systems Console portfolio into a premium, accessible, responsive V2 while preserving every verified fact and completing the real profile-image and resume integration.

**Architecture:** Keep `portfolioData.js` as the static source of truth and retain the current React component boundaries. Add behavior only where the specification requires it: navigation state stays inside `Navbar`, and progressive reveal behavior lives in a focused `useScrollReveal` hook used by `App`; visual refinement remains in the existing global token-based stylesheet so no new UI dependency or architecture is introduced.

**Tech Stack:** React 18.3, Vite 6.1, CSS, Vitest 2.1, Testing Library, native `IntersectionObserver`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-24-premium-console-v2-design.md`

## Global Constraints

- Preserve the Backend Systems Console identity, all existing verified portfolio content, all existing section IDs, and the static GitHub Pages architecture.
- Do not copy source code, content, assets, branding, or exact compositions from `https://amit-portfolio2.vercel.app/`.
- Do not invent technologies, metrics, roles, project links, screenshots, testimonials, resume facts, or other portfolio evidence.
- Add no UI or animation dependency; use existing React, CSS, and browser APIs.
- Observer-dependent enhancements must fail open with all content visible.
- Support `prefers-reduced-motion: reduce`, keyboard navigation, visible focus, and 44-pixel mobile touch targets.
- Verify layouts at 1440, 1280, 1024, 768, 480, and 375 pixels with no horizontal overflow.
- Preserve `/portfolio/` production paths and confirm the profile image and resume resolve in the built site.
- Preserve all pre-existing uncommitted work; do not reset, stash, delete, or overwrite it.
- Run focused tests, `git diff --check`, a diff review, and relevant UI checks before every implementation commit.

## File Responsibility Map

- `frontend/src/data/portfolioData.js`: verified portfolio data and deploy-safe public asset paths.
- `frontend/public/uploads/profile.jfif`: real profile image under a stable URL-safe filename.
- `frontend/public/uploads/Nikku-Kumar-Resume.pdf`: real resume under a stable URL-safe filename.
- `frontend/src/components/Hero.jsx`: profile identity, resume/project actions, social destinations, metrics, and decorative Java system panel.
- `frontend/src/components/Hero.test.jsx`: regression coverage for real assets, CTA hierarchy, social links, and image fallback.
- `frontend/src/components/Navbar.jsx`: sticky navigation, active section, scroll state, mobile interaction, and accessibility state.
- `frontend/src/components/Navbar.test.jsx`: navigation destinations, active state, mobile close behavior, Escape handling, and scroll-state coverage.
- `frontend/src/hooks/useScrollReveal.js`: progressive `IntersectionObserver` reveal enhancement with cleanup.
- `frontend/src/hooks/useScrollReveal.test.jsx`: observer registration, visible-state behavior, unsupported-browser fallback, and cleanup coverage.
- `frontend/src/App.jsx`: invokes the reveal hook once and retains current section composition.
- `frontend/src/components/About.jsx`: verified narrative, principle hierarchy, location, and email.
- `frontend/src/components/Skills.jsx`: capability-card hierarchy and skill-tag structure.
- `frontend/src/components/ExperienceTimeline.jsx`: accessible experience chronology and highlight hierarchy.
- `frontend/src/components/Projects.jsx`: editorial case-study panels and optional action rendering only when verified URLs exist.
- `frontend/src/components/Education.jsx`: compact credential presentation.
- `frontend/src/components/Contact.jsx`: static email CTA and verified social destinations.
- `frontend/src/components/Footer.jsx`: minimal ownership, location, social links, and back-to-top controls.
- `frontend/src/components/PortfolioSections.test.jsx`: preservation of verified evidence and semantic section behavior.
- `frontend/src/styles.css`: complete token, layout, surface, motion, interaction, and responsive visual system.
- `frontend/index.html`: metadata and theme identity only if validation finds an inconsistency.
- `frontend/public/uploads/README.md`: documents stable public asset filenames.

---

### Task 1: Complete Profile and Resume Integration

**Files:**
- Rename: `frontend/public/uploads/nikku image.jfif` to `frontend/public/uploads/profile.jfif`
- Rename: `frontend/public/uploads/NikkuResume.pdf` to `frontend/public/uploads/Nikku-Kumar-Resume.pdf`
- Modify: `frontend/public/uploads/README.md`
- Modify: `frontend/src/data/portfolioData.js:1-2`
- Modify: `frontend/src/components/Hero.jsx:1-20`
- Create: `frontend/src/components/Hero.test.jsx`
- Modify: `frontend/src/styles.css:14-17,31-35`

**Interfaces:**
- Consumes: `Hero({profile, metrics})`, with `profile.name`, `profile.location`, `profile.summary`, `profile.profileImage`, `profile.resume`, `profile.github`, and `profile.linkedin`.
- Produces: base-aware asset paths that resolve to `/uploads/...` in development and `/portfolio/uploads/...` in production; a hero image named `Nikku Kumar profile`; links named `Explore my work`, `Download resume`, `GitHub`, and `LinkedIn`.

- [ ] **Step 1: Write failing hero integration tests**

Create `frontend/src/components/Hero.test.jsx`:

```jsx
import {fireEvent,render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import Hero from './Hero';

const profile={
  name:'Nikku Kumar',
  location:'Bangalore, India',
  summary:'Java backend developer.',
  profileImage:'/uploads/profile.jfif',
  resume:'/uploads/Nikku-Kumar-Resume.pdf',
  github:'https://github.com/nikku-kumar',
  linkedin:'https://www.linkedin.com/in/nikku-kumar-30b3a3235/',
};

test('presents the verified profile, resume, and social destinations',()=>{
  render(<Hero profile={profile} metrics={[]}/>);
  expect(screen.getByRole('img',{name:'Nikku Kumar profile'})).toHaveAttribute('src','/uploads/profile.jfif');
  expect(screen.getByRole('link',{name:/download resume/i})).toHaveAttribute('href','/uploads/Nikku-Kumar-Resume.pdf');
  expect(screen.getByRole('link',{name:'GitHub'})).toHaveAttribute('href',profile.github);
  expect(screen.getByRole('link',{name:'LinkedIn'})).toHaveAttribute('href',profile.linkedin);
});

test('shows a deliberate fallback when the profile image fails',()=>{
  render(<Hero profile={profile} metrics={[]}/>);
  const image=screen.getByRole('img',{name:'Nikku Kumar profile'});
  fireEvent.error(image);
  expect(image.closest('.profile-portrait')).toHaveClass('is-empty');
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run from `frontend`:

```powershell
npm test -- --run src/components/Hero.test.jsx
```

Expected: FAIL because the asset paths, social hero links, and `.profile-portrait` fallback contract are not implemented.

- [ ] **Step 3: Normalize the existing real asset filenames without changing their contents**

Rename only the two preserved binary files to the exact stable names declared above. Update `frontend/public/uploads/README.md` so it lists:

```markdown
- `profile.jfif` — profile image used in the hero
- `Nikku-Kumar-Resume.pdf` — downloadable resume linked from the hero
```

- [ ] **Step 4: Update the static profile asset paths**

Add a base-aware public-asset helper above `portfolioData` and use it for the two asset properties:

```js
const publicAsset=(file)=>`${import.meta.env.BASE_URL}uploads/${file}`;

profileImage:publicAsset('profile.jfif'),
resume:publicAsset('Nikku-Kumar-Resume.pdf'),
```

Keep every other profile property and all content arrays byte-for-byte equivalent in meaning.

- [ ] **Step 5: Implement the premium hero identity panel**

Refactor `Hero` so the right column contains `.profile-panel`, `.profile-portrait`, verified profile metadata, GitHub/LinkedIn actions, and the existing decorative `.code-card`. Use:

```jsx
<img
  src={profile.profileImage}
  alt={`${profile.name} profile`}
  width="480"
  height="560"
  fetchPriority="high"
  onError={(event)=>event.currentTarget.closest('.profile-portrait')?.classList.add('is-empty')}
/>
```

Keep `Explore my work` linked to `#projects`. Render the resume anchor with `href={profile.resume}`, `download="Nikku-Kumar-Resume.pdf"`, and accessible text `Download resume`. Render GitHub and LinkedIn as external anchors with `target="_blank"` and `rel="noreferrer"`. Preserve all verified headline, summary, location, metric, and code-panel text.

- [ ] **Step 6: Add the focused hero visual rules**

Replace the appended rotated-photo rules with structured `.profile-panel`, `.profile-portrait`, `.profile-meta`, and `.profile-links` rules. The portrait must reserve an aspect ratio, use `object-fit:cover`, avoid overlap at every breakpoint, and show a neutral `.is-empty::after` fallback. Keep hero animation limited to opacity/transform and disabled under reduced motion.

- [ ] **Step 7: Run focused and baseline tests**

Run from `frontend`:

```powershell
npm test -- --run src/components/Hero.test.jsx src/App.test.jsx src/components/PortfolioSections.test.jsx
```

Expected: all selected test files PASS.

- [ ] **Step 8: Validate asset paths and review the change**

Run from the repository root:

```powershell
Test-Path frontend/public/uploads/profile.jfif
Test-Path frontend/public/uploads/Nikku-Kumar-Resume.pdf
git diff --check
git diff -- frontend/src/components/Hero.jsx frontend/src/components/Hero.test.jsx frontend/src/data/portfolioData.js frontend/src/styles.css frontend/public/uploads/README.md
git status --short
```

Expected: both path checks print `True`; diff check is silent; only Task 1 files plus the preserved renamed assets are selected for the commit.

- [ ] **Step 9: Commit the complete profile integration**

```powershell
git add -- frontend/public/uploads/profile.jfif frontend/public/uploads/Nikku-Kumar-Resume.pdf frontend/public/uploads/README.md frontend/src/data/portfolioData.js frontend/src/components/Hero.jsx frontend/src/components/Hero.test.jsx frontend/src/styles.css
git commit -m "feat: complete profile and resume integration"
```

---

### Task 2: Add Accessible Active Navigation

**Files:**
- Modify: `frontend/src/components/Navbar.jsx:1-17`
- Modify: `frontend/src/components/Navbar.test.jsx:1-20`
- Modify: `frontend/src/styles.css:12-13,28-30`

**Interfaces:**
- Consumes: existing section IDs `home`, `about`, `expertise`, `experience`, `projects`, `education`, and `contact`.
- Produces: `Navbar()` links with `aria-current="page"` for the active section, `data-scrolled` on the header, correct mobile `aria-expanded`, Escape dismissal, and link-click dismissal.

- [ ] **Step 1: Extend navigation tests with browser API stubs**

Add test setup inside `Navbar.test.jsx` using `beforeEach`, `afterEach`, and `vi`:

```jsx
let observerCallback;
let observe;

beforeEach(()=>{
  observe=vi.fn();
  vi.stubGlobal('IntersectionObserver',class{
    constructor(callback){observerCallback=callback;}
    observe=observe;
    disconnect=vi.fn();
  });
});

afterEach(()=>vi.unstubAllGlobals());
```

Add these tests:

```jsx
test('marks the visible destination as current',()=>{
  render(<Navbar/>);
  observerCallback([{isIntersecting:true,target:{id:'projects'}}]);
  expect(screen.getByRole('link',{name:'Projects'})).toHaveAttribute('aria-current','page');
});

test('closes the mobile navigation with Escape',()=>{
  render(<Navbar/>);
  const toggle=screen.getByRole('button',{name:/open navigation/i});
  fireEvent.click(toggle);
  fireEvent.keyDown(document,{key:'Escape'});
  expect(toggle).toHaveAttribute('aria-expanded','false');
});
```

- [ ] **Step 2: Run the navigation tests and verify RED**

Run from `frontend`:

```powershell
npm test -- --run src/components/Navbar.test.jsx
```

Expected: FAIL because active-section observation, `aria-current`, and Escape handling do not exist.

- [ ] **Step 3: Implement active, scroll, and dismissal state**

In `Navbar`, import `useEffect` and retain `useState`. Initialize `activeSection` to `'home'` and `scrolled` to `false`. In effects:

- observe every existing section element with `rootMargin:'-30% 0px -55% 0px'` and update from intersecting entries;
- add a passive scroll listener that sets `scrolled` from `window.scrollY>12`;
- add a `keydown` listener that closes the menu when `event.key==='Escape'`;
- clean up each listener and observer.

Set `data-scrolled={scrolled}` on `.site-header`; for each link whose hash equals `#${activeSection}`, set `aria-current="page"`. Keep the current destinations and close-on-click behavior unchanged.

- [ ] **Step 4: Refine desktop and mobile navigation styling**

Add distinct rules for `[data-scrolled="true"]`, `.nav-links a[aria-current="page"]`, the animated toggle state, and the open mobile panel. Ensure the collapsed panel remains absent from layout when closed, all mobile links have at least 44-pixel height, and reduced-motion disables menu/link transitions.

- [ ] **Step 5: Run navigation and application tests**

Run from `frontend`:

```powershell
npm test -- --run src/components/Navbar.test.jsx src/App.test.jsx
```

Expected: both test files PASS with no unhandled observer errors.

- [ ] **Step 6: Review and commit navigation**

Run:

```powershell
git diff --check
git diff -- frontend/src/components/Navbar.jsx frontend/src/components/Navbar.test.jsx frontend/src/styles.css
git status --short
git add -- frontend/src/components/Navbar.jsx frontend/src/components/Navbar.test.jsx frontend/src/styles.css
git commit -m "feat: add accessible active navigation"
```

---

### Task 3: Refine Portfolio Sections into Premium Evidence Panels

**Files:**
- Modify: `frontend/src/components/About.jsx:1-9`
- Modify: `frontend/src/components/Skills.jsx:1-6`
- Modify: `frontend/src/components/ExperienceTimeline.jsx:1-6`
- Modify: `frontend/src/components/Projects.jsx:1-6`
- Modify: `frontend/src/components/Education.jsx:1-6`
- Modify: `frontend/src/components/Contact.jsx:1-7`
- Modify: `frontend/src/components/Footer.jsx:1-3`
- Modify: `frontend/src/components/PortfolioSections.test.jsx:1-27`
- Modify: `frontend/src/styles.css:18-25`

**Interfaces:**
- Consumes: existing `profile`, `principles`, `skillGroups`, `experience`, `projects`, and `education` structures without content changes.
- Produces: semantic section wrappers with `data-reveal`, case-study numbering, verified static contact/social actions, and optional project action rendering only from `project.github` or `project.live` values when present.

- [ ] **Step 1: Add failing semantic and preservation tests**

Extend `PortfolioSections.test.jsx`:

```jsx
test('keeps every section ready for progressive reveal',()=>{
  render(<App/>);
  for(const id of ['about','expertise','experience','projects','education','contact']){
    expect(document.getElementById(id)).toHaveAttribute('data-reveal');
  }
});

test('does not invent unavailable project actions',()=>{
  render(<App/>);
  const projects=document.querySelector('#projects');
  expect(within(projects).queryByRole('link',{name:/source|live demo/i})).not.toBeInTheDocument();
});

test('preserves verified contact and social destinations',()=>{
  render(<App/>);
  expect(screen.getByRole('link',{name:/start a conversation/i})).toHaveAttribute('href','mailto:nikku.india05@gmail.com?subject=Java%20backend%20opportunity');
  expect(screen.getAllByRole('link',{name:'GitHub'}).some(link=>link.href==='https://github.com/nikku-kumar/')).toBe(true);
  expect(screen.getAllByRole('link',{name:'LinkedIn'}).some(link=>link.href==='https://www.linkedin.com/in/nikku-kumar-30b3a3235/')).toBe(true);
});
```

- [ ] **Step 2: Run the section tests and verify RED**

Run from `frontend`:

```powershell
npm test -- --run src/components/PortfolioSections.test.jsx
```

Expected: FAIL because the section roots do not yet expose `data-reveal`.

- [ ] **Step 3: Refine section markup without changing facts**

Apply these exact structural rules:

- add `data-reveal` to each major section root;
- replace About's unrelated symbol glyphs with textual `SYSTEM / ${item.number}` metadata while keeping title and description;
- keep each skill category, description, and skill tag, but add `aria-label={`${group.category} skills`}` to its tag group;
- retain the ordered experience list, expose the period in a `<time>` element without inventing machine-readable dates, and keep every highlight in source order;
- keep Problem / Architecture / Impact as a `<dl>` and render a project action area only if an item includes a verified `github` or `live` property;
- preserve education values and static contact behavior;
- normalize visible arrow/copyright glyphs as valid UTF-8 characters and keep decorative glyphs `aria-hidden="true"`.

- [ ] **Step 4: Implement differentiated section layouts**

Refine CSS so:

- About uses an editorial split and connected three-panel principle system;
- Expertise uses balanced three-column capability cards, two columns at tablet, and one column on mobile;
- Experience uses a stable timeline rail and higher-contrast role cards;
- Projects use large case-study panels with a desktop Problem / Architecture / Impact grid and mobile stacked dividers;
- Education remains compact and visually subordinate to professional evidence;
- Contact forms a strong two-column final CTA and Footer remains minimal;
- hover effects are restricted to hover-capable pointers and never hide content.

- [ ] **Step 5: Run all component tests**

Run from `frontend`:

```powershell
npm test -- --run src/App.test.jsx src/components/Navbar.test.jsx src/components/Hero.test.jsx src/components/PortfolioSections.test.jsx
```

Expected: all selected test files PASS and all existing evidence assertions remain intact.

- [ ] **Step 6: Review content preservation and commit**

Run:

```powershell
git diff --check
git diff --word-diff=plain -- frontend/src/components frontend/src/styles.css
git status --short
git add -- frontend/src/components/About.jsx frontend/src/components/Skills.jsx frontend/src/components/ExperienceTimeline.jsx frontend/src/components/Projects.jsx frontend/src/components/Education.jsx frontend/src/components/Contact.jsx frontend/src/components/Footer.jsx frontend/src/components/PortfolioSections.test.jsx frontend/src/styles.css
git commit -m "feat: elevate portfolio evidence sections"
```

---

### Task 4: Add Progressive Reveal and Cohesive Motion

**Files:**
- Create: `frontend/src/hooks/useScrollReveal.js`
- Create: `frontend/src/hooks/useScrollReveal.test.jsx`
- Modify: `frontend/src/App.jsx:1-27`
- Modify: `frontend/src/styles.css`

**Interfaces:**
- Produces: `useScrollReveal(selector='[data-reveal]')`, a hook that adds `.is-visible` to matching elements as they intersect and returns no value.
- Consumes: section roots marked with `data-reveal` by Task 3.

- [ ] **Step 1: Write failing hook tests**

Create `frontend/src/hooks/useScrollReveal.test.jsx`:

```jsx
import {render} from '@testing-library/react';
import {afterEach,expect,test,vi} from 'vitest';
import {useScrollReveal} from './useScrollReveal';

function Harness(){
  useScrollReveal();
  return <section data-reveal>Evidence</section>;
}

afterEach(()=>vi.unstubAllGlobals());

test('reveals observed content and stops observing it',()=>{
  let callback;
  const unobserve=vi.fn();
  vi.stubGlobal('IntersectionObserver',class{
    constructor(next){callback=next;}
    observe=vi.fn();
    unobserve=unobserve;
    disconnect=vi.fn();
  });
  const {container}=render(<Harness/>);
  const section=container.querySelector('[data-reveal]');
  callback([{isIntersecting:true,target:section}]);
  expect(section).toHaveClass('is-visible');
  expect(unobserve).toHaveBeenCalledWith(section);
});

test('leaves content visible when IntersectionObserver is unavailable',()=>{
  vi.stubGlobal('IntersectionObserver',undefined);
  const {container}=render(<Harness/>);
  expect(container.querySelector('[data-reveal]')).toHaveClass('is-visible');
});
```

- [ ] **Step 2: Run the hook tests and verify RED**

Run from `frontend`:

```powershell
npm test -- --run src/hooks/useScrollReveal.test.jsx
```

Expected: FAIL because `useScrollReveal.js` does not exist.

- [ ] **Step 3: Implement the progressive enhancement hook**

Create `useScrollReveal.js` with a named export. Inside `useEffect`, add `.js` to `document.documentElement`, then query `selector`; when `IntersectionObserver` is unavailable, add `.is-visible` to every element. Otherwise observe with `{threshold:0.12,rootMargin:'0px 0px -8% 0px'}`, reveal and unobserve intersecting targets, and disconnect during cleanup. Remove `.js` during cleanup so the enhancement does not leak across test mounts.

- [ ] **Step 4: Invoke the hook once from App**

Import `useScrollReveal` into `App.jsx`, call it at the top of `App`, and do not alter the existing component order or data flow.

- [ ] **Step 5: Add reveal, stagger, and reduced-motion CSS**

Define visible-by-default base content. Apply hidden transform/opacity only under `@media (prefers-reduced-motion:no-preference)` and only when `.js` is present on the root document; add `.is-visible` restoration. Add small custom-property delays for grouped cards without exceeding 240ms. Ensure reduced-motion content is immediately visible and all ongoing pulse/background animation is disabled.

- [ ] **Step 6: Run focused and full frontend tests**

Run from `frontend`:

```powershell
npm test -- --run src/hooks/useScrollReveal.test.jsx src/App.test.jsx
npm test -- --run
```

Expected: focused and complete suites PASS.

- [ ] **Step 7: Review and commit motion**

Run:

```powershell
git diff --check
git diff -- frontend/src/hooks frontend/src/App.jsx frontend/src/styles.css
git status --short
git add -- frontend/src/hooks/useScrollReveal.js frontend/src/hooks/useScrollReveal.test.jsx frontend/src/App.jsx frontend/src/styles.css
git commit -m "feat: add accessible scroll reveal motion"
```

---

### Task 5: Consolidate the Responsive Premium Visual System

**Files:**
- Modify: `frontend/src/styles.css`
- Modify: `frontend/index.html:4-8` only if metadata validation requires correction
- Modify: `frontend/src/App.test.jsx:27-31`

**Interfaces:**
- Consumes: all class names and behavior contracts from Tasks 1-4.
- Produces: tokenized responsive layouts at wide desktop, laptop, tablet, mobile, and small-mobile sizes; visible focus; hover-capability guards; and reduced-motion behavior.

- [ ] **Step 1: Add static identity assertions**

Extend the existing identity test in `App.test.jsx`:

```jsx
expect(document.querySelector('.hero')).toBeInTheDocument();
expect(document.querySelectorAll('.project-card')).toHaveLength(2);
expect(document.querySelectorAll('.skill-card')).toHaveLength(6);
expect(document.querySelector('.contact-section')).toBeInTheDocument();
```

These assertions protect the approved section inventory while the stylesheet is consolidated.

- [ ] **Step 2: Run App tests before consolidation**

Run from `frontend`:

```powershell
npm test -- --run src/App.test.jsx
```

Expected: PASS, establishing a green structural baseline for a visual-only refactor.

- [ ] **Step 3: Reorganize styles into auditable system sections**

Keep `styles.css` as the single global stylesheet but format it into readable blocks for tokens/reset, background/container, navigation, hero/profile/code, shared section primitives, About, Expertise, Experience, Projects, Education, Contact/Footer, focus/motion, and responsive breakpoints. Define explicit tokens for spacing, radii, shadows, container width, header height, and motion timings. Remove duplicate late-appended profile and reduced-motion rules.

- [ ] **Step 4: Implement the responsive hierarchy**

Use these structural thresholds:

- base desktop styles support 1440px and 1280px;
- `@media (max-width:1100px)` reduces desktop gaps and project density;
- `@media (max-width:900px)` activates the mobile navigation, collapses hero/contact/split grids, and uses two-column skills;
- `@media (max-width:640px)` uses 24-pixel total side gutters, stacked CTA actions, two-column metrics, single-column content cards, and smaller section spacing;
- `@media (max-width:420px)` protects the 375-pixel layout, reduces code typography safely, stacks fragile metadata, and prevents tag/button overflow.

Use `min-width:0`, `overflow-wrap:anywhere` only where long links require it, and bounded `clamp()` type sizes. Ensure each section uses `scroll-margin-top` based on the sticky header.

- [ ] **Step 5: Complete interaction and accessibility styling**

Add visible `:focus-visible` treatment, `@media (hover:hover) and (pointer:fine)` hover motion, `@media (prefers-reduced-motion:reduce)` cancellation, and `@media (forced-colors:active)` border/focus fallbacks. Ensure text and muted metadata retain readable contrast on every surface.

- [ ] **Step 6: Run automated validation and production build**

Run from `frontend`:

```powershell
npm test -- --run
npm run build
Select-String -Path dist/index.html -Pattern '/portfolio/assets/'
```

Expected: all tests PASS; Vite exits 0; the built HTML contains `/portfolio/assets/` URLs.

- [ ] **Step 7: Run stylesheet and diff checks**

Run from the repository root:

```powershell
git diff --check
Select-String -Path frontend/src/styles.css -Pattern 'prefers-reduced-motion|forced-colors|max-width:1100px|max-width:900px|max-width:640px|max-width:420px'
git diff --stat
git diff -- frontend/src/styles.css frontend/src/App.test.jsx frontend/index.html
```

Expected: diff check is silent and every required responsive/accessibility pattern is present.

- [ ] **Step 8: Commit the consolidated visual system**

```powershell
git add -- frontend/src/styles.css frontend/src/App.test.jsx frontend/index.html
git commit -m "style: refine premium console visual system"
```

If `frontend/index.html` has no actual change, omit it from `git add`.

---

### Task 6: Browser Verification and Responsive Corrections

**Files:**
- Modify only files with defects reproduced during the checks below.
- Add a focused regression test beside the affected component for every behavioral defect.

**Interfaces:**
- Consumes: the production build served at `/portfolio/`.
- Produces: browser evidence for layout, resources, interactions, accessibility, and every verified destination.

- [ ] **Step 1: Start the production preview**

Run from `frontend`:

```powershell
npm run preview -- --host 127.0.0.1
```

Expected: Vite exposes the built site at a local URL under `/portfolio/` and remains running for browser inspection.

- [ ] **Step 2: Inspect every target viewport**

At 1440x900, 1280x800, 1024x768, 768x1024, 480x900, and 375x812, inspect:

- sticky header and active link;
- hero headline, profile panel, portrait, code panel, CTAs, social links, and metrics;
- all six navigation destinations and anchor offsets;
- principle, skill, timeline, project, education, contact, and footer layouts;
- wrapping, overlap, clipping, layout shift, and horizontal overflow.

For every viewport, verify `document.documentElement.scrollWidth === document.documentElement.clientWidth` in the browser console.

- [ ] **Step 3: Verify interaction and accessibility behavior**

Using keyboard and responsive emulation, verify:

- Tab/Shift+Tab order and visible focus;
- mobile menu open, link close, Escape close, and active destination;
- hover states on a pointer-capable desktop;
- all content visible with JavaScript observer support unavailable;
- all content visible with `prefers-reduced-motion: reduce`;
- no browser console errors or failed network requests.

- [ ] **Step 4: Verify every real destination and built resource**

Confirm:

- `/portfolio/uploads/profile.jfif` loads the real image;
- `/portfolio/uploads/Nikku-Kumar-Resume.pdf` opens/downloads the real PDF;
- GitHub opens `https://github.com/nikku-kumar`;
- LinkedIn opens `https://www.linkedin.com/in/nikku-kumar-30b3a3235/`;
- email uses `mailto:nikku.india05@gmail.com?subject=Java%20backend%20opportunity`;
- every internal navigation destination scrolls to an existing section.

- [ ] **Step 5: Fix each discovered defect with the smallest change**

For behavioral defects, first add a focused failing test to the affected existing test file, run it to confirm RED, apply the minimal implementation, and rerun to GREEN. For visual-only defects, record the viewport and selector, change only the smallest relevant CSS rule, and repeat the same viewport check.

- [ ] **Step 6: Run final local verification**

Run from `frontend`:

```powershell
npm ci
npm test -- --run
npm run build
Select-String -Path dist/index.html -Pattern '/portfolio/assets/'
```

Run from the repository root:

```powershell
git diff --check
git status --short --branch
```

Expected: clean install, tests, and build exit 0; asset-base search succeeds; diff check is silent; status contains only intentional browser-correction files, if any.

- [ ] **Step 7: Commit verified browser corrections if files changed**

```powershell
git add -- frontend/src/App.jsx frontend/src/App.test.jsx frontend/src/components/About.jsx frontend/src/components/Contact.jsx frontend/src/components/Education.jsx frontend/src/components/ExperienceTimeline.jsx frontend/src/components/Footer.jsx frontend/src/components/Hero.jsx frontend/src/components/Hero.test.jsx frontend/src/components/Navbar.jsx frontend/src/components/Navbar.test.jsx frontend/src/components/PortfolioSections.test.jsx frontend/src/components/Projects.jsx frontend/src/components/Skills.jsx frontend/src/hooks/useScrollReveal.js frontend/src/hooks/useScrollReveal.test.jsx frontend/src/styles.css
git commit -m "fix: polish responsive console experience"
```

If no defect required a file change, do not create an empty commit.

---

### Task 7: Publish, Review, and Prepare an Authorized Merge

**Files:**
- No source changes expected.
- Modify source only if a remote check exposes a reproducible defect, following Task 6's test-first correction workflow.

**Interfaces:**
- Consumes: verified local commits on `feature/premium-console-v2`.
- Produces: pushed branch, pull request, passing repository checks, and an explicit merge-authorization gate.

- [ ] **Step 1: Audit the final local branch**

Run:

```powershell
git status --short --branch
git log --oneline origin/main..HEAD
git diff --stat origin/main...HEAD
git diff --check origin/main...HEAD
```

Expected: working tree is clean; commits are logical; diff contains only the specification, plan, verified frontend/assets, and tests; diff check is silent.

- [ ] **Step 2: Push the feature branch**

```powershell
git push -u origin feature/premium-console-v2
```

Expected: push exits 0 and sets the upstream branch.

- [ ] **Step 3: Create the pull request**

Create a PR targeting `main` with title:

```text
feat: elevate portfolio to Premium Backend Systems Console V2
```

Use this body and replace the parenthetical instruction with the exact passing count printed by the final Vitest run:

```markdown
## Changes
- Completed the real profile image and resume integration
- Refined navigation, hero, and recruiter-focused profile actions
- Elevated expertise, experience, project, education, contact, and footer presentation
- Added accessible active navigation and reduced-motion-safe reveal behavior
- Consolidated responsive styling for desktop, tablet, and small mobile layouts

## Validation
- Frontend tests: all tests passed (insert the exact Vitest test count from Task 6, Step 6)
- Production build: passed
- GitHub Pages `/portfolio/` asset paths: verified
- Browser viewports: 1440, 1280, 1024, 768, 480, and 375 pixels verified
- Profile, resume, GitHub, LinkedIn, email, and section navigation: verified
```

- [ ] **Step 4: Check the PR and deployment-relevant status**

Run these GitHub CLI checks:

```powershell
gh pr checks --watch
gh pr view --json number,url,state,mergeable,headRefName,baseRefName
```

Expected: required checks pass, base is `main`, head is `feature/premium-console-v2`, and the PR is mergeable.

- [ ] **Step 5: Request explicit merge authorization**

Report the PR URL, final diff summary, exact test/build evidence, and check status. Do not merge until the user explicitly authorizes merging that verified PR.

- [ ] **Step 6: Merge only after authorization**

After authorization, use the repository's accepted non-force merge method. Never force-push or bypass required checks.

- [ ] **Step 7: Synchronize and verify the merged target branch**

Run:

```powershell
git switch main
git pull --ff-only origin main
git status --short --branch
git log --oneline -5
Set-Location frontend
npm ci
npm test -- --run
npm run build
Select-String -Path dist/index.html -Pattern '/portfolio/assets/'
```

Expected: local `main` matches `origin/main`, the working tree is clean, tests/build pass, and built assets retain the `/portfolio/` base.

- [ ] **Step 8: Verify the deployed GitHub Pages site**

Open `https://nikku-kumar.github.io/portfolio/` after the Pages workflow succeeds. Recheck the profile image, resume PDF, GitHub, LinkedIn, email, active/mobile navigation, every section, browser console, and one desktop plus one mobile viewport before reporting completion.
