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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.kysymys;


    //tällä tuodaan vastaukset näkyviin
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //Laskee OIKEAT vastaukset
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


//funktio poistaa edelliset napit käytöstä
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//lisätään CORRECT tai INCORRECT luokat riippuen onko vastaus OIKEIN vai VÄÄRIN!
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    } 
    //tarkistaa, jos et painanut OIKEAA vastausta, array For Each etsii oikean vastauksen
    //ja lisää siihen CORRECT luokan. Sekä pistää napit poist käytöstä
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}


//pelin lopuksi näyttää tuloksen ja antaa pelaa uudelleen napin
function showScore() {
    resetState();
    questionElement.innerHTML = `Tuloksesi on ${score} oikein kaikista ${questions.length} kysymyksestä!`;
    nextButton.innerHTML = "Pelaa uudelleen";
    nextButton.style.display = "block";
}

//antaa seuraavan kysymyksen TAI jos kysymykset loppu, näyttää SCOREN
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


//tapahtuma kuuntelijan lisäys seuraavaan nappiin, odottaa CLICK tapahtumaa
//suorittaa joko HandleNextButton tai startQuiz funtion
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz(); 
    }
})


//kutsutaan pelin aloitus funktiota lopussa. 
startQuiz();
