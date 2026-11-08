/* Previous/next controls for Masking Ball figures. */
(() => {
  "use strict";
  function show(carousel, n) {
    const slides = [...carousel.querySelectorAll(".masking-carousel-slide")];
    if (!slides.length) return;
    n = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.hidden = i !== n;
      s.setAttribute("aria-hidden", i === n ? "false" : "true");
    });
    const status = carousel.querySelector(".masking-carousel-status");
    if (status) status.textContent = `${n + 1} / ${slides.length}`;
    carousel.dataset.activeIndex = String(n);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-masking-carousel-direction]");
    if (!btn) return;
    const c = btn.closest(".masking-figure-carousel");
    if (!c) return;
    const n = Number(c.dataset.activeIndex || 0);
    show(c, n + (btn.dataset.maskingCarouselDirection === "next" ? 1 : -1));
  });

  document
    .querySelectorAll(".masking-figure-carousel")
    .forEach((c) => show(c, 0));
})();
