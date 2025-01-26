const siteSettings = {
  imagePath: "",
  videoPath: "",
  templates: {},
  breakpoints: {
    xs: 0,
    s: 641,
    m: 1025,
    l: 1321,
    xl: 1921,
  },
};

window.addEventListener("load", () => {
  for (const thisAction of siteActions) {
    if (document.querySelectorAll(thisAction.element).length > 0) {
      thisAction.action(
        document.querySelectorAll(thisAction.element),
        siteSettings.scrollController,
      );
    }
  }
});

const siteActions = [
  {
    element: "body",
    action: () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll("header nav a");

      window.addEventListener("scroll", () => {
        let currentSection = null;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const headerHeight = document.querySelector("header").offsetHeight;

          if (
            window.scrollY >= sectionTop - headerHeight - 100 &&
            window.scrollY < sectionTop + sectionHeight - headerHeight
          ) {
            currentSection = section;
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (currentSection && link.getAttribute("href") === `#${currentSection.id}`) {
            link.classList.add("active");
          }
        });
      });
    },
  },
  {
    element: 'a[href^="#"]',
    action: (anchorLinks) => {
      anchorLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetSection = document.querySelector(targetId);
          const headerHeight = document.querySelector("header").offsetHeight;

          if (targetSection) {
            const offset = targetSection.offsetTop - headerHeight - 50;
            window.scrollTo({
              top: offset,
              behavior: "smooth",
            });
          }
        });
      });
    },
  },
  {
    element: ".hamburger",
    action: (hamburgers) => {
      hamburgers.forEach((hamburger) => {
        hamburger.addEventListener("click", () => {
          const nav = hamburger.closest("header").querySelector("nav");
          hamburger.classList.toggle("open");
          nav.classList.toggle("open");
        });
      });
    },
  },
  {
    element: "header nav a",
    action: (navLinks) => {
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const header = link.closest("header");
          const hamburger = header.querySelector(".hamburger");
          const nav = header.querySelector("nav");

          if (hamburger && nav) {
            hamburger.classList.remove("open");
            nav.classList.remove("open");
          }
        });
      });
    },
  },
];
