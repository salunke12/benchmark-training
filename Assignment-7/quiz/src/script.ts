interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[];
  private currentQuestionIndex: number = 0;
  private score: number = 0;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.loadQuestion();
  }

  public loadQuestion(): void {
    const questionElement = document.getElementById("question")!;
    const choicesContainer = document.getElementById("choices")!;
    const nextButton = document.getElementById("nextBtn")!;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showScore();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", () => this.handleAnswer(choice));
      choicesContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
  }

  private handleAnswer(selectedChoice: string): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedChoice === currentQuestion.correctAnswer) {
      this.score++;
    }

    this.currentQuestionIndex++;
    document.getElementById("nextBtn")!.classList.remove("hidden");
  }

  private showScore(): void {
    document.getElementById("question")!.textContent = "Quiz Completed!";
    document.getElementById("choices")!.innerHTML = "";
    document.getElementById("nextBtn")!.classList.add("hidden");
    document.getElementById(
      "score"
    )!.textContent = `Final Score: ${this.score} / ${this.questions.length}`;
    document.getElementById("score")!.classList.remove("hidden");
  }
}

const questions: Question[] = [
  { question: "What is 2 + 2?", choices: ["3", "4", "5"], correctAnswer: "4" },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which is the largest planet?",
    choices: ["Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
];

const quiz = new Quiz(questions);

document
  .getElementById("nextBtn")!
  .addEventListener("click", () => quiz.loadQuestion());
