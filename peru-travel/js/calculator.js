/* ============ CALCULADORA DE PRESUPUESTO ORIENTATIVO ============
   IMPORTANTE: todos los precios son supuestos orientativos en euros (por persona y día,
   salvo las actividades, que son por persona). NO son precios reales de proveedores.
   El usuario puede modificarlos en el panel «Ajustar precios orientativos». */
(function () {
  const form = document.getElementById("calc");
  if (!form) return;
  const KEY = "peru_calc_cfg_v1";

  const DEFAULTS = {
    lodging: { hostal: 25, hotel3: 55, hotel5: 130 },
    transport: { bus: 12, mixto: 28, avion: 55 },
    food: 22,
    factor: { costa: 1, sierra: 1.05, selva: 1.2, combinada: 1.15 },
    activities: {
      buggy: { label: "Buggy y sandboard en Huacachina", price: 25, regions: ["costa"] },
      nazca: { label: "Sobrevuelo de las Líneas de Nazca", price: 90, regions: ["costa"] },
      surf: { label: "Clases de surf (Máncora/Huanchaco)", price: 30, regions: ["costa"] },
      chan: { label: "Visita guiada a Chan Chan / Caral", price: 20, regions: ["costa"] },
      machu: { label: "Machu Picchu (entrada, guía y transporte local)", price: 120, regions: ["sierra"] },
      titicaca: { label: "Excursión al lago Titicaca y los Uros", price: 25, regions: ["sierra"] },
      colca: { label: "Excursión al Cañón del Colca", price: 35, regions: ["sierra"] },
      cusco: { label: "City tour de Cusco y ruinas cercanas", price: 20, regions: ["sierra"] },
      lodge: { label: "Estancia en lodge amazónico (Tambopata)", price: 150, regions: ["selva"] },
      pacaya: { label: "Navegación por Pacaya Samiria", price: 90, regions: ["selva"] },
      gocta: { label: "Senderismo a la catarata de Gocta", price: 15, regions: ["selva"] },
      lamas: { label: "Visita guiada a comunidad indígena (Lamas)", price: 15, regions: ["selva"] }
    }
  };
  const LABELS = { hostal: "Hostal / albergue", hotel3: "Hotel 3★", hotel5: "Hotel 4-5★", bus: "Bus", mixto: "Bus + vuelos internos", avion: "Vuelos internos" };

  let cfg = JSON.parse(JSON.stringify(DEFAULTS));
  try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s) cfg = Object.assign(cfg, s); } catch (e) {}
  const saveCfg = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} };

  const $ = id => document.getElementById(id);
  const money = n => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  let last = null;

  /* ---- Actividades según la región ---- */
  function drawActivities() {
    const region = $("region").value;
    const checked = new Set([...form.querySelectorAll("input[name=act]:checked")].map(i => i.value));
    const items = Object.entries(cfg.activities).filter(([, a]) => region === "combinada" || a.regions.includes(region));
    $("acts").innerHTML = items.map(([k, a]) => `<label class="act"><input type="checkbox" name="act" value="${k}" ${checked.has(k) ? "checked" : ""}><span>${a.label}</span><span class="price">${money(a.price)}/pers.</span></label>`).join("");
  }

  /* ---- Panel de precios configurables ---- */
  function drawConfig() {
    const rows = [];
    Object.entries(cfg.lodging).forEach(([k, v]) => rows.push(["lodging." + k, "Alojamiento: " + LABELS[k] + " (€/pers./día)", v]));
    Object.entries(cfg.transport).forEach(([k, v]) => rows.push(["transport." + k, "Transporte: " + LABELS[k] + " (€/pers./día)", v]));
    rows.push(["food", "Alimentación (€/pers./día)", cfg.food]);
    Object.entries(cfg.activities).forEach(([k, a]) => rows.push(["activities." + k, a.label + " (€/pers.)", a.price]));
    $("cfgGrid").innerHTML = rows.map(([path, label, v]) => `<div><label for="cfg-${path}">${label}</label><input class="input" id="cfg-${path}" data-path="${path}" type="number" min="0" step="1" value="${v}"></div>`).join("");
  }
  $("cfgGrid").addEventListener("change", e => {
    const inp = e.target.closest("input[data-path]"); if (!inp) return;
    const v = Math.max(0, Number(inp.value) || 0); inp.value = v;
    const p = inp.dataset.path.split(".");
    if (p[0] === "food") cfg.food = v;
    else if (p[0] === "activities") cfg.activities[p[1]].price = v;
    else cfg[p[0]][p[1]] = v;
    saveCfg(); drawActivities(); UI.toast("Precio orientativo actualizado");
  });
  $("cfgReset").addEventListener("click", () => { cfg = JSON.parse(JSON.stringify(DEFAULTS)); saveCfg(); drawConfig(); drawActivities(); UI.toast("Precios restaurados"); });

  /* ---- Validación ---- */
  function setErr(id, msg) { const f = $(id), m = $(id + "Err"); if (m) m.textContent = msg || ""; if (f) { f.classList.toggle("invalid", !!msg); f.setAttribute("aria-invalid", !!msg); } return !msg; }
  function validate() {
    let ok = true;
    const tr = Number($("travelers").value), days = Number($("days").value), bud = $("budget").value;
    ok = setErr("travelers", !Number.isInteger(tr) || tr < 1 || tr > 30 ? "Introduce un número de viajeros entre 1 y 30." : "") && ok;
    ok = setErr("days", !Number.isInteger(days) || days < 1 || days > 60 ? "Introduce un número de días entre 1 y 60." : "") && ok;
    ok = setErr("region", !$("region").value ? "Selecciona una región." : "") && ok;
    ok = setErr("lodging", !$("lodging").value ? "Selecciona un alojamiento." : "") && ok;
    ok = setErr("transport", !$("transport").value ? "Selecciona un transporte." : "") && ok;
    ok = setErr("budget", bud !== "" && (isNaN(Number(bud)) || Number(bud) < 0) ? "El presupuesto debe ser un número positivo." : "") && ok;
    if (days < 3 && $("region").value === "combinada") { /* aviso suave, no bloquea */ }
    return ok;
  }

  /* ---- Cálculo ---- */
  function calculate() {
    const tr = Number($("travelers").value), days = Number($("days").value);
    const region = $("region").value, f = cfg.factor[region];
    const acts = [...form.querySelectorAll("input[name=act]:checked")].map(i => cfg.activities[i.value]);
    const lodging = cfg.lodging[$("lodging").value] * days * tr * f;
    const transport = cfg.transport[$("transport").value] * days * tr;
    const food = cfg.food * days * tr * f;
    const activities = acts.reduce((s, a) => s + a.price, 0) * tr;
    const total = lodging + transport + food + activities;
    return { tr, days, region, lodging, transport, food, activities, total, acts, budget: $("budget").value === "" ? null : Number($("budget").value) };
  }

  function show(r) {
    last = r;
    const parts = [["Alojamiento", r.lodging], ["Transporte interno", r.transport], ["Alimentación", r.food], ["Actividades", r.activities]];
    let verdict = "";
    if (r.budget !== null) {
      const diff = r.budget - r.total;
      verdict = diff >= 0 ? `<div class="alert ok">✔ Tu presupuesto (${money(r.budget)}) cubre la estimación. Te sobrarían unos ${money(diff)}.</div>` : `<div class="alert bad">⚠ La estimación supera tu presupuesto (${money(r.budget)}) en unos ${money(-diff)}. Prueba un alojamiento más sencillo, menos días o menos actividades.</div>`;
    }
    $("result").innerHTML = `
      <h2>Tu presupuesto orientativo</h2>
      <div class="result-total">${money(r.total)}</div>
      <p class="lead" style="margin:0">Estimación para ${r.tr} ${r.tr === 1 ? "viajero" : "viajeros"} durante ${r.days} ${r.days === 1 ? "día" : "días"} (${r.region}).</p>
      ${verdict}
      <div class="kpis"><div class="kpi"><small>Coste por persona</small><strong>${money(r.total / r.tr)}</strong></div><div class="kpi"><small>Coste aprox. por día</small><strong>${money(r.total / r.days)}</strong></div></div>
      <ul class="breakdown">${parts.map(([n, v]) => `<li><div class="row"><span>${n}</span><strong>${money(v)}</strong></div><div class="bar"><span style="width:${r.total ? (v / r.total) * 100 : 0}%"></span></div></li>`).join("")}</ul>
      <p class="notice"><strong>Importante:</strong> son precios orientativos y configurables, no precios reales de proveedores. No incluyen vuelos internacionales, seguros ni extras.</p>
      <div class="btn-row"><button class="btn" id="btnSummary" type="button">Generar resumen del viaje</button></div>
      <div id="summary"></div>
      <div class="cta-band" style="margin-top:1.5rem;padding:1.5rem">
        <div><h2 style="font-size:1.3rem">¿Quieres hacerlo realidad?</h2><p>Pide información sobre un viaje real a Aless Travels.</p></div>
        <a class="btn light" href="${PERU.agencyUrl}" target="_blank" rel="noopener">Visitar Aless Travels ↗</a>
      </div>`;
    $("btnSummary").addEventListener("click", summary);
    $("result").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  }

  function summary() {
    if (!last) return;
    const r = last, names = r.acts.map(a => "  • " + a.label);
    const txt = [
      "RESUMEN DE VIAJE A PERÚ (estimación orientativa)",
      "Viajeros: " + r.tr + " · Días: " + r.days + " · Región: " + r.region,
      "Alojamiento: " + $("lodging").selectedOptions[0].text + " · Transporte: " + $("transport").selectedOptions[0].text,
      "Actividades:" + (names.length ? "\n" + names.join("\n") : " ninguna"),
      "",
      "Alojamiento: " + money(r.lodging), "Transporte: " + money(r.transport), "Alimentación: " + money(r.food), "Actividades: " + money(r.activities),
      "TOTAL ESTIMADO: " + money(r.total) + " (" + money(r.total / r.tr) + " por persona · " + money(r.total / r.days) + " por día)",
      "",
      "Precios orientativos, no reales. Más información: " + PERU.agencyUrl
    ].join("\n");
    $("summary").innerHTML = `<div class="summary-box" id="sumTxt"></div><div class="btn-row"><button class="btn ghost small" id="copySum" type="button">Copiar resumen</button><button class="btn ghost small" id="printSum" type="button">Imprimir</button></div>`;
    $("sumTxt").textContent = txt;
    $("copySum").addEventListener("click", () => { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => UI.toast("Resumen copiado"), () => UI.toast("No se pudo copiar; selecciona el texto manualmente")); });
    $("printSum").addEventListener("click", () => window.print());
  }

  /* ---- Eventos ---- */
  form.addEventListener("submit", e => { e.preventDefault(); if (validate()) show(calculate()); else UI.toast("Revisa los campos marcados"); });
  $("region").addEventListener("change", drawActivities);
  $("reset").addEventListener("click", () => {
    setTimeout(() => {
      ["travelers", "days", "region", "lodging", "transport", "budget"].forEach(id => setErr(id, ""));
      drawActivities(); last = null;
      $("result").innerHTML = '<h2>Tu presupuesto orientativo</h2><p class="lead">Rellena el formulario y pulsa «Calcular presupuesto» para ver el resultado.</p>';
    }, 0);
  });
  ["travelers", "days", "budget"].forEach(id => $(id).addEventListener("blur", validate));

  const pre = new URLSearchParams(location.search).get("region");
  if (pre && ["costa", "sierra", "selva", "combinada"].includes(pre)) $("region").value = pre;
  drawConfig(); drawActivities();
})();
