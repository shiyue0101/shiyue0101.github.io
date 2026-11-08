/* Accessible previous/next controls and in-text navigation for Masking Ball figures. */
(() => {
  "use strict";
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-masking-figure]");
    if (!link) return;
    const target = document.getElementById(link.getAttribute("data-masking-figure"));
    if (!target) return;
    event.preventDefault();
    const rail = target.closest(".split-project-media");
    if (rail && window.matchMedia("(min-width: 821px)").matches) {
      const railRect = rail.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      rail.scrollTo({
        top: Math.max(0, rail.scrollTop + targetRect.top - railRect.top - 12),
        behavior: "smooth"
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  function show(carousel, n) {
    const slides = [...carousel.querySelectorAll(".masking-carousel-slide")];
    if (!slides.length) return;
    n = (n + slides.length) % slides.length;
    slides.forEach((s,i) => {
      s.hidden = i !== n;
      s.setAttribute("aria-hidden", i === n ? "false" : "true");
    });
    const status = carousel.querySelector(".masking-carousel-status");
    if (status) status.textContent = `${n+1} / ${slides.length}`;
    carousel.dataset.activeIndex = String(n);
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-masking-carousel-direction]");
    if (!btn) return;
    const c = btn.closest(".masking-figure-carousel");
    if (!c) return;
    const n = Number(c.dataset.activeIndex || 0);
    show(c, n + (btn.dataset.maskingCarouselDirection === "next" ? 1 : -1));
  });

  document.querySelectorAll(".masking-figure-carousel").forEach(c => show(c,0));
})();
