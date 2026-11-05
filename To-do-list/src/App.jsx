import { useState, useEffect } from "react";
import "./App.css";

// Free fake API (no key needed)
const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 1. On first load: read from localStorage, else get from API
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
      setLoading(false);
    } else {
      fetchTodos();
    }
  }, []);

  // 2. Save to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  // READ - get first 5 todos from API
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL + "?_limit=5");
      const data = await res.json();
      const list = data.map((item) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
        fromApi: true,
      }));
      setTodos(list);
    } catch (err) {
      setMessage("Could not load todos from API");
    }
    setLoading(false);
  };

  // CREATE
  const addTodo = async () => {
    if (text.trim() === "") {
      setMessage("Please type a task first");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: text.trim(),
      completed: false,
      fromApi: false,
    };
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
    } catch (err) {
      setMessage("API not reachable, saved locally");
    }
    setTodos([newTodo, ...todos]);
    setText("");
    setMessage("");
  };

  // UPDATE - toggle done / not done
  const toggleTodo = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };
    if (todo.fromApi) {
      try {
        await fetch(API_URL + "/" + todo.id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch (err) {
        setMessage("API not reachable, saved locally");
      }
    }
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
  };

  // UPDATE - edit title
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async (todo) => {
    if (editText.trim() === "") {
      setMessage("Task cannot be empty");
      return;
    }
    const updated = { ...todo, title: editText.trim() };
    if (todo.fromApi) {
      try {
        await fetch(API_URL + "/" + todo.id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch (err) {
        setMessage("API not reachable, saved locally");
      }
    }
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    setEditId(null);
    setMessage("");
  };

  // DELETE
  const deleteTodo = async (todo) => {
    if (todo.fromApi) {
      try {
        await fetch(API_URL + "/" + todo.id, { method: "DELETE" });
      } catch (err) {
        setMessage("API not reachable, deleted locally");
      }
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
      </div>
    </div>
  );
}

export default App;