/**
 * Central place for chapter copy and media paths.
 *
 * Events: upcoming events load from Google Calendar via GOOGLE_CALENDAR_ICAL_URL
 * (see .env.example). No code changes when you add or edit events in Google.
 *
 * Lineage: primary source is Google Sheets when GOOGLE_SHEETS_LINEAGE_SPREADSHEET_ID
 * is set (see .env.example). Otherwise use `chapterLineage` below as fallback.
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
  address: {
    line1: "George Mason University",
    line2: "Fairfax, VA 22030",
  },
  social: {
    instagram: "https://www.instagram.com/iotaalpha1906/",
    linkedin:
      "https://www.linkedin.com/company/alpha-phi-alpha-fraternity-inc-iota-alpha-chapter/",
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
  /** Advising/graduate chapter — file lives in `public/photos/`. */
  graduateChapter: "/photos/xi-alpha-lambda.jpg",
} as const;

export const aboutCopy = {
  eyebrow: "About Our Chapter",
  heading: "A Legacy of Leadership Since 1986",
  body: `The Iota Alpha Chapter carries forward the timeless mission of Alpha Phi Alpha Fraternity, Inc. at George Mason University. We cultivate disciplined leaders, sharpen academic excellence, and anchor our work in service to the campus and Fairfax community. Through mentorship, programming, and brotherhood, we strive to live the example set since 1906—First of All; Servants of All; We shall Transcend All.`,
} as const;

/** Shown in the about section list (label + value). */
export const aboutMeta = [
  { label: "Fraternity Founded", value: "December 4th, 1906" },
  { label: "Chapter Chartered", value: "December 7th, 1986" },
  { label: "Chapter Seat", value: "George Mason University, Fairfax, VA" },
] as const;

/**
 * Chapter lineage fallback (when Google Sheets env is not set or export fails).
 *
 * **Non-coders:** Use the Google Sheet instead (see `.env.example`).
 *
 * Sheet layout (when using Google Sheets): row 1 = Line Name, Semester/Year,
 * Member 1, Member 2, … Each later row = one line.
 */
export type ChapterLineageEntry = {
  /** Shown as “[Semester/Year]: [Line Name]” when semester is present (see sheet parser). */
  lineName: string;
  /** All brothers who crossed on the line (list each on its own string). */
  members: readonly string[];
};

export const chapterLineage: readonly ChapterLineageEntry[] = [
  // Paste from your records, e.g.:
  // {
  //   lineName: "Fall 2024: The Example Line",
  //   members: ["Bro. One", "Bro. Two"],
  // },
];

export const graduateChapter = {
  name: "Xi Alpha Lambda",
  website: "https://www.xal1906.com/",
} as const;

export const graduateChapterCopy = {
  eyebrow: "Our Advising/Graduate Chapter",
  heading: graduateChapter.name,
  body: `Xi Alpha Lambda (XAL) Chapter of Alpha Phi Alpha Fraternity, Inc. serves the Prince William County area of Virginia. For more than 30 years, XAL has been a leading graduate chapter in the Eastern Region, supporting Alpha’s mission through service, programs, and leadership—and as the advising chapter to Iota Alpha.`,
} as const;

/**
 * Executive board
 *
 * Primary source: Google Sheet when `GOOGLE_SHEETS_EXECUTIVE_BOARD_SPREADSHEET_ID` is set.
 * `executiveBoard` below is the fallback; `executiveBoardHeadshots` maps **lower-case**
 * names from the sheet to paths under `public/` (covers spelling variants).
 */
export type ExecutiveBoardMember = {
  name: string;
  photo: string | null;
  position: string;
};

/** Keys must be `name.trim().toLowerCase()` as it appears on the sheet. */
export const executiveBoardHeadshots: Record<string, string> = {
  "cameron portis": "/Leadership_Headshots/CPortis_Headshot.jpg",
  "cameron porits": "/Leadership_Headshots/CPortis_Headshot.jpg",
  "teondre nash": "/Leadership_Headshots/TNash_Headshot.jpeg",
  "aaron emenhiser": "/Leadership_Headshots/AEmenhiser_Headshot.jpeg",
  "aaron emenhise": "/Leadership_Headshots/AEmenhiser_Headshot.jpeg",
};

export const executiveBoard: ExecutiveBoardMember[] = [
  {
    name: "Cameron Portis",
    photo: "/Leadership_Headshots/CPortis_Headshot.jpg",
    position: "President",
  },
  {
    name: "Teondre Nash",
    photo: "/Leadership_Headshots/TNash_Headshot.jpeg",
    position: "Treasurer",
  },
  {
    name: "Aaron Emenhiser",
    photo: "/Leadership_Headshots/AEmenhiser_Headshot.jpeg",
    position: "Secretary",
  },
];
