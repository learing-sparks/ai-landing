let display = document.getElementById('display');
let historyList = document.getElementById('history');
let currentOperation = '';
let firstOperand = '';
let secondOperand = '';

function appendNumber(number) {
    display.value += number;
}

function setOperation(operation) {
    if (display.value === '') return;
    firstOperand = display.value;
    currentOperation = operation;
    display.value = '';
}

function calculate() {
    if (display.value === '' || firstOperand === '') return;
    secondOperand = display.value;
    let result;
    switch (currentOperation) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            return;
    }
    display.value = result;
    saveHistory(`${firstOperand} ${currentOperation} ${secondOperand} = ${result}`);
    firstOperand = '';
    secondOperand = '';
    currentOperation = '';
}

function clearDisplay() {
    display.value = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = '';
}

function saveHistory(calculation) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(calculation);
    localStorage.setItem('history', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML = '';
    history.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Display history on page load
window.onload = displayHistory;