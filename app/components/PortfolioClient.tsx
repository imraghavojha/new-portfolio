"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
    name: "Agent Studio",
    image: "/assets/agent-studio.png",
    href: "https://2026.quackhacks.org/projects/winners/agent-studio",
    headline: "editing audio by talking to an agent instead of touching a timeline",
    tags: ["AGENT STUDIO", "1ST @ QUACKHACKS", "GEMINI + MCP"],
    className: "project-agent-studio",
  },
  {
    name: "Hermes Agent",
    image: "/assets/hermes-optimized.png",
    secondaryImage: "/assets/hermes-banner.jpg",
    href: "https://github.com/imraghavojha/Hermes-Optimized",
    headline: "an always-on personal agent with lazy tool discovery that cuts schema tokens by 80%",
    tags: ["HERMES AGENT", "LAZY TOOL LOADING", "PYTHON + LINUX"],
    className: "project-hermes",
  },
  {
    name: "Lit",
    image: "/assets/lit.jpg",
    href: "https://github.com/imraghavojha/lit",
    headline: "rebuilding version control from first principles in java",
    tags: ["LIT", "CONTENT ADDRESSING", "JAVA + JUNIT"],
    className: "project-lit",
  },
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
];

const tools = [
  { name: "Python", src: "/assets/python.svg", className: "tool-python" },
  { name: "Claude", src: "/assets/claude.png", className: "tool-claude" },
  { name: "GitHub Copilot", src: "/assets/github-copilot.jpg", className: "tool-copilot" },
  { name: "Docker", src: "/assets/docker.svg", className: "tool-docker" },
  { name: "Go", src: "/assets/go.svg", className: "tool-go" },
  { name: "PostgreSQL", src: "/assets/postgresql.svg", className: "tool-postgres" },
  { name: "Codex", src: "/assets/codex-color.png", className: "tool-codex" },
  { name: "Java", src: "/assets/java.svg", className: "tool-java" },
];

const hackathons = [
  { name: "Midnight", award: "winner", logo: "/assets/hackathons/midnight.svg" },
  { name: "HackHCC", award: "winner", logo: "/assets/hackathons/hackhcc.png" },
  { name: "QuackHacks", award: "winner", logo: "/assets/hackathons/quackhacks.png" },
  { name: "TXST Datathon", award: "1st place", logo: "/assets/hackathons/txst-datathon.png" },
  { name: "Austin AI", award: "2× runner-up", logo: "/assets/hackathons/austin-ai.png" },
];

const gallery = [
  { type: "image", src: "/assets/gallery/museum.jpg", alt: "Edward Hopper painting at a museum" },
  { type: "image", src: "/assets/gallery/eclipse.jpg", alt: "Solar eclipse through clouds" },
  { type: "image", src: "/assets/gallery/hackathon-bag.jpg", alt: "Doodled QuackHacks bag" },
  { type: "image", src: "/assets/gallery/city.jpg", alt: "City view through spring trees" },
  { type: "video", src: "/assets/gallery/volcano.mp4", alt: "Volcano erupting above the clouds" },
  { type: "image", src: "/assets/gallery/beach.jpg", alt: "Swimming goggles overlooking the ocean" },
  { type: "image", src: "/assets/gallery/mountains.jpg", alt: "Mountain road and landscape" },
  { type: "image", src: "/assets/gallery/turtle.jpg", alt: "Sea turtle on the shore" },
  { type: "image", src: "/assets/gallery/travel.jpg", alt: "Travel memory" },
  { type: "image", src: "/assets/gallery/heic-photo.jpg", alt: "A favorite travel moment" },
  { type: "image", src: "/assets/gallery/landscape.jpg", alt: "Cloudy mountain landscape" },
  { type: "image", src: "/assets/gallery/gaming.jpg", alt: "Late-night gaming setup" },
] as const;

const experience = [
  {
    logo: "/assets/alive5-logo.png",
    logoAlt: "alive5 logo",
    company: "alive5",
    role: "software engineering intern — ai",
    description: "building mcp servers, ai bot configuration, automation integrations, and embeddable react chatbots powered by claude on aws bedrock.",
    dates: "aug 2026 — present",
    markClass: "mark-alive5",
  },
  {
    logo: "/assets/txst-logo.svg",
    logoAlt: "Texas State University logo",
    company: "texas state university — clio pos",
    role: "software developer",
    description: "built a restaurant point-of-sale system in a five-person agile team, covering role-based access, tables, orders, and staff queues.",
    dates: "jan 2026 — may 2026",
    markClass: "mark-txst",
  },
  {
    logo: "/assets/txst-bobcat.png",
    logoAlt: "Texas State Bobcat emblem",
    company: "oxp — texas state",
    role: "project assistant",
    description: "improved reporting across $2m+ in hardware, automated 100+ device provisions, and surfaced 100+ broken department links.",
    dates: "may 2024 — sep 2024",
    markClass: "mark-bobcat",
  },
];

