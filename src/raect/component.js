import { reRender } from "./reaction";

export default class Component {
  constructor(props) {
    this.props = props || {}``;
    this.__prevstate = {};
    // this.state = {};
  }

  setState(state) {
    let newState = Object.assign({}, this.state, state);
    this.__prevstate = this.state;
    this.state = newState;
    reRender();
  }
}
