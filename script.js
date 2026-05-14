const taskInput = document.getElementById("task-input");
const taskAddBtn = document.getElementById("task-add-btn");
const taskList = document.getElementById("task-list");

taskAddBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Введіть завдання!");
        return;
    }

    const taskItem = document.createElement("label");
    taskItem.classList.add("task-list-item");

    taskItem.innerHTML = `
        <input type="checkbox">

        <span class="task-checkmark"></span>

        <span class="task-text">${taskText}</span>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
});