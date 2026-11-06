import { useState, useEffect } from "react";
import "./App.css";

// JSONPlaceholder API - we use the /todos resource
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Small helper: call the API and return the JSON result
async function callApi(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Server error " + res.status);
  }
  return res.json();
}

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // On page load: GET tasks from the API                                                        [Data getted from API]
  useEffect(() => {
    loadFromApi();
  }, []);

  const showSuccess = (msg) => {
    setMessage(msg);
    setError("");
  };

  const showError = (msg) => {
    setError(msg);
    setMessage("");
  };

  // GET (list) - GET /todos?_limit=10
  const loadFromApi = async () => {
    setLoading(true);
    try {
      const data = await callApi(API_URL + "?_limit=5");
      setTodos(data);
      // showSuccess("Loaded " + data.length + " tasks from API (GET)");
    } catch (err) {
      showError("Could not load tasks: " + err.message);
    }
    setLoading(false);
  };

  // CREATE - POST /todos                                                                          [data added]
  const addTodo = async () => {
    if (text.trim() === "") {
      showError("Please type a task first");
      return;
    }
    const newTodo = {
      title: text.trim(),
      completed: false,
      userId: 1,
    };
    try {
      const data = await callApi(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newTodo),
      });
      // The API always replies with id 201, so we make our own unique id
      setTodos([{ ...data, id: Date.now() }, ...todos]);
      setText("");
      showSuccess("Task added");
    } catch (err) {
      showError("Could not add task: " + err.message);
    }
  };

  // UPDATE (PATCH) - tick / untick a task: PATCH /todos/:id                                     [data updated tick/untick]
  const toggleTodo = async (todo) => {
    const newValue = !todo.completed;
    let note = "Task updated ";
    try {
      await callApi(API_URL + "/" + todo.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ completed: newValue }),
      });
    } catch (err) {
      // The demo API does not know tasks we created, so it replies with an error
      note = "Changed on screen only (demo API does not store tasks you add)";
    }
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...t, completed: newValue } : t))
    );
    showSuccess(note);
  };

  // UPDATE (PUT) - change the title: PUT /todos/:id                                                [data edited title]
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async (todo) => {
    if (editText.trim() === "") {
      showError("Task cannot be empty");
      return;
    }
    const updated = { ...todo, title: editText.trim() };
    let note = "Task edited ";
    try {
      await callApi(API_URL + "/" + todo.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      note = "Changed on screen only (demo API does not store tasks you add)";
    }
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    setEditId(null);
    showSuccess(note);
  };

  // DELETE - DELETE /todos/:id                                                                         [data deleted]
  const deleteTodo = async (todo) => {
    try {
      await callApi(API_URL + "/" + todo.id, { method: "DELETE" });
      showSuccess("Task deleted ");
    } catch (err) {
      showSuccess("Task removed on screen (demo API does not store tasks you add)");
    }
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="box">
        <h1>My To-Do List</h1>
        <p className="count">
          {doneCount} of {todos.length} done
        </p>

        <div className="add-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        {loading && <p className="info">Loading...</p>}
        {!loading && todos.length === 0 && (
          <p className="info">No tasks yet. Add one above.</p>
        )}

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editId === todo.id ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="save-btn" onClick={() => saveEdit(todo)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                  />
                  <span className={todo.completed ? "title done" : "title"}>
                    {todo.title}
                  </span>
                  <button className="edit-btn" onClick={() => startEdit(todo)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteTodo(todo)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        <button className="reload-btn" onClick={loadFromApi}>
          Reload tasks from API
        </button>
      </div>
    </div>
  );
}

export default App;