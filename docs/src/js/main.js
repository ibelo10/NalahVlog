// docs/src/js/main.js
class LoadingManager {
  static removeLoadingOverlay() {
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    }
  }

  static addFallbackBackground() {
    document.querySelector(".background-container")?.classList.add("fallback");
  }

  static handleError(error) {
    console.error("Initialization error:", error);
    this.addFallbackBackground();
    this.removeLoadingOverlay();
  }
}

class MainController {
  constructor() {
    this.animations = null;
    this.init();
  }

  async init() {
    try {
      // Check dependencies
      if (!window.jQuery || !jQuery.fn.ripples) {
        throw new Error("Required dependencies not loaded");
      }

      // Initialize animations
      const { AnimationController } = await import("./animations.js");
      this.animations = new AnimationController();

      // Initialize other components
      this.initializeThemeToggle();
      this.initializeFeatureCards();
    } catch (error) {
      LoadingManager.handleError(error);
    }
  }

  initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("theme-light");
        themeToggle.textContent = document.body.classList.contains(
          "theme-light"
        )
          ? "☀️"
          : "🌙";
        localStorage.setItem(
          "theme",
          document.body.classList.contains("theme-light") ? "light" : "dark"
        );
      });

      // Load saved theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.body.classList.toggle("theme-light", savedTheme === "light");
        themeToggle.textContent = savedTheme === "light" ? "☀️" : "🌙";
      }
    }
  }

  initializeFeatureCards() {
    const cards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  destroy() {
    if (this.animations) {
      this.animations.destroy();
    }
  }
}

// Initialize the application
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new MainController());
} else {
  new MainController();
}

export { LoadingManager };
