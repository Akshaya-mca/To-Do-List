document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const todoList = document.getElementById("todo-list");
  savedTasks.forEach((task) => {
    addTaskToDOM(task);
  });
});

function addTodo() {
  const todoText = document.getElementById("newTodo").value;
  if (todoText.trim() !== "") {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(todoText);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    addTaskToDOM(todoText);

    document.getElementById("newTodo").value = "";
  }
}

function addTaskToDOM(taskText) {
  const todoList = document.getElementById("todo-list");
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  const text = document.createElement("span");
  text.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editTodoText(text));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", deleteTodo);

  todoItem.appendChild(text);
  todoItem.appendChild(editBtn);
  todoItem.appendChild(deleteBtn);

  todoList.appendChild(todoItem);
}

function editTodoText(textElement) {
  const newText = prompt("Edit task:", textElement.textContent);
  if (newText !== null) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = savedTasks.indexOf(textElement.textContent);

    if (index !== -1) {
      savedTasks[index] = newText;
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    textElement.textContent = newText;
  }
}

function deleteTodo() {
  const todoItem = this.parentElement;
  const textElement = todoItem.querySelector("span");

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = savedTasks.indexOf(textElement.textContent);

  if (index !== -1) {
    savedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }

  const todoList = todoItem.parentElement;
  todoList.removeChild(todoItem);
}
