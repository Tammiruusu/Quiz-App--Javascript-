//kysymykset alla, niitä voi muokata/lisätä halutun määrän
//muista merkitä CORRECT : TRUE oikeisiin vastauksiin! 
const questions = [
    {
        kysymys: "Milloin Bram Stokerin Dracula ilmestyi?",
        answers: [
            { Text: "1867", correct: false},
            { Text: "1897", correct: true},
            { Text: "1921", correct: false},
            { Text: "1948", correct: false}
        ]
    },
     {
        kysymys: "Draculasta tehtiin luvaton Kopio Saksassa vuonna 1922, mikä se oli nimeltään?",
        answers: [
            { Text: "House of Dracula", correct: false},
            { Text: "Jonathan", correct: false},
            { Text: "Nosferatu", correct: true},
            { Text: "Vampirella", correct: false}
        ]
    },
     {
        kysymys: "Kuka Vampyyri oli ensimmäinen kirjallisuudessa?",
        answers: [
            { Text: "Nosferatu", correct: false},
            { Text: "Dracula", correct: false},
            { Text: "Lestat", correct: false},
            { Text: "Carmilla", correct: true}
        ]
    },
     {
        kysymys: "Kuka näytteli Draculaa valkokankaalla ensimmäiseksi?",
        answers: [
            { Text: "Bela Lugosi", correct: false},
            { Text: "Christopher Lee", correct: false},
            { Text: "John Carradine", correct: false},
            { Text: "Max Schreck", correct: true}
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
