document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");

  let editMode = false;
  let editElement = null;

  // Add or update a todo item
  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      if (text.trim() == "") return; // Ignore empty input
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });

  // Function to create a new todo item
  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<input readonly class="form-control text-todo border-0 bg-transparent" value="${task}"/>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-warning">Edit</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>`;
    
    ulTodo.appendChild(li);

    // Enable inline editing on pressing Enter
    const input = li.querySelector(".text-todo");
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        input.setAttribute("readonly", true);
        saveAllTodo();
      }
    });
  };

  // Handle edit and delete actions
  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      // Confirm before deleting a task
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
      // Enable editing mode
      const li = e.target.closest(".list-group-item");
      const input = li.querySelector(".text-todo");
      input.removeAttribute("readonly");
      input.focus();
    }
  });

  // Save all todos to localStorage
  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.value
    );
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  // Load all todos from localStorage on page load
  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  // Delete all tasks with confirmation
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

  // Attach deleteAll function to button click
  document.getElementById("delete-all").addEventListener("click", deleteAll);

  // Load existing todos when the page loads
  loadAllTodo();
});
