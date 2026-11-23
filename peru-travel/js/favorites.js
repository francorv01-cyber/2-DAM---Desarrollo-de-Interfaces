/* ============ FAVORITOS (localStorage) ============ */
const Favs = (function () {
  const KEY = "peru_favs";
  let list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { list = []; }
  const listeners = [];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} listeners.forEach(f => f(list)); };

  function lookup(id) {
    const it = PERU.items.find(i => i.id === id);
    if (it) return { id, title: it.title, sub: PERU.regionLabels[it.region] + " · " + it.place, href: regionHref(it.region) };
    const r = PERU.restaurants.find(i => i.id === id);
    if (r) return { id, title: r.name, sub: "Restaurante · " + r.city, href: mapsUrl(r), external: true };
    return null;
  }
  function regionHref(region) { return (document.body.dataset.root || "") + "pages/" + region + ".html#" + "" ; }
  function mapsUrl(r) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r.name + " " + r.address + " " + r.city); }

  function refreshButtons(root) {
    (root || document).querySelectorAll("[data-fav]").forEach(b => {
      const on = list.includes(b.dataset.fav);
      b.setAttribute("aria-pressed", on);
      const isResto = b.classList.contains("resto-fav");
      b.textContent = isResto ? (on ? "♥ En favoritos" : "♡ Guardar") : (on ? "♥" : "♡");
      b.setAttribute("aria-label", (on ? "Quitar de favoritos: " : "Añadir a favoritos: ") + b.dataset.name);
    });
  }

  function renderDrawer() {
    const box = document.getElementById("favList");
    const count = document.getElementById("favCount");
    if (count) count.textContent = list.length;
    if (!box) return;
    if (!list.length) { box.innerHTML = '<p class="lead">Aún no tienes favoritos. Pulsa ♡ en cualquier destino, plato o restaurante.</p>'; return; }
    box.innerHTML = list.map(id => {
      const d = lookup(id); if (!d) return "";
      return `<div class="fav-item"><div><a href="${d.href}" ${d.external ? 'target="_blank" rel="noopener"' : ""}>${d.title}</a><small>${d.sub}</small></div><button class="icon-btn" data-fav="${id}" data-name="${d.title}" aria-label="Quitar ${d.title}">✕</button></div>`;
    }).join("");
  }

  function toggle(id) {
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    save();
    return i < 0;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-fav]");
    if (!b) return;
    e.preventDefault();
    const added = toggle(b.dataset.fav);
    if (window.UI) UI.toast(added ? "Añadido a favoritos ♥" : "Eliminado de favoritos");
  });

  listeners.push(() => { refreshButtons(); renderDrawer(); });
  window.addEventListener("storage", e => { if (e.key === KEY) { try { list = JSON.parse(e.newValue || "[]"); } catch (x) {} refreshButtons(); renderDrawer(); } });

  return { has: id => list.includes(id), all: () => list.slice(), refresh: refreshButtons, renderDrawer, toggle };
})();
