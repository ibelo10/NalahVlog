// docs/src/js/animations.js
import { LoadingManager } from "./main.js";

export class AnimationController {
  constructor() {
    this.$rippleContainer = null;
    this.rippleInterval = null;
    this.isRippleEnabled = true;
    this.lastRippleTime = 0;
    this.backgroundImage = "/docs/Images/landingBG.jpg";
    this.init();
  }

  async init() {
    try {
      // Wait for image to load before initializing ripples
      await this.preloadBackgroundImage();

      // Initialize ripples effect
      await this.initializeRipples();

      // Start animations if successful
      if (this.isRippleEnabled) {
        this.startAutoRipples();
        this.addMouseEffects();
      }
    } catch (error) {
      console.error("Animation initialization error:", error);
      this.handleRippleError();
    }
  }

  async preloadBackgroundImage() {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        console.log("Background image loaded successfully");
        resolve();
      };

      img.onerror = () => {
        console.error("Failed to load background image");
        reject(new Error("Background image failed to load"));
      };

      img.src = this.backgroundImage;
    });
  }

  async initializeRipples() {
    if (!this.isRippleEnabled) return;

    try {
      this.$rippleContainer = jQuery(".smoke-ripple-container");

      if (!this.$rippleContainer.length) {
        throw new Error("Ripple container not found");
      }

      // Initialize ripples with optimal settings
      this.$rippleContainer.ripples({
        resolution: 512,
        dropRadius: 35,
        perturbance: 0.02,
        interactive: true,
        crossOrigin: "",
      });

      // Add canvas styles
      const canvas = this.$rippleContainer.find("canvas");
      if (canvas.length) {
        canvas.css({
          opacity: "0.7",
          filter: "blur(4px) contrast(1.5)",
          mixBlendMode: "screen",
        });
      }

      // Add resize handler
      this.addResizeHandler();
    } catch (error) {
      console.error("Ripples initialization failed:", error);
      this.handleRippleError();
      throw error;
    }
  }

  startAutoRipples() {
    if (!this.isRippleEnabled || !this.$rippleContainer?.length) return;

    // Clear any existing interval
    if (this.rippleInterval) {
      clearInterval(this.rippleInterval);
    }

    // Create new interval for smoke effect
    this.rippleInterval = setInterval(() => {
      if (this.isRippleEnabled) {
        this.generateSmokeEffect();
      }
    }, 4000);

    // Initial effects
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.generateSmokeEffect(), i * 800);
    }
  }

  generateSmokeEffect() {
    if (!this.$rippleContainer?.length || !this.isRippleEnabled) return;

    try {
      const width = this.$rippleContainer.outerWidth();
      const height = this.$rippleContainer.outerHeight();

      if (width && height) {
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const dropRadius = 25 + Math.random() * 30;
          const strength = 0.01 + Math.random() * 0.02;

          setTimeout(() => {
            if (this.isRippleEnabled && this.$rippleContainer) {
              this.$rippleContainer.ripples("drop", x, y, dropRadius, strength);
            }
          }, i * 100);
        }
      }
    } catch (error) {
      console.error("Error generating smoke:", error);
      this.handleRippleError();
    }
  }

  addMouseEffects() {
    if (!this.$rippleContainer?.length || !this.isRippleEnabled) return;

    this.$rippleContainer.on("mousemove", (e) => {
      if (!this.isRippleEnabled) return;

      const now = Date.now();
      if (now - this.lastRippleTime < 50) return;
      this.lastRippleTime = now;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 2; i++) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        setTimeout(() => {
          if (this.isRippleEnabled && this.$rippleContainer) {
            this.$rippleContainer.ripples(
              "drop",
              x + offsetX,
              y + offsetY,
              20 + Math.random() * 15,
              0.01 + Math.random() * 0.01
            );
          }
        }, i * 50);
      }
    });
  }

  addResizeHandler() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.$rippleContainer?.length && this.isRippleEnabled) {
          this.$rippleContainer.ripples("updateSize");
        }
      }, 250);
    });
  }

  handleRippleError() {
    this.isRippleEnabled = false;
    if (this.rippleInterval) {
      clearInterval(this.rippleInterval);
    }
    LoadingManager.addFallbackBackground();
  }

  destroy() {
    this.isRippleEnabled = false;

    if (this.$rippleContainer?.length) {
      this.$rippleContainer.off("mousemove");
      if (typeof this.$rippleContainer.ripples === "function") {
        try {
          this.$rippleContainer.ripples("destroy");
        } catch (error) {
          console.error("Error destroying ripples:", error);
        }
      }
    }

    if (this.rippleInterval) {
      clearInterval(this.rippleInterval);
    }
  }
}
