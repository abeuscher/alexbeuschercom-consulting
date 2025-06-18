import Plyr from "plyr";

const siteSettings = {
  breakpoints: {
    xs: 0,
    s: 641,
    m: 1025,
    l: 1321,
    xl: 1921,
  },
};

const siteActions = [
  {
    element: "header",
    action: (els) => {
      const header = els[0];
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 200);
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
  {
    element: ".audio-player",
    action: (audioContainers) => {
      if (typeof Plyr === "undefined") {
        console.error("Plyr is not loaded. Make sure to include the Plyr script.");
        return;
      }

      audioContainers.forEach((container) => {
        const player = new Plyr(container.querySelector("audio"), {
          controls: ["play", "progress", "current-time", "duration", "mute", "volume"],
        });
        player.on("error", (error) => {
          console.error("Player error:", error);
        });
      });
    },
  },
];

window.addEventListener("load", () => {
  siteActions.forEach(({ element, action }) => {
    const elements = document.querySelectorAll(element);
    if (elements.length > 0) {
      action(elements);
    }
  });
});
