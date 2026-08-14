"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PreviewName = "resume" | "linkedin" | "github" | null;

const socialLinks = [
  {
    name: "resume" as const,
    href: "https://drive.google.com/file/d/1AVfjaOexCgNw2YNR-j9wEER8JvL_SQYQ/view?usp=sharing",
    image: "/assets/resume-preview.jpg",
    alt: "Preview of Raghav Ojha's current resume",
  },
  {
    name: "linkedin" as const,
    href: "https://www.linkedin.com/in/imraghavojha/",
    image: "/assets/linkedin-preview.jpg",
    alt: "Preview of Raghav Ojha's LinkedIn profile",
  },
  {
    name: "github" as const,
    href: "https://github.com/imraghavojha",
    image: "/assets/github-preview.jpg",
    alt: "Preview of Raghav Ojha's GitHub profile",
  },
];

const projects = [
  {
    name: "Lagoon",
    image: "/assets/lagoon.jpg",
    href: "https://imraghavojha.github.io/lagoon/",
    headline: "reproducible sandboxed shells without containers, daemons, or root",
    tags: ["GO + NIX", "LINUX NAMESPACES", "DOCKER ALTERNATIVE"],
    className: "project-lagoon",
  },
  {
    name: "StreamCI",
    image: "/assets/streamci.jpg",
    href: "https://imraghavojha.github.io/streamci-link/",
    headline: "making real-time ci/cd health legible across every repository",
    tags: ["15+ PIPELINE METRICS", "LIVE WEBSOCKETS", "SPRING BOOT"],
    className: "project-streamci",
  },
  {
    name: "Lit",
    image: "/assets/lit.jpg",
    href: "https://github.com/imraghavojha/lit",
    headline: "rebuilding version control from first principles in java",
    tags: ["CONTENT ADDRESSING", "10 CORE COMMANDS", "JAVA + JUNIT"],
    className: "project-lit",
  },
  {
    name: "Enigma Machine",
    image: "/assets/enigma.jpg",
    href: "https://github.com/imraghavojha/Enigma-Machine",
    headline: "a historically accurate encryption machine you can explore in 3d",
    tags: ["C++ CORE", "THREE.JS INTERFACE", "80% TEST COVERAGE"],
    className: "project-enigma",
  },
  {
    name: "MonkFish",
    image: "/assets/monkfish.jpg",
    href: "https://imraghavojha.github.io/monkfish-link/",
    headline: "a chess engine that rewards balance instead of brute-force aggression",
    tags: ["CUSTOM EVALUATION", "UCI PROTOCOL", "PYTHON + REACT"],
    className: "project-monkfish",
  },
];

const tools = [
  { name: "Python", src: "/assets/python.svg", className: "tool-python" },
  { name: "TypeScript", src: "/assets/typescript.svg", className: "tool-typescript" },
  { name: "React", src: "/assets/react.svg", className: "tool-react" },
  { name: "Node.js", src: "/assets/nodejs.svg", className: "tool-node" },
  { name: "AWS", src: "/assets/aws.svg", className: "tool-aws" },
  { name: "Docker", src: "/assets/docker.svg", className: "tool-docker" },
  { name: "Go", src: "/assets/go.svg", className: "tool-go" },
  { name: "PostgreSQL", src: "/assets/postgresql.svg", className: "tool-postgres" },
  { name: "Claude", src: "/assets/claude.png", className: "tool-claude" },
];

const experience = [
  {
    logo: "/assets/alive5-logo.png",
    logoAlt: "alive5 logo",
    company: "alive5",
    role: "software engineering intern — ai",
    description: "building mcp servers, ai bot configuration, automation integrations, and embeddable react chatbots powered by claude on aws bedrock.",
    dates: "aug 2026 — present",
  },
  {
    logo: "/assets/txst-logo.svg",
    logoAlt: "Texas State University logo",
    company: "texas state university — clio pos",
    role: "software developer",
    description: "built a restaurant point-of-sale system in a five-person agile team, covering role-based access, tables, orders, and staff queues.",
    dates: "jan 2026 — may 2026",
  },
  {
    logo: "/assets/txst-logo.svg",
    logoAlt: "Texas State University logo",
    company: "oxp — texas state",
    role: "project assistant",
    description: "improved reporting across $2m+ in hardware, automated 100+ device provisions, and surfaced 100+ broken department links.",
    dates: "may 2024 — sep 2024",
  },
];

