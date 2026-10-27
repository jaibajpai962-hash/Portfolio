const { useState, useEffect, useRef } = React;

/* ============ EDIT YOUR INFO HERE ============
   Leave a link as "" and its button is hidden automatically.
   All data lives in this file: there is no backend or database. */
const CONFIG = {
  github: "https://github.com/jaibajpai962-hash",    // e.g. "https://github.com/your-username"
  linkedin: "https://www.linkedin.com/in/jai-bajpai-ba6a493a1",  // e.g. "https://www.linkedin.com/in/your-id"
  instagram: "https://www.instagram.com/jai_961_/", // e.g. "https://www.instagram.com/your-id"
  photo: "assets\\Car pose.jpeg", // your 3D photo (PNG with transparent background looks best)
  email: "jaibajpai962@gmail.com",     // e.g. "you@example.com"
};

// status: "implemented" | "prototype" | "planned"  (be honest!)
const PROJECTS = [
  {
    id: "s-nagrik", title: "S-Nagrik (Sankalp Nagrik)",
    desc: "A civic-tech concept for reporting and tracking civic complaints through a more organized digital workflow.",
    image: "assets\\S-Nagrik.jpeg", // e.g. "assets/s-nagrik.png"
    tags: ["Civic-tech", "AI-assisted (planned)"], // TODO: list only tech you really used
    status: "1st position in Jagran Hackathon ", award: "1st Position, Jagran Hackathon (Team Gyan Setu)",
    github: "", demo: "",
  },
  {
    id: "campus-vault", title: "Campus Vault",
    desc: "A Smart Lost & Found Assistant to help people report and discover lost items on campus.",
    image: "assets\\campus.png", tags: ["Prototype"], // TODO: add real tech
    status: "Prototype (demo data)", github: "", demo: "https://campus-vault-ee08e.web.app/",
  },
  {
    id: "e-nagrik", title: "E-Nagrik",
    desc: "A civic engagement and waste-management project. TODO: describe only features that really exist.",
    image: "assets\\e-nagrik.png", tags: ["Civic-tech"], status: "Prototype", github: "https://github.com/jaibajpai962-hash/E---Nagrik.git", demo: "",
  },
  {
    id: "kisan-setu", title: "Kisan Setu",
    desc: "Kisan Setu is an agriculture support platform designed to help farmers access soil-based crop recommendations, government schemes, mandi price trends, and crop disease solutions in one place. It aims to simplify farming-related information through a user-friendly, accessible interface..",
    image: "assets\\KS.png", tags: ["Smart Farming"], status: "Prototype", github: "", demo: "",
  },
  {
    id: "sahaay-clinic", title: "Sahaay Clinic",
    desc: "Sahaay Clinic is an AI-assisted virtual healthcare platform designed to connect rural health workers with remote doctors. It aims to improve access to basic healthcare through an AI Symptom Analyzer and an Offline First Aid feature, helping users access essential health guidance in areas with limited connectivity.",
    image: "assets\\Sahay.png", tags: ["AI in Healthcare"], status: "Qualified for the Grand Finale of BOB HACKS’26, ranking in the Top 30 out of 420 teams with Sahaay Clinic.", github: "", demo: "",
  },
  
];

const CASE = {
  problem: "Citizens often lack a convenient, transparent way to report civic issues and follow their progress. Unstructured reporting can make it difficult to organize complaints and coordinate their resolution.",
  solution: "S-Nagrik introduces a digital complaint workflow that brings issue reporting, categorization, prioritization, departmental routing and resolution tracking into one platform. A WhatsApp-based interaction flow helps make complaint reporting more accessible.",
  features: [ // EDIT each status to match reality
    ["WhatsApp-based complaint interaction", ],
    ["Complaint categorization & priority", "implemented"],
    ["Departmental routing", "planned"],
    ["Complaint status tracking and resolution verification", "planned"],
    ["Before/after resolution verification", "planned"],
    ["AI-assisted complaint processing", "planned"],
    ["Bucklets reward mechanism to encourage civic participation", "planned"],
  ],
  tech: [["React", "Python + Flask"], ["PostgreSQL"], ["WhatsApp API"], ["Twilio"], ["Bootstrap"], ["Framer Motion"], ["IVR"]],
  contribution: [["Contributed to the technical development of the S-Nagrik prototype."],["Built the WhatsApp integration bot to support the complaint interaction workflow."],["Presented the solution and communicated its problem statement, workflow and impact during the hackathon."],["This is my contribution as a Team Leader I have also contributed to the technical development of the Sankalp Nagrik prototype"]],
  team: "Built with Team Gyan Setu. This was a team effort; my part is described above.",
};

