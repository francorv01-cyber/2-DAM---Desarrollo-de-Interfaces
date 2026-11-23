/* ============ NAVEGACIÓN, COMPONENTES COMPARTIDOS Y UX ============
   Cabecera, pie y panel de favoritos se generan aquí (componentes reutilizables). */
const UI = {
  toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(UI._t); UI._t = setTimeout(() => t.classList.remove("show"), 2200);
  },
  observeReveal(root) {
    const els = (root || document).querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    if (!UI._io) UI._io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); UI._io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach(e => UI._io.observe(e));
  }
};

(function () {
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "inicio";
  const links = [
    ["inicio", "Inicio", root + "index.html"],
    ["costa", "Costa", root + "pages/costa.html"],
    ["sierra", "Sierra", root + "pages/sierra.html"],
    ["selva", "Selva", root + "pages/selva.html"],
    ["gastronomia", "Gastronomía", root + "pages/gastronomia.html"],
    ["planifica", "Planifica tu viaje", root + "pages/planifica.html"],
    ["consejos", "Consejos para viajar", root + "pages/consejos.html"]
  ];

  const header = document.getElementById("site-header");
  if (header) {
    header.outerHTML = `
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <div class="progress-bar" id="progress" aria-hidden="true"></div>
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="${root}index.html" aria-label="PERÚ, inicio">PER<span>Ú</span></a>
        <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
          ${links.map(l => `<a href="${l[2]}" ${l[0] === page ? 'class="active" aria-current="page"' : ""}>${l[1]}</a>`).join("")}
        </nav>
        <div class="nav-actions">
          <button class="icon-btn" id="favBtn" aria-label="Abrir favoritos">♥ <span id="favCount">0</span></button>
          <button class="icon-btn" id="themeBtn" aria-label="Cambiar tema"></button>
          <button class="icon-btn nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="Abrir menú">☰</button>
        </div>
      </div>
    </header>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>PERÚ – Descubre lo extraordinario</h3>
            <p>Guía turística, cultural y gastronómica de Perú. Proyecto académico del ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM), Madrid.</p>
          </div>
          <div><h3>Navegación</h3><ul>${links.map(l => `<li><a href="${l[2]}">${l[1]}</a></li>`).join("")}</ul></div>
          <div><h3>Enlaces de interés</h3><ul>
            <li><a href="https://www.peru.travel/es" target="_blank" rel="noopener">PromPerú – Peru.travel</a></li>
            <li><a href="https://whc.unesco.org/es/list/" target="_blank" rel="noopener">Patrimonio Mundial UNESCO</a></li>
            <li><a href="https://www.machupicchu.gob.pe/" target="_blank" rel="noopener">Entradas oficiales de Machu Picchu</a></li>
            <li><a href="https://www.sernanp.gob.pe/" target="_blank" rel="noopener">SERNANP – Áreas naturales protegidas</a></li>
          </ul></div>
          <div>
            <h3>Agencia colaboradora</h3>
            <p>¿Quieres viajar de verdad? Consulta con Aless Travels.</p>
            <a class="btn small light" href="${PERU.agencyUrl}" target="_blank" rel="noopener">Visitar Aless Travels ↗</a>
            <p style="margin-top:1rem"><strong>Créditos de imágenes:</strong> fotografías de Wikipedia y Wikimedia Commons, bajo licencias libres (Creative Commons o dominio público). Cada foto enlaza a su página de origen, donde constan autor y licencia.</p>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} PERÚ – Descubre lo extraordinario · Proyecto educativo sin ánimo de lucro. Los precios de la calculadora son orientativos.</div>
      </div>
    </footer>
    <button class="to-top" id="toTop" aria-label="Volver arriba">↑</button>
    <div class="scrim" id="scrim"></div>
    <aside class="drawer" id="favDrawer" aria-label="Favoritos" aria-hidden="true">
      <div class="drawer-head"><h2>Mis favoritos</h2><button class="icon-btn" id="favClose" aria-label="Cerrar favoritos">✕</button></div>
      <div id="favList"></div>
    </aside>`;
  }

  /* --- Tema --- */
  Theme.sync();
  document.getElementById("themeBtn").addEventListener("click", () => Theme.toggle());

  /* --- Menú móvil --- */
  const nav = document.getElementById("mainNav"), tg = document.getElementById("navToggle");
  tg.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    tg.setAttribute("aria-expanded", open); tg.textContent = open ? "✕" : "☰";
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { nav.classList.remove("open"); tg.setAttribute("aria-expanded", false); tg.textContent = "☰"; closeFav(); } });

  /* --- Panel de favoritos --- */
  const drawer = document.getElementById("favDrawer"), scrim = document.getElementById("scrim");
  function openFav() { drawer.classList.add("open"); scrim.classList.add("show"); drawer.setAttribute("aria-hidden", "false"); }
  function closeFav() { drawer.classList.remove("open"); scrim.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); }
  document.getElementById("favBtn").addEventListener("click", openFav);
  document.getElementById("favClose").addEventListener("click", closeFav);
  scrim.addEventListener("click", closeFav);
  Favs.renderDrawer();

  /* --- Volver arriba + barra de progreso --- */
  const toTop = document.getElementById("toTop"), prog = document.getElementById("progress");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement; const max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      toTop.classList.toggle("show", h.scrollTop > 600);
      ticking = false;
    });
  }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* --- Transición suave entre pantallas --- */
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname || a.hasAttribute("download")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 220);
  });
  window.addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("leaving"); });

  UI.observeReveal();
})();
