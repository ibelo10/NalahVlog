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

    // Store original text and split into words
    this.originalText = this.element.textContent.trim();
    const words = this.originalText.split(" ");

    // Clear existing content
    this.element.textContent = "";

    // Create main container with flex wrap
    const container = document.createElement("div");
    container.className = "title-container";

    // Process each word
    words.forEach((word, wordIndex) => {
      const wordContainer = document.createElement("div");
      wordContainer.className = "word-container";

      // Process each letter in the word
      [...word].forEach((char, charIndex) => {
        const letter = document.createElement("span");
        letter.className = "animated-letter";
        letter.textContent = char;
        letter.style.setProperty(
          "--delay",
          `${wordIndex * 100 + charIndex * 50}ms`
        );
        wordContainer.appendChild(letter);
      });

      container.appendChild(wordContainer);

      // Add space after word (except last word)
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
