/* Masking Ball: scroll the right-hand image column to a cited figure. */
(() => {
  "use strict";
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[data-masking-figure]");
    if (!anchor) return;
    const target = document.getElementById(anchor.dataset.maskingFigure);
    if (!target) return;
    event.preventDefault();
    const rail = target.closest(".split-project-media");
    if (rail && window.matchMedia("(min-width: 821px)").matches) {
      const railRect = rail.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const top = rail.scrollTop + targetRect.top - railRect.top - 12;
      rail.scrollTo({top: Math.max(0, top), behavior: "smooth"});
    } else {
      target.scrollIntoView({behavior: "smooth", block: "center"});
    }
    target.setAttribute("tabindex", "-1");
    try { target.focus({preventScroll: true}); } catch (_) { target.focus(); }
  });
})();
