"use client";

import { useEffect, useMemo, useState } from "react";

type PackageKey = "casino" | "pokerlab";
type AddOn = { id: string; name: string; price: number; note: string };

const packages: Record<PackageKey, { eyebrow: string; name: string; price: number; summary: string; includes: string[] }> = {
  casino: {
    eyebrow: "Complete casino floor",
    name: "Applied Casino Night",
    price: 19500,
    summary: "A polished, come-and-go casino floor engineered for effortless participation, fast table turnover and four hours of uninterrupted energy.",
    includes: [
      "10 interactive gaming stations",
      "Professional dealers + casino operations director",
      "Standard cards, chips and complete equipment",
      "Two-hour installation + two-hour strike",
      "Event direction, travel and logistics included",
    ],
  },
  pokerlab: {
    eyebrow: "Recommended experience",
    name: "Casino Night + Poker Lab",
    price: 31500,
    summary: "The complete casino floor, elevated by three world-champion pros who turn all three poker tables into live laboratories for pressure, probability and people.",
    includes: [
      "Everything in Applied Casino Night",
      "3 world-champion poker pros",
      "Live, drop-in hand analysis at all 3 poker tables",
      "Beginner-friendly coaching with advanced insight on demand",
      "All pro travel and accommodations included",
    ],
  },
};

const addOns: AddOn[] = [
  { id: "cards", name: "Custom playing cards", price: 1250, note: "Applied Digital artwork across the casino floor" },
  { id: "chips", name: "Custom casino chips", price: 2750, note: "A branded keepsake guests handle all night" },
  { id: "felts", name: "Custom table felts", price: 5500, note: "High-impact branding tailored to the final game mix" },
  { id: "case", name: "Industrial chip case + racks", price: 1250, note: "Organized storage for continued company use" },
];

const games = [
  { count: "03", name: "Poker", symbol: "♠", copy: "All three tables become live Poker Labs in the recommended experience—one world-class pro at each table." },
  { count: "03", name: "Blackjack", symbol: "21", copy: "Fast, familiar and approachable. Easy for guests to join, step away and jump back in." },
  { count: "01", name: "Casino War", symbol: "A", copy: "Instantly understood, rapid-fire entertainment that keeps the floor moving." },
  { count: "01", name: "Craps", symbol: "⚄", copy: "The loud table—the natural center of celebration, cheering and group energy." },
  { count: "01", name: "Roulette", symbol: "◆", copy: "A visual anchor with simple, social play and broad guest appeal." },
  { count: "01", name: "The Monte Protocol", symbol: "3", copy: "A close-up illusion challenge with controlled winner rounds, reveals and optional prize entries." },
];

