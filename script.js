let op1 = "";
let op2 = "";
let currentOperation = null;
let shouldResetScreen = false;
let percentageButtonClicked = false;
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("#clearBtn");
const deleteButton = document.querySelector("#deleteBtn");
const pointButton = document.querySelector("#pointBtn");
const equalsButton = document.querySelector("#equalsBtn");
const lastOperationScreen = document.querySelector("#lastOperationScreen");
const currentOperationScreen = document.querySelector(
  "#currentOperationScreen"
);
const percentageButton = document.querySelector("#percentBtn");
const plusMinusButton = document.querySelector("#plusMinusBtn");

window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
plusMinusButton.addEventListener("click", toggleSign);
percentageButton.addEventListener("click", () => {
  percentageButtonClicked = true;
  applyPercentage();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  op1 = "";
  op2 = "";
  currentOperation = null;
}

function toggleSign() {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  if (currentOperationScreen.textContent[0] === "-")
    currentOperationScreen.textContent =
      currentOperationScreen.textContent.slice(1);
  else
    currentOperationScreen.textContent =
      "-" + currentOperationScreen.textContent;
}
function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "")
    currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  op1 = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${op1} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  if (percentageButtonClicked) {
    op2 = parseFloat(currentOperationScreen.textContent / 100);
    percentageButtonClicked = false;
  } else {
    op2 = currentOperationScreen.textContent;
  }
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, op1, op2)
  );
  lastOperationScreen.textContent = `${op1} ${currentOperation} ${op2}=`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "%"
  ) {
    setOperation(convertOperator(e.key));
  }
}
function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "+") return "+";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "%") return "%";
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function percent(a, b) {
  return (a * b) / 100;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else {
        return divide(a, b);
      }
    case "%":
      return percent(a, b);
    default:
      return null;
  }
}
function applyPercentage() {
  if (currentOperation === null || shouldResetScreen) return;
  const inputText = currentOperationScreen.textContent;

  // Check for cases like "85+43%", "85-43%", and "85*48%"
  const matches = inputText.match(/^([\d.]+)([+\-*/])([\d.]+)%$/);

  if (matches) {
    const leftOperand = parseFloat(matches[1]);
    const operator = matches[2];
    const rightOperand = parseFloat(matches[3]);
    let result;

    switch (operator) {
      case "+":
        result = leftOperand + (leftOperand * rightOperand) / 100;
        break;
      case "-":
        result = leftOperand - (leftOperand * rightOperand) / 100;
        break;
      case "*":
        result = (leftOperand * rightOperand) / 100;
        break;
      case "/":
        if (rightOperand !== 0) {
          result = (leftOperand * 100) / rightOperand;
        } else {
          alert("You can't divide by 0!");
          return;
        }
        break;
    }

    currentOperationScreen.textContent = roundResult(result);
    lastOperationScreen.textContent = `${leftOperand} ${operator} ${rightOperand}% =`;
    op1 = leftOperand;
    op2 = result;
    currentOperation = null;
    shouldResetScreen = true;
  }
}
