import { PUBLIC_STATS } from "./publicStats";
import tutoringImg from "../assets/work/tutoring-portal.jpg";
import paymentsImg from "../assets/work/payments-api.jpg";
import ndcImg from "../assets/work/ndc-visualizer.jpg";
import courseImg from "../assets/work/webgl-course.jpg";
import kitImg from "../assets/work/ai-workflow-kit.jpg";
import esp32Img from "../assets/bench/esp32-breadboard.jpg";

const {
  udemyLearners,
  udemyCountries,
  udemyRating,
  tutoringStudents,
  tutoringSince,
  tutoringPricePerMonth,
} = PUBLIC_STATS;

export const EMAIL = "ntlakaniphomgaguli210@gmail.com";

export const LINKS = {
  tutoring: "https://mgagulitutoring.dev",
  tutoringFreeLessons: "https://mgagulitutoring.dev/#free-lessons",
  udemy: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
  github: "https://github.com/2Ntlaks",
  linkedin: "https://www.linkedin.com/in/ntlakanipho-mgaguli-36a1ab319/",
  youtube: "https://www.youtube.com/@ntlakaniphomgaguli",
  tiktok: "https://www.tiktok.com/@ntlakanipho_mgaguli",
  workflowKit: "https://github.com/2Ntlaks/ai-native-workflow-kit",
  /* Served by the Netlify /writing proxy — always a plain <a>, never a router Link. */
  writing: "/writing",
  cv: "/ntlaks-resume-2025.pdf",
};

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "tutoring", label: "Tutoring" },
  { id: "contact", label: "Contact" },
];

/* Every skill is visible at once, grouped, each group with its proof. */
export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["C", "Java", "JavaScript", "TypeScript", "Python", "SQL"],
    proof: "C and Java are what I tutor most, so I know them well enough to explain them.",
  },
  {
    title: "Graphics",
    items: ["WebGL", "GLSL shaders"],
    proof: `Raw WebGL with no libraries. I teach it to ${udemyLearners}+ students on Udemy.`,
  },
  {
    title: "Web & backend",
    items: ["React", "Spring Boot", "PostgreSQL", "MySQL", "Vite", "Tailwind"],
    proof: "A Spring Boot payments API with a React dashboard, and a tutoring portal in production.",
  },
  {
    title: "Hardware",
    items: ["ESP32", "Raspberry Pi", "I²C sensors & displays", "Bench debugging"],
    proof: "My final-year project runs on an ESP32.",
  },
  {
    title: "Tools & workflow",
    items: ["Git & GitHub", "Claude Code", "Codex", "OpenAPI"],
    proof: "AI agents in the loop, with written briefs and every diff reviewed by me.",
  },
];

/*
  Project cards. `kind` sets the board colour, so colour means something:
  product = blue, teaching = purple, tooling = black, hardware = green.
*/
export const KINDS = {
  product: { label: "Product", color: "#1d4fb8" },
  teaching: { label: "Teaching", color: "#4a2a7a" },
  tooling: { label: "Tooling", color: "#1c1d20" },
  hardware: { label: "Hardware", color: "#13603f" },
};

export const FEATURED = [
  {
    kind: "product",
    title: "Mgaguli Tutoring",
    status: "In production",
    image: tutoringImg,
    imageAlt: "The Mgaguli Tutoring home page: learn C, Java and computer graphics from the fundamentals up",
    description:
      "A private learning portal for university students learning C, Java and computer graphics. Each student gets their own portal with lessons, notes and code, plus one-on-one sessions.",
    outcome: `${tutoringStudents}+ students since ${tutoringSince} · R${tutoringPricePerMonth} a month per course`,
    tags: ["Next.js", "Supabase", "Access control"],
    links: [
      { label: "mgagulitutoring.dev", href: LINKS.tutoring, primary: true },
      { label: "Case study", href: "/writing/building-mgaguli-tutoring-portal", internal: true },
    ],
  },
  {
    kind: "product",
    title: "SA Fintech Payments API",
    status: "Simulation",
    image: paymentsImg,
    imageAlt: "Payments API merchant dashboard showing gross, fees and settled amounts in rand, and a reconciled payment",
    description:
      "A Java backend that simulates the full merchant payment lifecycle in rands: JWT-scoped merchants, idempotent payments, webhook deduplication, refunds, settlement, reconciliation and audit logs, with a React dashboard to drive it.",
    outcome: "Money in BigDecimal and NUMERIC(19,2). Never touches real money.",
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "React + TS"],
    links: [{ label: "Source", href: "https://github.com/2Ntlaks/sa-fintech-payments-api", primary: true }],
  },
];

export const IN_PROGRESS = {
  kind: "hardware",
  title: "Final-year project on the ESP32",
  status: "Releasing soon",
  image: esp32Img,
  imageAlt: "An ESP32 on a breadboard wired to an OLED screen, a relay and a buzzer, powered by an 18650 battery",
  description:
    "My final-year Computer Engineering project, built on an ESP32 with an OLED display, a relay and battery power. The write-up and source go live when it's released.",
};

export const INDEX = [
  {
    kind: "teaching",
    title: "WebGL NDC Visualizer",
    image: ndcImg,
    imageAlt: "The NDC Visualizer with three vertices placed on a grid and the resulting blue triangle rendered in WebGL",
    description:
      "Click to place vertices in clip space and watch WebGL draw them. Previews all 7 primitive types and gives you the shader code.",
    tags: ["React", "WebGL"],
    links: [
      { label: "Live demo", href: "https://webgl-ndc-visualizer.netlify.app/", primary: true },
      { label: "Source", href: "https://github.com/2Ntlaks/WebGL-NDC-Visualizer" },
    ],
  },
  {
    kind: "teaching",
    title: "WebGL for Beginners",
    image: courseImg,
    imageAlt: "A gradient triangle beside the fragment shader that colours it",
    description: "My Udemy course: 3D graphics from the first triangle up, in raw WebGL.",
    outcome: `${udemyLearners}+ students · ${udemyCountries}+ countries · ${udemyRating}★`,
    tags: ["Course", "WebGL"],
    links: [{ label: "On Udemy", href: LINKS.udemy, primary: true }],
  },
  {
    kind: "tooling",
    title: "AI-Native Workflow Kit",
    image: kitImg,
    imageAlt: "Workflow from task brief to bounded fix, tests, review packet and human diff review",
    description:
      "My operating manual for handing work to AI coding agents without blind trust: task briefs, autonomy levels, checklists and review packets.",
    tags: ["Markdown", "Claude Code", "Codex"],
    links: [{ label: "Read it", href: LINKS.workflowKit, primary: true }],
  },
];

export const TIMELINE = [
  { when: "2026", what: "Final-year project on the ESP32", note: "Releasing soon" },
  { when: "Aug 2026", what: "Published an 11-lesson Java Swing tutorial series" },
  { when: "Jul 2026", what: "Launched the Mgaguli Tutoring learning portal" },
  { when: "May 2026", what: "Built the SA Fintech Payments API and the AI-Native Workflow Kit" },
  {
    when: `${tutoringSince} – now`,
    what: `Tutoring C, Java and WebGL: ${tutoringStudents}+ students, including peer tutoring at CPUT`,
  },
];

export const POSTS = {
  feature: {
    kicker: "Case study",
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