const pros = [
  { name: "Kenna James", badge: "Poker legend", image: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a7bb98d08689eb2a55d60.webp", stat: "$4M+ live earnings", copy: "A magnetic coach and speaker who makes strategy, psychology and table reads immediately accessible." },
  { name: "Jeff Madsen", badge: "4× WSOP bracelet winner", image: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a7bb9dbe569a25dba2197.webp", stat: "WSOP Player of the Year", copy: "Elite tournament instincts, sharp analysis and a rare ability to make high-level concepts genuinely fun." },
  { name: "Taylor Black", badge: "2021 WPT champion", image: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a7bb90a69f1e766e12ed3.webp", stat: "$5M+ live earnings", copy: "Modern, disciplined and composed—Taylor connects pressure decisions to real-world performance." },
];

const gallery = [
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d419e1ac5f5289a4bf.webp", title: "Strategy that starts a conversation", tag: "Live instruction" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d2dbe569a25da92054.webp", title: "Beginner-friendly, expert-led", tag: "Team engagement" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d28d08689eb2942eb3.webp", title: "Every hand becomes a moment", tag: "Live analysis" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d18d08689eb2942e89.webp", title: "Built around the room", tag: "Private events" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d319e1ac5f5289a4a0.webp", title: "Participation over spectatorship", tag: "Corporate groups" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d20a69f1e766cffb87.webp", title: "A polished, high-energy finish", tag: "Premium production" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0a13d4dbe569a25da920de.webp", title: "Natural networking", tag: "Client entertainment" },
  { src: "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0db826ce0ec8e60c207e3c.webp", title: "The full casino floor", tag: "Casino night" },
];

const faqs = [
  { q: "Do guests need poker or casino experience?", a: "Not at all. Every station is designed for mixed experience levels. Dealers keep the games approachable, while the pros can meet complete beginners and experienced players at the same table." },
  { q: "How does the happy-hour Poker Lab work?", a: "All three poker tables are active training tables, each led by a world-class pro. Guests sit in whenever they like, play live hands, and hear the logic, psychology and risk explained at the moments that matter." },
  { q: "Is The Monte Protocol a gambling game?", a: "No. It is an entertainment-only close-up illusion and observation challenge. There is no cash wagering. Controlled winner rounds can award raffle entries or prizes selected by Applied Digital." },
  { q: "What does the venue need to provide?", a: "A ballroom or event area with an approved floor plan, normal service access and adequate setup time. Once the venue is selected, LVPT coordinates load-in, placement and operational details directly with the property." },
  { q: "Are food and beverage included?", a: "Food and beverage remain with the selected Dallas venue, as requested. We will design the gaming footprint so service paths, bars and guest circulation continue to work smoothly." },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("pokerlab");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const total = useMemo(() => packages[selectedPackage].price + addOns.filter((item) => selectedAddOns.includes(item.id)).reduce((sum, item) => sum + item.price, 0), [selectedAddOns, selectedPackage]);
  const chosenAddOns = addOns.filter((item) => selectedAddOns.includes(item.id));
  const selected = packages[selectedPackage];

  const mailto = useMemo(() => {
    const extras = chosenAddOns.length ? chosenAddOns.map((item) => item.name).join(", ") : "None selected";
    const subject = encodeURIComponent("Applied Digital — Casino Night Direction");
    const body = encodeURIComponent(`Hi Matt,\n\nWe would like to move forward with: ${selected.name}.\nSelected enhancements: ${extras}.\nCurrent proposal total: ${money.format(total)}.\n\nPlease send the agreement and next steps.\n`);
    return `mailto:book@pokertraininglasvegas.com?subject=${subject}&body=${body}`;
  }, [chosenAddOns, selected.name, total]);

  useEffect(() => {
    const restoreSelection = window.setTimeout(() => {
      const savedPackage = window.localStorage.getItem("applied-digital-package") as PackageKey | null;
      const savedAddOns = window.localStorage.getItem("applied-digital-addons");
      if (savedPackage && packages[savedPackage]) setSelectedPackage(savedPackage);
      if (savedAddOns) {
        try { setSelectedAddOns(JSON.parse(savedAddOns)); }
        catch { window.localStorage.removeItem("applied-digital-addons"); }
      }
    }, 0);
    return () => window.clearTimeout(restoreSelection);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("applied-digital-package", selectedPackage);
    window.localStorage.setItem("applied-digital-addons", JSON.stringify(selectedAddOns));
  }, [selectedAddOns, selectedPackage]);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let disposed = false;
    async function startAnimations() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .to(".load-curtain", { scaleY: 0, duration: reduceMotion ? 0.01 : 1.15 })
          .fromTo(".hero-campus", { scale: 1.16 }, { scale: 1, duration: reduceMotion ? 0.01 : 2.2 }, "-=0.8")
          .fromTo(".hero-reveal", { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: reduceMotion ? 0.01 : 1 }, "-=1.55")
          .fromTo(".hero-fact", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: reduceMotion ? 0.01 : 0.7 }, "-=0.55");

        if (reduceMotion) return;
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { y: 52, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".game-card").forEach((card, index) => {
          gsap.fromTo(card, { y: 46, opacity: 0, rotateX: -8 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.85, delay: (index % 3) * 0.08, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 90%", once: true } });
        });
        gsap.to(".orb-one", { xPercent: 28, yPercent: -22, scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1.5 } });
        gsap.to(".orb-two", { xPercent: -30, yPercent: 28, scrollTrigger: { trigger: ".investment-section", start: "top bottom", end: "bottom top", scrub: 1.5 } });
        gsap.utils.toArray<HTMLElement>(".flow-card").forEach((card, index, cards) => {
          if (index < cards.length - 1) gsap.to(card, { scale: 0.965, opacity: 0.56, scrollTrigger: { trigger: cards[index + 1], start: "top 72%", end: "top 28%", scrub: true } });
        });
      });
    }
    startAnimations();
    return () => { disposed = true; context?.revert(); };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); setLightboxIndex(null); }
      if (lightboxIndex !== null && event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (lightboxIndex !== null && event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function closeMenuAndScroll(id: string) {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), 60);
  }

  function handleDepth(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 4}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 5}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${(x + 1) * 50}%`);
    event.currentTarget.style.setProperty("--glow-y", `${(y + 1) * 50}%`);
  }

  function resetDepth(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <main>
      <div className="load-curtain" aria-hidden="true"><div className="curtain-mark">AD<span>×</span>LVPT</div></div>

      <nav className="desktop-nav" aria-label="Proposal navigation">
        <button className="nav-brand" onClick={() => scrollToId("top")} aria-label="Back to top"><img src="https://companieslogo.com/img/orig/APLD_BIG.D-224c1f78.png?t=1750822950" alt="Applied Digital" /><span>Casino Night 2026</span></button>
        <div className="nav-links"><button onClick={() => scrollToId("experience")}>Experience</button><button onClick={() => scrollToId("floor")}>Floor plan</button><button onClick={() => scrollToId("pros")}>Poker Lab</button><button onClick={() => scrollToId("investment")}>Investment</button></div>
        <button className="nav-cta" onClick={() => scrollToId("investment")}>Build your night</button>
      </nav>

      <button className={`mobile-menu-trigger ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <img src="https://companieslogo.com/img/orig/APLD_BIG.D-224c1f78.png?t=1750822950" alt="Applied Digital" />
        <button onClick={() => closeMenuAndScroll("experience")}>Experience</button><button onClick={() => closeMenuAndScroll("floor")}>Floor plan</button><button onClick={() => closeMenuAndScroll("pros")}>Poker Lab</button><button onClick={() => closeMenuAndScroll("investment")}>Investment</button>
      </div>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-beam hero-beam-one" aria-hidden="true" /><div className="hero-beam hero-beam-two" aria-hidden="true" />
        <img className="hero-campus" src="https://cdn.prod.website-files.com/667211036fda1fadbea65277/699b5dc60d00599948121b08_hp-applied-ai-factories-collage1-384j3fr.png" alt="Applied Digital AI infrastructure campus" /><div className="hero-vignette" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-collab hero-reveal"><img src="https://companieslogo.com/img/orig/APLD_BIG.D-224c1f78.png?t=1750822950" alt="Applied Digital" /><span>×</span><img src="https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0db826ce0ec8e60c207e3a.webp" alt="Las Vegas Poker Training" /></div>
          <p className="hero-kicker hero-reveal"><span /> Private proposal · Dallas, Texas</p>
          <div className="hero-title-wrap"><h1 className="hero-reveal">Where power, pressure</h1><h1 className="hero-reveal accent-line">and probability converge.</h1></div>
          <p className="hero-copy hero-reveal">A high-energy casino night and live poker laboratory created for the people building the infrastructure behind modern AI.</p>
          <div className="hero-actions hero-reveal"><button className="primary-button magnetic" onClick={() => scrollToId("experience")}><span>Enter the experience</span><i>↘</i></button><button className="text-button" onClick={() => scrollToId("investment")}>View investment <span>→</span></button></div>
          <div className="hero-facts"><div className="hero-fact"><span>Date</span><strong>DEC 17 · 2026</strong></div><div className="hero-fact"><span>Live experience</span><strong>6:00 — 10:00 PM</strong></div><div className="hero-fact"><span>Guest profile</span><strong>≈ 100 · COME & GO</strong></div><div className="hero-fact"><span>Environment</span><strong>DALLAS · VENUE TBD</strong></div></div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Scroll to initialize</span><i /></div>
      </section>

      <section className="manifesto section-pad" id="experience">
        <div className="orb orb-one" aria-hidden="true" />
        <div className="shell manifesto-grid"><div data-reveal><p className="section-label">The brief, upgraded</p><h2>Not a row of tables.<br /><em>A live operating system.</em></h2></div><div className="manifesto-copy" data-reveal><p>Applied Digital builds environments where immense power becomes intelligent capacity. This experience follows the same logic: every station has a purpose, every guest has an easy entry point and every transition is engineered to feel natural.</p><p>The result is a four-hour holiday party that works for the curious beginner, the social wanderer and the serious player—all at once.</p></div></div>
        <div className="shell metric-rail" data-reveal><div><strong>10</strong><span>interactive stations</span></div><div><strong>50+</strong><span>simultaneous playing spots</span></div><div><strong>03</strong><span>world-champion pros</span></div><div><strong>00</strong><span>experience required</span></div></div>
      </section>

      <section className="floor-section section-pad" id="floor">
        <div className="shell">
          <div className="section-head" data-reveal><div><p className="section-label">Casino floor architecture</p><h2>Every game has<br /><em>a job to do.</em></h2></div><p>Designed around roughly 100 guests with capacity for more than half the room to play at once—without forcing anyone into a schedule.</p></div>
          <div className="game-grid">{games.map((game) => <article className={`game-card ${game.name === "The Monte Protocol" ? "monte-card" : ""}`} key={game.name}><div className="game-top"><span className="game-count">{game.count}</span><span className="game-symbol">{game.symbol}</span></div><h3>{game.name}</h3><p>{game.copy}</p>{game.name === "The Monte Protocol" && <span className="protocol-chip">NEW CONCEPT</span>}</article>)}</div>
          <div className="floor-note" data-reveal><span className="pulse-dot" /><p><strong>Flexible by design.</strong> Final table placement will adapt to the selected hotel, ballroom dimensions, service paths and food-and-beverage layout.</p></div>
        </div>
      </section>

      <section className="poker-lab-section section-pad" id="pros">
        <div className="data-stream" aria-hidden="true"><span>POSITION</span><span>PRESSURE</span><span>RANGE</span><span>PROBABILITY</span><span>PEOPLE</span></div>
        <div className="shell">
          <div className="lab-intro" data-reveal><p className="section-label">The live Poker Lab</p><h2>AI trains on data.<br /><em>People train on decisions.</em></h2><p>All three poker tables become drop-in strategy labs, with one world-class pro stationed at each table. Guests play real hands while the pros pause at the moments that matter—revealing the information, assumptions and human behavior behind every decision.</p></div>
          <div className="lab-sequence" data-reveal><div><span>01</span><strong>Deal</strong><p>A live scenario begins. No lecture, no prerequisite.</p></div><i>→</i><div><span>02</span><strong>Freeze</strong><p>The pro pauses at the decision point that changes the hand.</p></div><i>→</i><div><span>03</span><strong>Decode</strong><p>Ranges, risk, reads and psychology are unpacked in real time.</p></div><i>→</i><div><span>04</span><strong>Replay</strong><p>Guests test a new line and instantly feel the difference.</p></div></div>
          <div className="pro-grid">{pros.map((pro) => <article className="pro-card" key={pro.name} onPointerMove={handleDepth} onPointerLeave={resetDepth}><div className="pro-image-wrap"><img src={pro.image} alt={`${pro.name}, ${pro.badge}`} /><span className="pro-badge">{pro.badge}</span></div><div className="pro-content"><p>{pro.stat}</p><h3>{pro.name}</h3><span>{pro.copy}</span></div></article>)}</div>
          <p className="roster-note">Featured championship roster. Final talent is confirmed at booking.</p>
        </div>
      </section>

      <section className="flow-section section-pad"><div className="shell flow-layout"><div className="flow-copy" data-reveal><p className="section-label">End-to-end execution</p><h2>Built in.<br /><em>Built out.</em></h2><p>We arrive with a plan, build while the venue prepares the room, operate the floor and leave the space ready for its next morning.</p></div><div className="flow-stack"><article className="flow-card"><span>04:00 PM</span><div><strong>Install</strong><p>Tables, layouts, chips, cards and room-flow alignment during the approved two-hour setup window.</p></div></article><article className="flow-card"><span>05:30 PM</span><div><strong>System check</strong><p>Dealer briefing, station readiness, prize mechanics and venue coordination before doors open.</p></div></article><article className="flow-card"><span>06:00 PM</span><div><strong>Go live</strong><p>Four hours of fluid, come-and-go casino play with live floor management and Poker Lab coaching.</p></div></article><article className="flow-card"><span>10:00 PM</span><div><strong>Strike</strong><p>Full teardown, equipment load-out and a clean handoff within the planned two-hour window.</p></div></article></div></div></section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="shell section-head gallery-heading" data-reveal><div><p className="section-label">Previous experiences</p><h2>Proof of<br /><em>the energy.</em></h2></div><p>Real rooms. Real groups. Real engagement. Select any image to take a closer look.</p></div>
        <div className="gallery-marquee" aria-label="Previous Las Vegas Poker Training events"><div className="gallery-track">{[...gallery, ...gallery].map((item, index) => <button className="gallery-card" key={`${item.src}-${index}`} onClick={() => setLightboxIndex(index % gallery.length)} aria-label={`View ${item.title}`}><img src={item.src} alt={item.title} loading="lazy" /><span><small>{item.tag}</small><strong>{item.title}</strong></span></button>)}</div></div>
      </section>

      <section className="brand-section section-pad"><div className="shell brand-grid"><div className="brand-visual" data-reveal><div className="chip chip-one"><span>APLD</span></div><div className="chip chip-two"><span>DEC<br />17</span></div><div className="card-fan"><i>A</i><b>♠</b></div><div className="brand-rings" aria-hidden="true" /></div><div className="brand-copy" data-reveal><p className="section-label">Optional brand layer</p><h2>Make the casino floor<br /><em>uniquely Applied.</em></h2><p>Custom elements extend the experience before, during and after the event—from the first card dealt to the chips guests take home.</p><ul><li>Custom Applied Digital playing cards</li><li>Branded casino chips and commemorative designs</li><li>Custom table felts built around the final game mix</li><li>Industrial chip case and racks for long-term storage</li></ul><button className="text-button" onClick={() => scrollToId("investment")}>Configure enhancements <span>→</span></button></div></div></section>

      <section className="proof-section section-pad"><div className="shell"><div className="proof-quote" data-reveal><span className="quote-mark">“</span><blockquote>We hired LVPT for a 350+ person event to provide professional poker training for our guests, followed by a poker tournament later that evening. It was a great way for guests to engage, have fun and learn poker strategy. Do it. Hire them!</blockquote><p>April T. <span>Senior Program Manager · Full-Service Event Management Firm</span></p></div><div className="proof-stats" data-reveal><div><strong>Nationwide</strong><span>We bring the experience to you</span></div><div><strong>Turnkey</strong><span>Tables, talent, dealers and direction</span></div><div><strong>Inclusive</strong><span>Designed for every skill level</span></div></div></div></section>

      <section className="investment-section section-pad" id="investment">
        <div className="orb orb-two" aria-hidden="true" />
        <div className="shell">
          <div className="investment-head" data-reveal><p className="section-label">Choose your experience</p><h2>One room.<br /><em>Two levels of impact.</em></h2><p>All pricing is all-in for the scope shown—including event staffing, logistics and team travel to Dallas. Food, beverage, venue and prizes remain separate.</p></div>
          <div className="package-grid">{(Object.keys(packages) as PackageKey[]).map((key) => { const item = packages[key]; const active = selectedPackage === key; return <button className={`package-card ${active ? "is-selected" : ""}`} key={key} onClick={() => setSelectedPackage(key)} aria-pressed={active}><span className="selection-dot"><i /></span><p>{item.eyebrow}</p><h3>{item.name}</h3><strong>{money.format(item.price)}</strong><small>all-in event investment</small><span className="package-summary">{item.summary}</span><ul>{item.includes.map((detail) => <li key={detail}>{detail}</li>)}</ul><b>{active ? "Selected" : "Select experience"}<i>→</i></b></button>; })}</div>
          <div className="enhancement-wrap" data-reveal><div className="enhancement-intro"><p className="section-label">Optional enhancements</p><h3>Add the Applied Digital layer.</h3><span>Select any item to update the proposal total instantly.</span></div><div className="enhancement-list">{addOns.map((item) => { const active = selectedAddOns.includes(item.id); return <button key={item.id} className={active ? "is-selected" : ""} onClick={() => toggleAddOn(item.id)} role="checkbox" aria-checked={active}><span className="check-box">{active ? "✓" : "+"}</span><span><strong>{item.name}</strong><small>{item.note}</small></span><b>+{money.format(item.price)}</b></button>; })}</div></div>
          <div className="proposal-total" data-reveal><div><p>Current proposal</p><h3>{selected.name}</h3><span>{chosenAddOns.length ? `${chosenAddOns.length} custom enhancement${chosenAddOns.length === 1 ? "" : "s"} selected` : "Standard production package"}</span></div><div className="total-number"><span>Event investment</span><strong>{money.format(total)}</strong><small>Applicable taxes, venue charges and prizes are not included.</small></div><div className="total-actions"><a className="primary-button" href={mailto}><span>Approve this direction</span><i>↗</i></a><button className="print-button" onClick={() => window.print()}>Print / save proposal</button></div></div>
        </div>
      </section>

      <section className="next-section section-pad"><div className="shell next-grid"><div data-reveal><p className="section-label">What happens next</p><h2>Four decisions.<br /><em>Then we build.</em></h2></div><ol data-reveal><li><span>01</span><div><strong>Select the experience</strong><p>Casino Night, or the recommended Casino Night + Poker Lab.</p></div></li><li><span>02</span><div><strong>Confirm the Dallas venue</strong><p>We review load-in, room dimensions and the final operating footprint.</p></div></li><li><span>03</span><div><strong>Choose prizes + brand assets</strong><p>Decide on drawings, highest-chip recognition and any custom production.</p></div></li><li><span>04</span><div><strong>Reserve December 17</strong><p>A 50% retainer secures production and talent; the balance is due 30 days before the event.</p></div></li></ol></div></section>

      <section className="faq-section section-pad"><div className="shell faq-grid"><div data-reveal><p className="section-label">Useful answers</p><h2>Before<br /><em>the next call.</em></h2></div><div className="faq-list" data-reveal>{faqs.map((item, index) => <details key={item.q} open={index === 0}><summary>{item.q}<span>+</span></summary><div><p>{item.a}</p></div></details>)}</div></div></section>

      <footer><div className="footer-glow" aria-hidden="true" /><div className="shell footer-grid"><div><img src="https://companieslogo.com/img/orig/APLD_BIG.D-224c1f78.png?t=1750822950" alt="Applied Digital" /><p>Holiday Casino Night · Dallas · December 17, 2026</p></div><div className="footer-cta"><span>Ready to move the night forward?</span><a href={mailto}>book@pokertraininglasvegas.com <i>↗</i></a><a href="tel:+16167457148">616-745-7148</a></div><div className="footer-lvpt"><img src="https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/6a0db826ce0ec8e60c207e3a.webp" alt="Las Vegas Poker Training" /><p>Prepared exclusively for Applied Digital by Las Vegas Poker Training.</p></div></div></footer>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Event image viewer" onClick={() => setLightboxIndex(null)}><button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer">×</button><button className="lightbox-arrow prev" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} aria-label="Previous image">←</button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].title} /><figcaption><span>{gallery[lightboxIndex].tag}</span><strong>{gallery[lightboxIndex].title}</strong></figcaption></figure><button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} aria-label="Next image">→</button></div>}
    </main>
  );
}
