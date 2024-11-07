// docs/src/js/animations.js
import { LoadingManager } from "./main.js";

export class AnimationController {
  constructor() {
    this.$rippleContainer = null;
    this.rippleInterval = null;
    this.isRippleEnabled = true;
    this.lastRippleTime = 0;
    this.init();
  }

  init() {
    try {
      this.initializeRipples();
    } catch (error) {
      LoadingManager.handleError(error);
    }
  }

  initializeRipples() {
    try {
      this.$rippleContainer = jQuery(".smoke-ripple-container");
      if (this.$rippleContainer.length) {
        this.$rippleContainer.ripples({
          resolution: 512,
          dropRadius: 35,
          perturbance: 0.02,
          interactive: true,
          imageUrl: "/docs/Images/landingBG.jpg", // Background image for ripple effect
        });

        // Enhance smoke effect
        const canvas = this.$rippleContainer.find("canvas");
        if (canvas.length) {
          canvas.css({
            opacity: "0.7",
            filter: "blur(4px) contrast(1.5)",
            mixBlendMode: "screen",
          });
        }

        this.startAutoRipples();
        this.addMouseEffects();
      }
    } catch (error) {
      console.error("Ripples initialization failed:", error);
      LoadingManager.addFallbackBackground();
    }
  }

  startAutoRipples() {
    if (this.rippleInterval) {
      clearInterval(this.rippleInterval);
    }

    this.rippleInterval = setInterval(() => {
      if (!this.isRippleEnabled) return;
      this.generateSmokeEffect();
    }, 4000);

    // Initial smoke effects
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
        // Create multiple smoke points
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const dropRadius = 25 + Math.random() * 30;
          const strength = 0.01 + Math.random() * 0.02;

          setTimeout(() => {
            if (this.isRippleEnabled) {
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
    if (!this.$rippleContainer?.length) return;

    this.$rippleContainer.on("mousemove", (e) => {
      if (!this.isRippleEnabled) return;

      const now = Date.now();
      if (now - this.lastRippleTime < 50) return;
      this.lastRippleTime = now;

      const x = e.pageX - this.$rippleContainer.offset().left;
      const y = e.pageY - this.$rippleContainer.offset().top;

      // Create interactive smoke trail
      for (let i = 0; i < 2; i++) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        setTimeout(() => {
          if (this.isRippleEnabled) {
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
        this.$rippleContainer.ripples("destroy");
      }
    }

    if (this.rippleInterval) {
      clearInterval(this.rippleInterval);
    }
  }
}
