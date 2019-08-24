import React, { useState } from "raect";

export default function TodoFunction() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");

  let handle = e => {
    e.preventDefault();
    add(e.target.firstChild.value);
  };

  function deleteTodo(index) {
    let t = todos.filter((todo, i) => i !== index);
    setTodo(t);
  }

  function add(todo) {
    setTodo([...todos, todo]);
  }

  return (
    <div>
      <h2 id="33">Function Based TodoList</h2>
      <div>
        <ul>
          {todos.map((i, index) => (
            <li>
              {i} <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handle}>
        <input type="text" value={input} />
        <br />
        <input type="submit" value="Add Todo" />
      </form>
    </div>
  );
}
