/**
 * The "chart rail" — a dotted sea-route on the right edge of the screen.
 * A tiny ship glides along it as the visitor scrolls, and each dot lights
 * up when its matching section is in view. Sections are read directly
 * from the DOM (any element with [data-chart-stop]), so adding or
 * removing a <section data-chart-stop="Label"> in index.html is all
 * that's needed to change the stops — nothing here needs editing.
 */
(function () {
  "use strict";

  const rail = document.getElementById("chart-rail");
  if (!rail) return;

  const stops = Array.from(document.querySelectorAll("[data-chart-stop]"));
  if (!stops.length) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 34 500");
  svg.setAttribute("preserveAspectRatio", "none");

  const n = stops.length;
  const top = 20, bottom = 480;
  const points = stops.map((_, i) => ({
    x: 17 + (i % 2 === 0 ? 0 : 0),
    y: top + (i * (bottom - top)) / Math.max(n - 1, 1),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const midY = (prev.y + cur.y) / 2;
    d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`;
  }

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "chart-rail__path");
  path.setAttribute("id", "chart-rail-path");
  svg.appendChild(path);

  points.forEach((p, i) => {
    const dot = document.createElementNS(svgNS, "circle");
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    dot.setAttribute("r", 4);
    dot.setAttribute("class", "chart-rail__dot");
    dot.dataset.index = i;
    svg.appendChild(dot);
  });

  const ship = document.createElementNS(svgNS, "g");
  ship.setAttribute("class", "chart-rail__ship");
  ship.innerHTML = `
    <g transform="translate(-9,-7)">
      <path d="M9 0 L15 9 L9 13 L3 9 Z" fill="#E7C877" stroke="#3A2417" stroke-width="0.6"/>
      <line x1="9" y1="0" x2="9" y2="9" stroke="#3A2417" stroke-width="0.6"/>
    </g>`;
  svg.appendChild(ship);

  rail.appendChild(svg);

  const pathLen = path.getTotalLength();
  const dots = svg.querySelectorAll(".chart-rail__dot");

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    const pt = path.getPointAtLength(progress * pathLen);
    const ptNext = path.getPointAtLength(Math.min(progress * pathLen + 1, pathLen));
    const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI) + 90;
    ship.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);

    let activeIndex = 0;
    stops.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.55) activeIndex = i;
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeIndex));
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", update);

  update();
})();
