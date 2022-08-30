let screenValue = 0;
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

let buttons = document.querySelectorAll('button');


function updateScreen(){
    let screen = document.getElementById('screen');
    screen.innerText = screenValue;
    if(screen.length > 10){
        screen.innerText = screen.substring(0, 10);
    }
}

updateScreen();

function inputOperand(value){
    if(operator == null)
    {
        screenValue = value;
    } else {
        screenValue += value;
    }
}

function inputOperator(op){
    if(op == '+' || op == '-' || op == '*' || op == '/'){
        operator = op;
        firstOperand = screenValue;
        screenValue = 0;
        updateScreen();
    }
}

// does the actual operations
function operate(operator, num1, num2){
    if(operator == '+'){
        return num1 + num2;
    } else if(operator == '-'){
        return num1 - num2;
    } else if(operator == '*'){
        return num1 * num2;
    } else if(operator == '/'){
        if(num1==0 || num2 == 0){
            return "Nope"
        } else {
            return num1 / num2;
        }
    } 
}