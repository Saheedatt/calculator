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
                let result = eval(expression);

                if (trigFunctionToUse === "sin") {
                    if (inverseMode) {
                        result = Math.asin(result); // Inverse sine in radians
                    } else {
                        result = Math.sin(result * (Math.PI / 180)); // Sine in degrees
                    }
                } else if (trigFunctionToUse === "cos") {
                    if (inverseMode) {
                        result = Math.acos(result); // Inverse cosine in radians
                    } else {
                        result = Math.cos(result * (Math.PI / 180)); // Cosine in degrees
                    }
                } else if (trigFunctionToUse === "tan") {
                    if (inverseMode) {
                        result = Math.atan(result); // Inverse tangent in radians
                    } else {
                        result = Math.tan(result * (Math.PI / 180)); // Tangent in degrees
                    }
                    
                }
                

                display.value = numberFormatter.format(result);

            } catch (error) {
                display.value = "Error";
            }
        } else if (buttonText === "del") {
            display.value = display.value.slice(0, -1);
        } else if (buttonText === "Clear") {
            display.value = "";
            trigFunctionToUse = ""; 
        } else if (buttonText === "sin" || buttonText === "cos" || buttonText === "tan") {
            if (inverseMode) {
                trigFunctionToUse = "a" + buttonText; 
                display.value += buttonText + "⁻¹"; // Add inverse notation
            } else {
                trigFunctionToUse = buttonText; // Store the trigonometric function
                display.value += buttonText;
                console.log(trigFunctionToUse)
            }
        } else if (buttonText === "log") {
            display.value = Math.log10(parseFloat(display.value));
        } else if (buttonText === "ln") {
            display.value = Math.log(parseFloat(display.value));
        } else if (buttonText === "π") {
            display.value += Math.PI;
        } else if (buttonText === "x") {
            display.value += "*";
        } else if (buttonText === "^") {
            display.value += "**";
        } else if (buttonText === "!") {
            display.value = factorial(parseFloat(display.value));
        } else if (buttonText === "√") {
            display.value = Math.sqrt(parseFloat(display.value));
        } else if (buttonText === "inv") {
            inverseMode = !inverseMode; // Toggle inverse mode
        } else {
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

function reciprocal(number) {
    if (number === 0) {
        return "Undefined";
    }
    return 1 / number;
}
