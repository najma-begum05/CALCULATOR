// Calculator State Variables
let display = document.getElementById('display');
let currentInput = "0";
let operator = null;
let operand1 = null;
let waitingForOperand = false;

// Helper function to update display
function updateDisplay() {
    display.value = currentInput;
}

// Handle number and decimal input
function inputNumber(num) {
    if (waitingForOperand) {
        currentInput = num === "." ? "0." : num;
        waitingForOperand = false;
    } else {
        if (num === "." && currentInput.includes(".")) return;
        currentInput = currentInput === "0" && num !== "." ? num : currentInput + num;
    }
    updateDisplay();
}

// Handle operator input
function inputOperator(op) {
    if (operator && !waitingForOperand) {
        calculate();
    }
    operand1 = parseFloat(currentInput);
    operator = op;
    waitingForOperand = true;
}

// Perform calculation
function calculate() {
    if (operator === null || waitingForOperand) return;
    let operand2 = parseFloat(currentInput);
    let result = 0;
    switch(operator) {
        case "+": result = operand1 + operand2; break;
        case "-": result = operand1 - operand2; break;
        case "*": result = operand1 * operand2; break;
        case "/": 
            if (operand2 === 0) {
                result = "Error";
            } else {
                result = operand1 / operand2;
            }
            break;
        case "%": result = operand1 % operand2; break;
        default: return;
    }
    currentInput = result.toString();
    operator = null;
    operand1 = null;
    waitingForOperand = false;
    updateDisplay();
}

// Square current value
function squareCurrent() {
    let value = parseFloat(currentInput);
    currentInput = (value * value).toString();
    updateDisplay();
}

// All Clear
function allClear() {
    currentInput = "0";
    operator = null;
    operand1 = null;
    waitingForOperand = false;
    updateDisplay();
}

// Event listeners for number buttons
document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click', e => {
        inputNumber(e.target.getAttribute('data-number'));
    });
});

// Event listeners for operators (+, -, *, /)
document.querySelectorAll('[data-operator]').forEach(btn => {
    btn.addEventListener('click', e => {
        inputOperator(e.target.getAttribute('data-operator'));
    });
});

// Modulo button
document.getElementById('modulo').addEventListener('click', () => {
    inputOperator('%');
});

// Square button
document.getElementById('square').addEventListener('click', () => {
    squareCurrent();
});

// All Clear button
document.getElementById('ac').addEventListener('click', () => {
    allClear();
});

// Equals button
document.getElementById('equals').addEventListener('click', () => {
    calculate();
});

// Keyboard support (optional/bonus)
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || e.key === ".") {
        inputNumber(e.key);
    }
    if (["+", "-", "*", "/"].includes(e.key)) {
        inputOperator(e.key);
    }
    if (e.key === "Enter" || e.key === "=") {
        calculate();
    }
    if (e.key === "Escape") {
        allClear();
    }
});

// Initialize display
updateDisplay();