const SKILLS = {
  Frontend: [["HTML & CSS", "Flexbox & CSS Grid"], ["JavaScript", "Responsive Web Design"], ["React", "3D & Interactive UI"],["Bootstrap", "UI Styling"],,["Framer Motion", "Animations & Transitions"]],
  "Backend & Data": [["Python + Flask", "Framework"], ["Django", "Framework"], ["PostgreSQL", "Database"], ["Firebase", "Database & Hosting"], ["REST APIs", "Data exchange"]],
  Tools: [["VS Code", "Editor"], ["GitHub", "Version Control"],["Figma", "UI Design"], ["Canva", "Graphics & Design"], ["Postman", "API Testing"]],
};
// Add a level like "Advanced" in the second quote only if you want to show one.
const LEARNING = ["AI-powered applications", "Civic-tech solutions", "Collaborative prototyping"];
const SERVICES = [ // edit these to match what you really offer
  ["Business Websites", "Clean, responsive websites that present a business clearly."],
  ["Full Stack Web Apps", "Frontend, backend and database built together for real workflows."],
  ["Prototypes & Ideas", "Quick working prototypes, including AI and civic-tech concepts."],
];

// kind: "Hackathon" | "Certificate" | "Project" | "Milestone". Keep the newest at the TOP.
// Only add things that are real. "link" is optional (certificate URL); leave "" to hide the button.
const ACHIEVEMENTS = [
  {
    kind: "1st Position", featured: true,
    title: "Jagran Hackathon",
    detail: "Team Gyan Setu · Project: S-Nagrik. A team achievement, shared with my teammates.",
    link: "",
  },
  // Copy this block to add a certificate:
  // { kind: "Certificate", title: "Python Basics, Course Name", detail: "Issued by Platform Name", link: "https://..." },
];

const NAV = [["home", "Home"], ["about", "About"], ["projects", "Projects"], ["achievements", "Achievements"],
  ["skills", "Skills"], ["terminal", "Terminal"], ["contact", "Contact"]];

/* ============ TERMINAL COMMANDS (plain local data, no eval) ============ */
const link = (u, empty) => u || empty;
const COMMANDS = {
  help: () => "Available commands:\n  help  about  projects  skills\n  achievements  socials  contact  clear",
  about: () => "Jai Bajpai: full stack developer from Kanpur, building websites and web apps for businesses.\nBCA at Dr. Virendra Swarup Institute of Computer Studies, CSJMU.",
  projects: () => PROJECTS.map(p => `• ${p.title} [${p.status}]`).join("\n"),
  skills: () => Object.entries(SKILLS).map(([k, v]) => `${k}: ${v.map(s => s[0]).join(", ")}`).join("\n") + "\nExploring: " + LEARNING.join("; "),
  achievements: () => ACHIEVEMENTS.map(x => `• ${x.kind}: ${x.title}`).join("\n"),
  socials: () => `GitHub:   ${link(CONFIG.github, "(not configured yet)")}\nLinkedIn: ${link(CONFIG.linkedin, "(https://www.linkedin.com/in/jai-bajpai-ba6a493a1)")}\nInstagram: ${link(CONFIG.instagram, "(https://www.instagram.com/jai_961_/)")}`,
  contact: () => CONFIG.email ? `Email: ${CONFIG.email}` : "Email not configured yet. Edit CONFIG in App.jsx.",
};

/* ============ HOOKS ============ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useActive() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ============ COMPONENTS ============ */
const Ext = ({ href, children, cls = "btn" }) =>
  href ? <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a> : null;

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Main">
      <div className="wrap nav-in">
        <a className="logo" href="#home">Jai Bajpai</a>
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <ul id="menu" className={"links" + (open ? " open" : "")}>
          {NAV.map(([id, label]) => (
            <li key={id}><a href={"#" + id} className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
          <li><a className="btn primary" href="#contact" onClick={() => setOpen(false)}>Let's Connect</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Photo() {
  const [bad, setBad] = useState(false);
  const ref = useRef(null);
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tilt = e => {
    if (still) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", x * 14 + "deg");
    ref.current.style.setProperty("--rx", -y * 14 + "deg");
    ref.current.style.setProperty("--sx", (x + 0.5) * 100 + "%");
  };
  const reset = () => { ref.current.style.setProperty("--rx", "0deg"); ref.current.style.setProperty("--ry", "0deg"); };
  return (
    <div className="photo" ref={ref} onMouseMove={tilt} onMouseLeave={reset}>
      {CONFIG.photo && !bad
        ? <img src={CONFIG.photo} alt="Portrait of Jai Bajpai" onError={() => setBad(true)} />
        : <span className="initials">JB</span>}
      <i className="shine" aria-hidden="true" />
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const raf = useRef(0);
  const onMove = e => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mx", e.clientX - r.left + "px");
      ref.current.style.setProperty("--my", e.clientY - r.top + "px");
    });
  };
  const words = "Turning Ideas Into Interactive Experiences.".split(" ");
  return (
    <header id="home" className="hero" ref={ref} onMouseMove={onMove}>
      <div className="grid-bg" aria-hidden="true" /><div className="glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-text">
        <p className="brand mono">Web Developer · Websites & Web Apps for Businesses</p>
        <h1 aria-label="Turning Ideas Into Interactive Experiences.">
          {words.map((w, i) => <span className="word" key={i} aria-hidden="true"><span style={{ "--i": i }}>{w}&nbsp;</span></span>)}
        </h1>
        <p className="sub">I'm Jai, a Web developer from Kanpur. I build fast, clear and practical websites and web apps for businesses, from design and frontend to backend and database.</p>
        <div className="cta">
          <a className="btn primary" href="#projects">Explore My Work <span className="arr">→</span></a>
          <a className="btn" href="#about">About Me</a>
          <Ext href={CONFIG.github}>GitHub</Ext>
          <Ext href={CONFIG.linkedin}>LinkedIn</Ext>
        </div>
        <div className="tags" aria-label="Technologies I work with">
          {["React", "JavaScript", "Python", "Flask", "PostgreSQL", "AI/ML"].map((t, i) => <span className="tag" style={{ "--i": i }} key={t}>{t}</span>)}
        </div>
        </div>
        <Photo />
      </div>
      <div className="scroll" aria-hidden="true" />
    </header>
  );
}

