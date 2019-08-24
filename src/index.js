import React, { useState } from "raect";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import TodoClass from "./TodoClass";
import TodoFunction from "./TodoFunction";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={() => console.log("hi")}
        />
        <header className="App-header">
          <h1>Ants Talk</h1>
          <div className="container">
            <TodoClass />
            <TodoFunction />
          </div>
        </header>
      </div>
    );
  }
}

React.render(<App />, document.getElementById("root"));
