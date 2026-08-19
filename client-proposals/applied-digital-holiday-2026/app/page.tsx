"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PackageKey = "standard" | "custom";
type AddOn = { id: string; name: string; price: number; note: string };

const packages: Record<PackageKey, { eyebrow: string; name: string; price: number; summary: string; includes: string[] }> = {
  standard: {
    eyebrow: "Turnkey production",
    name: "Standard Everything",
    price: 25840,
    summary: "The full eight-table casino floor, professional dealers, championship poker experience and guest-ready chip racks—delivered as one polished, all-in production.",
    includes: [
      "8 casino tables with professional dealers",
      "3 world-champion pros for the full four hours",
      "2 hours of happy-hour training + 2 hours of live-play guidance",
      "Standard felts, chips, cards and complete equipment",
      "100 chip racks with $1,000 in starting chips per guest",
      "Two-hour installation + two-hour strike",
      "Pit management, team travel and event logistics",
    ],
  },
  custom: {
    eyebrow: "Signature brand experience",
    name: "Custom Everything",
    price: 28484,
    summary: "Everything in the standard experience, elevated with a fully branded casino identity across the tables, cards and chips guests touch throughout the night.",
    includes: [
      "8 custom-felted casino tables with professional dealers",
      "3 world-champion pros for the full four hours",
      "2 hours of happy-hour training + 2 hours of live-play guidance",
      "6,100 custom chips + 60 custom playing-card decks",
      "100 chip racks with $1,000 in starting chips per guest",
      "Two-hour installation + two-hour strike",
      "Pit management, team travel and event logistics",
    ],
  },
};

const addOns: AddOn[] = [
  { id: "felts", name: "Custom table felts", price: 6500, note: "Branded felts produced for all eight tables" },
  { id: "chips", name: "6,100 custom casino chips", price: 5989, note: "Enough to begin each guest with a $1,000 chip rack" },
  { id: "cards", name: "60 custom playing-card decks", price: 1950, note: "Covers poker, blackjack shoes and the complete casino floor" },
];

const games = [
  { id: "poker", name: "Three poker tables", label: "The headline experience", copy: "Two hours of casual, happy-hour-style training: guests drop in, learn at their own pace and mingle between hands. Then two hours of real gameplay, with three world champions floating the tables to offer advice, reinforce good decisions and build confidence in the moment." },
  { id: "blackjack", name: "Two blackjack tables", label: "Fast + familiar", copy: "Easy to understand and effortless to join. Professional dealers keep the pace lively for guests who want quick, social rounds." },
  { id: "craps", name: "One craps table", label: "The energy center", copy: "The most naturally social table on the floor—built for cheering, celebration and group momentum." },
  { id: "roulette", name: "One roulette table", label: "The visual anchor", copy: "Simple, cinematic and immediately inviting, with broad appeal across every experience level." },
  { id: "social", name: "Casino War or 3-Card Monte", label: "Pure entertainment", copy: "A fun, approachable choice for guests who are not big gamblers—quick to learn, easy to watch and designed to keep the room smiling." },
];

const pros = [
  { name: "Kenna James", badge: "Poker legend", image: "/assets/kenna-james.webp", stat: "$4M+ live earnings", copy: "A magnetic coach and speaker who makes strategy, psychology and table reads immediately accessible." },
  { name: "Jeff Madsen", badge: "4× WSOP bracelet winner", image: "/assets/jeff-madsen.webp", stat: "WSOP Player of the Year", copy: "Elite tournament instincts, sharp analysis and a rare ability to make high-level concepts genuinely fun." },
  { name: "Taylor Black", badge: "2021 WPT champion", image: "/assets/taylor-black.webp", stat: "$5M+ live earnings", copy: "Modern, disciplined and composed—Taylor connects pressure decisions to real-world performance." },
];

