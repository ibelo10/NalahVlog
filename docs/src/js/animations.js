// docs/src/js/animations.js
export class HeartAnimation {
  constructor(selector) {
    this.heart = document.querySelector(selector);
    this.isAnimating = false;
    this.boundHandleHover = this.handleHover.bind(this);
  }

  handleHover() {
    if (!this.isAnimating && this.heart) {
      this.isAnimating = true;
      this.heart.classList.add("heart-hover");

      setTimeout(() => {
        this.heart.classList.remove("heart-hover");
        this.isAnimating = false;
      }, 300);
    }
  }

  init() {
    if (this.heart) {
      this.heart.addEventListener("mouseenter", this.boundHandleHover);
    }
  }

  destroy() {
    if (this.heart) {
      this.heart.removeEventListener("mouseenter", this.boundHandleHover);
    }
  }
}
