const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('[data-key]');
const operateBtn = document.querySelector('.operate');
const deleteBtn = document.querySelector('.delete');
const operationButtons = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('.clear');
const secondDisplay = document.querySelector('.second-display');

let currentOperator = null;
let firsOperand = '';
let secondOperand = '';
let resetScreenBool = true;

function add(a, b){
    return a+b;
}

function multiply(a, b){
    return a*b;
}

function substract(a, b){
    return a-b;
}

function divide(a, b){
    return a/b;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+': 
            return add(a,b); 
        case 'x':
            return multiply(a,b);
        case '-':
            return substract(a,b);
        case '÷':
            if (b===0) return null;
            else return divide(a,b);
        default:
            return null;
    }
}

function resetScreen(){
    display.textContent = '';
    resetScreenBool = false;
}

function displayNumber(number){
    if (display.textContent === '0' || resetScreenBool){
        resetScreen();
    }
    display.innerText += number;
}

function clear(){
    display.textContent = '0';
    firsOperand = '';
    secondOperand = '';
    secondDisplay.textContent = '';
    currentOperator = null;
}

function del(){
    display.innerText = display.innerText.slice(0,-1);
}

window.addEventListener('keydown', keyboardInput);
clearBtn.addEventListener('click', clear);
operateBtn.addEventListener('click', evaluate);
numButtons.forEach(button => button.addEventListener('click',() => displayNumber(button.textContent)));
deleteBtn.addEventListener('click', del);
operationButtons.forEach(operationBtn => operationBtn.addEventListener('click', () => setOperation(operationBtn.textContent)));

function setOperation(operator){
    if (currentOperator !== null) evaluate()
    firsOperand = display.textContent;
    currentOperator = operator;
    secondDisplay.textContent = `${firsOperand} ${currentOperator}`;
    resetScreenBool = true;
}

function evaluate(){
    if (currentOperator === null ) return;
    if (currentOperator === '÷' && display.textContent === '0'){
        alert('Dividing by 0 is forbiden by math');
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, firsOperand, secondOperand)
    );
    secondDisplay.textContent = `${firsOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

function keyboardInput(e){
    if (e.key >= 0 && e.key <= 9) displayNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if(e.key === 'Backspace') del();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e,key))
}

function convertOperator(keyboardOperator){
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '+') return '+';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '*') return 'x';
}

function roundResult(number){
    return Math.round(number * 1000)/1000;
}