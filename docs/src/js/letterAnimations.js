// docs/src/js/letterAnimations.js
export class LetterAnimations {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.originalText = "";
    this.animated = false;
    this.init();
  }

  init() {
    if (!this.element) return;

    this.originalText = this.element.textContent.trim();
    const words = this.originalText.split(" ");
    this.element.textContent = "";

    const container = document.createElement("div");
    container.className = "title-container";

    words.forEach((word, wordIndex) => {
      const wordContainer = document.createElement("div");
      wordContainer.className = "word-container";

      [...word].forEach((char, charIndex) => {
        const letter = document.createElement("span");
        letter.className = "animated-letter";
        letter.textContent = char;

        // Set random rotation for hover effect
        const randomRotation = (Math.random() - 0.5) * 16;
        letter.style.setProperty("--random-rotation", `${randomRotation}deg`);

        // Set animation delay
        letter.style.setProperty(
          "--delay",
          `${wordIndex * 100 + charIndex * 50}ms`
        );

        // Add individual letter hover effect
        letter.addEventListener("mouseover", () => {
          letter.style.setProperty(
            "--random-rotation",
            `${(Math.random() - 0.5) * 16}deg`
          );
        });

        wordContainer.appendChild(letter);
      });

      container.appendChild(wordContainer);

      if (wordIndex < words.length - 1) {
        const space = document.createElement("div");
        space.className = "word-space";
        space.innerHTML = "&nbsp;";
        container.appendChild(space);
      }
    });

    this.element.appendChild(container);
  }
}
