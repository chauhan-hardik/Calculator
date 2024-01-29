const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-keys button');

// Function to disable all buttons except AC and DE when error occurs
const disableButtons = () => {
    buttons.forEach((button) => {
        if (button.innerText !== 'AC' && button.innerText !== 'DE') {
            button.classList.add('disabled');
        }
    });
}

// Function to enable all buttons
const enableButtons = () => {
    buttons.forEach((button) => {
        button.classList.remove('disabled');
    });
}

buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{

        // If input is empty and target button is '='  
        if(display.innerText === '' && e.target.innerText === '='){
            display.innerText = '';
            return
        }

        switch(e.target.innerText){
            case '=':
                // Change all occurrences of ÷ and x with / and *
                if (display.innerText.includes("÷") || display.innerText.includes("x")) {
                    while (display.innerText.includes('÷')) {
                        display.innerText = display.innerText.replace('÷','/');
                    }
                    while (display.innerText.includes('x')) {
                        display.innerText = display.innerText.replace('x','*');
                    }
                }

                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error";
                    disableButtons();
                }
                break;

            case 'AC':
                display.innerText = '';
                enableButtons();
                break;

            case 'DE':
                if (display.innerText === 'Error'){
                   display.innerText = '';
                   enableButtons();
                } else {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;

            default:
                display.innerText += e.target.innerText;
        }
    });
});