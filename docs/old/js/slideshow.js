// docs/src/js/slideshow.js
export class Slideshow {
  constructor(selector) {
    this.slides = document.querySelectorAll(selector);
    this.currentSlide = 0;
    this.interval = null;
    this.transitionTime = 5000;
  }

  next() {
    if (this.slides.length > 0) {
      this.slides[this.currentSlide].classList.remove("active");
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.slides[this.currentSlide].classList.add("active");
    }
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.next(), this.transitionTime);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  preloadImages() {
    Array.from(this.slides).forEach((slide) => {
      const bgImage = slide.style.backgroundImage.match(
        /url\(['"]?([^'"]+)['"]?\)/
      );
      if (bgImage && bgImage[1]) {
        const img = new Image();
        img.src = bgImage[1];
      }
    });
  }
}
