# Developer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally runnable full-stack developer portfolio for Nikku Kumar.

**Architecture:** A Spring Boot REST API owns seeded portfolio content and persists contact messages through Spring Data JPA. A React/Vite single-page frontend loads each content section from the API and submits the contact form back to it.

**Tech Stack:** Java 17, Spring Boot 3.4, Maven, JPA, Bean Validation, H2/PostgreSQL, React 18, Vite, Vitest, Testing Library, CSS.

**Spec:** User-approved requirements in the 2026-08-23 conversation.

## Global Constraints

- Use `backend` and `frontend` top-level folders.
- Keep all portfolio content in API seed data rather than frontend constants.
- Enable the H2 local profile by default and PostgreSQL through environment variables.
- Expose profile, skills, experience, projects, education, and contact endpoints under `/api`.
- Include DTOs, service/repository layers, validation, global errors, and React CORS.
- Keep styling simple, modern, responsive, and accessible.

---

### Task 1: Backend portfolio read API

**Files:**
- Create: `backend/pom.xml`, `backend/src/main/resources/application.yml`
- Create: `backend/src/main/java/com/nikkukumar/portfolio/**`
- Test: `backend/src/test/java/com/nikkukumar/portfolio/controller/PortfolioControllerTest.java`

**Interfaces:**
- Produces: `GET /api/profile`, `/api/skills`, `/api/experience`, `/api/projects`, `/api/education` JSON responses.

- [ ] Write MVC tests asserting every read endpoint returns seeded resume data.
- [ ] Run `mvn test` and verify the tests fail because the API is absent.
- [ ] Add entities, repositories, DTOs, mappers/services, controllers, CORS, and startup seed data.
- [ ] Run `mvn test` and verify the read API tests pass.

### Task 2: Validated contact API

**Files:**
- Create: `backend/src/main/java/com/nikkukumar/portfolio/contact/**`
- Create: `backend/src/main/java/com/nikkukumar/portfolio/common/**`
- Test: `backend/src/test/java/com/nikkukumar/portfolio/controller/ContactControllerTest.java`

**Interfaces:**
- Consumes: `{name,email,subject,message}` at `POST /api/contact`.
- Produces: HTTP 201 with a confirmation message; HTTP 400 with field errors for invalid input.

- [ ] Write MVC tests for successful storage and invalid email/blank fields.
- [ ] Run the focused tests and verify expected failures.
- [ ] Implement DTO validation, persistence service/controller, and global exception response.
- [ ] Run all backend tests and verify they pass.

### Task 3: React portfolio UI

**Files:**
- Create: `frontend/package.json`, Vite configuration and entry files.
- Create: `frontend/src/api/portfolioApi.js`, `frontend/src/App.jsx`, section components, and `frontend/src/styles.css`.
- Test: `frontend/src/App.test.jsx`, `frontend/src/components/ContactForm.test.jsx`.

**Interfaces:**
- Consumes: all backend GET endpoints and `POST /api/contact`.
- Produces: responsive semantic sections, navigation links, external profile links, loading/error states, and contact feedback.

- [ ] Write component tests for API-loaded profile content and contact submission.
- [ ] Run `npm test -- --run` and verify expected failures.
- [ ] Implement the API client, page components, form state, and responsive CSS.
- [ ] Run frontend tests and production build; fix any failures.

### Task 4: Local setup documentation and final verification

**Files:**
- Create: `README.md`, `.gitignore`.

**Interfaces:**
- Documents Java/Node prerequisites, local commands, PostgreSQL variables, endpoint list, and production build commands.

- [ ] Document backend and frontend startup plus database configuration.
- [ ] Run the complete backend test suite.
- [ ] Run frontend tests and production build.
- [ ] Check the generated tree and requirements list for omissions.
