// Background Slideshow
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".background-slide");
  let currentSlide = 0;
  let slideshowInterval;

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000);
  }

  function pauseSlideshow() {
    clearInterval(slideshowInterval);
  }

  // Parallax effect on mouse move
  const content = document.querySelector(".content-container");

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth - e.pageX) / 100;
    const y = (window.innerHeight - e.pageY) / 100;

    requestAnimationFrame(() => {
      content.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });

  // Pause slideshow on hover
  const backgroundContainer = document.querySelector(".background-container");
  backgroundContainer.addEventListener("mouseenter", pauseSlideshow);
  backgroundContainer.addEventListener("mouseleave", startSlideshow);

  // Preload images
  function preloadImages() {
    slides.forEach((slide) => {
      const bgImage = slide.style.backgroundImage.match(
        /url\(['"]?([^'"]+)['"]?\)/
      )[1];
      const img = new Image();
      img.src = bgImage;
    });
  }

  // Initialize
  preloadImages();
  startSlideshow();
});
