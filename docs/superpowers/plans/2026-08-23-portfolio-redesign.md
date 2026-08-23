# Backend Systems Console Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the chapter-based portfolio with an original, recruiter-focused Backend Systems Console experience that works as a static GitHub Pages site.

**Architecture:** A local `portfolioData` module is the single content source, and a section-oriented React component tree renders it as one semantic scrolling page. Interaction stays deliberately small: `Navbar` owns its accessible mobile-menu state, while contact is a direct email link; CSS tokens and responsive rules provide the visual system without new runtime dependencies.

**Tech Stack:** React 18, Vite 6, Vitest 2, Testing Library, CSS, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-23-portfolio-redesign-design.md`

## Global Constraints

- Use only professional facts, links, roles, metrics, and technologies already supported by repository data.
- Keep the Spring Boot backend in the repository, but make the public frontend independent from it.
- Use `nikku.india05@gmail.com` for the static contact action.
- Do not add a portrait or downloadable resume without real supplied assets.
- The public repository path is `/portfolio/` and the intended URL is `https://nikku-kumar.github.io/portfolio/`.
- All interactions must be keyboard accessible, visibly focusable, responsive, and safe under `prefers-reduced-motion`.
- Do not copy source code, exact styling, or wording from the supplied reference site.

---

### Task 1: Local Portfolio Model and Scrolling Application Shell

