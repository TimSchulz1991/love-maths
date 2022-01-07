// Wait for the DOM to finish loading before the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type')==="submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType)
            }
        })
    }

document.getElementById('answer-box').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})

    runGame("addition")
})

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */

const runGame = (gameType) => {

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    // Create two random numbers between 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "subtract") {
        if (num1 > num2) {
            displaySubtractQuestion(num1, num2)
        } else {displaySubtractQuestion(num2, num1)}
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answer against the first element in the
 * returned calculateCorrectAnswer array.
 */
const checkAnswer = () => {
    
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("You got it right! :)");
        incrementScore();
    } else {
        alert(`Awww...you answered ${userAnswer}, but the correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1])
}

/**
 * Gets the operands (the numbers) and the operator directly from the DOM,
 * and returns the correct answer.
 */
const calculateCorrectAnswer = () => {
    let operandOne = parseInt(document.getElementById('operand-one').textContent);
    let operandTwo = parseInt(document.getElementById('operand-two').textContent);
    let operator = document.getElementById('operator').textContent;

    if (operator === "+") {
        return [operandOne + operandTwo, "addition"];
    } else if (operator === "x") {
        return [operandOne * operandTwo, "multiply"];
    } else if (operator === "-") {
        return [operandOne - operandTwo, "subtract"];
    } else {
        alert(`Unimplmented operator: ${operator}`);
        throw `Unimplmented operator: ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by one
 */
const incrementScore = () => {
    let oldScore = parseInt(document.getElementById('score').textContent);
    document.getElementById('score').textContent = ++oldScore;
}

/**
 * Gets the current incorrect from the DOM and increments it by one
 */
const incrementWrongAnswer = () => {
    let oldIncorrect = parseInt(document.getElementById('incorrect').textContent);
    document.getElementById('incorrect').textContent = ++oldIncorrect;
}

const displayAdditionQuestion = (operandOne, operandTwo) => {
    document.getElementById('operand-one').textContent = operandOne;
    document.getElementById('operand-two').textContent = operandTwo;
    document.getElementById('operator').textContent = "+";
}

const displaySubtractQuestion = (operandOne, operandTwo) => {
    document.getElementById('operand-one').textContent = operandOne;
    document.getElementById('operand-two').textContent = operandTwo;
    document.getElementById('operator').textContent = "-";
}

const displayMultiplyQuestion = (operandOne, operandTwo) => {
    document.getElementById('operand-one').textContent = operandOne;
    document.getElementById('operand-two').textContent = operandTwo;
    document.getElementById('operator').textContent = "x";
}