/* PurrPost: clicking an in-text figure reference scrolls the image rail. */
(() => {
  "use strict";
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-purrpost-figure]");
    if (!link) return;
    const id = link.getAttribute("data-purrpost-figure");
    const figure = document.getElementById(id);
    if (!figure) return;

    event.preventDefault();
    const rail = figure.closest(".split-project-media");
    if (rail && window.matchMedia("(min-width: 821px)").matches) {
      const railRect = rail.getBoundingClientRect();
      const figureRect = figure.getBoundingClientRect();
      const targetTop = rail.scrollTop + figureRect.top - railRect.top - 12;
      rail.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    } else {
      figure.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    figure.setAttribute("tabindex", "-1");
    try {
      figure.focus({ preventScroll: true });
    } catch (_) {
      figure.focus();
    }
  });
})();
