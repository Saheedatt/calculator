const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
let expression = "";
let inverseMode = false;
let trigFunctionToUse = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        /*switiched from using if else statement to using break statements*/
        const buttonText = button.textContent;
        switch (buttonText) {
            case "=":
                calculateResult();
                break;
            case "del":
                expression = expression.slice(0, -1);
                updateDisplay(); 
                break;
            case "Clear":
                expression ="";
                inverseMode = false;
                updateDisplay();
                break;
            case "inv":
                inverseMode = !inverseMode;
                trigFunctionToUse = "";
                updateDisplay();
                break;
            case "sin":
            case "cos":
            case "tan":
                if (inverseMode) {
                    trigFunctionToUse = "a" + buttonText; 
                    display.value += buttonText + "⁻¹"; 
                }
                else {
                    trigFunctionToUse = buttonText; 
                    display.value += buttonText;
                }
                break;
            case "(":
            case ")":
                expression += buttonText;
                updateDisplay();
                break;
            case "!":
                display.value = factorial(parseFloat(display.value));
                break;
            case "log":
                display.value = Math.log10(parseFloat(display.value));
                break
            case "ln":
                display.value = Math.log(parseFloat(display.value));
                break
            case "π":
                expression = Math.PI.toFixed(10); 
                updateDisplay();
                break;
            default:
            handleOtherOperations(buttonText);
            break;
        }
    });
});

function handleOtherOperations(buttonText){
    if ('0123456789.'.includes(buttonText)) {
        expression += buttonText;
        updateDisplay();
    }else if ('+-x/'.includes(buttonText)) {
        if (buttonText === 'x') {
            expression += ' * ';
        } else {
            expression += ' ' + buttonText + ' ';
        }
        updateDisplay();
    }else if (buttonText === "^") {
        expression += '^';
        updateDisplay();
    }else if (buttonText === "√") {
        display.value = Math.sqrt(parseFloat(display.value));
    }

}


function updateDisplay() {
    display.value = expression;
}

function handleTrigonometry(trigonometry) {
    expression += trigonometry;
    updateDisplay();
}

function applyTrigFunction(expression) {
    let radians = parseFloat(expression) * (Math.PI / 180);
    switch (trigFunctionToUse) {
        case "sin":
            return Math.sin(radians);
        case "cos":
            return Math.cos(radians);
        case "tan":
            return Math.tan(radians);
        default:
            return eval(expression);
    }
}
    
function applyInverseTrigFunction(expression) {
    let value = parseFloat(expression);
    if (value < -1 || value > 1) {
        return NaN;
    }
    switch (trigFunctionToUse) {
        case "asin":
            return degrees(Math.asin(value));
        case "acos":
            return degrees(Math.acos(value));
        case "atan":   
            return degrees(Math.atan(value));
        default:
            return eval(expression);
        }
}

function degrees(radians) {
        return radians * (180 / Math.PI);
}

/*Function for the factorial button*/
function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

/*To evaluate performed operations*/
function calculateResult() {
    try {
        let evaluatedExpression = expression.replace(/\^/g, "**");
        evaluatedExpression = evaluatedExpression.replace(/❨/g, '(').replace(/❩/g, ')');

        evaluatedExpression = applyTrigFunction(evaluatedExpression);
        if (trigFunctionToUse === "asin") {
            evaluatedExpression = applyInverseTrigFunction(evaluatedExpression);
        }
        let result = eval(evaluatedExpression);
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = "Error";
        expression = "";
    }
}


function simpleArithmeticHandler(input1, operator, input2){
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);

    if (isNaN(input1) || isNaN(input2)) {
        return 'NaN';
    }
    switch (operator) {
        case '+':
            return input1 + input2;
        case '-':
            return input1 - input2;
        case '*':
            return input1 * input2;
        case '/':
            if (input2 === 0) {
                return "Error";
            }
            return input1 / input2;
        default:
            return "Error.";
    }
}

