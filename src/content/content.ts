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
  name: "Prabhakar Pandey",
  role: "Technical Lead",
  tagline: "I build scalable backend systems and the frontends that make them usable.",
  bio: "Technical Lead with 10+ years building high-performance, scalable applications — mostly Java/Spring Boot backends paired with React or Angular frontends. I like the kind of work that shows up as a real number afterward: faster response times, fewer errors, less manual effort.",
  location: "Bangalore, India",
};

// Pulled from real work, described without naming employers.
export const projects: ProjectEntry[] = [
  {
    id: "colleague-events-platform",
    title: "Colleague Events Platform",
    description:
      "A large, multi-module backend powering colleague event processing and related services — feedback, profiles, org structure, performance, notifications, reporting. Built as clean, independently-owned Gradle modules behind OpenAPI-generated REST controllers.",
    tags: ["Java 17", "Spring Boot 3", "Gradle", "OpenAPI", "React"],
  },
  {
    id: "claims-processing",
    title: "Medical Claims Processing",
    description:
      "Reworked the backend and frontend of a medical claims pipeline: cut processing time by 38% (13min → 8min), enabled straight-through processing to cut manual approvals by 25%, and improved document workflows (questionnaires, claim forms, lab reports) for a 25% speedup and 30% better accuracy.",
    tags: ["Java", "Spring Boot", "React", "Kafka", "AWS"],
  },
  {
    id: "hts-classifier",
    title: "ML-Powered Trade Code Classifier",
    description:
      "Designed and shipped a machine-learning classifier for HTS trade codes, cutting classification errors by 60%. Also improved the surrounding microservices' API response times by 40%.",
    tags: ["Java", "Angular", "Spring Boot", "Machine Learning", "AWS"],
  },
  {
    id: "sso-db-monitoring",
    title: "SSO & Live DB Monitoring",
    description:
      "Integrated OAuth/SAML-based single sign-on, improving authentication security by 50%, and designed a RESTful service for real-time Oracle/SQL Server monitoring that cut troubleshooting time by 35%.",
    tags: ["Java", "OAuth", "SAML", "SQL Server", "Oracle"],
  },
];

export const socials = [
  { label: "Email", value: "nginx.prab@gmail.com", href: "mailto:nginx.prab@gmail.com" },
  { label: "GitHub", value: "github.com/prab2112", href: "https://github.com/prab2112" },
  // TODO: add LinkedIn/Twitter/etc if you want them listed, same prab2112 handle or otherwise
];

// Résumé not uploaded yet — this link is a placeholder until you drop a PDF
// at public/resume.pdf and flip this back to "/resume.pdf".
export const resumeUrl = "";
