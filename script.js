const questions = [
    {
        kysymys: "Kysymys teksti?",
        answers: [
            { Text: "vastaus 1", correct: false},
            { Text: "vastaus 2", correct: true},
            { Text: "vastaus 3", correct: false},
            { Text: "vastaus 4", correct: false}
        ]
    },
     {
        kysymys: "Kysymys teksti2?",
        answers: [
            { Text: "vastaus 1", correct: false},
            { Text: "vastaus 2", correct: true},
            { Text: "vastaus 3", correct: false},
            { Text: "vastaus 4", correct: false}
        ]
    },
     {
        kysymys: "Kysymys teksti3?",
        answers: [
            { Text: "vastaus 1", correct: false},
            { Text: "vastaus 2", correct: true},
            { Text: "vastaus 3", correct: false},
            { Text: "vastaus 4", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

