const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const radioContainer = document.querySelector("#radio-container");

// #########################################################
// STATE erzeugen: id: ..., todo: todoInput.value, done: false
const state = {
  todos: [],
};

// #########################################################
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
  const addTodosAsString = JSON.stringify(state.todos);
  localStorage.setItem("todos", addTodosAsString); // `${todoID}`
  // ############# LOCAL STORAGE END #######################
}
addButton.addEventListener("click", addTodo);
// ### ADD ENDE ############################################

// #########################################################
// ### UPDATE STATE (aus LocalStorage) #####################
function loadDataFromLocalStorage() {
  if (localStorage.getItem("todos")) {
    const todosData = JSON.parse(localStorage.getItem("todos"));
    return todosData;
  } else {
    return [];
  }
}
state.todos = loadDataFromLocalStorage();
console.log("GET: ", state.todos);

// #########################################################
// ### UPDATE DONE #########################################
function isChecked(e) {
  for (let datauch of state.todos) {
    const updateTodosAsString = JSON.stringify(state.todos);
    let datisit = e.target.parentElement.innerText;
    if (e.target.checked) {
      e.target.parentElement.style.textDecoration = "line-through";
      if (datisit === datauch.todo) {
        datauch.done = "true";
      }
    } else {
      e.target.parentElement.style.textDecoration = "none";
      datauch.done = "false";
    }
    localStorage.setItem("todos", updateTodosAsString);
  }
}
todoList.addEventListener("change", isChecked);

// REMOVE DONE TODOS
function removeDoneTodos() {
  todoList.innerHTML = "";
  for (let openTodo of state.todos) {
    if (openTodo.done === "true") {
      // console.log(openTodo) -> splice(x, y)
      // 1. aus state löschen
      // 2. neu in localStorage setzen
    } else {
      filterlist(openTodo.todo, "false");
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
  todoList.innerHTML = "";
  for (let openTodo of state.todos) {
    filterlist(openTodo.todo, openTodo.done);
  }
}

// FILTER-LISTE bauen
function filterlist(value, done) {
  const TodoText = value;

  // Elemente holen
  const newTodoLi = document.createElement("li");
  const checkBox = document.createElement("input");
  const cboxLabel = document.createElement("label");

  // li stylen
  newTodoLi.setAttribute("class", "todo-item");
  if (done === "true") {
    newTodoLi.style.textDecoration = "line-through";
  }
  // checkbox stylen
  checkBox.type = "checkbox";
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "todo-item__checkbox");
  // label stylen
  cboxLabel.setAttribute("class", "todo-item__text");

  // zusammenbauen:
  newTodoLi.appendChild(checkBox);
  cboxLabel.innerText = TodoText;
  newTodoLi.appendChild(cboxLabel);
  todoList.appendChild(newTodoLi);
  return;
}

// Filter - OPEN
function showOpenTodos() {
  todoList.innerHTML = "";
  for (let openTodo of state.todos) {
    if (openTodo.done === "false") {
      filterlist(openTodo.todo, openTodo.done);
    }
  }
}
// Filter - DONE
function showDoneTodos() {
  todoList.innerHTML = "";
  for (let openTodo of state.todos) {
    if (openTodo.done === "true") {
      filterlist(openTodo.todo, openTodo.done);
    }
  }
}
// localStorage.clear();