**Files:**
- Create: `frontend/src/data/portfolioData.js`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/App.test.jsx`
- Delete: `frontend/src/reel.css`

**Interfaces:**
- Produces: named export `portfolioData`, an object with `profile`, `metrics`, `principles`, `skillGroups`, `experience`, `projects`, and `education` properties.
- Produces: default `App()` component that renders `Navbar`, `Hero`, `About`, `Skills`, `ExperienceTimeline`, `Projects`, `Education`, `Contact`, and `Footer` in document order.
- Consumes: section components retain their current default exports; Tasks 2 and 3 update their props and markup.

- [ ] **Step 1: Replace the API-loading test with failing static-shell tests**

Write `frontend/src/App.test.jsx`:

```jsx
import {render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import App from './App';

test('presents Nikku as a Java backend engineer without requesting an API',()=>{
  render(<App/>);
  expect(screen.getByRole('heading',{level:1,name:/Java backend engineer/i})).toBeInTheDocument();
  expect(screen.getByText('Nikku Kumar')).toBeInTheDocument();
  expect(screen.queryByText(/portfolio unavailable/i)).not.toBeInTheDocument();
});

test('renders a natural scrolling portfolio instead of reel controls',()=>{
  render(<App/>);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading',{name:/Engineering expertise/i})).toBeInTheDocument();
  expect(screen.getByRole('heading',{name:/Selected systems/i})).toBeInTheDocument();
  expect(screen.queryByRole('button',{name:/play sequence/i})).not.toBeInTheDocument();
});

test('shows verified professional impact',()=>{
  render(<App/>);
  for(const metric of ['30+','70%','25%','15+']){
    expect(screen.getByText(metric)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run the shell tests and verify RED**

Run: `npm test -- --run src/App.test.jsx` from `frontend`.

Expected: FAIL because the current app waits for API responses, uses the name as the H1, and still renders reel controls.

- [ ] **Step 3: Add the structured local content model**

Create `frontend/src/data/portfolioData.js` with this shape and verified content:

```js
export const portfolioData = {
  profile: {
    name: 'Nikku Kumar',
    role: 'Java Backend Engineer',
    location: 'Bangalore, India',
    email: 'nikku.india05@gmail.com',
    phone: '8207676149',
    github: 'https://github.com/nikku-kumar',
    linkedin: 'https://www.linkedin.com/in/nikku-kumar-30b3a3235/',
    summary: 'Java backend developer with 2+ years of experience building dependable APIs, workflow automation, and database-driven enterprise applications.',
  },
  metrics: [
    {value:'30+',label:'REST APIs delivered'},
    {value:'70%',label:'manual effort reduced'},
    {value:'25%',label:'faster API responses'},
    {value:'15+',label:'production issues resolved'},
  ],
  principles: [
    {number:'01',title:'Reliable structure',description:'Layered services, predictable flows, and maintainable backend logic.'},
    {number:'02',title:'Performance thinking',description:'Queries and service paths shaped around measurable response improvements.'},
    {number:'03',title:'Production ownership',description:'Integration work, incident resolution, and workflows built for real operations.'},
  ],
  skillGroups: [
    {icon:'JV',category:'Core Java',description:'Object-oriented backend logic with clear control flow and robust error handling.',skills:['Java','OOP','Collections','Data Structures','Algorithms','Exception Handling']},
    {icon:'SB',category:'Spring Ecosystem',description:'Layered services and production-minded REST endpoints.',skills:['Spring Boot','Spring MVC','Spring Data JPA','Hibernate','Validation','Microservices']},
    {icon:'DB',category:'Data & Persistence',description:'Relational data design and query performance for business workflows.',skills:['PostgreSQL','MySQL','JDBC','Schema Design','Joins','Indexing','SQL Optimization']},
    {icon:'AP',category:'API Quality',description:'Predictable contracts, useful errors, and tested integrations.',skills:['REST Architecture','DTOs','Global Error Handling','Postman','JUnit','Mockito']},
    {icon:'DL',category:'Delivery & Tooling',description:'Repeatable builds and deployment-aware development.',skills:['Git','Maven','Docker','Jenkins','DBeaver','WebLogic']},
    {icon:'IN',category:'Integration',description:'Enterprise workflows that connect internal and third-party systems.',skills:['API Integration','Kafka Fundamentals','Workflow Automation','Customer Onboarding','Approval Systems','Banking & Fintech']},
  ],
  experience: [
    {
      role:'Associate Software Developer — Java Backend',company:'Rumango Software Consultancy',location:'Bangalore',period:'Nov 2024 — Present',
      highlights:['Delivered backend features for 2 enterprise platforms using Java, Spring Boot, REST APIs, JPA/Hibernate, JDBC, and SQL.','Engineered 30+ REST APIs with validation, centralized error handling, repository integration, and Postman testing.','Automated customer onboarding and internal workflows, reducing manual effort by 70%.','Optimized SQL queries and service-layer logic, improving response performance by 25%.','Resolved 15+ production issues and integrated CRB, IPRS, and Flexcube external systems.','Orchestrated approval workflows across 8+ business modules.'],
    },
    {
      role:'Java Full Stack Developer Intern',company:'Tap Academy Pvt. Ltd.',location:'Bengaluru',period:'Nov 2023 — Oct 2024',
      highlights:['Completed an 11-month internship covering Core Java, OOP, JDBC, Servlets, JSP, Spring Boot, and MySQL.','Built REST APIs using controller, service, and repository layers.','Designed MySQL schemas and queries for CRUD, joins, and filtering.','Handled API testing, request validation, and database operations.'],
    },
  ],
  projects: [
    {number:'01',name:'Spring Boot REST API Project',summary:'A focused backend service demonstrating reliable CRUD behavior and clean separation of concerns.',problem:'Create predictable data operations with validation and useful failure responses.',architecture:'Controller, service, and repository layers backed by JPA and MySQL.',impact:'Delivered four CRUD REST APIs with input validation, global error handling, and Postman test coverage.',technologies:['Java','Spring Boot','JPA','MySQL','REST APIs']},
    {number:'02',name:'Blog Application with User Roles',summary:'A database-backed publishing workflow with role-aware access.',problem:'Separate administrative content management from viewer access.',architecture:'Java web application using Spring Boot, JSP, Servlets, and MySQL.',impact:'Implemented authentication, Admin and Viewer roles, content management, and persistent user flows.',technologies:['Java','Spring Boot','JSP','Servlets','MySQL']},
  ],
  education: [{degree:'B.Tech in Computer Science',institution:'Katihar Engineering College',period:'2019 — 2023'}],
};
```

- [ ] **Step 4: Replace reel state and API loading with the scrolling composition**

Implement `App` as a stateless composition using `portfolioData`:

```jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {portfolioData} from './data/portfolioData';

export default function App(){
  const {profile,metrics,principles,skillGroups,experience,projects,education}=portfolioData;
  return <div className="site-shell">
    <Navbar/>
    <main>
      <Hero profile={profile} metrics={metrics}/>
      <About profile={profile} principles={principles}/>
      <Skills groups={skillGroups}/>
      <ExperienceTimeline items={experience}/>
      <Projects items={projects}/>
      <Education items={education}/>
      <Contact profile={profile}/>
    </main>
    <Footer profile={profile}/>
  </div>;
}
```

Create a temporary minimal `Contact` export so the shell compiles; Task 3 replaces its markup. Delete the `./reel.css` import and remove `frontend/src/reel.css`.

- [ ] **Step 5: Run the shell test and verify GREEN**

Run: `npm test -- --run src/App.test.jsx` from `frontend`.

Expected: PASS with no network mock and no loading state.

- [ ] **Step 6: Commit the local-data shell**

```bash
git add frontend/src/data/portfolioData.js frontend/src/App.jsx frontend/src/App.test.jsx frontend/src/components/Contact.jsx frontend/src/reel.css
git commit -m "feat: build static scrolling portfolio shell"
```

---

### Task 2: Accessible Navigation and Recruiter-Focused Hero

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`
- Create: `frontend/src/components/Navbar.test.jsx`
- Modify: `frontend/src/components/Hero.jsx`
- Modify: `frontend/src/App.test.jsx`

**Interfaces:**
- Consumes: `Hero({profile, metrics})`, where `profile` and `metrics` come from `portfolioData`.
- Produces: `Navbar()` with `menuOpen` state, `aria-expanded`, `aria-controls="primary-navigation"`, and hash destinations.
- Produces: `Hero({profile,metrics})` with H1 text containing `Java backend engineer`, two external/contact actions, and a four-item metric list.

- [ ] **Step 1: Write failing navigation interaction tests**

Create `frontend/src/components/Navbar.test.jsx`:

```jsx
import {fireEvent,render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import Navbar from './Navbar';

test('exposes all section destinations',()=>{
  render(<Navbar/>);
  for(const [name,href] of [['About','#about'],['Expertise','#expertise'],['Experience','#experience'],['Projects','#projects'],['Education','#education'],['Contact','#contact']]){
    expect(screen.getByRole('link',{name})).toHaveAttribute('href',href);
  }
});

test('toggles and closes the mobile navigation',()=>{
  render(<Navbar/>);
  const toggle=screen.getByRole('button',{name:/open navigation/i});
  expect(toggle).toHaveAttribute('aria-expanded','false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded','true');
  fireEvent.click(screen.getByRole('link',{name:'Projects'}));
  expect(toggle).toHaveAttribute('aria-expanded','false');
});
```

- [ ] **Step 2: Run navigation tests and verify RED**

Run: `npm test -- --run src/components/Navbar.test.jsx` from `frontend`.

Expected: FAIL because the current component has no menu button and links to `#skills` rather than `#expertise`.

- [ ] **Step 3: Implement semantic navigation state**

Implement `Navbar` with a `useState(false)` menu, a brand link named `Nikku Kumar — home`, the six exact links in the test, and a toggle button whose accessible name changes between `Open navigation` and `Close navigation`. Set `id="primary-navigation"`, `data-open={menuOpen}`, and close the menu in each link's click handler.

- [ ] **Step 4: Implement the hero presentation**

Render:

- an availability line: `Available for Java backend opportunities`;
- a small `Nikku Kumar` identity label;
- H1: `Java backend engineer building systems that hold up.`;
- concise copy derived from `profile.summary`;
- `Explore my work` linked to `#projects` and `View GitHub` linked to `profile.github`;
- the four metrics in an accessible list;
- a decorative `DeveloperProfile.java` panel containing only the verified terms `Java`, `Spring Boot`, `REST APIs`, `PostgreSQL`, `Reliable systems`, and `Bangalore, India`.

The code panel must use `aria-hidden="true"` because the same information is presented as readable page text.

- [ ] **Step 5: Run navigation and app tests and verify GREEN**

Run: `npm test -- --run src/components/Navbar.test.jsx src/App.test.jsx` from `frontend`.

Expected: both test files PASS.

- [ ] **Step 6: Commit navigation and hero**

```bash
git add frontend/src/components/Navbar.jsx frontend/src/components/Navbar.test.jsx frontend/src/components/Hero.jsx frontend/src/App.test.jsx
git commit -m "feat: add accessible navigation and backend hero"
```

---

### Task 3: Evidence-Rich Content Sections and Static Contact

**Files:**
- Modify: `frontend/src/components/About.jsx`
- Modify: `frontend/src/components/Skills.jsx`
- Modify: `frontend/src/components/ExperienceTimeline.jsx`
- Modify: `frontend/src/components/Projects.jsx`
- Modify: `frontend/src/components/Education.jsx`
- Modify: `frontend/src/components/Contact.jsx`
- Create: `frontend/src/components/PortfolioSections.test.jsx`
- Delete: `frontend/src/components/ContactForm.jsx`
- Delete: `frontend/src/components/ContactForm.test.jsx`

**Interfaces:**
- Consumes: the exact arrays and profile object exported by `portfolioData`.
- Produces: semantic sections with IDs `about`, `expertise`, `experience`, `projects`, `education`, and `contact`.
- Produces: contact URI `mailto:nikku.india05@gmail.com?subject=Java%20backend%20opportunity`.

- [ ] **Step 1: Write failing content and contact tests**

Create `frontend/src/components/PortfolioSections.test.jsx`:

```jsx
import {render,screen,within} from '@testing-library/react';
import {expect,test} from 'vitest';
import App from '../App';

test('renders curated expertise and verified experience evidence',()=>{
  render(<App/>);
  const expertise=document.querySelector('#expertise');
  expect(within(expertise).getByRole('heading',{name:'Core Java'})).toBeInTheDocument();
  expect(within(expertise).getByRole('heading',{name:'Spring Ecosystem'})).toBeInTheDocument();
  expect(screen.getByText(/8\+ business modules/i)).toBeInTheDocument();
  expect(screen.getByText(/CRB, IPRS, and Flexcube/i)).toBeInTheDocument();
});

test('presents projects as case studies',()=>{
  render(<App/>);
  const projects=document.querySelector('#projects');
  expect(within(projects).getByRole('heading',{name:'Spring Boot REST API Project'})).toBeInTheDocument();
  expect(within(projects).getByText(/Problem/i)).toBeInTheDocument();
  expect(within(projects).getByText(/Architecture/i)).toBeInTheDocument();
  expect(within(projects).getByText(/Impact/i)).toBeInTheDocument();
});

test('uses a direct email action that works on static hosting',()=>{
  render(<App/>);
  expect(screen.getByRole('link',{name:/start a conversation/i})).toHaveAttribute('href','mailto:nikku.india05@gmail.com?subject=Java%20backend%20opportunity');
  expect(screen.queryByRole('button',{name:/send message/i})).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run section tests and verify RED**

Run: `npm test -- --run src/components/PortfolioSections.test.jsx` from `frontend`.

Expected: FAIL because current sections lack the new IDs, case-study labels, curated headings, and static email action.

- [ ] **Step 3: Implement About and Expertise sections**

`About` renders `profile.summary`, a heading `Engineering with intent, not noise.`, the three `principles` cards with their number/title/description, and location/email metadata.

`Skills` uses `id="expertise"`, heading `Engineering expertise`, introduction text explaining the categories, and one article per group containing its `icon`, `category`, `description`, and every skill as a chip.

- [ ] **Step 4: Implement Experience and Project sections**

`ExperienceTimeline` renders a section header plus each role as an article with period, role, company/location, and all highlights. Use an ordered list so chronology remains meaningful without CSS.

`Projects` uses heading `Selected systems` and renders each project's number, name, summary, technologies, and a three-column definition list with labels `Problem`, `Architecture`, and `Impact`.

- [ ] **Step 5: Implement Education and Contact sections**

`Education` renders the verified B.Tech record and a `Foundation for practical engineering` heading.

`Contact` renders `Let’s build something dependable.`, availability copy, the exact prefilled `mailto:` action named `Start a conversation`, and external LinkedIn/GitHub actions. Remove `ContactForm.jsx` and its API-dependent test.

- [ ] **Step 6: Run all frontend tests and verify GREEN**

Run: `npm test -- --run` from `frontend`.

Expected: all test files PASS; no test stubs `fetch` or requires the Spring API.

- [ ] **Step 7: Commit the complete content narrative**

```bash
git add frontend/src/components frontend/src/App.test.jsx
git commit -m "feat: present backend experience as case studies"
```

---

### Task 4: Original Visual System and Responsive Experience

**Files:**
- Modify: `frontend/src/styles.css`
- Modify: `frontend/src/components/Footer.jsx`
- Modify: `frontend/index.html`
- Modify: `frontend/src/App.test.jsx`

**Interfaces:**
- Consumes: semantic class names and section structure created in Tasks 1–3.
- Produces: CSS tokens `--bg`, `--surface`, `--surface-raised`, `--text`, `--muted`, `--accent`, `--accent-blue`, `--line`, and `--max-width`.
- Produces: responsive breakpoints at `900px` and `640px`, plus `prefers-reduced-motion: reduce` handling.

- [ ] **Step 1: Add a failing document-identity assertion**

Add to `frontend/src/App.test.jsx`:

```jsx
test('uses the original Backend Systems Console identity',()=>{
  render(<App/>);
  expect(document.querySelector('.site-shell')).toHaveAttribute('data-theme','backend-systems');
  expect(screen.getByText(/Designed and built by Nikku Kumar/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the identity test and verify RED**

Run: `npm test -- --run src/App.test.jsx` from `frontend`.

Expected: FAIL because `data-theme` and the new footer copy do not exist.

- [ ] **Step 3: Add the theme hook, metadata, and footer identity**

Set `data-theme="backend-systems"` on `.site-shell`. Update `Footer` to render `Designed and built by Nikku Kumar`, the current year, and accessible GitHub/LinkedIn links. Update `index.html` description to `Nikku Kumar — Java Backend Engineer building reliable Spring Boot APIs, enterprise workflows, and data-driven systems.` and add `<meta name="theme-color" content="#090d0c">`.

- [ ] **Step 4: Implement the desktop visual system**

Replace `styles.css` with focused sections for reset/tokens, layout primitives, navigation, hero/code panel, metrics, shared section headings, principles, expertise cards, experience, projects, education, contact, footer, focus/hover states, and decorative backgrounds.

Required concrete treatments:

- `body` uses layered radial gradients over `#090d0c`, warm text, and no horizontal overflow;
- `.container` uses `width:min(var(--max-width),calc(100% - 48px))`;
- H1 uses `clamp(3.4rem,8vw,7.6rem)` with tight line-height and controlled maximum width;
- hero is a two-column grid with an asymmetric code-panel column;
- metric, expertise, and project cards use subtle translucent surfaces and one-pixel borders;
- the green accent appears on status, eyebrow labels, primary actions, metric values, and hover/focus—not on all body text;
- experience has a readable timeline treatment, and projects receive larger editorial cards than expertise;
- `:focus-visible` uses a clearly visible accent outline with offset.

- [ ] **Step 5: Implement responsive and reduced-motion behavior**

At `max-width:900px`, collapse hero/contact and larger section grids, display the navigation toggle, and position the open mobile menu below the header. At `max-width:640px`, reduce container gutters to 24px, stack actions/metrics, reduce section spacing and H1 size, and ensure chips wrap without overflow.

Add:

```css
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
```

- [ ] **Step 6: Run the full frontend suite and production build**

Run from `frontend`:

```bash
npm test -- --run
npm run build
```

Expected: all tests PASS; Vite exits 0 and writes `frontend/dist` without CSS or JSX errors.

- [ ] **Step 7: Commit the visual system**

```bash
git add frontend/src/styles.css frontend/src/components/Footer.jsx frontend/src/App.jsx frontend/src/App.test.jsx frontend/index.html
git commit -m "feat: craft backend systems visual identity"
```

---

### Task 5: GitHub Pages Build and Publication

**Files:**
- Modify: `frontend/vite.config.js`
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`

**Interfaces:**
- Produces: Vite `base` value `/portfolio/` for production and `/` for development.
- Produces: GitHub Actions workflow that tests, builds, uploads `frontend/dist`, and deploys it with Pages permissions.

- [ ] **Step 1: Verify the current production build lacks the repository base path**

Run from `frontend`:

```powershell
npm run build
Select-String -Path dist\index.html -Pattern '/portfolio/assets/'
```

Expected: the build succeeds but the search returns no match because assets currently use `/assets/`.

- [ ] **Step 2: Configure Vite's production base path**

Update `vite.config.js`:

```js
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({command})=>({
  base:command==='build'?'/portfolio/':'/',
  plugins:[react()],
  server:{port:5173},
  test:{environment:'jsdom',setupFiles:'./src/testSetup.js'},
}));
```

- [ ] **Step 3: Verify the base path test now succeeds**

Run from `frontend`:

```powershell
npm run build
Select-String -Path dist\index.html -Pattern '/portfolio/assets/'
```

Expected: Vite exits 0 and the search prints the asset URLs containing `/portfolio/assets/`.

- [ ] **Step 4: Add the Pages deployment workflow**

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: frontend/dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

The existing `frontend/package-lock.json` must be reviewed and committed because `npm ci` and the workflow cache require it; do not regenerate or overwrite it unless `npm install` proves it inconsistent with `package.json`.

- [ ] **Step 5: Document local and public access**

Update `README.md` to retain backend/local instructions and add a `Live portfolio` section with `https://nikku-kumar.github.io/portfolio/`, plus a note that GitHub Pages hosts the static frontend and the backend remains a separate demonstration service.

- [ ] **Step 6: Run deployment-relevant verification**

Run from `frontend`:

```bash
npm ci
npm test -- --run
npm run build
```

Then from the repository root run:

```powershell
Select-String -Path frontend\dist\index.html -Pattern '/portfolio/assets/'
git diff --check
```

Expected: clean install succeeds, all tests PASS, build exits 0, generated assets use the repository base path, and `git diff --check` prints no errors.

- [ ] **Step 7: Commit deployment configuration**

```bash
git add frontend/vite.config.js frontend/package-lock.json .github/workflows/deploy-pages.yml README.md
git commit -m "ci: deploy portfolio to GitHub Pages"
```

---

### Task 6: Browser Verification and Completion Audit

**Files:**
- Modify only files with defects discovered by the verification below.

**Interfaces:**
- Consumes: the completed static frontend and Pages build.
- Produces: evidence that the approved design works at desktop and mobile viewport sizes before publication.

- [ ] **Step 1: Start the production preview**

Run from `frontend`: `npm run preview -- --host 127.0.0.1`.

Expected: Vite reports a reachable preview URL under `/portfolio/` and keeps running.

- [ ] **Step 2: Inspect the desktop experience**

Open the preview at a desktop viewport around `1440x900`. Verify the sticky navigation, hero hierarchy, code visual, four metrics, all six content sections, footer, external links, section anchors, and absence of horizontal overflow or overlapping text.

- [ ] **Step 3: Inspect the mobile experience**

Open the same preview around `390x844`. Verify the menu opens/closes, every destination is reachable, H1 and code panel fit, actions and metrics stack, project/experience content remains readable, and no content extends beyond the viewport.

- [ ] **Step 4: Inspect keyboard and reduced-motion behavior**

Navigate all interactive elements with Tab and Shift+Tab, confirming a visible focus ring and logical order. Emulate `prefers-reduced-motion: reduce` and confirm smooth scrolling and nonessential transitions are removed without hiding content.

- [ ] **Step 5: Fix each discovered defect test-first**

For any behavioral defect, add the smallest failing Vitest/Testing Library regression test, run it to confirm the expected failure, apply the minimal fix, and rerun the focused test. For a visual-only responsive defect, adjust the smallest relevant CSS rule and repeat the exact viewport check.

- [ ] **Step 6: Run the final verification suite**

Run from `frontend`:

```bash
npm ci
npm test -- --run
npm run build
```

Run from the repository root:

```powershell
git diff --check
git status -sb
```

Expected: install, tests, and build exit 0; diff check is clean; status contains only intentional portfolio redesign files.

- [ ] **Step 7: Commit any browser-verification corrections**

If Step 5 changed files:

```bash
git add <only-the-verified-fix-files>
git commit -m "fix: polish responsive portfolio experience"
```

- [ ] **Step 8: Publish and verify the public URL**

Push `main` only with user-authorized GitHub access. In repository Settings → Pages, select `GitHub Actions` as the source if it is not already selected. Wait for `Deploy portfolio to GitHub Pages` to pass, then load `https://nikku-kumar.github.io/portfolio/` and verify it returns the built page rather than a 404.

