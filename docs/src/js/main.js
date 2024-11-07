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
    const container = document.querySelector(".background-container");
    if (container && !container.classList.contains("fallback")) {
      container.classList.add("fallback");
    }
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
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      // Verify jQuery and ripples are available
      if (typeof jQuery === "undefined") {
        throw new Error("jQuery not loaded");
      }

      if (typeof jQuery.fn.ripples === "undefined") {
        throw new Error("Ripples plugin not loaded");
      }

      // Initialize animations
      const { AnimationController } = await import("./animations.js");
      this.animations = new AnimationController();

      // Initialize other components
      this.initializeThemeToggle();
      this.initializeFeatureCards();

      this.initialized = true;
    } catch (error) {
      LoadingManager.handleError(error);
    }
  }

  initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const updateTheme = (isLight) => {
      document.body.classList.toggle("theme-light", isLight);
      themeToggle.textContent = isLight ? "☀️" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    };

    // Handle click events
    themeToggle.addEventListener("click", () => {
      const isLight = !document.body.classList.contains("theme-light");
      updateTheme(isLight);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      updateTheme(savedTheme === "light");
    }
  }

  initializeFeatureCards() {
    const cards = document.querySelectorAll(".feature-card");
    if (!cards.length) return;

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
    this.initialized = false;
  }
}

// Initialize when DOM is ready
const controller = new MainController();

// Ensure DOM is loaded before initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => controller.init());
} else {
  controller.init();
}

export { LoadingManager, MainController };
