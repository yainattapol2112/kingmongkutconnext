const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 90, 280)}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

const navLinks = document.querySelectorAll(".nav-link");
const sectionMap = new Map();

navLinks.forEach((link) => {
  const targetId = link.getAttribute("href");
  if (!targetId || !targetId.startsWith("#")) {
    return;
  }

  const section = document.querySelector(targetId);
  if (section) {
    sectionMap.set(section, link);
  }
});

if (sectionMap.size && "IntersectionObserver" in window) {
  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const activeLink = sectionMap.get(entry.target);
        if (activeLink) {
          activeLink.setAttribute("aria-current", "page");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-20% 0px -45% 0px",
    },
  );

  sectionMap.forEach((_, section) => activeSectionObserver.observe(section));
}

const floatingCta = document.getElementById("floatingCta");

if (floatingCta) {
  const heroSection = document.querySelector(".hero");
  const toggleFloatingCta = () => {
    const heroBottom = heroSection
      ? heroSection.getBoundingClientRect().bottom
      : 0;
    floatingCta.classList.toggle("show", heroBottom < 0);
  };

  toggleFloatingCta();
  window.addEventListener("scroll", toggleFloatingCta, { passive: true });
}
