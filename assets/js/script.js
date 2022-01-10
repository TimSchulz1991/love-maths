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
// Let the user press Enter on the input box
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

    // Clear the input field everytime an answer was checked and set the focus back into the field
    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    // Create two random numbers between 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    let num3 = Math.floor(Math.random() * 24) + 2; // get a random number for division between 2 and 25

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "subtract") {
        if (num1 > num2) {
            displaySubtractQuestion(num1, num2)
        } else {displaySubtractQuestion(num2, num1)}
    } else if (gameType === "division") {
        if (num1 === 1) {
            displayDivisionQuestion(num1*num2*num3,num2) // make sure that the first number is larger than the second number
        } else {
            displayDivisionQuestion((num1*num2),num2)
        } 
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
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
    } else if (operator === "/") {
        return [operandOne / operandTwo, "division"];
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

const displayDivisionQuestion = (operandOne, operandTwo) => {
    document.getElementById('operand-one').textContent = operandOne;
    document.getElementById('operand-two').textContent = operandTwo;
    document.getElementById('operator').textContent = "/";
}