const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

// Function to get current date & time
function getDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

// Function to create a task item
function createTaskElement(taskText, timeAdded, completed = false, timeCompleted = "") {
    const li = document.createElement("li");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const text = document.createElement("span");
    text.textContent = taskText;

    const time = document.createElement("span");
    time.classList.add("task-time");
    time.textContent = completed 
        ? `Added: ${timeAdded} | Completed: ${timeCompleted}`
        : `Added: ${timeAdded}`;

    taskInfo.appendChild(text);
    taskInfo.appendChild(time);

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    if (!completed) {
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = () => {
            li.remove();
            completedList.appendChild(
                createTaskElement(taskText, timeAdded, true, getDateTime())
            );
        };
        actions.appendChild(completeBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => {
        const newTask = prompt("Edit task:", taskText);
        if (newTask) {
            text.textContent = newTask;
        }
    };
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
        li.remove();
    };
    actions.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(actions);

    return li;
}

// Add task on button click
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        pendingList.appendChild(createTaskElement(taskText, getDateTime()));
        taskInput.value = "";
    }
});
