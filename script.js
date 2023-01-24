// ############### State Render ######################
const state = {
  todos: [
    { id: "x", description: "Learn HTML", done: false, for: "x" },
    { id: "y", description: "Learn CSS", done: false, for: "y" },
    { id: "z", description: "Learn JavaScript", done: false, for: "z" },
  ],
};
// Your Todos erzeugen:
function renderTodos() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = ""; // Liste vorab leeren

  // li + input(checkbox) + label erzeugen, an ul anhängen
  state.todos.forEach((todo) => {
    const todoLi = document.createElement("li");
    const checkbox = document.createElement("input");
    const cboxLabel = document.createElement("label");

    // li stylen
    todoLi.setAttribute("class", "todo-item");
    // checkbox stylen
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", todo.id);
    checkbox.setAttribute("class", "todo-item__checkbox");
    checkbox.checked = todo.done;

    // label stylen
    cboxLabel.setAttribute("for", todo.for);
    cboxLabel.setAttribute("class", "todo-item__text");
    if (todo.done) {
      cboxLabel.setAttribute("style", "text-decoration: line-through");
    }
    console.log("LABEL: ", cboxLabel);

    // ##### state UPDATE (geänderten Zustand speichern) ##########
    checkbox.addEventListener("change", (e) => {
      const newTodoDoneState = e.target.checked;
      todo.done = newTodoDoneState;
      // console.log(e.target); // Ausgabe bei Checkbox-Klick (Change)
    });
    // ##### state UPDATE ENDE ##########

    // checkbox+label mit Todo-Text an <li> hängen
    todoLi.appendChild(checkbox);
    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    // <li> an <ul> hängen
    list.appendChild(todoLi); // <ul> <li>Text...</li> … anhängen
  });
}
renderTodos();

// Remove Done Todos
function removeDoneTodos() {
  state.todos.forEach((todo) => {
    if (todo.done) {
      console.log("Huhu");
      // _.innerHTML = "";
    }
  });
}
deleteButton.addEventListener("click", removeDoneTodos);
