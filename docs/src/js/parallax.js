// docs/src/js/parallax.js
export class ParallaxEffect {
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);
    this.options = {
      sensitivity: options.sensitivity || 50,
      maxTilt: options.maxTilt || 10,
      perspective: options.perspective || 1000,
      scale: options.scale || 1.05,
      enabled: window.innerWidth >= 768,
    };
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.init();
  }

  handleMouseMove(e) {
    if (!this.options.enabled || !this.element) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -this.options.maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * this.options.maxTilt;

    this.element.style.transform = `
        perspective(${this.options.perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${this.options.scale})
      `;
  }

  handleMouseLeave() {
    if (!this.element) return;

    this.element.style.transform = `
        perspective(${this.options.perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
  }

  init() {
    if (!this.element) return;

    this.element.style.transition = "transform 0.3s ease-out";
    this.element.style.transformStyle = "preserve-3d";

    document.addEventListener("mousemove", this.boundHandleMouseMove);
    this.element.addEventListener("mouseleave", () => this.handleMouseLeave());

    // Handle window resize
    window.addEventListener("resize", () => {
      this.options.enabled = window.innerWidth >= 768;
      if (!this.options.enabled) {
        this.handleMouseLeave();
      }
    });
  }

  destroy() {
    document.removeEventListener("mousemove", this.boundHandleMouseMove);
    if (this.element) {
      this.element.removeEventListener("mouseleave", () =>
        this.handleMouseLeave()
      );
    }
  }
}
