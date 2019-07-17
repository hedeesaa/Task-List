// make UI variables

const form = document.querySelector("#new-task");
const newTask = document.querySelector("#new-task-input");
const removeBtn = document.querySelector(".remove");
const taskList = document.querySelector("#task-list");
const clearBtn = document.querySelector("#clearAll");
const filter = document.querySelector("#input-search");
//load event listeners
loadEventListener();

function loadEventListener() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
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

  newTask.value = "";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.className === "remove") {
    e.target.parentElement.parentElement.remove();
  }
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
