const display = document.querySelector("#display");
const keys = document.querySelector(".keys");

let expression = "0";

function updateDisplay() {
  display.value = expression;
}

function clearExpression() {
  expression = "0";
  updateDisplay();
}

function deleteLast() {
  if (expression.length <= 1) {
    expression = "0";
  } else {
    expression = expression.slice(0, -1);
  }
  updateDisplay();
}

function appendValue(value) {
  if (expression === "0" && value !== ".") {
    expression = value;
  } else {
    expression += value;
  }
  updateDisplay();
}

function evaluateExpression() {
  try {
    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    expression = String(result);
    updateDisplay();
  } catch (error) {
    expression = "Error";
    updateDisplay();
    setTimeout(clearExpression, 850);
  }
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const { value, action } = button.dataset;

  if (action === "clear") {
    clearExpression();
    return;
  }

  if (action === "delete") {
    deleteLast();
    return;
  }

  if (action === "equals") {
    evaluateExpression();
    return;
  }

  if (value) {
    if (expression === "Error") {
      expression = "0";
    }
    appendValue(value);
  }
});
