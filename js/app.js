var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var loadSamplesBtn = document.getElementById("loadSamplesBtn");
var taskList = document.getElementById("taskList");
var taskMessage = document.getElementById("taskMessage");

var totalCount = document.getElementById("totalCount");
var pendingCount = document.getElementById("pendingCount");
var completedCount = document.getElementById("completedCount");

var count = 0;

function createTaskElement(taskText, taskId) {
    var li = document.createElement("li");
    li.className = "task-item";
    li.dataset.taskId = taskId;
    li.dataset.state = "pending";

    var span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    var btn1 = document.createElement("button");
    btn1.className = "complete-btn";
    btn1.textContent = "Complete";

    var btn2 = document.createElement("button");
    btn2.className = "edit-btn";
    btn2.textContent = "Edit";

    var btn3 = document.createElement("button");
    btn3.className = "remove-btn";
    btn3.textContent = "Remove";

    li.appendChild(span);
    li.appendChild(btn1);
    li.appendChild(btn2);
    li.appendChild(btn3);

    return li;
}

function updateTaskCounts() {
    var items = taskList.querySelectorAll(".task-item");
    var pending = 0;
    var completed = 0;

    for (var i = 0; i < items.length; i++) {
        if (items[i].dataset.state === "completed") {
            completed++;
        } else {
            pending++;
        }
    }

    totalCount.textContent = items.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function addTask(taskText) {
    var text = taskText.trim();
    if (text === "") {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    count++;
    var li = createTaskElement(text, "task-" + count);
    taskList.appendChild(li);

    taskInput.value = "";
    taskMessage.textContent = "";
    updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
        taskItem.dataset.state = "completed";
    } else {
        taskItem.dataset.state = "pending";
    }
    updateTaskCounts();
}

function beginTaskEdit(taskItem) {
    var span = taskItem.querySelector(".task-text");
    var btn = taskItem.querySelector(".edit-btn");

    var input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = span.textContent;

    span.replaceWith(input);
    btn.textContent = "Save";
}

function saveTaskEdit(taskItem) {
    var input = taskItem.querySelector(".edit-input");
    var btn = taskItem.querySelector(".edit-btn");

    if (!input) return;

    var text = input.value.trim();
    if (text === "") {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    var span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    input.replaceWith(span);
    btn.textContent = "Edit";
    taskMessage.textContent = "";
}

function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}

function handleTaskListClick(event) {
    var taskItem = event.target.closest(".task-item");
    if (!taskItem) return;

    if (event.target.classList.contains("complete-btn")) {
        toggleTaskComplete(taskItem);
    } else if (event.target.classList.contains("edit-btn")) {
        if (event.target.textContent === "Edit") {
            beginTaskEdit(taskItem);
        } else {
            saveTaskEdit(taskItem);
        }
    } else if (event.target.classList.contains("remove-btn")) {
        removeTask(taskItem);
    }
}

function loadSampleTasks() {
    var samples = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];

    var frag = document.createDocumentFragment();
    for (var i = 0; i < samples.length; i++) {
        count++;
        var li = createTaskElement(samples[i], "task-" + count);
        frag.appendChild(li);
    }

    taskList.appendChild(frag);
    taskMessage.textContent = "";
    updateTaskCounts();
}

addTaskBtn.addEventListener("click", function() {
    addTask(taskInput.value);
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);
taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();