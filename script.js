const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const numberFormatter = new Intl.NumberFormat("en-US");
let inverseMode = false;
let trigFunctionToUse = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText === "=") {
            try {
                let expression = display.value.replace(/\^/g, "**");
                expression = expression.replace(/❨/g, '(').replace(/❩/g, ')');
                
                let result;
                
                if (trigFunctionToUse) {
                    if (inverseMode) {
                        result = applyInverseTrigFunction(expression);
                    } else {
                        result = applyTrigFunction(expression);
                    }
                } else {
                    result = eval(expression);
                }
        
                display.value = numberFormatter.format(result);
            } catch (error) {
                display.value = "Error";
            }        
        }
        else if (buttonText === "del") {
            display.value = display.value.slice(0, -1);
        }
        else if (buttonText === "Clear") {
            display.value = "";
            trigFunctionToUse = ""; 
            inverseMode = false;
        }
        else if (buttonText === "sin" || buttonText === "cos" || buttonText === "tan") {
            if (inverseMode) {
                trigFunctionToUse = "a" + buttonText; 
                display.value += buttonText + "⁻¹"; 
            }
            else {
                trigFunctionToUse = buttonText; 
                display.value += buttonText;
            }
        }
        else if (buttonText === "log") {
            display.value = Math.log10(parseFloat(display.value));
        }
        else if (buttonText === "ln") {
            display.value = Math.log(parseFloat(display.value));
        }
        else if (buttonText === "π") {
            display.value += Math.PI;
        }
        else if (buttonText === "x") {
            display.value += "*";
        }
        else if (buttonText === "^") {
            display.value += "**";
        }
        else if (buttonText === "!") {
            display.value = factorial(parseFloat(display.value));
        }
        else if (buttonText === "√") {
            display.value = Math.sqrt(parseFloat(display.value));
        }
        else if (buttonText === "inv") {
            inverseMode = !inverseMode; 
        }
        else {
            display.value += buttonText;
        }
    });
});

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
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
    let value = parseFloat(expression) * (180 / Math.PI);
    switch (trigFunctionToUse) {
        case "asin":
            return Math.asin(value);
        case "acos":
            return Math.acos(value);
        case "atan":
            return Math.atan(value); 
        default:
            return eval(expression);
    }
}


