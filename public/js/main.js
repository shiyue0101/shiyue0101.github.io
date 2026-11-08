const sections = {
  about: document.getElementById("about"),
  projects: document.getElementById("projects"),
  skills: document.getElementById("skills"),
  contact: document.getElementById("contact"),
  professional: document.getElementById("professional"),
  life: document.getElementById("life"),
};
const backBtn = document.getElementById("back-btn");
const loadingOverlay = document.getElementById("loading-overlay");
let loadingHideTimer;

function hideLoading(delay = 0) {
  clearTimeout(loadingHideTimer);
  loadingHideTimer = setTimeout(() => {
    loadingOverlay?.classList.add("hidden");
    document.documentElement.classList.add("site-ready");
  }, delay);
}

function updateNavigation(page) {
  document.querySelectorAll("[data-nav-page]").forEach((link) => {
    if (link.dataset.navPage === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.querySelector(".site-header").addEventListener("click", (event) => {
  const link = event.target.closest("a[data-nav-page]");
  if (
    !link ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target ||
    link.hasAttribute("download")
  )
    return;
  event.preventDefault();
  if (HomepageRoutes.normalize(location.pathname) === link.pathname) return;
  if (link.dataset.navPage === "home") {
    showHome({ push: true, transition: true });
  } else {
    showSection(link.dataset.navPage, true);
  }
});

function applyHomeState() {
  updateNavigation("home");
  document.getElementById("main").style.display = "flex";
  Object.values(sections).forEach((section) => {
    section.classList.remove("active");
    section.classList.add("hidden");
  });
  backBtn.classList.remove("visible");
}

function showHome({ push = false, transition = false, initial = false } = {}) {
  const finish = () => {
    applyHomeState();
    if (push) history.pushState({}, "", "/");
    HomepageRoutes.sync("/");
    if (initial) hideLoading(0);
  };

  if (transition) return HomepageSoftTransition.run(finish);
  finish();
}

function showSection(
  page,
  push = false,
  { initial = false, transition = true } = {},
) {
  if (!sections[page]) return;
  const finish = () => {
    Object.values(sections).forEach((sec) => {
      sec.classList.remove("active");
      sec.classList.add("hidden");
    });
    updateNavigation(page);
    document.getElementById("main").style.display = "none";
    sections[page].classList.add("active");
    sections[page].classList.remove("hidden");
    if (page === "professional") {
      sections.professional.scrollTop = 0;
      updateProfessionalScrollbar();
    }
    backBtn.classList.toggle("visible", page === "skills");
    if (push) history.pushState({ page }, "", "/" + page);
    HomepageRoutes.sync("/" + page);
    if (initial) hideLoading(0);
  };
  if (transition) return HomepageSoftTransition.run(finish);
  finish();
}

backBtn.addEventListener("click", () => {
  showHome({ push: true, transition: true });
});

// 路由处理
function handleRoute({ initial = false } = {}) {
  const path = HomepageRoutes.normalize(location.pathname);
  // HOMEPAGE_PROJECT_ROUTE_GUARD_V3
  // Embedded project routes are controlled exclusively by project-router.js.
  if (HomepageRoutes.isProject(path)) {
    if (initial) hideLoading(0);
    return;
  }
  const page = HomepageRoutes.pageForPath(path) || "home";
  if (page === "home") {
    showHome({ initial });
  } else {
    showSection(page, false, { initial, transition: false });
  }
}

// 页面加载完成后的初始化
document.addEventListener("DOMContentLoaded", function () {
  /* piano-loading-fix-v2: always resolve initial overlay */
  try {
    setupProfessionalList();
    handleRoute({ initial: true });
  } finally {
    hideLoading(0);
  }
});
