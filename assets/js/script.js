// Wait for the DOM to finish loading before the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type')==="submit") {
                alert("You clicked Submit!");
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

const checkAnswer = () => {
    
}

const calculateCorrectAnswer = () => {
    
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