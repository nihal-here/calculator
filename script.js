let op1,
  op2,
  result,
  selectedOperator,
  displayValue = "",
  op1Active = true;

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}

function multiply(op1, op2) {
  return op1 * op2;
}
function divide(op1, op2) {
  if (op2 === 0) {
    return "Error: Division by zero";
    console.log("Error:division by zero");
  }
  return op1 / op2;
}

function operate(operator, op1, op2) {
  if (operator === "plusOp") {
    return add(op1, op2);
  } else if (operator === "minusOp") {
    return subtract(op1, op2);
  } else if (operator === "multiplyOp") {
    return multiply(op1, op2);
  } else if (operator === "divideOp") {
    return divide(op1, op2);
  }
}

const buttons = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero",
  "clear",
  "decimal",
  "plusOp",
  "minusOp",
  "multiplyOp",
  "equalsOp",
  "divideOp",
  "output",
];
const elements = {};
buttons.forEach((button) => {
  elements[button] = document.querySelector(`#${button}`);
});

const digits = [
  elements.one,
  elements.two,
  elements.three,
  elements.four,
  elements.five,
  elements.six,
  elements.seven,
  elements.eight,
  elements.nine,
  elements.zero,
  elements.decimal,
];
const operators = [
  elements.plusOp,
  elements.minusOp,
  elements.divideOp,
  elements.multiplyOp,
];

function getOperand() {
  output.textContent = "";
  digits.forEach((digit) => {
    digit.addEventListener("click", () => {
      displayValue += digit.textContent;
      elements.output.value = displayValue;
    });
  });
}

function getOperator() {
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      selectedOperator = operator.id;
      if (op1Active) {
        op1 = displayValue;
        op1Active = false;
      } else {
        op2 = displayValue;
        op1Active = true;
      }
      displayValue = "";
    });
  });
}

function clearDisplay() {
  displayValue = "";
  elements.output.value = "";
  op1 = "";
  op2 = "";
}

elements.clear.addEventListener("click", () => {
  clearDisplay();
});

getOperand();
getOperator();

function performCalculation() {
  if (op1 && op2 && selectedOperator) {
    result = operate(selectedOperator, parseFloat(op1), parseFloat(op2));
    displayValue = result.toString();
    elements.output.value = displayValue;
    op1 = result;
    op2 = "";
  }
}

elements.equalsOp.addEventListener("click", () => {
  op2 = displayValue;
  console.log(`op1=${op1}`);
  console.log(`op2=${op2}`);
  console.log(`SelectedOperator=${selectedOperator}`);
  performCalculation();
});
