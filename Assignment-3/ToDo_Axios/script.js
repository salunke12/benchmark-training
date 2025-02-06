document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const deleteAllButton = document.getElementById("delete-all-todo");
  const ulTodo = document.getElementById("ul-todo");

  let editMode = false;
  let editElement = null;

  const loadTodosFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = response.data;
      todos.forEach((todo) => createTodo(todo.title, todo.id));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = (task, id) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.dataset.id = id;

    li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-danger edit-btn">Edit</button>
            <button type="button" class="btn btn-warning delete-btn">Delete</button>
        </div>`;
    ulTodo.appendChild(li);
  };

  buttonTodo.addEventListener("click", async () => {
    const text = inputTodo.value;
    if (editMode) {
      const id = editElement.dataset.id;
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          title: text,
          completed: false,
        });
        console.log("Item successfully edited!");
        editElement.querySelector(".text-todo").textContent = text;
        editMode = false;
        editElement = null;
        buttonTodo.textContent = "Add";
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          {
            title: text,
            completed: false,
            userId: 1,
          }
        );
        createTodo(text, response.data.id);
        console.log("Item successfully added!");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
    inputTodo.value = "";
  });

  ulTodo.addEventListener("click", async (e) => {
    const li = e.target.closest(".list-group-item");
    const id = li.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        console.log("Item successfully deleted!");
        li.remove();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      const textSpan = li.querySelector(".text-todo");
      const taskText = textSpan.textContent;

      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = taskText;
      inputField.className = "form-control";
      textSpan.replaceWith(inputField);

      e.target.textContent = "Save";
      e.target.classList.remove("btn-danger", "edit-btn");
      e.target.classList.add("btn-success", "save-btn");

      inputField.focus();

      const saveText = async () => {
        const newText = inputField.value.trim();
        if (newText) {
          try {
            await axios.put(
              `https://jsonplaceholder.typicode.com/todos/${id}`,
              {
                title: newText,
                completed: false,
              }
            );
            console.log("Item successfully edited!");
            const newTextSpan = document.createElement("span");
            newTextSpan.className = "text-todo";
            newTextSpan.textContent = newText;
            inputField.replaceWith(newTextSpan);

            e.target.textContent = "Edit";
            e.target.classList.remove("btn-success", "save-btn");
            e.target.classList.add("btn-danger", "edit-btn");
          } catch (error) {
            console.error("Error editing todo:", error);
          }
        }
      };

      inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          saveText();
        }
      });

      e.target.onclick = () => {
        saveText();
      };
    }
  });

  deleteAllButton.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
      ulTodo.innerHTML = "";
      localStorage.removeItem("allTodos");
    }
  });

  loadTodosFromAPI();
});
