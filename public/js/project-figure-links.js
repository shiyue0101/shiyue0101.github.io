// Use the same figure navigation on standalone and embedded project pages.
document.addEventListener("click", (event) => {
  const link = event.target.closest('a.figure-ref[href^="#"]');
  if (
    !link ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target ||
    link.hasAttribute("download")
  )
    return;

  const figure = document.getElementById(link.hash.slice(1));
  if (!figure) return;
  event.preventDefault();

  const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
  const rail = figure.closest(".split-project-media");
  if (rail && matchMedia("(min-width: 821px)").matches) {
    const top =
      rail.scrollTop +
      figure.getBoundingClientRect().top -
      rail.getBoundingClientRect().top -
      12;
    rail.scrollTo({ top: Math.max(0, top), behavior });
  } else {
    figure.scrollIntoView({ behavior, block: "center" });
  }
  figure.tabIndex = -1;
  figure.focus({ preventScroll: true });
});
