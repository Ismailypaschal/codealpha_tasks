const solutionInput = document.getElementById('solution');
const answerInput = document.getElementById('answer');
// const clear = document.getElementById('clear');
// const clearAll = document.getElementById('clear_all');


function addToScreen(value) {
    solutionInput.value += value;
}
function clearScreen() {
    solutionInput.value = "";
    answerInput.value = "";
}

function clearLast() {
    solutionInput.value = solutionInput.value.slice(0, -1);
    answerInput.value = "";
}

// const percentButton = document.getElementById('percent');
// const divideButton = document.getElementById('divide');
// const multiplyButton = document.getElementById('multiply');
// const addButton = document.getElementById('add');
// const subtractButton = document.getElementById('subtract');
// const decimalPoint = document.getElementById('decimal');

function calculate() {
    try {
        solutionInput.value = eval(solutionInput.value);
        answerInput.value = solutionInput.value;
    }
    catch (error) {
        solutionInput.value = "Error";
    }
}

// The HTML calls `showResult('=')` for the equals button. Provide a thin
// wrapper so the existing HTML works and routes to our `calculate()`.
function showResult(token) {
    if (token === '=') {
        calculate();
    }
}
