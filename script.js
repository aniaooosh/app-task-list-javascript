const taskInput = document.getElementById("task-input");
const taskAddBtn = document.getElementById("task-add-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTaskList);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Введіть завдання!");
        return;
    }

    createTaskElement(taskText, false);
    saveTaskList();

    taskInput.value = "";
    taskInput.focus();
}

function createTaskElement(text, completed) {
    const label = document.createElement("label");
    label.className = "task-list-item";

    label.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span class="task-text" contenteditable="true" spellcheck="false">${text}</span>
        <button class="task-done-btn" title="Змінити стан">✓</button>
        <button class="task-delete-btn" title="Видалити">✖</button>
    `;

    const checkbox = label.querySelector("input");
    const textSpan = label.querySelector(".task-text");
    const doneBtn = label.querySelector(".task-done-btn");
    const deleteBtn = label.querySelector(".task-delete-btn");

    checkbox.addEventListener("change", saveTaskList);

    doneBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        saveTaskList();
    });

    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        label.remove();
        saveTaskList();
    });

    textSpan.addEventListener("click", (e) => {
        e.preventDefault();
    });

    textSpan.addEventListener("blur", () => {
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Нове завдання";
        }
        saveTaskList();
    });

    textSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            textSpan.blur();
        }
    });

    taskList.appendChild(label);
}

function saveTaskList() {
    const tasks = [];

    document.querySelectorAll(".task-list-item").forEach((item) => {
        tasks.push({
            text: item.querySelector(".task-text").innerText.trim(),
            completed: item.querySelector("input").checked
        });
    });

    localStorage.setItem("taskList", JSON.stringify(tasks));
}

function loadTaskList() {
    const savedTasks = localStorage.getItem("taskList");

    if (savedTasks) {
        JSON.parse(savedTasks).forEach((task) => {
            createTaskElement(task.text, task.completed);
        });
    }
}

taskAddBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});