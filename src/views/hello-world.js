import {html} from '../utils.js';

export default class Helloworld extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = html`<h1>Hello World!</h1>`;
  }

  changeColor() {
    this.style = 'color: red';
  }
}

customElements.define('hello-world', Helloworld);
