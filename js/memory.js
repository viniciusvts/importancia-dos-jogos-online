class MemoryGame {
  constructor() {
    this.allPairs = [];
    this.selectedPairs = [];
    this.cards = [];
    this.flippedCards = [];
    this.matchedCount = 0;
    this.isProcessing = false;
    this.timer = null;

    this.container = document.getElementById("memory-game-container");
    this.startBtn = document.getElementById("memory-start-btn");
    this.scoreDisplay = document.getElementById("memory-score-display");
    this.messageBox = document.getElementById("memory-message-box");

    this.init();
  }

  async init() {
    try {
      const response = await fetch("./data/memory.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.allPairs = await response.json();
    } catch (error) {
      console.error("Error loading memory.json:", error);
    }

    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => this.startGame());
    }

    window.addEventListener("languageChanged", () => this.updateUIOnLangChange());
  }

  startGame() {
    if (!this.allPairs || this.allPairs.length === 0) {
      console.error("Memory data not loaded.");
      return;
    }

    // Reset state
    this.matchedCount = 0;
    this.flippedCards = [];
    this.isProcessing = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Select 10 random pairs from the 20 available
    const shuffled = [...this.allPairs].sort(() => 0.5 - Math.random());
    this.selectedPairs = shuffled.slice(0, 10);

    // Print selected IDs to console.log as required by spec Tarefa-6
    const selectedIds = this.selectedPairs.map(p => p.id);
    console.log("Selected memory pair IDs:", selectedIds);

    // Generate 20 card elements (10 EN, 10 PT)
    this.cards = [];
    this.selectedPairs.forEach(pair => {
      this.cards.push({
        id: pair.id,
        text: pair.en,
        lang: "en",
        isFlipped: false,
        isMatched: false
      });
      this.cards.push({
        id: pair.id,
        text: pair.pt,
        lang: "pt",
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the 20 cards
    this.cards.sort(() => 0.5 - Math.random());

    this.renderBoard();
    this.updateScoreDisplay();

    if (this.messageBox) {
      this.messageBox.innerHTML = "";
    }
  }

  renderBoard() {
    if (!this.container) return;

    this.container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "memory-grid";

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement("button");
      cardEl.type = "button";
      cardEl.className = "memory-card" + (card.isFlipped || card.isMatched ? " flipped" : "") + (card.isMatched ? " matched" : "");
      cardEl.dataset.index = index;
      cardEl.setAttribute("aria-label", card.isFlipped || card.isMatched ? card.text : "Card closed");

      const cardInner = document.createElement("div");
      cardInner.className = "memory-card-inner";

      const cardFront = document.createElement("div");
      cardFront.className = "memory-card-front";
      cardFront.textContent = "X";

      const cardBack = document.createElement("div");
      cardBack.className = "memory-card-back";
      cardBack.textContent = card.text;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardEl.appendChild(cardInner);

      cardEl.addEventListener("click", () => this.handleCardClick(index, cardEl));

      grid.appendChild(cardEl);
    });

    this.container.appendChild(grid);
  }

  handleCardClick(index, cardEl) {
    if (this.isProcessing) return;

    const card = this.cards[index];
    if (card.isFlipped || card.isMatched) return;

    // Flip the clicked card
    card.isFlipped = true;
    cardEl.classList.add("flipped");
    this.flippedCards.push({ index, card, el: cardEl });

    // If second card flipped, start 3-second comparison timer
    if (this.flippedCards.length === 2) {
      this.isProcessing = true;
      const [first, second] = this.flippedCards;

      this.timer = setTimeout(() => {
        if (first.card.id === second.card.id) {
          // Match found
          first.card.isMatched = true;
          second.card.isMatched = true;
          first.el.classList.add("matched");
          second.el.classList.add("matched");

          this.matchedCount++;
          this.updateScoreDisplay();

          if (this.matchedCount === 10) {
            this.handleGameCompletion();
          }
        } else {
          // Not a match: reset flip
          first.card.isFlipped = false;
          second.card.isFlipped = false;
          first.el.classList.remove("flipped");
          second.el.classList.remove("flipped");
        }

        this.flippedCards = [];
        this.isProcessing = false;
        this.timer = null;
      }, 3000); // 3 seconds timer as specified
    }
  }

  updateScoreDisplay() {
    if (!this.scoreDisplay) return;
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "en-US";
    const scoreLabel = translations.memoryScoreLabel[currentLang] || "Score: ";
    const pairsLabel = translations.memoryPairsLabel[currentLang] || " / 10 pairs";
    this.scoreDisplay.textContent = `${scoreLabel}${this.matchedCount}${pairsLabel}`;
  }

  handleGameCompletion() {
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "en-US";
    const alertMsg = translations.memoryCompletedText[currentLang] || "Awesome! You found all 10 pairs!";
    
    if (this.messageBox) {
      this.messageBox.innerHTML = `<div class="alert alert-success mt-3 shadow-sm text-center fw-bold" role="alert">${alertMsg}</div>`;
    }
  }

  updateUIOnLangChange() {
    this.updateScoreDisplay();
  }
}

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.memoryGame = new MemoryGame();
});
