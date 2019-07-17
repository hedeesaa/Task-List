// make UI variables

const form = document.querySelector("#new-task");
const newTask = document.querySelector("#new-task-input");
const removeBtn = document.querySelector(".remove");
const taskList = document.querySelector("#task-list");
const clearBtn = document.querySelector("#clearAll");
const filter = document.querySelector("#filter");
//load event listeners
loadEventListener();

function loadEventListener() {
  document.addEventListener("DOMContentLoaded", loadTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

function loadTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    console.log("hello");
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.className = "card-task";

    const content = document.createElement("p");
    content.innerText = task;

    li.appendChild(content);

    const remove = document.createElement("a");
    remove.className = "remove";
    remove.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(remove);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  const li = document.createElement("li");
  li.className = "card-task";

  const content = document.createElement("p");
  content.innerText = newTask.value;

  li.appendChild(content);

  const remove = document.createElement("a");
  remove.className = "remove";
  remove.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(remove);

  taskList.appendChild(li);

  addToLocalStorage(newTask.value);

  newTask.value = "";
  e.preventDefault();
}

function addToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    console.log("hello");
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.className === "remove") {
    e.target.parentElement.parentElement.remove();
  }

  removeFromLocalStorage(e.target.parentElement.parentElement.firstChild);
}
function removeFromLocalStorage(tobeRemoved) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    console.log("hello");
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (task === tobeRemoved.innerText) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.setItem("tasks", JSON.stringify([]));
}

function filterTasks(e) {
  const search = e.target.value.toLowerCase();

  document.querySelectorAll(".card-task").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().includes(search)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
