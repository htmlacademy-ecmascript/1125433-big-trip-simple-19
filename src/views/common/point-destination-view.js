import View from './../view';
import {html} from '../../utils';

export default class PointDestinationView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group--destination', 'event__field-group');
  }

  /**
    *@override
  */
  createHtml() {
    return html`
    <label class="event__label  event__type-output" for="event-destination-1"></label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="destination" list="destination-list-1">
    <datalist id="destination-list-1"></datalist>
    `;
  }

  /**
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <option value="${state.value}">${state.value}</option>
    `;
  }

  /**
   * @param {OptionViewState[]} states
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');

    this.querySelector('datalist').insertAdjacentHTML('beforeend', optionsHtml);
  }

  /**
   *
   * @param {string} value
   */
  setValue(value) {
    this.querySelector('input').value = value;
  }

  getValue() {
    return this.querySelector('input').value;
  }

  /**
   *
   * @param {string} label
   */
  setLabel(label) {
    this.querySelector('label').textContent = label;
  }
}

customElements.define(String(PointDestinationView), PointDestinationView);
