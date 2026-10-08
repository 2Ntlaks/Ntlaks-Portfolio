import { PUBLIC_STATS } from "./publicStats";

const { udemyLearners, udemyCountries, udemyLectures, udemyPublicReviews } =
  PUBLIC_STATS;

export const EMAIL = "ntlakaniphomgaguli210@gmail.com";

export const LINKS = {
  tutoring: "https://mgagulitutoring.dev",
  udemy: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
  github: "https://github.com/2Ntlaks",
  linkedin: "https://www.linkedin.com/in/ntlakanipho-mgaguli-36a1ab319/",
  youtube: "https://www.youtube.com/@ntlakaniphomgaguli",
  tiktok: "https://www.tiktok.com/@ntlakanipho_mgaguli",
  /* Served by the Netlify /writing proxy — always a plain <a>, never a router Link. */
  writing: "/writing",
  cv: "/ntlaks-resume-2025.pdf",
};

/* Section designators: each section is a header (J1…J5) on the board. */
export const SECTIONS = [
  { id: "about", ref: "J1", label: "About" },
  { id: "skills", ref: "J2", label: "Skills" },
  { id: "projects", ref: "J3", label: "Projects" },
  { id: "writing", ref: "J4", label: "Notes" },
  { id: "contact", ref: "J5", label: "Contact" },
];

/*
  DIP-14 pinout, numbered the way a real chip is: 1–7 down the left side,
  8–14 back up the right. Pin 7 is GND and pin 14 is VCC, as on a 74xx part.
*/
export const PINS = [
  { n: 1, name: "C", note: "Systems and embedded work. The language I tutor most and the one that taught me how memory really behaves." },
  { n: 2, name: "Java", note: "Backend and desktop apps, from a full banking system to an 11-part Swing tutorial series for my students." },
  { n: 3, name: "JavaScript", note: "Web and graphics. Everything in the browser, including the shader running on the screen up top." },
  { n: 4, name: "Python", note: "Scripting, tooling and quick experiments when I need an answer more than an app." },
  { n: 5, name: "WebGL · GLSL", note: `Raw GL and shaders, no libraries. I teach this to ${udemyLearners}+ students in a ${udemyLectures}-lecture Udemy course.` },
  { n: 6, name: "React", note: "This site, the NDC Visualizer and the tools I build for my students." },
  { n: 7, name: "GND · Fundamentals", short: "GND", note: "Everything else is measured against this. Data structures, memory, maths: the reference every other pin relies on.", power: true },
  { n: 8, name: "MySQL", note: "Relational modelling and the persistence layer behind the Java bank application." },
  { n: 9, name: "Git · GitHub", note: "Version control for every project, collaboration and CI." },
  { n: 10, name: "HTML · Tailwind", short: "Tailwind", note: "Semantic markup and styling systems. This page is built with both." },
  { n: 11, name: "ESP32", note: "Sensors, relays, buzzers and OLED screens on the breadboard. The real version of the hero above." },
  { n: 12, name: "Raspberry Pi", note: "Linux on small boards, GPIO, and a multimeter never far away." },
  { n: 13, name: "AI agents", note: "Claude Code and Codex in the loop. I direct the agents; I own the engineering." },
  { n: 14, name: "VCC · Curiosity", short: "VCC", note: "The supply rail. Powers every other pin on this chip.", power: true },
];

export const FEATURED = [
  {
    ref: "MOD-01",
    title: "Mgaguli Tutoring",
    description:
      "My tutoring practice, productized. A private learning portal where university students book one-on-one sessions in C, Java and engineering fundamentals, follow structured tracks and get unstuck with someone who has sat in their seat.",
    tags: ["Education", "In production"],
    link: LINKS.tutoring,
    linkLabel: "mgagulitutoring.dev",
    color: "#1d4fb8",
  },
  {
    ref: "MOD-02",
    title: "Java Bank Application",
    description:
      "A full-stack banking system in Java with MySQL: account management, transaction history and complete CRUD, with a custom security layer for authentication and safe data handling.",
    tags: ["Java", "MySQL", "Security"],
    link: "https://github.com/2Ntlaks/Bank-Management-System",
    linkLabel: "View source",
    color: "#1c1d20",
  },
];

export const INDEX = [
  {
    ref: "MOD-03",
    title: "WebGL for Beginners",
    description: `Udemy course that makes 3D graphics approachable: ${udemyLectures} lectures, ${udemyLearners}+ students in ${udemyCountries}+ countries, ${udemyPublicReviews} public reviews.`,
    tags: ["Course", "WebGL"],
    link: LINKS.udemy,
    linkLabel: "Udemy",
    color: "#4a2a7a",
  },
  {
    ref: "MOD-04",
    title: "WebGL NDC Visualizer",
    description:
      "Teaching tool for normalized device coordinates: click to place vertices, preview all 7 primitive types live, copy the shader code.",
    tags: ["React", "WebGL"],
    link: "https://github.com/2Ntlaks/WebGL-NDC-Visualizer",
    linkLabel: "View source",
    color: "#13603f",
  },
  {
    ref: "MOD-05",
    title: "Car in WebGL",
    description:
      "A 2D car in raw WebGL with no libraries. Two versions that walk through triangulation, shaders and matrix-driven animation.",
    tags: ["GLSL", "WebGL"],
    link: "https://github.com/2Ntlaks/Car-in-WebGL",
    linkLabel: "View source",
    color: "#a8261d",
  },
];

export const POSTS = {
  feature: {
    kicker: "Case study · Solo project",
    date: "3 Jul 2026",
    iso: "2026-07-03",
    title: "Building a private learning portal for my tutoring students,",
    titleTail: "from the fundamentals up",
    blurb:
      "How I designed, built, secured and launched a production learning platform for South African university students: the architecture, the access-control model and the tradeoffs I chose on purpose.",
    href: "/writing/building-mgaguli-tutoring-portal",
  },
  series: {
    kicker: "Tutorial series · 11 lessons",
    date: "3 Aug 2026",
    iso: "2026-08-03",
    title: "Java Swing tutorials",
    blurb:
      "A practical course for students who want to write, run and understand their own desktop GUI programs, ending with three real tools: a login form, a data-bundle calculator and a grade calculator.",
    href: "/writing/java-swing-tutorials",
    lessons: 11,
  },
};
