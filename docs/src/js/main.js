// docs/src/js/main.js
import { Slideshow } from "./slideshow.js";
import { ParallaxEffect } from "./parallax.js";
import { HeartAnimation } from "./animations.js";
import { LetterAnimations } from "./letterAnimations.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize slideshow
  const slideshow = new Slideshow(".background-slide");
  slideshow.preloadImages();
  slideshow.start();

  // Initialize parallax
  const parallax = new ParallaxEffect(".content-container");
  parallax.init();

  // Initialize heart animation
  const heart = new HeartAnimation(".heart");
  heart.init();

  // Initialize letter animations
  const titleAnimation = new LetterAnimations(".animated-title");

  // Event listeners for slideshow pause/resume
  const backgroundContainer = document.querySelector(".background-container");
  if (backgroundContainer) {
    backgroundContainer.addEventListener("mouseenter", () => slideshow.pause());
    backgroundContainer.addEventListener("mouseleave", () => slideshow.start());
  }

  // Handle loading overlay
  const loadingOverlay = document.querySelector(".loading-overlay");
  if (loadingOverlay) {
    window.addEventListener("load", () => {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    });
  }

  // Cleanup on page unload
  window.addEventListener("unload", () => {
    parallax.destroy();
    heart.destroy();
  });
});
