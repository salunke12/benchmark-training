document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      if (text.trim() == "") return;
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<input readonly  class="form-control text-todo border-0 bg-transparent" value="${task}"/>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-warning">Edit</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>`;
    ulTodo.appendChild(li);
    const input = li.querySelector(".text-todo");
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        input.setAttribute("readonly", true);
        saveAllTodo();
      }
    });
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const task = e.target
        .closest(".list-group-item")
        .querySelector(".text-todo").value;
      const confirmation = confirm(
        `Are you sure you want to delete "${task}" task?`
      );
      if (!confirmation) return;
      e.target.closest(".list-group-item").remove();
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-warning")) {
      const li = e.target.closest(".list-group-item");
      const input = li.querySelector(".text-todo");
      input.removeAttribute("readonly");
      input.focus();
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.value
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };
  const deleteAll = () => {
    if (ulTodo.children.length === 0) {
      alert("There is no task to delete");
      return;
    }
    const confirmation = confirm("Are you sure you want to delete all tasks?");
    if (!confirmation) return;
    localStorage.removeItem("allTodos");
    ulTodo.innerHTML = "";
  };
  document.getElementById("delete-all").addEventListener("click", deleteAll);
  loadAllTodo();
});