function About() {
  return (
    <section id="about"><div className="wrap">
      <div className="about">
        <div className="rv">
          <h2>A Little About Me</h2>
          <p className="sub">I'm a Web developer based in Kanpur. I build websites and web apps for businesses, handling the frontend, backend and database so everything works together.</p>
          <p className="sub">I'm also pursuing my BCA at Dr. Virendra Swarup Institute of Computer Studies (CSJMU), and I enjoy hackathons, including a first-place win with Team Gyan Setu.</p>
          <p className="sub">I have worked till  on 9+ projects across web development, AI-powered solutions, and civic-tech innovation. Passionate about building practical digital solutions that solve real-world problems for businesses and communities.</p>
        </div>
        <div className="info">
          {[["Current Focus", "Full Stack Developer"], ["Approach", "Build for the business goal"], ["Interests", "Software, AI, and Civic Technology"]].map(([k, v]) => (
            <div className="card rv" key={k}><b>{k}</b>{v}</div>
          ))}
        </div>
      </div>
      <h2 className="rv" style={{ marginTop: "var(--s4)" }}>What I Build</h2>
      <div className="build">
        {SERVICES.map(([t, d]) => <div className="card rv" key={t}><h3>{t}</h3><p className="sub">{d}</p></div>)}
      </div>
    </div></section>
  );
}

function Shot({ src, alt, cls }) {
  const [bad, setBad] = useState(false);
  return (
    <div className={cls}>
      {src && !bad ? <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
        : <span>Add a screenshot in assets/<br />and set "image" in App.jsx</span>}
    </div>
  );
}

