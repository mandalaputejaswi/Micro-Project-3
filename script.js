document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display-txt'); // Updated to match the class in HTML
    const buttons = document.querySelectorAll('.buttons button');
    
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            if (button.classList.contains('delete')) {
                if(currentInput === "Invalid Input"){
                  currentInput = '';
                  updateDisplay();

                }
                else{
                  currentInput = currentInput.slice(0, -1);
                  updateDisplay();
          
                }
                }
            
            else if (button.classList.contains('txt')) {
                if (buttonText === '.' && !currentInput.includes('.')) {
                    currentInput += buttonText;
                } else if (buttonText === 'x') {
                    if(currentInput.length > 0){
                        if(['+', '-', '*', "/"].includes((currentInput[currentInput.length -1] ))) {
                            currentInput = currentInput.replace(currentInput.substring(currentInput.length -1), "*");
                            console.log("Hi1", currentInput);
                        }
                        else {
                            currentInput += '*'; // Change 'x' to '*' for multiplication
                        }
                    }
                } else {
                    if (['+', '/'].includes(buttonText) && currentInput.length === 0) {
                        if (!(currentInput === '' || ['+', '/'].includes(currentInput.slice(-1)))) {
                            return currentInput += buttonText; // Do nothing if starting with an operator or consecutive operator
                        }
                        
                    } else if (['+','-', '/'].includes(buttonText) && currentInput.length > 0 && ['+', '-', '*', "/"].includes((currentInput[currentInput.length -1] ))) {
                        console.log("Hello", currentInput, buttonText, ['+', '-', '*', "/"].includes((currentInput[currentInput.length -1] )));
                        currentInput = currentInput.replace(currentInput.substring(currentInput.length -1), buttonText)
                    }
                    else {
                        currentInput += buttonText;
                    }
                }
                updateDisplay();
            } else if (button.classList.contains('reset')) {
                if (buttonText === 'Reset') {
                    currentInput = '';
                    updateDisplay();
                } else if (buttonText === '=') {
                    calculate();
                }
            }
        });
    });

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function calculate() {
        if (currentInput === '' || currentInput === 'Invalid Input') {
            // If currentInput is empty or 'Error', do not perform calculation
            return currentInput;
        }

        try {
            const result = eval(currentInput); // Using eval to evaluate the expression
            if (result === undefined || isNaN(result)) {
                currentInput = 'Invalid Input'; // Handle undefined results or NaN
            } else {
                // Format result to 3 decimal places
                currentInput = parseFloat(result).toFixed(3).replace(/\.?0+$/, ''); // Remove trailing zeros if necessary
            }
        } catch (e) {
            currentInput = 'Invalid Input'; // Display 'Error' if an exception occurs
        }
        updateDisplay();
    }
});
