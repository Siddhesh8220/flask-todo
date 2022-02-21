async function fetchTodo() {
  try {
    const res = await axios.get(`http://localhost:5000/todos`, {
      "Content-Type": "application/json",
    });
    const element = document.getElementById("todolists");
    if (res.data.length !== 0) {
      const todos = res.data
        .map((todo) => {
          console.log(todo.iscomplete);
          return `<li id="${todo.id}"><input type="checkbox" id="check-${
            todo.id
          }" onclick="updateTodo('${todo.id}')" ${
            todo.iscomplete == "true" ? "checked" : ""
          }/><input type="text" id="input-${todo.id}" value="${
            todo.description
          }" readonly/><button class="not-hidden-${
            todo.id
          } not-hidden" onclick="onEdit('${
            todo.id
          }')">Edit</button><button class="not-hidden-${
            todo.id
          } not-hidden" onclick="deleteTodo('${
            todo.id
          }')">Delete</button><button onclick=updateTodo('${
            todo.id
          }') class="hidden-${
            todo.id
          } hidden">Save</button><button class="hidden-${
            todo.id
          } hidden" onclick="fetchTodo()">Cancel</button></li>`;
        })
        .join("");
      element.innerHTML = `${todos}`;
    } else {
      element.innerHTML = "<li>No records found</li>";
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function createTodo() {
  try {
    new_todo = document.getElementById("newTodo").value;
    let payload = { description: new_todo, iscomplete: "false" };
    const res = await axios.post(
      `http://localhost:5000/todos/create`,
      payload,
      {
        "Content-Type": "application/json",
      }
    );
    fetchTodo();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function updateTodo(id) {
  try {
    const parent = document.getElementById(id);
    var iscompleteVal = parent.children[0].checked.toString();
    var descriptionVal = parent.children[1].value;
    let payload = { description: descriptionVal, iscomplete: iscompleteVal };
    const res = await axios.put(
      `http://localhost:5000/todos/${id}/edit`,
      payload,
      {
        "Content-Type": "application/json",
      }
    );
    fetchTodo();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function deleteTodo(id) {
  try {
    console.log(id);
    console.log(`http://localhost:5000/todos/${id}`);
    const res = await axios.delete(`http://localhost:5000/todos/${id}`, {
      "Content-Type": "application/json",
    });
    fetchTodo();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function onEdit(todoid) {
  var hidden = document.getElementsByClassName(`hidden-${todoid}`);

  for (var i = 0; i < hidden.length; i++) {
    hidden[i].style.display = "block";
  }

  var not_hidden = document.getElementsByClassName(`not-hidden-${todoid}`);

  for (var i = 0; i < not_hidden.length; i++) {
    not_hidden[i].style.display = "none";
  }

  var input = document.getElementById(`input-${todoid}`);
  input.removeAttribute("readonly");

  var check = document.getElementById(`check-${todoid}`);
  check.style.display = "none";
}
