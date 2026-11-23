/* ============ MAIN: imágenes, tarjetas reutilizables y páginas ============ */

/* ---------- Carga de imágenes desde la API pública de Wikipedia ---------- */
const ImageLoader = (function () {
  const KEY = "peru_img_cache_v2";
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {} };

  async function fetchOne(c) {
    const i = c.indexOf(":"), lang = c.slice(0, i), title = c.slice(i + 1);
    const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!r.ok) throw new Error("no");
    const d = await r.json();
    const thumb = d.thumbnail && d.thumbnail.source, orig = d.originalimage && d.originalimage.source;
    if (!thumb && !orig) throw new Error("sin imagen");
    const src = thumb ? thumb.replace(/\/\d+px-/, "/1000px-") : orig;
    return { src, fallback: orig || thumb, page: (d.content_urls && d.content_urls.desktop && d.content_urls.desktop.page) || "", title: d.title };
  }
  async function resolve(cands) {
    const k = cands.join("|");
    if (cache[k]) return cache[k];
    for (const c of cands) {
      try { const r = await fetchOne(c); cache[k] = r; save(); return r; } catch (e) { /* siguiente candidato */ }
    }
    return null;
  }
  async function fill(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    el.classList.add("loading");
    const res = await resolve(el.dataset.img.split("|"));
    el.classList.remove("loading");
    if (!res) { el.textContent = el.dataset.emoji || "🏞️"; el.setAttribute("role", "img"); el.setAttribute("aria-label", el.dataset.alt || ""); return; }
    const img = new Image();
    img.alt = el.dataset.alt || res.title; img.loading = "lazy"; img.decoding = "async";
    img.onerror = function () { if (img.src !== res.fallback) img.src = res.fallback; else { img.remove(); el.textContent = el.dataset.emoji || "🏞️"; } };
    img.src = res.src;
    el.textContent = ""; el.appendChild(img);
    if (res.page) {
      const a = document.createElement("a");
      a.className = "img-credit"; a.href = res.page; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Foto: Wikimedia"; a.setAttribute("aria-label", "Ver origen y licencia de la foto: " + res.title);
      el.appendChild(a);
    }
  }
  let io;
  function scan(root) {
    const els = (root || document).querySelectorAll("[data-img]:not([data-done])");
    if (!("IntersectionObserver" in window)) { els.forEach(fill); return; }
    if (!io) io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { io.unobserve(en.target); fill(en.target); } }), { rootMargin: "250px" });
    els.forEach(el => io.observe(el));
  }
  return { scan, resolve };
})();

/* ---------- Componentes (HTML reutilizable) ---------- */
const mapsLink = r => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r.name + " " + r.address + " " + r.city);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const root = () => document.body.dataset.root || "";

function restoMini(r) {
  return `<div class="resto-mini">
    <strong>${esc(r.name)}</strong>
    <small>${esc(r.city)} · ${esc(r.address)}</small>
    <small>${esc(r.type)} · ${esc(r.specialty)}</small>
    <span class="status ${r.status}">${r.status === "ok" ? "Establecimiento conocido (confirma horario)" : "Sin verificar: confirma antes de ir"}</span>
    <div><a href="${mapsLink(r)}" target="_blank" rel="noopener">📍 Ver en Google Maps</a></div>
  </div>`;
}

