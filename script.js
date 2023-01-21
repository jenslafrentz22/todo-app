const state = {
  todos: [
    { id: "learnHTML", description: "Learn HTML", done: false },
    { id: "learnCSS", description: "Learn CSS", done: false },
    { id: "learnJS", description: "Learn JavaScript", done: false },
  ],
};

function renderTodos() {
  const list = document.querySelector("#list"); // <ul id=“list“> auswählen
  list.innerHTML = ""; // Liste vorab leeren

  // li + checkbox erzeugen, an ul anhängen
  state.todos.forEach((todo) => {
    // für jeden Eintrag (todo) im State (todos)

    const todoLi = document.createElement("li"); // <li>Text...</li> erzeugen

    const checkbox = document.createElement("input"); // li-Checkbox („todo/done“)
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", todo.id); // checkbox mit z. B. id="learnHTML"
    checkbox.checked = todo.done; // checkbox auf true oder false setzen

    // ##### state UPDATE (geänderten Zustand speichern) ##########
    checkbox.addEventListener("change", (e) => {
      const newTodoDoneState = e.target.checked; // Checkbox geklickt: true / false
      todo.done = newTodoDoneState;
      
      console.log(e.target); // Ausgabe bei Checkbox-Klick (Change)
    });
    // ##### state UPDATE ENDE ##########

    todoLi.appendChild(checkbox);

    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    list.appendChild(todoLi); // <ul> <li>Text...</li> … anhängen
  });
}
renderTodos();
