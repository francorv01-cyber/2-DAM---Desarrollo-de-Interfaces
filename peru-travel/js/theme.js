/* ============ TEMA CLARO / OSCURO (persistente con localStorage) ============ */
(function () {
  var KEY = "peru_theme";
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function initial() {
    var s = stored();
    if (s === "light" || s === "dark") return s;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    var b = document.getElementById("themeBtn");
    if (b) {
      b.textContent = t === "dark" ? "☀️" : "🌙";
      b.setAttribute("aria-label", t === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      b.setAttribute("title", t === "dark" ? "Modo claro" : "Modo oscuro");
    }
  }
  window.Theme = {
    current: function () { return document.documentElement.getAttribute("data-theme"); },
    toggle: function () {
      var t = this.current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, t); } catch (e) {}
      apply(t);
    },
    sync: function () { apply(this.current()); }
  };
  apply(initial()); // se ejecuta en <head> para evitar parpadeo
})();
