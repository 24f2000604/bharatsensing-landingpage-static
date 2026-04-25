/**
 * BharatSensing — React / Tailwind handoff component
 * ----------------------------------------------------
 * Single-file React component that mirrors the HTML home page.
 * Drop into a Next.js / Vite + React + Tailwind project.
 *
 * Recommended tailwind.config.js extensions:
 *
 *   theme: {
 *     extend: {
 *       colors: {
 *         ink:        { DEFAULT: '#0A0F1C', 2: '#111A2E' },
 *         saffron:    { DEFAULT: '#FF7A00', 600: '#E86A00', 50: '#FFF4E8', 200: '#FFD9B3' },
 *         'india-green': { DEFAULT: '#0E6B3A', 600: '#0A5B31' },
 *         bone: '#F7F5EF', cream: '#FDFBF4',
 *       },
 *       fontFamily: {
 *         display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
 *         sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
 *         mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
 *       },
 *     },
 *   }
 *
 * Fonts (add to <head>):
 *   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
 *   <link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" rel="stylesheet">
 */

import React, { useEffect, useState } from "react";

/* ---------- Small primitives ---------- */

const Chakra = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="18" stroke="#FF7A00" strokeWidth="1.6" />
    <circle cx="20" cy="20" r="13" stroke="#FF7A00" strokeWidth="0.8" opacity="0.6" />
    <g stroke="#FF7A00" strokeWidth="0.9" opacity="0.85">
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg) => (
        <line key={deg} x1="20" y1="2" x2="20" y2="38" transform={`rotate(${deg} 20 20)`} />
      ))}
    </g>
    <circle cx="20" cy="20" r="2.8" fill="#FF7A00" />
  </svg>
);

const Eyebrow = ({ children, dark = false }) => (
  <span
    className={`inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.18em] uppercase font-medium before:content-[''] before:w-5 before:h-px ${
      dark ? "text-saffron-200 before:bg-saffron-200" : "text-saffron before:bg-saffron"
    }`}
  >
    {children}
  </span>
);

