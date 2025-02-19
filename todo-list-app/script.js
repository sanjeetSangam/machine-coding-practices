document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoSubmit = document.querySelector(".todo-submit");

  let editMode = false;
  let editItem = null;

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      if (editMode) {
        editItem.firstChild.textContent = todoText;
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        addTodoItem(todoText);
      }

      todoInput.value = "";
      todoInput.focus();
    } else {
      alert("Please Enter a valid task");
    }
  });

  todoList.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "BUTTON") {
      const todoItem = target.parentNode;
      if (target.innerText === `❌`) {
        todoItem.remove();
      } else if (target.innerText === `✏️`) {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = `✏️`;
    removeButton.innerText = `❌`;

    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);

    todoList.appendChild(todoItem);
  }
});
