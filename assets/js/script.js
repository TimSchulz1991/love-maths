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
    runGame("addition")
})

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */

const runGame = (gameType) => {

    // Create two random numbers between 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
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
        alert("You got it right! :)")
    } else {
        alert(`Awww...you answered ${userAnswer}, but the correct answer was ${calculatedAnswer[0]}`)
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
} else {
    alert(`Unimplmented operator: ${operator}`);
    throw `Unimplmented operator: ${operator}. Aborting!`;
}

}

const incrementScore = () => {
    
}

const incrementWrongAnswer = () => {
    
}

const displayAdditionQuestion = (operandOne, operandTwo) => {
    document.getElementById('operand-one').textContent = operandOne;
    document.getElementById('operand-two').textContent = operandTwo;
    document.getElementById('operator').textContent = "+";
}

const displaySubtractQuestion = () => {
    
}

const displayMultiplyQuestion = () => {
    
}