const Btn = ({ variant = "primary", href = "#", children, className = "" }) => {
  const base =
    "inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full text-[15px] font-medium transition-transform duration-200 hover:-translate-y-px whitespace-nowrap";
  const variants = {
    primary: "bg-saffron text-white shadow-[0_10px_30px_rgba(255,122,0,0.35)] hover:bg-saffron-600",
    secondary: "bg-ink text-white hover:bg-black",
    outline: "border border-ink/20 text-ink hover:bg-ink hover:text-white",
    outlineDark: "border border-white/25 text-white hover:bg-white hover:text-ink",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};

const Tricolor = ({ className = "h-[3px]" }) => (
  <div className={`flex ${className}`}>
    <span className="flex-1 bg-saffron" />
    <span className="flex-1 bg-white" />
    <span className="flex-1 bg-india-green" />
  </div>
);

/* ---------- Nav ---------- */

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "#"],
    ["Product", "#product"],
    ["Mining", "#industries"],
    ["Dams", "#industries"],
    ["Bridges", "#industries"],
    ["About", "#team"],
    ["Careers", "#careers"],
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md backdrop-saturate-150 border-white/10"
          : "border-transparent"
      }`}
    >
      <div className="max-w-[1360px] mx-auto flex items-center justify-between px-7 py-[18px]">
        <a href="#" className="flex items-center gap-2.5 font-display font-semibold text-[19px] text-white tracking-tight">
          <Chakra />
          BharatSensing
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[14.5px] font-medium text-white/70 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Btn variant="primary" href="#contact">Request a briefing</Btn>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2.5 rounded-lg border border-white/15 text-white"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-7 py-5 flex flex-col gap-4">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-white/80" onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
};

/* ---------- Hero Radar / Chakra visual ---------- */

const ChakraRadar = () => (
  <div className="relative w-full max-w-[520px] mx-auto aspect-square">
    <svg viewBox="-250 -250 500 500" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="sweep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FF7A00" stopOpacity="0" />
          <stop offset="1" stopColor="#FF7A00" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* rings */}
      <circle r="220" fill="none" stroke="rgba(255,255,255,0.10)" />
      <circle r="170" fill="none" stroke="rgba(255,255,255,0.10)" />
      <circle r="120" fill="none" stroke="rgba(255,122,0,0.5)" />
      <circle r="70" fill="none" stroke="rgba(255,255,255,0.10)" />

      {/* 12 spokes (half of Ashoka's 24 for tasteful density) */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="0" y1="-220" x2="0" y2="220"
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>

      {/* pulse */}
      <circle r="60" fill="none" stroke="#FF7A00" strokeWidth="1">
        <animate attributeName="r" from="40" to="220" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* sweep */}
      <g style={{ transformBox: "fill-box", transformOrigin: "left bottom", animation: "bsSweep 8s linear infinite" }}>
        <path d="M0,0 L220,0 A220,220 0 0 0 155,-155 Z" fill="url(#sweep)" />
        <line x1="0" y1="0" x2="220" y2="0" stroke="#FF7A00" strokeWidth="1.5" />
      </g>

      {/* targets */}
      <circle cx="95" cy="-60" r="3.5" fill="#FF7A00" />
      <circle cx="-120" cy="40" r="2.5" fill="#0E6B3A" />
      <circle cx="40" cy="150" r="2.5" fill="#0E6B3A" />
      <circle cx="-80" cy="-140" r="2.5" fill="#0E6B3A" />

      {/* core */}
      <circle r="38" fill="rgba(255,122,0,0.12)" />
      <circle r="10" fill="#FF7A00" />

      {/* cardinals */}
      <g fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,0.5)" letterSpacing="0.12em">
        <text x="0" y="-232" textAnchor="middle">N</text>
        <text x="232" y="4">E</text>
        <text x="0" y="244" textAnchor="middle">S</text>
        <text x="-232" y="4" textAnchor="end">W</text>
        <text x="130" y="-215">24×7 · ALL-WEATHER</text>
        <text x="-230" y="-215">SURYA-GbSAR</text>
      </g>
    </svg>
    <style>{`@keyframes bsSweep { to { transform: rotate(360deg); } }`}</style>
  </div>
);

/* ---------- Sections ---------- */

const Hero = () => (
  <section className="relative pt-[180px] pb-[120px] bg-ink text-white overflow-hidden">
    {/* grid + glows */}
    <div
      className="absolute inset-0 opacity-80 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at 60% 40%,#000 30%,transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 60% 40%,#000 30%,transparent 75%)",
      }}
    />
    <div className="absolute -top-52 -right-64 w-[900px] h-[900px] rounded-full blur-3xl pointer-events-none"
      style={{ background: "radial-gradient(circle,rgba(255,122,0,0.22),transparent 60%)" }} />
    <div className="absolute -bottom-52 -left-40 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
      style={{ background: "radial-gradient(circle,rgba(14,107,58,0.16),transparent 60%)" }} />

    <div className="relative max-w-[1200px] mx-auto px-7 grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
      <div>
        <Eyebrow dark>India's First Indigenous Ground Radar Manufacturer</Eyebrow>
        <h1 className="mt-6 font-display font-semibold tracking-[-0.035em] leading-[0.98] text-[clamp(48px,8vw,112px)]">
          Building India's<br />
          <span className="text-saffron">eyes.</span> Protecting<br />
          India's <span className="relative whitespace-nowrap">future.
            <span className="absolute left-0 right-0 -bottom-1.5 h-[4px] bg-saffron rounded" />
          </span>
        </h1>
        <p className="mt-7 text-white/65 max-w-[58ch] text-[clamp(17px,1.3vw,20px)] leading-[1.55]">
          SuryaGbSAR is a made-in-India, 24×7, all-weather ground radar that detects
          sub-millimeter movement across mines, dams and bridges — giving you days, often
          weeks of warning before failure.
        </p>
        <div className="mt-10 flex gap-3.5 flex-wrap">
          <Btn href="#product">Explore SuryaGbSAR</Btn>
          <Btn variant="outlineDark" href="#contact">Book a site assessment</Btn>
        </div>
        <div className="mt-12 flex gap-3.5 flex-wrap items-center">
          {["Make in India", "DGMS-aligned", "DRIP-ready", "MoRTH-compliant", "MoU · MetaSensing"].map((b, i) => (
            <span key={b} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/65 font-mono text-[12.5px] tracking-wider">
              {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-saffron shadow-[0_0_8px_#FF7A00]" />}
              {b}
            </span>
          ))}
        </div>
      </div>
      <ChakraRadar />
    </div>
  </section>
);

const LogoMarquee = () => {
  const items = [
    "Coal India", "NHPC", "NHAI", "SCCL", "DGMS", "Ministry of Coal",
    "Ministry of Jal Shakti", "MoRTH", "SAIL", "MP WRD", "Adani",
    "TEXMiN · IIT(ISM)", "MetaSensing · MoU Partner",
  ];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-white py-6">
      <div className="flex gap-16 animate-[bsMarquee_38s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-mono text-[14px] text-ink/55 tracking-wide inline-flex items-center gap-2.5">
            {t} <span className="text-saffron">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes bsMarquee { to { transform: translateX(-50%); } }`}</style>
    </div>
  );
};

