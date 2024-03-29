'use strict'

let questionNumber = 1;

let correct = 0;

const myQuestions = [
    {
        number: 1,
        text: `What does .forEach( ) do?`,
        answer1: `executes a provided function once for each array element`,
        answer2: `executes multiple functions for an indexed array item`,
        answer3: `decides which array elements are important`,
        answer4: `logs a thumbs up for each array item in the console` 
    },
    {
        number: 2,
        text: `When using .map( ), how does it work?`,
        answer1: `by creating a detailed map of where to find the answer`,
        answer2: `by copying the array into a new array`,
        answer3: `by creating a new array with the results of calling a provided function on every element in the calling array`,
        answer4: `by taking the old array and mutating it into a new array by way of coercion`
    },
    {
        number: 3,
        text: `What does .push( ) do?`,
        answer1: `forces the function to work by pushing it along`,
        answer2: `adds an element to the end of an array and returns the new array with the new element`,
        answer3: `adds and element to the beginning of an array and returns the new array with the new element`,
        answer4: `makes sure the array isn’t pushed around by any bigger arrays `
    },
    {
        number: 4,
        text: `What does .find( ) do?`,
        answer1: `returns the value of the last element in the array that satisfies the provided function`,
        answer2: `alooks for the best option to complete the function without any issues`,
        answer3: `returns the value of the first element in the array that satisfies the provided function`,
        answer4: `if you type .find(answer) it will give you the solution if you are stuck`
    },
    {
        number: 5,
        text: `What does .reduce( ) do?`,
        answer1: `executes a provided reducer function on each element of an array, resulting in a single output value`,
        answer2: `if you use .reduce(stress) you will automatically feel better`,
        answer3: `executes a function that reduces the amount of code needed to come to a solution`,
        answer4: `executes a provided reducer function on each element of an array, resulting in multiple output values`
    }

];

const ANS = [
    `executes a provided function once for each array element`,
    `by creating a new array with the results of calling a provided function on every element in the calling array`,
    `adds an element to the end of an array and returns the new array with the new element`,
    `returns the value of the first element in the array that satisfies the provided function`,
    `executes a provided reducer function on each element of an array, resulting in a single output value`
    
]

function startQuiz() {
    // this function will begin the quiz when user hits .startQuiz() button
    $('.startBtn').on('click', function() {
        getQuestion();
        $('.header').remove();
    });
}

function getQuestion() {
    // this function will render the question to the page
    const question = myQuestions[questionNumber - 1];
    const questionsAnswered = questionNumber - 1;

    $('.questionAndAnswers').html(questionTemp(correct, question, questionsAnswered));
    $('.startQuiz').remove();
}

function questionTemp(correct, question, questionsAnswered) {
    return `
            <h2 id="question">${question.text}</h2> 
            <form class="questions">
                <fieldset>
                    <label>
                    <input class="answer" type="radio" name="option"></input><span>${question.answer1}</span>
                    </label>

                    <label>
                    <input class="answer" type="radio" name="option"></input><span>${question.answer2}</span>
                    </label>

                    <label>
                    <input class="answer" type="radio" name="option"></input><span>${question.answer3}</span>
                    </label>

                    <label>
                    <input class="answer" type="radio" name="option"></input><span>${question.answer4}</span>
                    </label>
                </fieldset>

                <button id="submit-btn">Submit</button>

                <p class="validation">Please make a selection before submitting</p>
            
            </form>

            <div id="score">
                <span id="question-count">Question: ${question.number}/5</span>
                <span id="score-count">Score: ${correct}/${questionsAnswered}</span>
            </div>
    `
}

function handleSubmitBtn() {
    $('.questionAndAnswers').on('click', '#submit-btn', function(event){
        event.preventDefault();
        const answer = $('input:checked').siblings('span');
        const correctUserAnswer = checkUserAnswer(answer);
        if ($(this).parent().find('input[type="radio"]').is(':checked')) {
            if(correctUserAnswer) {
                generateCorrect();
            } else {
                generateIncorrect();
            }
        } else {
            $('form p').fadeIn(500);
        }       
    });
}


function checkUserAnswer(answer) {
    if(answer.text() === ANS[questionNumber - 1]) {
        return true;
    } else {
        return false;
    }
}

function generateCorrect() {
    $('.questionAndAnswers').html(correctFeedback);
    iterateCorrectAns();
}

const correctFeedback = `
    <div class="user-feedback-page" role="main">
        <h2 class="feedback-heading">That is Correct!</h2>
        <img src="img/thumbsUp.png" alt="positive picture">
        <button id="next-btn">Next</button>
    </div>
`;

function generateIncorrect() {
    $('.questionAndAnswers').html(incorrectFeedbackTemp(questionNumber));
}

function incorrectFeedbackTemp(questionNumber) {
    return `
        <div class="user-feedback-page" role="main">
            <h2 class="feedback-heading">No Luck, Sorry!</h2>
            <p class="feedback-ans">The answer is: ${ANS[questionNumber - 1]}.</p>
            <img src="img/shrug.png" alt="man shrugging">
            <button id="next-btn">Next</button>
        </div>
    `
}

function iterateQuestion() {
    questionNumber ++;
}

function iterateCorrectAns() {
    correct ++;
}

function nextQuestion() {
    // this function will go to the next question
    $('.questionAndAnswers').on('click', '#next-btn', function(event) {
        if(questionNumber === 5) {
            showResults(correct);
        } else {
            iterateQuestion();
            getQuestion();
        }
    });
}

function showResults(correct) {
    $('.questionAndAnswers').html(`
        <div class="final-score">
            <h2>Your Final Score: ${correct} out of 5</h2>
            <button id="restart-btn">Another Try?</button>
        </div>
    `);
}

function restartQuiz() {
    $('.questionAndAnswers').on('click', '#restart-btn', function() {
        questionNumber = 1;
        correct = 0;
        getQuestion();
    });
}

function quizHandler() {
    // this function will handle all associated functions
    startQuiz();
    handleSubmitBtn();
    nextQuestion();
    restartQuiz();
}

$(quizHandler);