/**
 * Renders PORTFOLIO_DATA (js/data.js) into the page.
 * Nothing here needs editing to add/remove resume content —
 * only js/data.js should change for that.
 */

(function () {
  "use strict";

  const D = window.PORTFOLIO_DATA;
  if (!D) {
    console.error("PORTFOLIO_DATA not found — check that js/data.js loaded before js/render.js");
    return;
  }

  /* ---------- tiny helpers ---------- */
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const esc = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const has = (v) => Array.isArray(v) ? v.length > 0 : Boolean(v);

  /* ---------- inline icon set (no external assets) ---------- */
  const ICONS = {
    anchor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="2.2"/><path d="M12 7.5V21M6 14a6 6 0 0 0 12 0M4 14H8M16 14h4"/></svg>',
    scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h11a2 2 0 0 1 2 2v13a1 1 0 0 1-1.6.8L15 18H8a2 2 0 0 1-2-2z"/><path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"/><path d="M9 9h6M9 13h4"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3v18"/><path d="M5 4h13l-3 4 3 4H5"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.5"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z"/></svg>',
    wheel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M18.4 5.6l-3.5 3.5M9.1 14.9l-3.5 3.5"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>',
    chest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="10" width="18" height="10" rx="1.4"/><path d="M3 10a9 6 0 0 1 18 0"/><path d="M10 14h4"/></svg>',
    seal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19"/><circle cx="12" cy="12" r="4.5"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14 20 4M14 4h6v6M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6 8-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5.5 3h3l1.5 5-2 1.5a12 12 0 0 0 6.5 6.5L16 14l5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.6V21H3.2V8.75Zm6.6 0h3.45v1.68h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.34 2.4 4.34 5.53V21h-3.6v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21H9.8V8.75Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
  };
  const icon = (name) => ICONS[name] || "";

  /* ==========================================================
     CAPTAIN — hero + masthead + footer + contact
     ========================================================== */
  const c = D.captain || {};
  document.querySelectorAll("[data-bind='captain.name']").forEach((n) => (n.textContent = c.name || ""));
  document.querySelectorAll("[data-bind='captain.title']").forEach((n) => (n.textContent = c.title || ""));
  document.querySelectorAll("[data-bind='captain.tagline']").forEach((n) => (n.textContent = c.tagline || ""));
  document.querySelectorAll("[data-bind='captain.location']").forEach((n) => (n.textContent = c.location || ""));
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const hailList = document.getElementById("hail-links");
  if (hailList) {
    const links = [];
    if (has(c.email)) links.push({ icon: "mail", label: c.email, href: `mailto:${c.email}` });
    if (has(c.phone)) links.push({ icon: "phone", label: c.phone, href: `tel:${c.phone.replace(/\s+/g, "")}` });
    if (has(c.linkedin?.url)) links.push({ icon: "linkedin", label: c.linkedin.label || "LinkedIn", href: c.linkedin.url });
    if (has(c.github?.url)) links.push({ icon: "github", label: c.github.label || "GitHub", href: c.github.url });
    links.forEach((l) => {
      const a = el("a", "hail__link");
      a.href = l.href;
      a.target = l.href.startsWith("http") ? "_blank" : "_self";
      a.rel = "noopener";
      a.innerHTML = `${icon(l.icon)}<span>${esc(l.label)}</span>`;
      hailList.appendChild(a);
    });
  }

  /* ==========================================================
     EDUCATION — "Ship's Origin"
     ========================================================== */
  const originWrap = document.getElementById("origin-list");
  const originSection = document.getElementById("origin");
  if (originWrap) {
    const items = D.education || [];
    if (!items.length && originSection) originSection.style.display = "none";
    items.forEach((e) => {
      const card = el("div", "origin__card");
      card.innerHTML = `
        <div>
          <p class="origin__inst">${esc(e.institution)}</p>
          ${has(e.degree) ? `<p class="origin__degree">${esc(e.degree)}</p>` : ""}
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          ${has(e.timeframe) ? `<span class="origin__meta">${esc(e.timeframe)}</span>` : ""}
          ${has(e.detail) ? `<span class="origin__gpa">${esc(e.detail)}</span>` : ""}
        </div>`;
      originWrap.appendChild(card);
    });
  }

  /* ==========================================================
     SKILLS — "The Arsenal"
     ========================================================== */
  const arsenalWrap = document.getElementById("arsenal-list");
  const arsenalSection = document.getElementById("arsenal");
  if (arsenalWrap) {
    const groups = D.skillGroups || [];
    if (!groups.length && arsenalSection) arsenalSection.style.display = "none";
    groups.forEach((g) => {
      if (!has(g.items)) return;
      const box = el("div", "armory");
      box.innerHTML = `
        <div class="armory__head">${icon(g.icon || "scroll")}<h3>${esc(g.group)}</h3></div>
        <ul class="armory__list">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      arsenalWrap.appendChild(box);
    });
  }

  /* ==========================================================
     EXPERIENCE — "Voyages Logged"
     ========================================================== */
  const routeWrap = document.getElementById("route-list");
  const routeSection = document.getElementById("voyages");
  if (routeWrap) {
    const voyages = D.voyages || [];
    if (!voyages.length && routeSection) routeSection.style.display = "none";
    voyages.forEach((v) => {
      const item = el("div", "voyage reveal");
      item.innerHTML = `
        <span class="voyage__mark"></span>
        <p class="voyage__role">${esc(v.role)}</p>
        ${has(v.org) ? `<p class="voyage__org">${esc(v.org)}</p>` : ""}
        ${has(v.timeframe) ? `<span class="voyage__time">${esc(v.timeframe)}</span>` : ""}
        ${has(v.duties) ? `<ul class="voyage__duties">${v.duties.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}`;
      routeWrap.appendChild(item);
    });
  }

  /* ==========================================================
     PROJECTS — "Plundered Treasures"
     ========================================================== */
  const hoardWrap = document.getElementById("hoard-list");
  const hoardSection = document.getElementById("hoard");
  if (hoardWrap) {
    const treasures = D.treasures || [];
    if (!treasures.length && hoardSection) hoardSection.style.display = "none";
    treasures.forEach((t) => {
      const card = el(t.link ? "a" : "div", "chest reveal");
      if (t.link) {
        card.href = t.link;
        card.target = "_blank";
        card.rel = "noopener";
      }
      card.innerHTML = `
        <div class="chest__head">
          <div>
            <p class="chest__name">${esc(t.name)}</p>
            ${has(t.subtitle) ? `<p class="chest__subtitle">${esc(t.subtitle)}</p>` : ""}
          </div>
          <span class="chest__icon">${icon("chest")}</span>
        </div>
        ${has(t.description) ? `<p class="chest__desc">${esc(t.description)}</p>` : ""}
        ${has(t.stack) ? `<ul class="chest__stack">${t.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
        ${t.link ? `<span class="chest__link">${icon("link")} View on GitHub</span>` : ""}
      `;
      hoardWrap.appendChild(card);
    });
  }

  /* ==========================================================
     ACHIEVEMENTS — "Medals & Marks"
     ========================================================== */
  const medalsWrap = document.getElementById("medals-list");
  const medalsSection = document.getElementById("medals");
  if (medalsWrap) {
    const medals = D.medals || [];
    if (!medals.length && medalsSection) medalsSection.style.display = "none";
    medals.forEach((m) => {
      const item = el("div", "medal reveal");
      item.innerHTML = `
        <span class="medal__seal">${icon("seal")}</span>
        <div>
          <p class="medal__title">${esc(m.title)}</p>
          ${has(m.note) ? `<p class="medal__note">${esc(m.note)}</p>` : ""}
        </div>`;
      medalsWrap.appendChild(item);
    });
  }

  /* ==========================================================
     SCROLL REVEAL — one restrained entrance per element
     ========================================================== */
  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((r) => io.observe(r));
  } else {
    revealables.forEach((r) => r.classList.add("is-visible"));
  }

})();
