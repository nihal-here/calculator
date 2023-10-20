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
}

getOperand();
getOperator();

elements.equalsOp.addEventListener("click", () => {
  console.log(`op1=${op1}`);
  console.log(`op2=${op2}`);
  console.log(`SelectedOperator=${selectedOperator}`);
  op2 = displayValue;
  result = operate(selectedOperator, parseFloat(op1), parseFloat(op2));
  displayValue = result;
  elements.output.value = displayValue;
});
