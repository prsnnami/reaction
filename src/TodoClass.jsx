import React from "raect";

export default class TodoClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], input: "" };
  }

  add = todo => {
    // this.state.todos.push(todo);
    this.setState({ todos: [...this.state.todos, todo] });
  };

  handle = e => {
    console.log(e);
    e.preventDefault();
    this.add(e.target.firstChild.value);
  };

  deleteTodo(index) {
    let todos = this.state.todos.filter((todo, i) => i !== index);
    this.setState({ todos: todos });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <h2>Class Based TodoList</h2>
        <div>
          <ul>
            {this.state.todos.map((i, index) => (
              <li>
                {i}{" "}
                <button onClick={() => this.deleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={this.handle}>
          <input type="text" value={this.state.input} />
          <br />
          <input type="submit" value="Add Todo" />
        </form>
      </div>
    );
  }
}
