/* ============ Interacciones: barra de progreso, scrollspy, aparición, lightbox ============ */
(function () {
  "use strict";
  var doc = document.documentElement;

  /* Barra de progreso + botón volver arriba */
  var bar = document.getElementById("progress"), toTop = document.getElementById("toTop"), tick = false;
  window.addEventListener("scroll", function () {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
      toTop.classList.toggle("show", doc.scrollTop > 700);
      tick = false;
    });
  }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* Aparición al hacer scroll */
  var rev = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .1 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add("in"); }); }

  /* Menú: marca el paso visible */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove("on"); l.removeAttribute("aria-current"); });
          map[e.target.id].classList.add("on");
          map[e.target.id].setAttribute("aria-current", "true");
          map[e.target.id].scrollIntoView({ inline: "center", block: "nearest" });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* Lightbox para ampliar capturas */
  var lb = document.getElementById("lb"), lbImg = lb.querySelector("img"), lbTxt = lb.querySelector("p"), lastBtn = null;
  function open(btn) {
    var img = btn.querySelector("img"), cap = btn.parentElement.querySelector("figcaption");
    lbImg.src = img.getAttribute("src"); lbImg.alt = img.alt;
    lbTxt.textContent = cap ? cap.textContent : img.alt;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; lastBtn = btn;
    lb.querySelector("button").focus();
  }
  function close() {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; if (lastBtn) lastBtn.focus();
  }
  document.querySelectorAll("figure.shot button").forEach(function (b) { b.addEventListener("click", function () { open(b); }); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "BUTTON") close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) close(); });
})();