function CaseStudy() {
  const p = PROJECTS[0];
  return (
    <div className="case card rv" id="case-s-nagrik" style={{ marginTop: "var(--s4)" }}>
      <div>
        <span className="badge win">{p.award}</span>
        <h3>S-Nagrik: Case Study</h3>
        <p className="sub">{p.desc}</p>
        <h3>Problem</h3><p className="sub">{CASE.problem}</p>
        <h3>Proposed solution</h3><p className="sub">{CASE.solution}</p>
        <h3>My contribution</h3><p className="sub">{CASE.contribution}</p>
        <h3>Team</h3><p className="sub">{CASE.team}</p>
      </div>
      <div>
        <Shot cls="shot" src={p.image} alt="S-Nagrik project preview" />
        <h3>Key features</h3>
        <ul className="feat" style={{ padding: 0 }}>
          {CASE.features.map(([f, s]) => <li key={f}><span>{f}</span><span className={"st " + s}>{s}</span></li>)}
        </ul>
        <h3>Technologies</h3><p className="sub">{CASE.tech}</p>
        <p className="note">Status: {p.status}</p>
        <div className="acts" style={{ marginTop: "var(--s2)" }}><Ext href={p.github}>GitHub</Ext><Ext href={p.demo}>Live demo</Ext></div>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  const goCase = p.id === "s-nagrik";
  return (
    <article className="card pcard rv">
      <Shot cls="thumb" src={p.image} alt={p.title + " preview"} />
      <div className="pbody">
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="row">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <span className="note" style={{ margin: 0 }}>Status: {p.status}</span>
        <div className="acts">
          {goCase && <a className="btn primary" href="#case-s-nagrik">View Case Study <span className="arr">→</span></a>}
          <Ext href={p.github}>GitHub</Ext><Ext href={p.demo}>Live demo</Ext>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects"><div className="wrap">
      <h2 className="rv">Projects</h2>
      <p className="sub rv">I worked on 9+ projects , but I will share the most impactful ones here.</p>
      <div className="pgrid">{PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}</div>
      <CaseStudy />
    </div></section>
  );
}

function Terminal() {
  const [lines, setLines] = useState([{ t: "out", v: "Welcome! Type 'help' to see commands." }]);
  const [val, setVal] = useState("");
  const hist = useRef([]); const hi = useRef(-1);
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [lines]);

  const run = raw => {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    hist.current.push(c); hi.current = -1;
    if (c === "clear") { setLines([]); return; }
    const fn = Object.prototype.hasOwnProperty.call(COMMANDS, c) ? COMMANDS[c] : null;
    setLines(l => [...l, { t: "cmd", v: c }, fn ? { t: "out", v: fn() } : { t: "err", v: `'${c}' not found. Try 'help'.` }]);
  };
  const onKey = e => {
    if (e.key === "Enter") { run(val); setVal(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.current.length) return;
      hi.current = hi.current < 0 ? hist.current.length - 1 : Math.max(0, hi.current - 1);
      setVal(hist.current[hi.current]);
    }
  };
  return (
    <section id="terminal"><div className="wrap">
      <h2 className="rv">Developer Terminal</h2>
      <p className="sub rv">Interactive frontend demo: a simulation that reads local data. No real shell, backend or code execution.</p>
      <div className="term rv" style={{ marginTop: "var(--s3)" }}>
        <div className="bar"><span className="dot" /><span className="dot" /><span className="dot" /><span>jai@portfolio</span></div>
        <div className="out" ref={box} role="log" aria-live="polite">
          {lines.map((l, i) => <div key={i} className={l.t}>{l.t === "cmd" ? "jai@portfolio:~$ " : ""}{l.v}</div>)}
        </div>
        <div className="in-row">
          <label htmlFor="ti">jai@portfolio:~$</label>
          <input id="ti" value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey}
            autoComplete="off" autoCapitalize="off" spellCheck="false" placeholder="type a command" />
        </div>
      </div>
      <div className="sugg">
        {Object.keys(COMMANDS).concat("clear").map(c => <button className="btn" key={c} onClick={() => run(c)}>{c}</button>)}
      </div>
    </div></section>
  );
}

function Achievements() {
  return (
    <section id="achievements"><div className="wrap">
      <h2 className="rv">Achievements & Journey</h2>
      <div className="tl">
        {ACHIEVEMENTS.map(x => (
          <div className={"card rv" + (x.featured ? " win" : "")} key={x.title}>
            <span className={"badge" + (x.featured ? " win" : "")}>{x.kind}</span>
            <h3 style={{ margin: ".5rem 0 .2rem" }}>{x.title}</h3>
            <p className="sub">{x.detail}</p>
            <div className="acts"><Ext href={x.link}>View certificate</Ext></div>
          </div>
        ))}
        {ACHIEVEMENTS.length < 2 && <div className="card ph rv"><p className="sub">More milestones will appear here. Add them in ACHIEVEMENTS in App.jsx.</p></div>}
      </div>
    </div></section>
  );
}

function Skills() {
  return (
    <section id="skills"><div className="wrap">
      <h2 className="rv">Skills & Stack</h2>
      <div className="skills">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div className="card rv" key={cat}><h3>{cat}</h3>
            <ul>{items.map(([n, lv]) => <li key={n}>{n}{lv && <em>{lv}</em>}</li>)}</ul></div>
        ))}
      </div>
      <div className="card learn rv"><h3>Interests & Exploring</h3><ul>{LEARNING.map(l => <li key={l}>{l}</li>)}</ul></div>
    </div></section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact"><div className="wrap"><div className="card rv">
      <h2>Need a website or web app for your business? Let's talk.</h2>
      <div className="cta">
        {CONFIG.email && <a className="btn primary" href={"mailto:" + CONFIG.email}>Email me</a>}
        <Ext href={CONFIG.github}>GitHub</Ext><Ext href={CONFIG.linkedin}>LinkedIn</Ext>
      </div>
      {!CONFIG.email && !CONFIG.github && !CONFIG.linkedin && <p className="note">Add your links in CONFIG at the top of App.jsx.</p>}
    </div></div></section>
  );
}

function App() {
  const active = useActive();
  useReveal();
  return (
    <>
      <Navbar active={active} />
      <main><Hero /><About /><Projects /><Achievements /><Skills /><Terminal /><Contact /></main>
      <footer><div className="wrap">© 2026 Jai Bajpai · Web Developer · Kanpur, India</div></footer>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