function ContributionGrid() {
  const fallback = Array.from({ length: 364 }, (_, index) => {
    const pulse = (index * 17 + index * index * 3) % 31;
    return pulse > 26 ? 4 : pulse > 21 ? 3 : pulse > 14 ? 2 : pulse > 8 ? 1 : 0;
  });
  const [levels, setLevels] = useState(fallback);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://github-contributions-api.jogruber.de/v4/imraghavojha?y=last", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("contribution data unavailable")))
      .then((data: { contributions?: Array<{ level?: number; count?: number }> }) => {
        const values = (data.contributions ?? []).slice(-364).map((day) => {
          if (typeof day.level === "number") return Math.max(0, Math.min(4, day.level));
          const count = day.count ?? 0;
          return count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 12 ? 3 : 4;
        });
        if (values.length > 300) setLevels(values);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <div className="contribution-card">
      <div className="contribution-head">
        <span>github contributions</span>
        <a href="https://github.com/imraghavojha" target="_blank" rel="noreferrer">@imraghavojha ↗</a>
      </div>
      <div className="contribution-grid" role="img" aria-label="Raghav's GitHub contribution activity over the last year">
        {levels.map((level, index) => <span className={`contribution-day level-${level}`} key={index} />)}
      </div>
      <div className="contribution-legend" aria-hidden="true"><span>less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`level-${level}`} key={level} />)}<span>more</span></div>
    </div>
  );
}