const Stat = ({ num, label, dark }) => (
  <div className={`p-10 border-r last:border-r-0 ${dark ? "border-white/10" : "border-ink/10"}`}>
    <div className={`font-display font-semibold text-[clamp(36px,4vw,56px)] tracking-tight ${dark ? "text-white" : "text-ink"}`}>
      {num}
    </div>
    <div className={`mt-1.5 text-[13.5px] leading-snug ${dark ? "text-white/55" : "text-ink/55"}`}>{label}</div>
  </div>
);

const Problem = () => (
  <section className="bg-ink text-white py-28">
    <div className="max-w-[1200px] mx-auto px-7">
      <div className="max-w-[780px] mb-16">
        <Eyebrow dark>The Problem</Eyebrow>
        <h2 className="mt-4 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(40px,6vw,80px)] text-white">
          India is building blind.<br />And paying the price.
        </h2>
        <p className="mt-5 text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-white/65 max-w-[62ch]">
          Billions of rupees are invested into critical infrastructure every year. Yet less than 2%
          is monitored with 24×7 precision sensing. The result: catastrophic, avoidable losses in
          life, productivity, and national assets.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 border-y border-white/10">
        <Stat dark num="2%"       label="of India's critical infrastructure has real-time, 24×7 precision monitoring" />
        <Stat dark num="₹1,000+ Cr" label="wiped out by a single mine-slope failure including post-failure cost" />
        <Stat dark num="₹4,000+ Cr" label="lost to a single major dam or bridge failure, before livelihoods" />
        <Stat dark num="70%"      label="of India's dams are 25+ years old and mandated for rehabilitation" />
      </div>
    </div>
  </section>
);

/* Reused card */
const FeatureCard = ({ icon, title, children }) => (
  <article className="bg-white border border-ink/10 rounded-[20px] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-saffron/40">
    <div className="w-11 h-11 rounded-[10px] bg-saffron-50 text-saffron flex items-center justify-center mb-5">{icon}</div>
    <h3 className="font-display font-semibold text-[22px] leading-tight mb-2.5">{title}</h3>
    <p className="text-ink/70 leading-relaxed">{children}</p>
  </article>
);

