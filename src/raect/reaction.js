import { isClass } from "./utils";
import Component from "./component";

let rootDOMElement, rootReactionElement;
const classMap = {};
let classCounter = 0;
const REACT_CLASS = "REACT_CLASS";

function createVirtualElement(element, props, children) {
  //if class return instance of class
  if (isClass(element)) {
    return handleClass(element, props, children);
  }
  //if functional component , return component
  if (typeof element === "function") {
    return element(props);
  }

  return renderDOMElement(element, props, children);
}

function createElement(el, props, ...children) {
  return createVirtualElement(el, props, children);
}

function handleClass(elementClass, props, children) {
  classCounter++;
  // This naive approach doesn't work in this app.
  if (classMap[classCounter]) {
    return classMap[classCounter];
  }
  const reactElement = new elementClass(props);
  reactElement.children = children;
  reactElement.type = REACT_CLASS;
  classMap[classCounter] = reactElement;
  return reactElement;
}

function appendChild(element, child) {
  if (!child) {
    return;
  }
  if (child.type === REACT_CLASS) {
    appendChild(element, child.render());
  } else if (Array.isArray(child)) {
    child.forEach(ch => appendChild(element, ch));
  } else if (typeof child === "object") {
    element.appendChild(child);
  } else {
    element.innerHTML += child;
  }
}

function renderDOMElement(element, props, children) {
  //create dom element
  const newElement = document.createElement(element);

  //Loop all children and append if DOMNode or set inner html if text or numnber
  children.forEach(child => appendChild(newElement, child));

  //add props to elements
  Object.keys(props).forEach(prop => {
    if (prop.substr(0, 2) === "on") {
      newElement.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
    } else {
      newElement[prop] = props[prop];
      // newElement.setAttribute(prop, props[prop]);
    }
  });

  return newElement;
}

function render(element, parent) {
  rootReactionElement = element;
  rootDOMElement = parent;

  //Add the main reaction element to the dom
  const currentDOM =
    rootReactionElement.type === REACT_CLASS
      ? rootReactionElement.render()
      : rootReactionElement;
  rootDOMElement.appendChild(currentDOM);
  // debugger;
}

export function reRender() {
  hookCalls = -1;
  while (rootDOMElement.hasChildNodes()) {
    rootDOMElement.removeChild(rootDOMElement.lastChild);
  }
  rootDOMElement.innerHTML = "";
  //Skip the root. It is only rendered once.
  classCounter = 1;
  render(rootReactionElement, rootDOMElement);
}

const states = [];
let hookCalls = -1;

export function useState(defaultValue) {
  const hookId = ++hookCalls;
  if (states[hookId]) {
    return states[hookId];
  }
  const setValue = val => {
    //assign value
    states[hookId][0] = val;
    reRender();
    //rerender
  };
  const state = [defaultValue, setValue];
  states[hookId] = state;
  return state;
}

export default {
  createElement,
  render,
  Component
};