function BuilderCardStack() {
  const [activeCard, setActiveCard] = useState(0);
  const dragStart = useRef<number | null>(null);
  const cardCount = 3;

  const move = (direction: number) => {
    setActiveCard((current) => (current + direction + cardCount) % cardCount);
  };

  const positionFor = (index: number) => {
    const offset = (index - activeCard + cardCount) % cardCount;
    return offset === 0 ? "is-active" : offset === 1 ? "is-next" : "is-back";
  };

  return (
    <div className="builder-card-stack-shell">
      <div
        className="builder-card-stack"
        onPointerDown={(event) => { dragStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (dragStart.current === null) return;
          const distance = event.clientX - dragStart.current;
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
          dragStart.current = null;
        }}
        onPointerCancel={() => { dragStart.current = null; }}
      >
        <article className={`builder-card pika-card ${positionFor(0)}`} aria-hidden={activeCard !== 0}>
          <div className="pika-award"><span>BERKELEY AI HACKATHON</span><strong>sponsor favorite</strong></div>
          <div className="pika-post">
            <div className="pika-profile">
              <span className="pika-avatar">P</span>
              <span><strong>Pika <i>✓</i></strong><small>@pika_labs</small></span>
              <b>•••</b>
            </div>
            <p><strong>1. Lumen</strong> lets product placement happen in post. Pass in a product photo and it drops naturally into your footage.</p>
            <div className="pika-video-wrap">
              <video src="/assets/pika-lumen.mp4" poster="/assets/pika-lumen-poster.jpg" autoPlay loop muted playsInline preload="metadata" />
              <span className="pika-number">01</span>
            </div>
            <div className="pika-credit"><span>TEAM</span><strong>Raghav Ojha</strong><a href="https://x.com/pika_labs/status/2070604825730089433" target="_blank" rel="noreferrer">view post ↗</a></div>
          </div>
        </article>

        <article className={`builder-card photo-card quackhacks-card ${positionFor(1)}`} aria-hidden={activeCard !== 1}>
          <img src="/assets/quackhacks-stage.jpg" alt="Raghav presenting Agent Studio at QuackHacks" />
          <div className="builder-card-caption"><span>QUACKHACKS 2026</span><strong>1st place — Agent Studio</strong></div>
        </article>

        <article className={`builder-card photo-card datathon-card ${positionFor(2)}`} aria-hidden={activeCard !== 2}>
          <img src="/assets/txst-datathon-team.jpg" alt="Raghav and his full team after winning the Texas State Open Datathon" />
          <div className="builder-card-caption"><span>TXST OPEN DATATHON</span><strong>1st place — full team</strong></div>
        </article>
      </div>
      <div className="builder-stack-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous builder highlight">←</button>
        <div aria-label={`Builder highlight ${activeCard + 1} of ${cardCount}`}>
          {Array.from({ length: cardCount }, (_, index) => (
            <button key={index} type="button" className={activeCard === index ? "is-active" : ""} onClick={() => setActiveCard(index)} aria-label={`Show builder highlight ${index + 1}`} />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next builder highlight">→</button>
      </div>
      <p className="swipe-note">swipe or tap to browse</p>
    </div>
  );
}

function TransitionLink({ href, className, children, ariaLabel, ariaCurrent }: { href: string; className?: string; children: React.ReactNode; ariaLabel?: string; ariaCurrent?: "page" }) {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || window.location.pathname === href) return;
    event.preventDefault();
    document.querySelector(".site-shell")?.classList.add("page-exiting");
    window.setTimeout(() => {
      const onGitHubPages = window.location.hostname.endsWith("github.io");
      const target = onGitHubPages ? `/RaghavPortfolio${href === "/" ? "/" : `${href}/`}` : href;
      window.location.assign(target);
    }, 520);
  };

  return <Link className={className} href={href} aria-label={ariaLabel} aria-current={ariaCurrent} onClick={navigate}>{children}</Link>;
}

function Header({ active }: { active: "projects" | "about" }) {
  return (
    <header className="topbar">
      <TransitionLink className="wordmark" href="/" ariaLabel="Raghav Ojha home">
        (raghav)
      </TransitionLink>
      <nav aria-label="Primary navigation">
        <TransitionLink className={active === "projects" ? "active" : ""} href="/" ariaCurrent={active === "projects" ? "page" : undefined}>projects</TransitionLink>
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
        <TransitionLink href="/">PROJECTS</TransitionLink>
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
      <Header active="projects" />

      <section className="work-layout">
        <div className="intro-column intro-enter">
          <h1>software engineer building useful things with ai.</h1>
          <p className="script-note">(nice to meet you)</p>
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
            <h2>here&apos;s some<br />cool projects i&apos;ve built.</h2>
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
                    <div className={`project-image-wrap ${project.secondaryImage ? "project-image-split" : ""}`}>
                      {project.secondaryImage ? (
                        <>
                          <div className="project-split-top"><img src={project.image} alt={`${project.name} GitHub project header`} /></div>
                          <div className="project-split-bottom"><img src={project.secondaryImage} alt="Hermes Agent illustrated banner" /></div>
                        </>
                      ) : <img src={project.image} alt={`${project.name} project preview`} />}
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
        <div className="about-contact-links" aria-label="Contact and professional links">
          <a href="mailto:raghav.ojha.14122@gmail.com">email</a>
          {socialLinks.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer">{item.name}</a>)}
        </div>
      </section>

      <section className="about-portrait-section" data-reveal>
        <h2 className="section-kicker">the <em>engineer</em></h2>
        <div className="about-portrait-grid">
          <div className="about-copy">
            <p className="lead">i build ai systems and developer tools that turn complicated workflows into usable products.</p>
            <p>i like work that crosses product and infrastructure: agents, reliable apis, cloud systems, and interfaces that make the machinery feel obvious.</p>
            <p className="lead">currently building ai products at alive5 and studying computer science + mathematics at texas state.</p>
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
          <BuilderCardStack />
          <div className="about-copy builder-copy">
            <p className="lead">i build best with a deadline and a demo.</p>
            <p>8+ wins across the u.s., including quackhacks, hackhcc, midnight, and the txst open datathon. agent studio turned plain-language requests into dependable, non-destructive audio edits.</p>
            <div className="hackathon-marquee" aria-label="Hackathon awards">
              <div className="hackathon-track">
                {[...hackathons, ...hackathons].map((hackathon, index) => (
                  <div className="hackathon-chip" key={`${hackathon.name}-${index}`} aria-hidden={index >= hackathons.length}>
                    <span className="hackathon-logo"><img src={hackathon.logo} alt="" /></span>
                    <span><strong>{hackathon.name}</strong><small>{hackathon.award}</small></span>
                  </div>
                ))}
              </div>
            </div>
            <ContributionGrid />
          </div>
        </div>
      </section>

      <section className="experience-section" data-reveal>
        <h2 className="section-kicker">work <em>experience</em></h2>
        <div className="experience-list">
          {experience.map((job) => (
            <article className="experience-item" key={job.company}>
              <div className={`company-mark ${job.markClass}`}><img src={job.logo} alt={job.logoAlt} /></div>
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
          {gallery.map((item) => item.type === "video" ? (
            <video key={item.src} src={item.src} aria-label={item.alt} autoPlay loop muted playsInline preload="metadata" />
          ) : (
            <img key={item.src} src={item.src} alt={item.alt} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
