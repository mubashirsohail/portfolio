# Mubashir Sohail — Portfolio

Personal portfolio for **Mubashir Sohail, Full-Stack & AI Engineer**. Built with Next.js (App Router), React 19, TypeScript, Tailwind CSS 3, Lucide React and Motion (`motion/react`).

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Requires Node 20+. Fonts (Inter, Fraunces, JetBrains Mono) are self-hosted in `app/fonts`, so builds never need Google Fonts.

## Where to edit content

| What | File |
|---|---|
| Name, contact details, links, hero/about/contact copy, nav, highlights | `data/personal.ts` |
| Skills | `data/skills.ts` |
| Experience timeline | `data/experience.ts` |
| Projects (status, tech, links) | `data/projects.ts` |
| Services & contact-form service options | `data/services.ts` |
| Strengths, education, process | `data/content.ts` |

Personal info lives only in `data/personal.ts` — components import it.

### Projects & honesty rules
Each project has a `status` (`completed` · `in-progress` · `concept`). Technologies carry a `proposed` flag; proposed tech renders with a dashed chip and is labelled on detail pages. Add `links: { github, live }` to a project **only when they exist** — the card/detail page then shows the buttons automatically. Nothing is fabricated: GoTogether and the Hospital Management System are shown as concepts.

## Contact form (needs setup to actually send)
`POST /api/contact` validates on the client and again on the server (`lib/validation.ts`), includes a honeypot and a basic in-memory rate limit, and sends through [Resend](https://resend.com) using plain `fetch`.

1. Create a Resend API key.
2. Copy `.env.example` → `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (a verified sender; the default `onboarding@resend.dev` only delivers to the Resend account owner's address).
3. On Vercel add the same variables under *Project → Settings → Environment Variables*.

**Until configured, the form does not pretend to work**: the API returns `503 not_configured`, the UI says the message was *not* sent and offers a pre-filled `mailto:` fallback. Success is only shown when the provider accepts the email. For strict rate limiting on serverless, swap the in-memory map for a shared store (e.g. Upstash).

## CV download
`public/cv/Mubashir-Sohail-CV.pdf` was generated from the verified details by `scripts/generate-cv.py` (`pip install reportlab`). To use your own CV, overwrite that file (or change `personal.cv` in `data/personal.ts`). The three Download CV buttons (hero, About, footer) link directly to it.

## Portrait
The hero shows a clearly labelled **portrait placeholder** (`components/sections/HeroVisual.tsx`). To use a photo, add it to `public/images/` and replace the placeholder block with a `next/image`.

## Structure
```
app/            layout, home, /projects, /projects/[slug], /api/contact, fonts
components/
  effects/      AnimatedBackground, GradientOrb, PageLoader, useSpotlight
  layout/       Navbar (+ mobile menu), Footer, BackToTop
  sections/     Hero, About, Highlights, Skills, ProjectsPreview, Experience,
                Services, Strengths, Education, Process, Contact(+Form)
  ui/           AnimatedButton, GradientBorderCard, GradientText, Reveal/Stagger,
                SectionHeading, ProjectCard/Visual/Explorer, TechChip, StatusBadge …
data/  lib/  public/  scripts/
```

## Motion, performance & accessibility
- Continuous background motion is CSS-only (keyframes on transform) with radial-gradient orbs instead of full-screen blur filters.
- Scroll reveals run once. Pointer effects (magnetic buttons, card spotlight) respond only to a real mouse and never block clicks, scrolling or keyboard use. Decorative layers have `pointer-events: none`.
- `prefers-reduced-motion`: `MotionConfig reducedMotion="user"` drops transforms to opacity-only, orbs/streaks are hidden, magnetic effects are off, and the intro loader is skipped. All functionality still works.
- The "MS" intro loader shows once per browser session, auto-dismisses in ~1.5 s, never blocks input, and is hidden pre-paint on repeat visits.
- Skip link, semantic landmarks, `aria-current` nav state, `aria-expanded` mobile menu (Escape closes, scroll locked), labelled form fields with `role="alert"` errors.

## Deploy to Vercel
Push to GitHub → *Import Project* on Vercel (framework auto-detected) → add the env vars above → deploy. Set `NEXT_PUBLIC_SITE_URL` to your domain.

## Notes
- `lucide-react` v1 has no brand icons, so GitHub/LinkedIn marks are inline SVGs in `components/ui/BrandIcons.tsx`.
- The reference site (sufyandev.com) was not fetched during the build; the design is an original implementation following the brief.
