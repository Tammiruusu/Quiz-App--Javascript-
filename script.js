//kysymykset alla, niitä voi muokata/lisätä halutun määrän
//muista merkitä CORRECT : TRUE oikeisiin vastauksiin! 
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
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


//pelin aloitus funktio, palauttaa tuloksen/scoren nollaan. 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//tämä näyttää kysymykset
function showQuestion() {
    //poistaa edelliset napit ja muut härpäkkeet
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    //tällä tuodaan vastaukset näkyviin
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
    })
}


//funktio poistaa edelliset napit käytöstä
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}




//kutsutaan pelin aloitus funktiota lopussa. 
startQuiz();
