// ---------------------------------------------------------------------------
// All editable portfolio content lives here. Swap the placeholder text/links
// below for your own — nothing elsewhere in the app needs to change.
// ---------------------------------------------------------------------------

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
}

export const profile = {
  name: "Your Name",
  role: "Software Engineer",
  tagline: "I build things for the web.",
  bio: "Replace this with a couple of sentences about who you are, what you work on, and what you're into. Keep it short — this is the kind of thing people skim while a little character walks around a floating island.",
  location: "Somewhere, Earth",
};

export const projects: ProjectEntry[] = [
  {
    id: "project-1",
    title: "Project One",
    description:
      "A short description of the first project — what it does, what problem it solves, and what you used to build it.",
    tags: ["TypeScript", "React"],
    link: "https://example.com",
    repo: "https://github.com/your-username/project-one",
  },
  {
    id: "project-2",
    title: "Project Two",
    description:
      "A short description of the second project. Swap this out with something real from your portfolio.",
    tags: ["Node.js", "PostgreSQL"],
    link: "https://example.com",
    repo: "https://github.com/your-username/project-two",
  },
  {
    id: "project-3",
    title: "Project Three",
    description:
      "A third project entry. Add or remove entries freely — the world generates one pedestal per project automatically.",
    tags: ["Python", "ML"],
    repo: "https://github.com/your-username/project-three",
  },
];

export const socials = [
  { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
  { label: "GitHub", value: "github.com/your-username", href: "https://github.com/your-username" },
  { label: "LinkedIn", value: "linkedin.com/in/your-username", href: "https://linkedin.com/in/your-username" },
];

// Drop your résumé PDF in /public and point this at it, e.g. "/resume.pdf".
export const resumeUrl = "/resume.pdf";
