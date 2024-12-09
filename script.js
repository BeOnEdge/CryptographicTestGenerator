import { tasks } from "./tasks.js";

const testGenerator = {
  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  generateTask(type) {
    const task = tasks[type];
    if (!task) throw new Error(`Тип задания "${type}" не найден`);

    const range = task.range;
    const variables = {};

    for (const [key, value] of Object.entries(range)) {
      const varName = key.replace(/Min|Max/g, "");
      if (!variables[varName]) variables[varName] = null;
      if (key.endsWith("Min")) {
        variables[varName] = this.generateRandomNumber(
          value,
          range[`${varName}Max`]
        );
      }
    }

    const values = Object.keys(variables).map((key) => variables[key]);

    const question = task.question(...values);
    const answer = task.calculate(...values);

    return { question, answer };
  },
};

let currentAnswer = null;

function generateAndShowTask() {
  const types = Object.keys(tasks);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const { question, answer } = testGenerator.generateTask(randomType);

  currentAnswer = answer;
  document.getElementById("question").textContent = question;
  document.getElementById("result").textContent = "";
  document.getElementById("userAnswer").value = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.trim();
  const result = document.getElementById("result");

  if (userAnswer == currentAnswer) {
    result.textContent = "Правильно!";
    result.style.color = "green";
  } else {
    result.textContent = `Неправильно. Правильный ответ: ${currentAnswer}`;
    result.style.color = "red";
  }
}

document.getElementById("checkButton").addEventListener("click", checkAnswer);
document
  .getElementById("newTaskButton")
  .addEventListener("click", generateAndShowTask);

generateAndShowTask();