function cardHTML(it, delay) {
  const ing = it.ingredients ? `<div class="dish-extra"><h4>Ingredientes principales</h4><div class="chips">${it.ingredients.map(i => `<span class="chip">${esc(i)}</span>`).join("")}</div></div>` : "";
  const org = it.origin ? `<div class="dish-extra"><h4>Origen e importancia</h4><p>${esc(it.origin)}</p></div>` : "";
  const rests = it.restaurants ? `<div class="dish-extra"><h4>Dónde probarlo</h4>${it.restaurants.map(id => PERU.restaurants.find(r => r.id === id)).filter(Boolean).map(restoMini).join("")}</div>` : "";
  const pts = it.points ? `<ul class="points">${it.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : "";
  return `<article class="card reveal ${delay || ""}" id="${it.id}">
    <figure class="card-media" data-img="${it.img.join("|")}" data-alt="${esc(it.alt)}" data-emoji="${it.emoji || "🏞️"}"></figure>
    <button class="fav-btn" data-fav="${it.id}" data-name="${esc(it.title)}" aria-pressed="false">♡</button>
    <div class="card-body">
      <div class="card-meta"><span class="badge">${PERU.regionLabels[it.region]}</span><span class="badge kind">${PERU.kindLabels[it.kind]}</span></div>
      <h3>${esc(it.title)}</h3>
      <p class="place">📍 ${esc(it.place)}</p>
      <p>${esc(it.desc)}</p>
      ${pts}${ing}${org}${rests}
    </div>
  </article>`;
}

function restoCardHTML(r) {
  return `<article class="card resto-card reveal">
    <div class="card-body">
      <div class="card-meta"><span class="badge">${PERU.regionLabels[r.region]}</span><span class="badge kind">Restaurante</span></div>
      <h3>${esc(r.name)}</h3>
      <p class="place">📍 ${esc(r.city)} · ${esc(r.address)}</p>
      <p>${esc(r.type)} — Especialidad: ${esc(r.specialty)}</p>
      <span class="status ${r.status}">${r.status === "ok" ? "Establecimiento conocido (confirma horario)" : "Sin verificar: confirma antes de ir"}</span>
      <p><a href="${mapsLink(r)}" target="_blank" rel="noopener">Ver en Google Maps ↗</a></p>
      <button class="fav-btn resto-fav" data-fav="${r.id}" data-name="${esc(r.name)}" aria-pressed="false">♡ Guardar</button>
    </div>
  </article>`;
}

function festivalHTML(f) {
  return `<article class="fest reveal">
    <figure class="card-media" data-img="${f.img.join("|")}" data-alt="${esc(f.alt)}" data-emoji="🎉"></figure>
    <div class="fest-body"><h3>${esc(f.name)}</h3><span class="when">📅 ${esc(f.when)} · ${esc(f.region)}</span><p>${esc(f.text)}</p></div>
  </article>`;
}

function mount(container, html) {
  container.innerHTML = html;
  ImageLoader.scan(container);
  UI.observeReveal(container);
  Favs.refresh(container);
}

/* Imagen de fondo para hero y tarjetas grandes (marcadas con data-img) */
function bgMedia(el) { ImageLoader.scan(el.parentElement || document); }

/* ---------- Páginas de región ---------- */
function renderRegion(key) {
  const reg = PERU.regions[key];
  const el = document.getElementById("region-root");
  const subnav = reg.sections.map(s => `<a href="#${s.key}">${s.title}</a>`).join("");
  const sections = reg.sections.map((s, i) => {
    const items = PERU.items.filter(it => it.region === key && it.kind === s.kind);
    return `<section class="section ${i % 2 ? "alt" : ""} region-section" id="${s.key}">
      <div class="container">
        <div class="section-head reveal"><h2>${s.title}</h2><p>${s.lead}</p></div>
        <div class="grid cols-3">${items.map((it, n) => cardHTML(it, "d" + (n % 3))).join("")}</div>
      </div>
    </section>`;
  }).join("");

  const others = Object.values(PERU.regions).filter(r => r.key !== key);
  el.innerHTML = `
    <section class="page-hero">
      <div class="hero-media card-media is-bg" data-img="${reg.hero.join("|")}" data-alt="${esc(reg.heroAlt)}" data-emoji="${reg.emoji}" style="aspect-ratio:auto"></div>
      <div class="container hero-content">
        <span class="eyebrow" style="color:#ffd9dd">${reg.emoji} Región</span>
        <h1>${reg.name.toUpperCase()}</h1>
        <p>${reg.intro}</p>
      </div>
    </section>
    <nav class="subnav" aria-label="Apartados de la región"><div class="container">${subnav}</div></nav>
    ${sections}
    <section class="section"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">Sigue explorando</span><h2>Otras regiones de Perú</h2></div>
      <div class="grid cols-2">${others.map(o => `
        <a class="region-card reveal" href="${o.key}.html" style="min-height:300px">
          <div class="card-media is-bg" data-img="${o.hero.join("|")}" data-alt="${esc(o.heroAlt)}" data-emoji="${o.emoji}"></div>
          <div class="inner"><h3>${o.name.toUpperCase()}</h3><p>${o.cardDesc}</p><span class="btn">Descubrir región</span></div>
        </a>`).join("")}</div>
    </div></section>`;
  ImageLoader.scan(el); UI.observeReveal(el); Favs.refresh(el);
}

/* ---------- Gastronomía (todas las regiones) ---------- */
function renderGastronomy() {
  const bar = document.getElementById("gastro-filters");
  const out = document.getElementById("gastro-list");
  const restOut = document.getElementById("gastro-restos");
  let current = "todas";
  const draw = () => {
    const dishes = PERU.items.filter(i => i.kind === "plato" && (current === "todas" || i.region === current));
    mount(out, dishes.map((d, n) => cardHTML(d, "d" + (n % 3))).join(""));
    const rs = PERU.restaurants.filter(r => current === "todas" || r.region === current);
    mount(restOut, rs.map(restoCardHTML).join(""));
    bar.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.r === current));
  };
  bar.innerHTML = [["todas", "Todas"], ["costa", "Costa"], ["sierra", "Sierra"], ["selva", "Selva"]].map(([k, l]) => `<button class="filter-chip" data-r="${k}" aria-pressed="false">${l}</button>`).join("");
  bar.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { current = b.dataset.r; draw(); } });
  draw();
}

/* ---------- Inicio ---------- */
function renderHome() {
  const f = document.getElementById("festivals");
  if (f) mount(f, PERU.festivals.map(festivalHTML).join(""));
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (PERU.regions[page]) renderRegion(page);
  if (page === "gastronomia") renderGastronomy();
  if (page === "inicio") renderHome();
  ImageLoader.scan(document);
  UI.observeReveal();
  Favs.refresh();
  Favs.renderDrawer();
});
