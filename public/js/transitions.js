// SITE_SOFT_TRANSITIONS_V1: shared content-only transition. Keep audio/header mounted.
(() => {
  "use strict";
  const curtain = document.createElement("div");
  curtain.id = "site-soft-transition-curtain";
  const paws = document.querySelector("#loading-overlay .cat-paw-loading");
  curtain.append(paws.cloneNode(true));
  document.body.appendChild(curtain);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let sequence = 0;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const paint = () =>
    new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  async function run(change) {
    const ticket = ++sequence;
    const animate = !reduced.matches;
    curtain.classList.add("is-active");
    const minimum = animate ? wait(480) : Promise.resolve();
    if (animate) await wait(210);
    if (ticket !== sequence) return;
    try {
      await change();
    } finally {
      await Promise.all([minimum, paint()]);
      if (ticket === sequence) curtain.classList.remove("is-active");
    }
  }
  window.HomepageSoftTransition = { run };
})();
