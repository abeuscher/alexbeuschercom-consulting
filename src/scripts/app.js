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
    element: "body",
    action: () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll("header nav a");
      const headerHeight = document.querySelector("header").offsetHeight;
      const homeLink = [...navLinks].find((link) => link.getAttribute("href") === "/");

      if (homeLink) homeLink.classList.add("active");

      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        let isAnySelected = false;

        navLinks.forEach((link) => link.classList.remove("active"));

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop - headerHeight - 100 &&
            scrollPosition < sectionTop + sectionHeight - headerHeight
          ) {
            isAnySelected = true;
            if (section.id === "about") {
              if (homeLink) homeLink.classList.add("active");
            } else {
              const correspondingLink = [...navLinks].find(
                (link) => link.getAttribute("href") === `#${section.id}`,
              );
              if (correspondingLink) correspondingLink.classList.add("active");
            }
          }
        });

        if (!isAnySelected && scrollPosition < headerHeight) {
          if (homeLink) homeLink.classList.add("active");
        }
      });
      console.log("starting fetch");
      fetch("http://localhost:8000/process-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          patient_data: {
            name: "John Doe",
            age: 45,
            medical_history: {
              conditions: ["Hypertension", "Type 2 Diabetes"],
              medications: [
                { name: "Lisinopril", dosage: "10mg", frequency: "daily" },
                { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
              ],
              allergies: ["Penicillin"],
            },
            recent_visits: [
              {
                date: "2025-01-15",
                reason: "Routine checkup",
                notes: "Blood pressure elevated at 145/90. A1C at 7.2%.",
              },
            ],
          },
          query: "What medications is this patient taking for hypertension?",
          max_context_length: 500,
        }),
      })
        .then((response) => {
          // Log the raw response for debugging
          console.log("Response status:", response.status);
          response.text().then((text) => {
            console.log("Raw response:", text);
            try {
              const data = JSON.parse(text);
              console.log("Success:", data);
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          });
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    },
  },
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