const Product = () => (
  <section id="product" className="bg-cream py-28">
    <div className="max-w-[1200px] mx-auto px-7">
      <div className="max-w-[780px] mb-16">
        <Eyebrow>The Product · SuryaGbSAR</Eyebrow>
        <h2 className="mt-4 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(40px,6vw,80px)]">
          See failures <span className="text-saffron">before</span> they happen.
        </h2>
        <p className="mt-5 text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-ink/65 max-w-[62ch]">
          SuryaGbSAR is a ground-based synthetic aperture radar that continuously scans critical
          assets at sub-millimeter precision, day and night, in all weather — with the reliability
          and cost structure only possible when it's built in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard title="Millimeter precision, kilometers of reach" icon={<Ico path="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" circle />}>
          Detects deformation as small as 0.1 mm over ranges up to 4 km — enough to catch the earliest tremor of a slope, crack, or arch.
        </FeatureCard>
        <FeatureCard title="24×7, day-night, all-weather" icon={<Ico path="M21 12a9 9 0 1 1-9-9 M21 3v6h-6" />}>
          Unlike LiDAR or optical surveys, radar cuts through dust, haze, fog, rain and darkness. No downtime, no monsoon blind spots.
        </FeatureCard>
        <FeatureCard title="50% lower cost, 3× faster scale" icon={<Ico path="M3 3h18v14H3z M8 21h8M12 17v4 M7 10l3 3 7-7" />}>
          Made in India means nationwide deployment, not expensive pilots — with the same data fidelity as imports.
        </FeatureCard>
        <FeatureCard title="Sovereign & secure by design" icon={<Ico path="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />}>
          All data stays in India. No foreign telemetry, no export-controlled components, auditable by national agencies.
        </FeatureCard>
        <FeatureCard title="Predictive, not reactive" icon={<Ico path="M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01" />}>
          ML models trained on Indian terrain convert raw movement into risk scores, automated alerts, and evacuation leads.
        </FeatureCard>
        <FeatureCard title="Built for Indian conditions" icon={<Ico path="M4 20V8l8-6 8 6v12 M9 20v-6h6v6" />}>
          Engineered for 50°C heat, dust storms, monsoon floods, patchy grid power, and long logistics cycles.
        </FeatureCard>
      </div>

      <div className="mt-14 border-l-[3px] border-saffron bg-saffron-50 rounded-r-xl p-6 text-ink">
        <strong className="text-saffron-600">Technology Partner:</strong>&nbsp;BharatSensing has a signed
        MoU with <strong>MetaSensing</strong> (Netherlands) — one of the world's leading GbSAR houses —
        giving us transfer-of-technology access to proven radar IP, manufactured and serviced
        entirely in India.
      </div>
    </div>
  </section>
);

/* Icon helper */
const Ico = ({ path, circle = false }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    {circle && <circle cx="12" cy="12" r="3" />}
    <path d={path} />
  </svg>
);

const Industries = () => {
  const cards = [
    {
      tag: "Mining", title: "Slope Stability Radar for open-cast mines",
      blurb: "DGMS-mandated monitoring across ~300 mines — coal, iron, limestone.",
      sam: "₹1,200 Cr · Immediate SAM",
      bg: "radial-gradient(circle at 30% 20%, rgba(255,122,0,0.45), transparent 55%),linear-gradient(160deg,#1A1108 0%,#3B1D08 60%,#7A3511 100%)",
    },
    {
      tag: "Dams", title: "Structural monitoring for ageing dams",
      blurb: "DRIP ₹10,211 Cr program — 736 dams mandated. NHPC, NHDC, State WRDs.",
      sam: "₹1,500 Cr · Immediate SAM",
      bg: "radial-gradient(circle at 70% 20%, rgba(14,107,58,0.45), transparent 55%),linear-gradient(160deg,#071A14 0%,#0C3526 55%,#155943 100%)",
    },
    {
      tag: "Bridges", title: "Real-time SHMS for national bridges",
      blurb: "MoRTH mandates real-time monitoring on 3,647 major bridges.",
      sam: "₹1,200 Cr · Immediate SAM",
      bg: "radial-gradient(circle at 40% 20%, rgba(11,44,92,0.5), transparent 55%),linear-gradient(160deg,#06112A 0%,#0E2247 60%,#1B3A7E 100%)",
    },
  ];
  return (
    <section id="industries" className="bg-white py-28">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[780px] mb-16">
          <Eyebrow>Industries</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(40px,6vw,80px)]">One radar.<br />National-scale impact.</h2>
          <p className="mt-5 text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-ink/65 max-w-[62ch]">
            The same SuryaGbSAR platform — productised for three of India's most critical, most
            under-monitored infrastructure categories.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <a key={c.tag} href="#contact" className="relative overflow-hidden rounded-[28px] aspect-[4/5] text-white bg-black group">
              <div className="absolute inset-0" style={{ background: c.bg }} />
              <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ backgroundImage: "linear-gradient(180deg,transparent 0%,transparent 40%,rgba(10,15,28,0.85) 100%)" }}>
                <span className="self-start px-3 py-1.5 rounded-full bg-white/10 backdrop-blur font-mono text-[11px] tracking-[0.14em] uppercase">{c.tag}</span>
                <div>
                  <h3 className="font-display font-semibold text-[30px] leading-tight">{c.title}</h3>
                  <p className="mt-2 text-white/80 text-[14.5px]">{c.blurb}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="font-mono text-[12px] text-white/55">{c.sam}</span>
                    <span className="w-11 h-11 rounded-full bg-saffron flex items-center justify-center">→</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const people = [
    { in: "SB", role: "Chief Executive Officer", name: "Siddhant Bhomia", blurb: "Business development, customer engagement, ML & data. Leading GTM across mining, dams and bridges." },
    { in: "NM", role: "Chief Operating Officer", name: "Nikhil Murarka",  blurb: "Manufacturing, product, ground ops, energy. Builds the supply chain and field deployments." },
    { in: "NS", role: "Advisor",                 name: "Naresh Soni",     blurb: "LiDAR, InSAR, HD mapping, drones. Two decades across hardware and software sensing." },
    { in: "PS", role: "Strategic Investor",      name: "Pankaj Singh",    blurb: "Ex-Air Force. Avionics, manufacturing, defence sales. Opens doors across India's defence ecosystem." },
  ];
  return (
    <section id="team" className="bg-white py-28">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[780px] mb-16">
          <Eyebrow>The Team</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(40px,6vw,80px)]">Technocrats who execute.</h2>
          <p className="mt-5 text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-ink/65 max-w-[62ch]">
            Operators from defence, avionics, ML/AI and manufacturing — building the sensing stack
            that India's infrastructure decade requires.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {people.map((p) => (
            <div key={p.name} className="rounded-[20px] overflow-hidden bg-white border border-ink/10">
              <div className="relative aspect-[3/4] flex items-end justify-center" style={{ background: "linear-gradient(160deg,#F7F5EF,#E9E6DB)" }}>
                <span className="absolute top-5 left-6 font-display font-semibold text-[84px] leading-none text-ink/10">{p.in}</span>
                <Tricolor className="h-[3px] absolute inset-x-0 bottom-0" />
              </div>
              <div className="p-6">
                <div className="text-saffron font-mono text-[11.5px] tracking-[0.14em] uppercase mb-1.5">{p.role}</div>
                <h4 className="font-display font-semibold text-[19px] mb-1.5">{p.name}</h4>
                <p className="text-[13.5px] text-ink/55 leading-relaxed">{p.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-20">
    <div className="max-w-[1200px] mx-auto px-7">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-white p-16">
        <div className="absolute -top-48 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
             style={{ background: "radial-gradient(circle,rgba(255,122,0,0.3),transparent 60%)" }} />
        <div className="relative flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <Eyebrow dark>Ready when you are</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.025em] text-white">
              Bring SuryaGbSAR to<br />your mine, dam, or bridge.
            </h2>
          </div>
          <div className="flex gap-3.5">
            <Btn href="#contact">Request a briefing</Btn>
            <Btn variant="outlineDark" href="#product">Download datasheet</Btn>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <>
    <Tricolor />
    <footer className="bg-ink text-white/70 pt-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12">
          <div>
            <h3 className="font-display font-semibold text-[24px] text-white mb-3">BharatSensing</h3>
            <p className="max-w-[36ch]">India's first indigenous ground radar manufacturer. Making India's infrastructure visible, predictive and sovereign.</p>
            <p className="font-mono text-[13px] mt-6">siddhant@bharatsensing.com<br />+91 98733 51501</p>
          </div>
          {[
            ["Product", ["SuryaGbSAR", "Specifications", "Vs. imports", "Monitoring-as-a-Service"]],
            ["Industries", ["Mining", "Dams & Reservoirs", "Bridges & Highways"]],
            ["Company", ["About", "Team", "Careers", "Contact"]],
          ].map(([h, items]) => (
            <div key={h}>
              <h5 className="font-mono text-[11.5px] tracking-[0.18em] uppercase text-white/55 mb-5 font-medium">{h}</h5>
              {items.map((t) => (
                <a key={t} href="#" className="block py-1.5 text-[14.5px] text-white hover:text-saffron">{t}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-7 flex flex-wrap justify-between gap-5 text-[13px]">
          <span>© {new Date().getFullYear()} BharatSensing Technologies Pvt. Ltd. · CIN pending</span>
          <span className="font-mono">Building India's Eyes · Protecting India's Future</span>
        </div>
      </div>
    </footer>
  </>
);

/* ---------- Default export: the page ---------- */

export default function BharatSensing() {
  return (
    <div className="font-sans text-ink antialiased">
      <Nav />
      <Hero />
      <LogoMarquee />
      <Problem />
      <Product />
      <Industries />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
}
