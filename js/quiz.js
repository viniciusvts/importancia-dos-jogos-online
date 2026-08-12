class QuizGame {
  constructor() {
    this.allQuestions = [];
    this.selectedQuestions = [];
    this.currentIndex = 0;
    this.userAnswers = {}; // questionId -> selectedOptionText
    this.score = 0;

    this.container = document.getElementById("quiz-game-container");
    this.startBtn = document.getElementById("quiz-start-btn");
    this.messageBox = document.getElementById("quiz-message-box");

    this.init();
  }

  async init() {
    try {
      const response = await fetch("./data/quiz.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.allQuestions = await response.json();
    } catch (error) {
      console.error("Error loading quiz.json:", error);
    }

    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => this.startQuiz());
    }

    window.addEventListener("languageChanged", () => this.updateUIOnLangChange());
  }

  startQuiz() {
    if (!this.allQuestions || this.allQuestions.length === 0) {
      console.error("Quiz data not loaded.");
      return;
    }

    // Reset state
    this.currentIndex = 0;
    this.userAnswers = {};
    this.score = 0;

    // Pick 10 random questions and shuffle
    const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
    this.selectedQuestions = shuffled.slice(0, 10).map(q => {
      // Store correct option (always options[0] in quiz.json)
      const correctAnswer = q.options[0];
      // Shuffle options for rendering
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      return {
        id: q.id,
        question: q.question,
        correctAnswer: correctAnswer,
        options: shuffledOptions
      };
    });

    if (this.messageBox) {
      this.messageBox.innerHTML = "";
    }

    this.renderQuestionStep();
  }

  renderQuestionStep() {
    if (!this.container) return;

    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "en-US";
    const questionProgressText = translations.quizQuestionProgress[currentLang] || "Question ";
    const nextBtnText = translations.quizNextBtn[currentLang] || "Next Question";
    const finishBtnText = translations.quizFinishBtn[currentLang] || "Finish Quiz";

    const q = this.selectedQuestions[this.currentIndex];
    const total = this.selectedQuestions.length;

    this.container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "quiz-card shadow-sm p-4 bg-white rounded";

    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-fieldset";

    const legend = document.createElement("legend");
    legend.className = "quiz-legend fw-bold mb-3";
    legend.textContent = `${questionProgressText} ${this.currentIndex + 1} / ${total}: ${q.question}`;
    fieldset.appendChild(legend);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options mb-4";

    q.options.forEach((optionText, idx) => {
      const optionId = `q_${q.id}_opt_${idx}`;

      const optionDiv = document.createElement("div");
      optionDiv.className = "form-check quiz-option-item p-3 mb-2 rounded border";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `quiz_question_${q.id}`;
      radio.id = optionId;
      radio.value = optionText;
      radio.className = "form-check-input me-2";

      if (this.userAnswers[q.id] === optionText) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        this.userAnswers[q.id] = optionText;
        // remove alert warning if shown
        const alertEl = card.querySelector(".quiz-alert");
        if (alertEl) alertEl.remove();
      });

      const label = document.createElement("label");
      label.htmlFor = optionId;
      label.className = "form-check-label w-100 cursor-pointer";
      label.textContent = optionText;

      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      optionsContainer.appendChild(optionDiv);
    });

    fieldset.appendChild(optionsContainer);

    // Actions button
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "d-flex justify-content-end";

    const actionBtn = document.createElement("button");
    actionBtn.type = "button";
    actionBtn.className = "btn btn-primary px-4 py-2 fw-bold";

    if (this.currentIndex === total - 1) {
      actionBtn.textContent = finishBtnText;
      actionBtn.addEventListener("click", () => this.handleNextOrFinish(true, card));
    } else {
      actionBtn.textContent = nextBtnText;
      actionBtn.addEventListener("click", () => this.handleNextOrFinish(false, card));
    }

    actionsDiv.appendChild(actionBtn);
    fieldset.appendChild(actionsDiv);
    card.appendChild(fieldset);

    this.container.appendChild(card);
  }

  handleNextOrFinish(isLast, card) {
    const q = this.selectedQuestions[this.currentIndex];
    const selected = this.userAnswers[q.id];

    if (!selected) {
      // Validate option selection before proceeding
      const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "en-US";
      const selectAlertText = translations.quizSelectAlert[currentLang] || "Please select an answer before continuing.";
      
      let alertEl = card.querySelector(".quiz-alert");
      if (!alertEl) {
        alertEl = document.createElement("div");
        alertEl.className = "alert alert-warning quiz-alert mt-3 mb-0";
        card.appendChild(alertEl);
      }
      alertEl.textContent = selectAlertText;
      return;
    }

    if (isLast) {
      this.calculateAndShowResults();
    } else {
      this.currentIndex++;
      this.renderQuestionStep();
    }
  }

  calculateAndShowResults() {
    this.score = 0;
    this.selectedQuestions.forEach(q => {
      if (this.userAnswers[q.id] === q.correctAnswer) {
        this.score++;
      }
    });

    const total = this.selectedQuestions.length;
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "en-US";
    const scoreTitle = translations.quizScoreTitle[currentLang] || "Quiz Completed!";
    const scoreLabel = translations.quizScoreLabel[currentLang] || "Final Score: ";
    const restartBtnText = translations.quizRestartBtn[currentLang] || "Restart Quiz";

    this.container.innerHTML = `
      <div class="quiz-result-card text-center p-5 bg-white rounded shadow-sm">
        <div class="display-4 text-success mb-3"><i class="bi bi-trophy"></i> 🏆</div>
        <h3 class="fw-bold mb-3">${scoreTitle}</h3>
        <p class="fs-4 mb-4">${scoreLabel} <span class="badge bg-primary fs-3 px-4 py-2">${this.score}/${total}</span></p>
        <button id="quiz-restart-btn" class="btn btn-success btn-lg px-5 fw-bold shadow-sm">${restartBtnText}</button>
      </div>
    `;

    document.getElementById("quiz-restart-btn").addEventListener("click", () => {
      this.startQuiz();
    });
  }

  updateUIOnLangChange() {
    if (this.selectedQuestions.length > 0 && this.currentIndex < this.selectedQuestions.length) {
      // Re-render current question with updated translation strings
      this.renderQuestionStep();
    }
  }
}

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.quizGame = new QuizGame();
});