const gallery = [
  { src: "/assets/casino-blackjack-night.jpg", title: "A fully dressed casino floor", tag: "Casino night" },
  { src: "/assets/casino-social-play.jpg", title: "Real tables. Natural team energy.", tag: "Social play" },
  { src: "/assets/mob-museum-team.jpg", title: "A night people remember together", tag: "Previous event" },
  { src: "/assets/event-strategy.webp", title: "Strategy that starts a conversation", tag: "Live instruction" },
  { src: "/assets/event-coaching.webp", title: "Beginner-friendly, expert-led", tag: "Team engagement" },
  { src: "/assets/event-analysis.webp", title: "Every hand becomes a moment", tag: "Live analysis" },
  { src: "/assets/event-casino.webp", title: "Built around the room", tag: "Private events" },
  { src: "/assets/event-engagement.webp", title: "Participation over spectatorship", tag: "Corporate groups" },
  { src: "/assets/event-luxury.webp", title: "A polished, high-energy finish", tag: "Premium production" },
  { src: "/assets/event-networking.webp", title: "Natural networking", tag: "Client entertainment" },
  { src: "/assets/event-suite.webp", title: "The full casino floor", tag: "Casino night" },
];

const faqs = [
  { q: "Do guests need poker or casino experience?", a: "Not at all. Every station is designed for mixed experience levels. Dealers keep the games approachable, while the pros can meet complete beginners and experienced players at the same table." },
  { q: "How does the happy-hour Poker Lab work?", a: "For the first two hours, all three poker tables are casual drop-in training experiences. Guests can learn a few hands, mingle and return whenever they like. For the final two hours, the tables shift into real gameplay while all three pros float the room, offer live advice and help players build confidence." },
  { q: "How does Casino War or 3-Card Monte fit the floor?", a: "It gives non-gamblers an immediate, entertaining entry point. Casino War is familiar and fast; 3-Card Monte can be presented as an entertainment-only close-up illusion with controlled winner rounds and optional prize entries. The final selection can be confirmed with the venue plan." },
  { q: "What is included in each guest's chip rack?", a: "Both proposal options include 100 chip racks. Each attendee can begin the evening with $1,000 in play chips, keeping the experience organized as guests move from table to table." },
  { q: "What does the venue need to provide?", a: "A ballroom or event area with an approved floor plan, normal service access and adequate setup time. Once the venue is selected, LVPT coordinates load-in, placement and operational details directly with the property." },
  { q: "Are food and beverage included?", a: "Food and beverage remain with the selected Dallas venue, as requested. We will design the gaming footprint so service paths, bars and guest circulation continue to work smoothly." },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GameIcon({ name }: { name: string }) {
  const shared = { className: "game-icon", width: 34, height: 34, viewBox: "0 0 34 34", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true };
  if (name === "poker") return <svg {...shared}><rect x="5" y="8" width="16" height="21" rx="3" transform="rotate(-10 5 8)" /><rect x="13" y="5" width="16" height="21" rx="3" transform="rotate(9 13 5)" /><path d="M20 11.5c-3.2 3.3-5 5-5 7.1 0 1.7 1.3 3 3 3 1.1 0 2-.5 2.6-1.2-.1 1.4-.5 2.6-1.4 3.6h5.6c-.9-1-1.3-2.2-1.4-3.6.6.7 1.5 1.2 2.6 1.2 1.7 0 3-1.3 3-3 0-2.1-1.8-3.8-5-7.1Z" /></svg>;
  if (name === "blackjack") return <svg {...shared}><rect x="4" y="6" width="17" height="23" rx="3" /><path d="M9 12h7M12.5 9v6" /><rect x="14" y="4" width="16" height="22" rx="3" /><path d="M19 10h6M22 7v6" /></svg>;
  if (name === "craps") return <svg {...shared}><rect x="4" y="7" width="18" height="18" rx="4" transform="rotate(-9 4 7)" /><circle cx="10" cy="13" r="1.5" /><circle cx="16" cy="19" r="1.5" /><rect x="15" y="9" width="15" height="17" rx="4" transform="rotate(9 15 9)" /><circle cx="21" cy="14" r="1.4" /><circle cx="25" cy="18" r="1.4" /><circle cx="21" cy="22" r="1.4" /></svg>;
  if (name === "roulette") return <svg {...shared}><circle cx="17" cy="17" r="13" /><circle cx="17" cy="17" r="5" /><path d="M17 4v8M17 22v8M4 17h8M22 17h8M7.8 7.8l5.7 5.7M20.5 20.5l5.7 5.7M26.2 7.8l-5.7 5.7M13.5 20.5l-5.7 5.7" /></svg>;
  return <svg {...shared}><path d="M5 25 9 8l15 4-4 17Z" /><path d="m13 24 3-18 14 3-3 18" /><path d="m21 15 2.3-2.3 2.3 2.3-2.3 2.3Z" /><path d="M7 5h4M9 3v4M27 29h3M28.5 27.5v3" /></svg>;
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("custom");
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
      const savedPackage = window.localStorage.getItem("applied-digital-package-v2") as PackageKey | null;
      const savedAddOns = window.localStorage.getItem("applied-digital-addons-v2");
      if (savedPackage && packages[savedPackage]) setSelectedPackage(savedPackage);
      if (savedAddOns) {
        try { setSelectedAddOns(JSON.parse(savedAddOns)); }
        catch { window.localStorage.removeItem("applied-digital-addons-v2"); }
      }
    }, 0);
    return () => window.clearTimeout(restoreSelection);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("applied-digital-package-v2", selectedPackage);
    window.localStorage.setItem("applied-digital-addons-v2", JSON.stringify(selectedAddOns));
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
    if (selectedPackage === "custom") return;
    setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function choosePackage(key: PackageKey) {
    setSelectedPackage(key);
    if (key === "custom") setSelectedAddOns([]);
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
        <button className="nav-brand" onClick={() => scrollToId("top")} aria-label="Back to top"><Image src="/assets/applied-digital-logo.png" width={220} height={44} alt="Applied Digital" priority /><span>Casino Night 2026</span></button>
        <div className="nav-links"><button onClick={() => scrollToId("experience")}>Experience</button><button onClick={() => scrollToId("floor")}>Floor plan</button><button onClick={() => scrollToId("pros")}>Poker Lab</button><button onClick={() => scrollToId("investment")}>Investment</button></div>
        <button className="nav-cta" onClick={() => scrollToId("investment")}>Build your night</button>
      </nav>

      <button className={`mobile-menu-trigger ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <Image src="/assets/applied-digital-logo.png" width={220} height={44} alt="Applied Digital" />
        <button onClick={() => closeMenuAndScroll("experience")}>Experience</button><button onClick={() => closeMenuAndScroll("floor")}>Floor plan</button><button onClick={() => closeMenuAndScroll("pros")}>Poker Lab</button><button onClick={() => closeMenuAndScroll("investment")}>Investment</button>
      </div>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-beam hero-beam-one" aria-hidden="true" /><div className="hero-beam hero-beam-two" aria-hidden="true" />
        <Image className="hero-campus" src="/assets/applied-ai-campus.png" width={1800} height={1400} sizes="(max-width: 820px) 115vw, 58vw" priority alt="Applied Digital AI infrastructure campus" /><div className="hero-vignette" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-collab hero-reveal"><Image src="/assets/applied-digital-logo.png" width={220} height={44} alt="Applied Digital" priority /><span>×</span><Image src="/assets/lvpt-logo.webp" width={180} height={70} alt="Las Vegas Poker Training" priority /></div>
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
        <div className="shell metric-rail" data-reveal><div><strong>8</strong><span>fully staffed casino tables</span></div><div><strong>4 hrs</strong><span>championship pro guidance</span></div><div><strong>3</strong><span>world-champion poker pros</span></div><div><strong>0</strong><span>experience required</span></div></div>
      </section>

      <section className="floor-section section-pad" id="floor">
        <div className="shell">
          <div className="section-head" data-reveal><div><p className="section-label">Casino floor architecture</p><h2>Every game has<br /><em>a job to do.</em></h2></div><p>Eight tables designed around roughly 100 guests, with enough variety for confident players, curious beginners and the people who simply want to be part of the energy.</p></div>
          <div className="game-grid">{games.map((game) => <article className={`game-card ${game.id === "poker" ? "poker-card" : ""} ${game.id === "social" ? "social-card" : ""}`} key={game.name}><div className="game-top"><span className="game-icon-wrap"><GameIcon name={game.id} /></span><span className="game-label">{game.label}</span></div><h3>{game.name}</h3><p>{game.copy}</p></article>)}</div>
          <div className="floor-note" data-reveal><span className="pulse-dot" /><p><strong>Flexible by design.</strong> Final table placement will adapt to the selected hotel, ballroom dimensions, service paths and food-and-beverage layout.</p></div>
        </div>
      </section>

      <section className="poker-lab-section section-pad" id="pros">
        <div className="data-stream" aria-hidden="true"><span>POSITION</span><span>PRESSURE</span><span>RANGE</span><span>PROBABILITY</span><span>PEOPLE</span></div>
        <div className="shell">
          <div className="lab-intro" data-reveal><p className="section-label">The live Poker Lab</p><h2>AI trains on data.<br /><em>People train on decisions.</em></h2><p>For two hours, all three poker tables run as relaxed, happy-hour-style training labs: guests drop in, learn a few hands, ask questions and move naturally between poker and conversation. For the final two hours, the tables shift into real gameplay while the pros float, offer live advice and reinforce the decisions that build confidence.</p></div>
          <div className="lab-sequence" data-reveal><div><span className="sequence-icon">♠</span><strong>Drop in</strong><p>No lecture and no prerequisite—join for a hand or stay for a round.</p></div><i>→</i><div><span className="sequence-icon">◇</span><strong>Think aloud</strong><p>The pro reveals the logic, psychology and risk inside the decision.</p></div><i>→</i><div><span className="sequence-icon">↗</span><strong>Play for real</strong><p>The room shifts into open gameplay for the second half of the night.</p></div><i>→</i><div><span className="sequence-icon">✦</span><strong>Build confidence</strong><p>Pros float the tables with timely advice, encouragement and sharper lines.</p></div></div>
          <div className="pro-grid">{pros.map((pro) => <article className="pro-card" key={pro.name} onPointerMove={handleDepth} onPointerLeave={resetDepth}><div className="pro-image-wrap"><Image src={pro.image} alt={`${pro.name}, ${pro.badge}`} fill sizes="(max-width: 820px) 100vw, 33vw" /><span className="pro-badge">{pro.badge}</span></div><div className="pro-content"><p>{pro.stat}</p><h3>{pro.name}</h3><span>{pro.copy}</span></div></article>)}</div>
          <p className="roster-note">Featured championship roster. Final talent is confirmed at booking.</p>
        </div>
      </section>

      <section className="flow-section section-pad"><div className="shell flow-layout"><div className="flow-copy" data-reveal><p className="section-label">End-to-end execution</p><h2>Built in.<br /><em>Built out.</em></h2><p>We arrive with a plan, build while the venue prepares the room, operate the floor and leave the space ready for its next morning.</p></div><div className="flow-stack"><article className="flow-card"><span>04:00 PM</span><div><strong>Install</strong><p>Tables, layouts, chips, cards and room-flow alignment during the approved two-hour setup window.</p></div></article><article className="flow-card"><span>05:30 PM</span><div><strong>System check</strong><p>Dealer briefing, station readiness, prize mechanics and venue coordination before doors open.</p></div></article><article className="flow-card"><span>06:00 PM</span><div><strong>Go live</strong><p>Four hours of fluid, come-and-go casino play with live floor management and Poker Lab coaching.</p></div></article><article className="flow-card"><span>10:00 PM</span><div><strong>Strike</strong><p>Full teardown, equipment load-out and a clean handoff within the planned two-hour window.</p></div></article></div></div></section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="shell section-head gallery-heading" data-reveal><div><p className="section-label">Previous experiences</p><h2>Proof of<br /><em>the energy.</em></h2></div><p>Real rooms. Real groups. Real engagement. Select any image to take a closer look.</p></div>
        <div className="gallery-marquee" aria-label="Previous Las Vegas Poker Training events"><div className="gallery-track">{[...gallery, ...gallery].map((item, index) => <button className="gallery-card" key={`${item.src}-${index}`} onClick={() => setLightboxIndex(index % gallery.length)} aria-label={`View ${item.title}`}><Image src={item.src} alt={item.title} width={1000} height={1000} sizes="(max-width: 570px) 82vw, 420px" loading="lazy" /><span><small>{item.tag}</small><strong>{item.title}</strong></span></button>)}</div></div>
      </section>

      <section className="brand-section section-pad"><div className="shell brand-grid"><div className="brand-visual" data-reveal><div className="brand-glow" aria-hidden="true" /><Image className="brand-chip-stack" src="/assets/custom-chip-stack.png" width={750} height={1050} sizes="(max-width: 820px) 64vw, 34vw" alt="Example stack of fully custom branded casino chips" /><Image className="brand-chip-example" src="/assets/custom-chip-example.png" width={650} height={940} sizes="(max-width: 820px) 48vw, 24vw" alt="Example premium custom casino chip" /><div className="brand-rings" aria-hidden="true" /></div><div className="brand-copy" data-reveal><p className="section-label">Optional brand layer</p><h2>Make the casino floor<br /><em>uniquely Applied.</em></h2><p>Custom elements extend the experience before, during and after the event—from the first card dealt to the chips guests take home.</p><ul><li>6,100 custom chips—enough to begin every guest with $1,000</li><li>60 custom decks covering poker, blackjack shoes and all card games</li><li>Custom felts built for the final eight-table floor plan</li><li>Carrying cases hold roughly 2,500–3,000 chips and can support 100–200 chip giveaways</li></ul><button className="text-button" onClick={() => scrollToId("investment")}>Configure enhancements <span>→</span></button></div></div></section>

      <section className="proof-section section-pad"><div className="shell"><div className="proof-quote" data-reveal><span className="quote-mark">“</span><blockquote>We hired LVPT for a 350+ person event to provide professional poker training for our guests, followed by a poker tournament later that evening. It was a great way for guests to engage, have fun and learn poker strategy. Do it. Hire them!</blockquote><p>April T. <span>Senior Program Manager · Full-Service Event Management Firm</span></p></div><div className="proof-stats" data-reveal><div><strong>Nationwide</strong><span>We bring the experience to you</span></div><div><strong>Turnkey</strong><span>Tables, talent, dealers and direction</span></div><div><strong>Inclusive</strong><span>Designed for every skill level</span></div></div></div></section>

      <section className="investment-section section-pad" id="investment">
        <div className="orb orb-two" aria-hidden="true" />
        <div className="shell">
          <div className="investment-head" data-reveal><p className="section-label">Choose your experience</p><h2>One room.<br /><em>Two levels of finish.</em></h2><p>Both options include the same eight-table floor, full poker training experience, championship pros, professional dealers and 100 chip racks. The difference is the brand layer. Food, beverage, venue and prizes remain separate.</p></div>
          <div className="package-grid">{(Object.keys(packages) as PackageKey[]).map((key) => { const item = packages[key]; const active = selectedPackage === key; return <button className={`package-card ${active ? "is-selected" : ""}`} key={key} onClick={() => choosePackage(key)} aria-pressed={active}><span className="selection-dot"><i /></span><p>{item.eyebrow}</p><h3>{item.name}</h3><strong>{money.format(item.price)}</strong><small>all-in event investment</small><span className="package-summary">{item.summary}</span><ul>{item.includes.map((detail) => <li key={detail}>{detail}</li>)}</ul><b>{active ? "Selected" : "Select experience"}<i>→</i></b></button>; })}</div>
          <div className="enhancement-wrap" data-reveal><div className="enhancement-intro"><p className="section-label">À-la-carte customization</p><h3>Add the Applied Digital layer.</h3><span>{selectedPackage === "custom" ? "Every custom element below is already included in Custom Everything." : "Add any custom element to Standard Everything and watch the total update."}</span><div className="rack-included"><span>Included in both packages</span><strong>100 chip racks · $700 value</strong><p>Each attendee begins with $1,000 in chips—organized, portable and ready for the next table.</p></div></div><div className="enhancement-list">{addOns.map((item) => { const active = selectedAddOns.includes(item.id); const included = selectedPackage === "custom"; return <button key={item.id} className={`${active ? "is-selected" : ""} ${included ? "is-included" : ""}`} onClick={() => toggleAddOn(item.id)} role="checkbox" aria-checked={active || included} disabled={included}><span className="check-box">{active || included ? "✓" : "+"}</span><span><strong>{item.name}</strong><small>{item.note}</small></span><b>{included ? "Included" : `+${money.format(item.price)}`}</b></button>; })}<div className="case-note"><span>Chip carrying cases</span><p>Each holds roughly 2,500–3,000 chips and can support a 100–200 chip giveaway. Final quantity is priced once the takeaway plan is selected.</p></div></div></div>
          <div className="proposal-total" data-reveal><div><p>Current proposal</p><h3>{selected.name}</h3><span>{selectedPackage === "custom" ? "Complete custom production package" : chosenAddOns.length ? `${chosenAddOns.length} à-la-carte customization${chosenAddOns.length === 1 ? "" : "s"} selected` : "Complete standard production package"}</span></div><div className="total-number"><span>Event investment</span><strong>{money.format(total)}</strong><small>Applicable taxes, venue charges, prizes and optional chip carrying cases are not included.</small></div><div className="total-actions"><a className="primary-button" href={mailto}><span>Approve this direction</span><i>↗</i></a><button className="print-button" onClick={() => window.print()}>Print / save proposal</button></div></div>
        </div>
      </section>

      <section className="next-section section-pad"><div className="shell next-grid"><div data-reveal><p className="section-label">What happens next</p><h2>A clear path.<br /><em>Then we build.</em></h2></div><div className="next-list" data-reveal><div className="next-item"><span className="next-cue">Choose</span><div><strong>Select the finish</strong><p>Choose Standard Everything or Custom Everything; poker training is included either way.</p></div></div><div className="next-item"><span className="next-cue">Confirm</span><div><strong>Lock the Dallas venue</strong><p>We review load-in, room dimensions and the final operating footprint.</p></div></div><div className="next-item"><span className="next-cue">Create</span><div><strong>Share prizes + brand assets</strong><p>Decide on drawings, highest-chip recognition and any custom production.</p></div></div><div className="next-item"><span className="next-cue">Reserve</span><div><strong>Secure December 17</strong><p>A 50% retainer secures production and talent; the balance is due 30 days before the event.</p></div></div></div></div></section>

      <section className="faq-section section-pad"><div className="shell faq-grid"><div data-reveal><p className="section-label">Useful answers</p><h2>Before<br /><em>the next call.</em></h2></div><div className="faq-list" data-reveal>{faqs.map((item, index) => <details key={item.q} open={index === 0}><summary>{item.q}<span>+</span></summary><div><p>{item.a}</p></div></details>)}</div></div></section>

      <footer><div className="footer-glow" aria-hidden="true" /><div className="shell footer-grid"><div><Image src="/assets/applied-digital-logo.png" width={230} height={46} alt="Applied Digital" /><p>Holiday Casino Night · Dallas · December 17, 2026</p></div><div className="footer-cta"><span>Ready to move the night forward?</span><a href={mailto}>book@pokertraininglasvegas.com <i>↗</i></a><a href="tel:+16167457148">616-745-7148</a></div><div className="footer-lvpt"><Image src="/assets/lvpt-logo.webp" width={180} height={70} alt="Las Vegas Poker Training" /><p>Prepared exclusively for Applied Digital by Las Vegas Poker Training.</p></div></div></footer>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Event image viewer" onClick={() => setLightboxIndex(null)}><button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer">×</button><button className="lightbox-arrow prev" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} aria-label="Previous image">←</button><figure onClick={(event) => event.stopPropagation()}><Image src={gallery[lightboxIndex].src} width={1000} height={1000} sizes="90vw" alt={gallery[lightboxIndex].title} /><figcaption><span>{gallery[lightboxIndex].tag}</span><strong>{gallery[lightboxIndex].title}</strong></figcaption></figure><button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} aria-label="Next image">→</button></div>}
    </main>
  );
}
