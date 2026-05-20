import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const getTodos = async () => {
    const response = await axios.get("http://localhost:5000/todo");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    await axios.post("http://localhost:5000/todo", {
      text: text,
      done: false,
    });

    getTodos();
    setText("");
  };

  const toggleDone = async (todo) => {
    await axios.put(`http://localhost:5000/todo/${todo._id}`, {
      done: !todo.done,
    });

    getTodos();
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const saveEdit = async (todo) => {
    if (!editText.trim()) return;

    await axios.put(`http://localhost:5000/todo/${todo._id}`, {
      text: editText,
    });

    setEditingId(null);
    setEditText("");
    getTodos();
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`http://localhost:5000/todo/${todo._id}`);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="New todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      {todos.map((todo) => (
        <div key={todo._id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleDone(todo)}
          />

          {editingId === todo._id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <button onClick={() => saveEdit(todo)}>Save</button>

              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>

              <button onClick={() => startEditing(todo)}>Edit</button>

              <button onClick={() => deleteTodo(todo)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;