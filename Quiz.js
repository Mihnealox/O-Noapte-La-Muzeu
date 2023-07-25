const questions = [
    {
        question: 'In ce an a fost desenata "Las Meninas"?',
        answers: [
            {text: "1655", correct: false},
            {text: "1656", correct: true},
            {text: "1657", correct: false},
            {text: "1658", correct: false}
        ]
    },
    {
        question: 'Cine a pictat "Self-Portrait as a Painter"?',
        answers: [
            {text: "Pablo Picasso", correct: false},
            {text: "Leonardo DaVinci", correct: false},
            {text: "Van Gogh", correct: true},
            {text: "Mona Lisa", correct: false}
        ]
    },
    {
        question: 'Cine este in pictura "Aranjament in gri si negru nr.1"?',
        answers: [
            {text: "Mama artistului", correct: true},
            {text: "Bunica artistului", correct: false},
            {text: "Matusa artistului", correct: false},
            {text: "Sora artistului", correct: false}
        ]
    },
    {
        question: 'Cate persoane se afla in pictura "Cina cea de Taina"?',
        answers: [
            {text: "10", correct: false},
            {text: "11", correct: false},
            {text: "12", correct: false},
            {text: "13", correct: true}
        ]
    },
    {
        question: 'In ca an a fost pictata "Gradina Artistului la Vetheuil"?',
        answers: [
            {text: "1880", correct: true},
            {text: "1980", correct: false},
            {text: "1892", correct: false},
            {text: "1992", correct: false}
        ]
    },
    {
        question: 'Cine a pictat "Tipatul"?',
        answers: [
            {text: "Leonardo DaVinci", correct: false},
            {text: "Edvard Munch", correct: true},
            {text: "Clara Peeters", correct: false},
            {text: "Claude Monet", correct: false}
        ]
    },
    {
        question: 'Ce a pictat Van Gogh?',
        answers: [
            {text: '"Fleurs de cerise"', correct: false},
            {text: '"Dormitor in Arles"', correct: true},
            {text: '"Impression, soleil levant"', correct: false},
            {text: '"Lan de grau cu corbi"', correct: false}
        ]
    },
    {
        question: 'Ce obiecte sunt dominante in "Persistenta memoriei"?',
        answers: [
            {text: "Flori", correct: false},
            {text: 'Fructe', correct: false},
            {text: 'Ceasuri', correct: true},
            {text: 'Stele', correct: false}
        ]
    },
    {
        question: 'Pe ce obiect sta Venus in "Nasterea lui Venus"',
        answers: [
            {text: "o piatra", correct: false},
            {text: 'nori', correct: false},
            {text: 'o barca', correct: false},
            {text: 'o scoica', correct: true}
        ]
    },
    {
        question: 'Cate picturi sunt in muzeu?',
        answers: [
            {text: "32", correct: false},
            {text: '33', correct: false},
            {text: '34', correct: true},
            {text: '35', correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Urmatoarea intrebare";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }   
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Ai raspuns corect la ${score} intrebari din 10!`;
    nextButton.innerHTML = "Incearca iar";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < 10){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < 10){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();