function TransitionLink({ href, className, children, ariaLabel, ariaCurrent }: { href: string; className?: string; children: React.ReactNode; ariaLabel?: string; ariaCurrent?: "page" }) {
  const router = useRouter();

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || window.location.pathname === href) return;
    event.preventDefault();
    document.querySelector(".site-shell")?.classList.add("page-exiting");
    window.setTimeout(() => router.push(href), 520);
  };

  return <Link className={className} href={href} aria-label={ariaLabel} aria-current={ariaCurrent} onClick={navigate}>{children}</Link>;
}

function Header({ active }: { active: "work" | "about" }) {
  return (
    <header className="topbar">
      <TransitionLink className="wordmark" href="/" ariaLabel="Raghav Ojha home">
        (raghav)
      </TransitionLink>
      <nav aria-label="Primary navigation">
        <TransitionLink className={active === "work" ? "active" : ""} href="/" ariaCurrent={active === "work" ? "page" : undefined}>work</TransitionLink>
        <TransitionLink className={active === "about" ? "active" : ""} href="/about" ariaCurrent={active === "about" ? "page" : undefined}>about</TransitionLink>
      </nav>
    </header>
  );
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState("default");

  useEffect(() => {
    let frame = 0;
    let x = -80;
    let y = -80;
    const move = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          frame = 0;
        });
      }
      setType(target.closest("a, button, [data-cursor]") ? "pointer" : "default");
    };
    const down = () => setType("click");
    const up = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setType(target.closest("a, button, [data-cursor]") ? "pointer" : "default");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor cursor-${type}`}
      style={{ transform: "translate3d(-80px, -80px, 0)" }}
      aria-hidden="true"
    />
  );
}

function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-credit">
        <p>©2026 / BUILT + DESIGNED FOR</p>
        <strong>RAGHAV OJHA</strong>
        <a href="mailto:raghav.ojha.14122@gmail.com">raghav.ojha.14122@gmail.com</a>
      </div>
      <div className="footer-quote">
        <p>the best tool is the one that disappears into the work.</p>
        <span>(my engineering philosophy, basically)</span>
      </div>
      <div className="footer-nav">
        <a href="#top">↑ BACK TO TOP</a>
        <TransitionLink href="/">WORK</TransitionLink>
        <TransitionLink href="/about">ABOUT</TransitionLink>
      </div>
      <div className="footer-nav">
        <a href="https://www.linkedin.com/in/imraghavojha/" target="_blank" rel="noreferrer">LINKEDIN</a>
        <a href="https://github.com/imraghavojha" target="_blank" rel="noreferrer">GITHUB</a>
        <a href="https://drive.google.com/file/d/1AVfjaOexCgNw2YNR-j9wEER8JvL_SQYQ/view?usp=sharing" target="_blank" rel="noreferrer">RESUME</a>
      </div>
    </footer>
  );
}

export function WorkPage() {
  const [preview, setPreview] = useState<PreviewName>(null);

  return (
    <main className="site-shell page-work" id="top">
      <Cursor />
      <RevealObserver />
      <Header active="work" />

      <section className="work-layout">
        <div className="intro-column intro-enter">
          <p className="script-note">(nice to meet you)</p>
          <h1>software engineer building useful things with ai.</h1>
          <p className="intro-copy">
            i build agents, developer tools, and cloud systems that turn complicated workflows into something people can actually use. based in austin, tx.
          </p>
          <p className="intro-copy">
            currently building ai products at <a className="inline-link" href="https://www.alive5.com/" target="_blank" rel="noreferrer">alive5</a>. studying computer science and mathematics at texas state.
          </p>
          <a className="email-link" href="mailto:raghav.ojha.14122@gmail.com">raghav.ojha.14122@gmail.com</a>
          <div className="social-links" aria-label="Professional links">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setPreview(item.name)}
                onMouseLeave={() => setPreview(null)}
                onFocus={() => setPreview(item.name)}
                onBlur={() => setPreview(null)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="project-column">
          <div className="project-intro intro-enter intro-enter-late">
            <h2>here&apos;s some<br />cool stuff i&apos;ve built.</h2>
            <p className="script-note">(in my opinion)</p>
            <p className="scroll-note">scroll down for more ↓</p>
          </div>
          <div className="project-stack">
            {projects.map((project, index) => (
              <article className={`project-item ${project.className}`} key={project.name} data-reveal style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                  <div className="project-card">
                    <div className="tag-row">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-image-wrap">
                      <img src={project.image} alt={`${project.name} project preview`} />
                    </div>
                  </div>
                  <h3>{project.headline}</h3>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="social-preview-layer" aria-hidden="true">
        {socialLinks.map((item) => (
          <img key={item.name} className={`social-preview preview-${item.name} ${preview === item.name ? "is-visible" : ""}`} src={item.image} alt="" />
        ))}
      </div>
      <section className="work-end" data-reveal>
        <h2>you&apos;ve reached the end.</h2>
        <p>thanks for looking around. if one of these projects sparked an idea, i&apos;d love to hear it.</p>
        <a className="email-link" href="mailto:raghav.ojha.14122@gmail.com">raghav.ojha.14122@gmail.com</a>
      </section>
      <Footer />
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="site-shell page-about" id="top">
      <Cursor />
      <RevealObserver />
      <Header active="about" />

      <section className="about-heading intro-enter">
        <h1>who even is this guy anyway</h1>
        <p className="script-note">(great question)</p>
      </section>

      <section className="about-portrait-section" data-reveal>
        <h2 className="section-kicker">the <em>engineer</em></h2>
        <div className="about-portrait-grid">
          <div className="about-copy">
            <p className="lead">i&apos;m a software engineer and computer science student who likes building systems where ai has to do real work.</p>
            <p>the projects i enjoy most sit between product and infrastructure: an agent that can edit audio, a development environment that is actually reproducible, or a platform that makes live deployment health understandable.</p>
            <p>i care about the invisible parts too — clear interfaces, reliable APIs, useful failure states, and whether a complicated system feels obvious once you&apos;re inside it.</p>
            <p className="lead">currently building ai products at alive5 in austin and studying computer science with a mathematics minor at texas state.</p>
          </div>
          <div className="portrait-stage">
            <img className="about-photo" src="/assets/raghav-mountains.jpg" alt="Raghav Ojha in the mountains" />
            {tools.map((tool) => (
              <div className={`tool-badge ${tool.className}`} key={tool.name} title={tool.name}>
                <img src={tool.src} alt={tool.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="builder-section" data-reveal>
        <h2 className="section-kicker">the <em>builder</em></h2>
        <div className="builder-grid">
          <div className="builder-photo-wrap">
            <img src="/assets/quackhacks-stage.jpg" alt="Raghav presenting Agent Studio at QuackHacks" />
            <span>1ST PLACE — QUACKHACKS</span>
          </div>
          <div className="about-copy builder-copy">
            <p className="lead">i like deadlines, demos, and building the thing people say is probably too much for one weekend.</p>
            <p>that instinct has led to 8+ hackathon wins, including first-place finishes at the txst open datathon, midnight hackathon, hackhcc, and quackhacks.</p>
            <p>agent studio won by turning plain-language audio requests into a non-destructive editing workflow across twelve capabilities. the fun part was not the demo — it was making the agent dependable enough to trust.</p>
          </div>
        </div>
      </section>

      <section className="experience-section" data-reveal>
        <h2 className="section-kicker">work <em>experience</em></h2>
        <div className="experience-list">
          {experience.map((job) => (
            <article className="experience-item" key={job.company}>
              <div className="company-mark"><img src={job.logo} alt={job.logoAlt} /></div>
              <div className="experience-main">
                <h3>{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <p>{job.description}</p>
              </div>
              <p className="experience-dates">{job.dates}</p>
            </article>
          ))}
        </div>
        <a className="resume-cta" href="https://drive.google.com/file/d/1AVfjaOexCgNw2YNR-j9wEER8JvL_SQYQ/view?usp=sharing" target="_blank" rel="noreferrer">check out my resume ↗</a>
      </section>

      <section className="else-section" data-reveal>
        <h2 className="section-kicker">everything <em>else</em></h2>
        <div className="else-copy">
          <p>if i&apos;m not building something, i&apos;m probably traveling, finding a new mountain road, playing games, or showing up to a hackathon with a plan that is slightly too ambitious.</p>
          <p className="lead">want to build something together?</p>
          <a className="email-link" href="mailto:raghav.ojha.14122@gmail.com">raghav.ojha.14122@gmail.com</a>
        </div>
        <div className="photo-strip">
          <img src="/assets/beyond-subway.jpg" alt="A city subway platform" />
          <img src="/assets/raghav-portrait.jpg" alt="Raghav outdoors" />
          <img src="/assets/beyond-turtle.jpg" alt="A sea turtle underwater" />
          <img src="/assets/raghav-mirror.jpg" alt="Raghav in a Spider-Man sweatshirt" />
          <img src="/assets/beyond-mlh.jpg" alt="Hackathon memories" />
          <img src="/assets/beyond-beach.jpg" alt="A beach view" />
          <img src="/assets/raghav-mountains.jpg" alt="Raghav in the mountains" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
