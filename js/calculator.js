const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.output-screen');
let currentValue = '';
let runningTotal = 0;
let previousOperator = null;

calculator.addEventListener('click', function(e) {
	let value = event.target.innerText;
	if (isNaN(value)) {
		handleOperator(value);
	} else {
		handleNumber(value);
	}
});

function handleNumber(value) {
	if (currentValue === '') {
		currentValue = value;
	} else {
		currentValue += value;
	}
	updateScreen();
}

function handleOperator(value) {
	switch (value) {
		case 'C':
			screen.innerHTML = '0';
			currentValue = '';
			runningTotal = '';
			previousOperator = null;
			break;
		case '←':
			currentValue = currentValue.substr(0, currentValue.length - 1);
			if (currentValue.length <= 0) {
				screen.innerHTML = '0';
			} else {
				updateScreen();
			}
			break;
		case '=':
			if (previousOperator === null) {
				break;
			}
			clearOperation(parseInt(currentValue));
			screen.innerHTML = runningTotal;
			previousOperator = null;
			currentValue = runningTotal;
			runningTotal = 0;
			break;
		default:
			doMath(value);
			break;
	}
}

function updateScreen() {
	screen.innerHTML = currentValue;
}

function doMath(value) {
	if (currentValue === '') {
		return;
	}
	let intCurrentValue = parseInt(currentValue);
	if (runningTotal === 0) {
		runningTotal = intCurrentValue;
	} else {
		clearOperation(intCurrentValue);
	}
	previousOperator = value;
	screen.innerHTML = '0';
	currentValue = '';
}

function clearOperation(intCurrentValue) {
	if (previousOperator === '+') {
		runningTotal += intCurrentValue;
	} else if (previousOperator === '-') {
		runningTotal -= intCurrentValue;
	} else if (previousOperator === 'x') {
		runningTotal *= intCurrentValue;
	} else {
		runningTotal /= intCurrentValue;
	}
}
