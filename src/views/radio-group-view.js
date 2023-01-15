import View from './view';
// import {html} from '../utils';

export default class RadioGroupView extends View {
  /**
   * @param {string} value
   */
  setValue(value) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector(`[value="${value}"]`);

    if(view) {
      view.checked = true;
    }
  }

  getValue() {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('[type="radio"]:checked');

    if(view) {
      return view.value;
    }
    return '';
  }

  /**
   * @param {boolean[]} flags
   */
  setDisability(flags) {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    (this.querySelectorAll('[type="radio"]')).forEach((view, index) => {
      view.disabled = flags[index];
    });
  }
}

customElements.define(String(RadioGroupView), RadioGroupView);
