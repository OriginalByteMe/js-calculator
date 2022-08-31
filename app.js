let screenValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const buttons = document.querySelectorAll('button');


function updateScreen(){
    let screen = document.getElementById('screen');
    if(screenValue.length > 9){
        screenValue = screenValue.substring(0, 8);
    }
    screen.innerText = screenValue;
    
}
updateScreen();


function buttonClicks(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(){
            let buttonValue = buttons[i].value;
            if(buttons[i].classList.contains('operand')){
                inputOperand(buttonValue);
                updateScreen();
            } else if(buttons[i].classList.contains('operator')){
                inputOperator(buttonValue);
                updateScreen();
            } else if(buttons[i].classList.contains('equals')){
                inputEquals();
                updateScreen();
            } else if(buttons[i].classList.contains('decimal')){
                inputDecimal(buttonValue);
                updateScreen();
            } else if(buttons[i].classList.contains('clear')){
                clearScreen();
                updateScreen();
            } else if(buttons[i].classList.contains('percent')){
                inputPercent(Number(screenValue));
                updateScreen();
            }
        } 
    )}
}
buttonClicks();


function inputOperand(value){
    if(firstOperator == null)
    {
        if(screenValue === '0' || screenValue === 0){
            screenValue = value;
        } else if(screenValue === firstOperand){
            screenValue = value;
        } else {
            screenValue += value;
        }
    } else {
        if(screenValue === firstOperand){
            screenValue = value; // Screen value will hold second operand till it is ready to be operated on
        } else {
            screenValue += value;
        }
    }
}

function inputOperator(op){
    if(firstOperator != null && secondOperator === null){
        // 4th click, now have to calculate the result of operand 1 & 2 with operator 1
        secondOperator = op;
        secondOperand = screenValue; // Assign the second operand the screen value as it was holding it in place
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        screenValue = roundAccurately(result, 10).toString();
        firstOperand = screenValue; // Rounded result is stored in first operand
        result = null;
    } else if(firstOperator != null && secondOperator != null){
        // 5th click, now have to calculate the result of operand 1 & 2 with operator 2
        secondOperand = screenValue;
        result = operate(secondOperator, Number(firstOperand), Number(secondOperand));
        secondOperator = op;
        screenValue = roundAccurately(result, 10).toString();
        firstOperand = screenValue;
        result = null;
    } else {
        // 2nd click the first operator is stored in firstOperator
        firstOperator = op;
        firstOperand = screenValue;
    }
}

function inputEquals(){
    if(firstOperator === null){
        screenValue = screenValue;
    } else {
        secondOperand = screenValue;
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        console.log(result);
        if(result == "Nope"){
            screenValue = "Nope";
        } else {
            screenValue = roundAccurately(result, 10).toString();
            firstOperand = screenValue;
            firstOperator = null;
            secondOperator = null;
            secondOperand = null;
            result = null;
        }
    }
}

function inputDecimal(dot){
    if(!screenValue.includes('.')){
        screenValue += dot;
    }
}

function inputPercent(num){
    screenValue = (num / 100).toString();
}

function clearScreen(){
    screenValue = 0;
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}
        
// does the actual operations
function operate(operator, num1, num2){
    console.log(operator, num1, num2);
    if(operator === '+'){
        return num1 + num2;
    } else if(operator === '-'){
        return num1 - num2;
    } else if(operator === '*'){
        return num1 * num2;
    } else if(operator === '/'){
        if(num1===0 || num2 === 0){
            return "Nope"
        } else {
            return num1 / num2;
        }
    } 
}


function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}