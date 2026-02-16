/**
 * Single source of truth for Portfolio Showcase.
 * About Me section uses these arrays for Total Projects and Certificates counts.
 */
export const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page application built with React and Tailwind CSS, featuring modern design principles and responsive layouts.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "https://github.com/keithardee",
    hasGithub: true,
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description: "Interactive analytics dashboard with advanced data visualization and real-time filtering capabilities for business intelligence.",
    image: "/projects/project2.png",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoUrl: "#",
    githubUrl: null,
    hasGithub: false,
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-featured e-commerce platform with secure user authentication, payment processing, and comprehensive admin dashboard.",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "https://github.com/keithardee",
    hasGithub: true,
  },
];

export const certificates = [
  {
    id: 1,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2024",
    image: "/certificates/cert-responsive-web-design.png",
    description: "Validates foundational skills in HTML5, CSS3, responsive layout principles, and accessibility. Covers Flexbox, Grid, and visual design fundamentals for modern web development.",
  },
  {
    id: 2,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2024",
    image: "/certificates/cert-js-algorithms.png",
    description: "Demonstrates proficiency in JavaScript fundamentals, ES6, algorithms, data structures, and problem-solving. Includes functional and object-oriented programming concepts.",
  },
  {
    id: 3,
    title: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    date: "2024",
    image: "/certificates/cert-front-end-libraries.png",
    description: "Covers Bootstrap, jQuery, Sass, React, and Redux. Confirms ability to build interactive UIs and manage state in single-page applications.",
  },
];
