let tasks = localStorage.getItem("taskItems")
  ? JSON.parse(localStorage.getItem("taskItems"))
  : [];

localStorage.setItem("taskItems", JSON.stringify(tasks));
const data = JSON.parse(localStorage.getItem("taskItems"));

const addButton = document.querySelector(".btn-new");
const newTaskInput = document.querySelector(".task-new");
const form = document.querySelector(".task-form");
const taskList = document.querySelector(".tasks-list");
const btnDelete = document.querySelector(".btn-delete");
let tasksListContent = "";
let taskItem = "";

renderTasks(tasks);

function addTask(text) {
  const task = {
    text,
    checked: false,
    id: Date.now(),
  };

  tasks.push(task);
  localStorage.setItem("taskItems", JSON.stringify(tasks));

  taskItem = `
    <div class="task" data-key="${task.id}">
      <input id="${task.id}" type="checkbox" class="task-input"/>
      <label for="${task.id}" class="task-label">${task.text}</label>
    </div>
    `;

  taskList.insertAdjacentHTML("beforeend", taskItem);
}

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  addTask(newTaskInput.value);
  newTaskInput.value = "";
  newTaskInput.focus();
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-label")) {
    const taskKey = e.target.parentElement.dataset.key;

    tasks.forEach((task) => {
      if (task.id == taskKey) {
        task.checked = !task.checked;
      }
    });

    localStorage.setItem("taskItems", JSON.stringify(tasks));
  }
});

btnDelete.addEventListener("click", () => {
  tasks = tasks.filter((task) => task.checked !== true);

  clearList(taskList);
  localStorage.setItem("taskItems", JSON.stringify(tasks));
  renderTasks(tasks);
});

function renderTasks(list) {
  list.forEach((item) => {
    item.checked === true ? (checked = "checked") : (checked = "");

    tasksListContent += `
    <div class="task" data-key="${item.id}">
      <input id="${item.id}" type="checkbox" class="task-input" ${checked}/>
      <label for="${item.id}" class="task-label">${item.text}</label>
    </div>
    `;
  });

  taskList.insertAdjacentHTML("beforeend", tasksListContent);
}

function clearList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  tasksListContent = "";
}
