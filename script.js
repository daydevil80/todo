// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-buttons button");

// Task Array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Functions
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = ""; // Clear list
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✔️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
}

function filterTasks(filter) {
    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    renderTasks(filteredTasks);
}

// Event Listeners
addTaskButton.addEventListener("click", addTask);
filterButtons.forEach(button =>
    button.addEventListener("click", () => filterTasks(button.id.split("-")[1]))
);

// Initial Load
renderTasks();
