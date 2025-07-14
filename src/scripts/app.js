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
    element: ".hamburger",
    action: (hamburgers) => {
      hamburgers.forEach((hamburger) => {
        hamburger.addEventListener("click", () => {
          const nav = hamburger.closest("header").querySelector("nav");
          hamburger.classList.toggle("open");
          nav.classList.toggle("open");
        });
      });
      // Check actual measurements
      console.log("Body scrollWidth:", document.body.scrollWidth);
      console.log("HTML scrollWidth:", document.documentElement.scrollWidth);
      console.log("Window innerWidth:", window.innerWidth);
      console.log("Overflow amount:", document.documentElement.scrollWidth - window.innerWidth);

      // Find the widest element
      let elements = document.querySelectorAll("*");
      let widest = 0;
      let widestEl = null;
      elements.forEach((el) => {
        if (el.scrollWidth > widest) {
          widest = el.scrollWidth;
          widestEl = el;
        }
      });
      console.log("Widest element:", widestEl, "Width:", widest);
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
