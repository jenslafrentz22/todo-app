const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const radioContainer = document.querySelector("#radio-container");

// STATE erzeugen: id: ..., todo: todoInput.value, done: false
const state = {
  todos: [],
};

// ADD TODOS
function addTodo() {
  const newTodoText = todoInput.value;
  todoInput.value = "";

  // Elemente holen
  const newTodoLi = document.createElement("li");
  const checkBox = document.createElement("input");
  const cboxLabel = document.createElement("label");

  // li stylen
  newTodoLi.setAttribute("class", "todo-item");
  // checkbox stylen
  checkBox.type = "checkbox";
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "todo-item__checkbox");
  // label stylen
  cboxLabel.setAttribute("class", "todo-item__text");

  // zusammenbauen:
  newTodoLi.appendChild(checkBox);
  cboxLabel.innerText = newTodoText;
  newTodoLi.appendChild(cboxLabel);
  todoList.appendChild(newTodoLi);

  // ############# ADD in LOCAL STORAGE #######################
  let todoID = +new Date();
  state.todos.push({
    id: todoID,
    todo: `${newTodoText}`,
    done: "false",
  });
  const todosAsString = JSON.stringify(state.todos);
  localStorage.setItem("todos", todosAsString); // `${todoID}`
  // ############# LOCAL STORAGE END #######################
}
addButton.addEventListener("click", addTodo);

// STATE (aus LocalStorage) FÜLLEN
function loadDataFromLocalStorage() {
  if (localStorage.getItem("todos")) {
    const todosData = JSON.parse(localStorage.getItem("todos"));
    return todosData;
  } else {
    return [];
  }
}
state.todos = loadDataFromLocalStorage();
console.log("HIER: ", state.todos);

// localStorage.clear();
// CHECKED (line-through / done)

if (state.todos.length > 0) {
  for (let k = state.todos.length; k >= 0; k--) {
    const getIt = localStorage.getItem("todos");
    console.log("Eintrag: ", getIt);
  }
}

function isChecked(e) {
  if (e.target.checked) {
    e.target.parentElement.style.textDecoration = "line-through";
  } else {
    e.target.parentElement.style.textDecoration = "none";
  }
}
todoList.addEventListener("change", isChecked);

// REMOVE DONE TODOS
function removeDoneTodos() {
  // localStorage.getItem("eintrag:");

  const children = todoList.children;
  const length = children.length - 1;

  for (let i = length; i >= 0; i--) {
    const li = children[i];
    const checkbox = li.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
      li.remove();
    }
  }
}
deleteButton.addEventListener("click", removeDoneTodos);

// #####################################################

// FILTER
function filterTodos(e) {
  switch (e.target.value) {
    case "all":
      showAllTodos();
      break;
    case "open":
      showOpenTodos();
      break;
    case "done":
      showDoneTodos();
      break;
  }
}
radioContainer.addEventListener("change", filterTodos);
// Filter - ALL
function showAllTodos() {
  for (let li of todoList.children) {
    // li.hidden;
    li.style.visibility = "visible";
  }
}
// Filter - OPEN
function showOpenTodos() {
  for (let li of todoList.children) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;
    if (isChecked) {
      // li.setAttribute("hidden", "true");
      // li.hidden = true;
      li.style.visibility = "hidden";
    } else {
      li.style.visibility = "visible";
      // li.hidden = false;
      // li.setAttribute("hidden", "false");
    }
  }
}
// Filter - DONE
function showDoneTodos() {
  console.log("DONE");
  for (let li of todoList.children) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;
    if (isChecked) {
      // li.hidden = false;
      li.style.visibility = "visible";
    } else {
      // li.hidden = true;
      li.style.visibility = "hidden";
    }
  }
}
