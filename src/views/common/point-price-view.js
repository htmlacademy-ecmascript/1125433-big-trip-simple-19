import View from '../view';
import {html} from '../../utils';

export default class PointPriceView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group--price', 'event__field-group');
  }

  /**
    *@override
  */
  createHtml() {
    return html`
    <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input
    class="event__input  event__input--price"
    id="event-price-1"
    type="number"
    name="base_price"
    min="1"
    max="1000000">
    `;
  }

  /**
   * @param {number} value
   */
  setValue(value) {
    this.querySelector('input').valueAsNumber = value;
  }

  getValue() {
    return (this.querySelector('input')).valueAsNumber;
  }
}

customElements.define(String(PointPriceView), PointPriceView);
