/**
 * Central place for chapter copy and media paths.
 *
 * Replace images:
 * - Swap `heroImage`, `aboutImage`, and `brotherhoodGallery` URLs with files in `/public`
 *   (e.g. `/photos/hero.jpg`) and remove remotePatterns from `next.config.ts` if not needed.
 *
 * Replace branding:
 * - Update `CrestLogo` in `Navbar.tsx` / `Footer.tsx` to use your crest PNG/SVG from `/public`.
 */

export const site = {
  chapterLine: "Iota Alpha Chapter",
  fraternityLine: "Alpha Phi Alpha Fraternity, Inc.",
  universityLine: "George Mason University",
  /** Inbox for the inquiry form (mailto:). Public in HTML source when using the client mail flow. */
  inquiryInbox: "iotaalpha1906@gmail.com",
  address: {
    line1: "George Mason University",
    line2: "Fairfax, VA 22030",
  },
  social: {
    instagram: "https://www.instagram.com/iotaalpha1906/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

/** Placeholder photography — replace with chapter assets in `/public`. */
export const images = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80",
  about: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  brotherhood: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b055de1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  ],
} as const;

export const aboutCopy = {
  eyebrow: "About Our Chapter",
  heading: "A Legacy of Leadership Since 1986",
  body: `The Iota Alpha Chapter carries forward the timeless mission of Alpha Phi Alpha Fraternity, Inc. at George Mason University. We cultivate disciplined leaders, sharpen academic excellence, and anchor our work in service to the campus and Fairfax community. Through mentorship, programming, and brotherhood, we strive to live the example set since 1906—First of All; Servants of All; We shall Transcend All.`,
} as const;

/**
 * Executive board (3 members × 3 positions each)
 *
 * Edit this array in THIS file (`src/site/content.ts`):
 * - `name` — full name as shown on the card (ALL CAPS recommended for display match).
 * - `photo` — URL from site root: whatever sits under `public/`. E.g. `public/Leadership_Headshots/x.jpg`
 *   → `"/Leadership_Headshots/x.jpg"`. Never prefix with `public/` or the repo folder name.
 * - `positions` — exactly three role titles, top to bottom.
 */
export type ExecutiveBoardMember = {
  name: string;
  photo: string | null;
  positions: readonly [string, string, string];
};

export const executiveBoard: ExecutiveBoardMember[] = [
  {
    name: "Cameron Portis",
    photo: "/Leadership_Headshots/CPortis_Headshot.jpg",
    positions: ["President", "Director of Educational Activities", "Chaplin"],
  },
  {
    name: "Teondre Nash",
    photo: "/Leadership_Headshots/TNash_Headshot.jpeg",
    positions: ["Vice President", "Treasurer", "Intake Coordinator"],
  },
  {
    name: "Aaron Emenhiser",
    photo: "/Leadership_Headshots/AEmenhiser_Headshot.jpeg",
    positions: ["Secretary", "Associate Editor to the Sphinx", "Historian"],
  },
];
