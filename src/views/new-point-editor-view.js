import View from './view';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import PointDestinationView from './common/point-destination-view';
import PointTimeView from './common/point-time-view';
import PointPriceView from './common/point-price-view';
import PointOffersView from './common/point-offers-view';
import PointDescriptionView from './common/point-description-view';
import { saveButtonTextMap } from '../maps';
import UiBlockerView from './ui-blocker-view';


/**
 * @implements {EventListenerObject}
 */
export default class NewPointEditorView extends View {
  constructor(listView) {
    super();

    /**
     * @type {ListView}
     */
    this.listView = listView;
    this.classList.add('trip-events__item');

    /**
     * @type {PointTypeView}
     */
    this.pointTypeView = this.querySelector(String(PointTypeView));

    /**
     * @type {PointDestinationView}
     */
    this.pointDestinationView = this.querySelector(String(PointDestinationView));

    /**
     * @type {PointTimeView}
     */
    this.pointTimeView = this.querySelector(String(PointTimeView));

    /**
     * @type {PointPriceView}
     */
    this.pointPriceView = this.querySelector(String(PointPriceView));

    /**
     * @type {PointOffersView}
     */
    this.pointOffersView = this.querySelector(String(PointOffersView));

    /**
     * @type {PointDescriptionView}
     */
    this.pointDescriptionView = this.querySelector(String(PointDescriptionView));

    this.uiBlockerView = new UiBlockerView();
  }

  /**
    *@override
  */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post" novalidate>
        <header class="event__header">
          <${PointTypeView}></${PointTypeView}>
          <${PointDestinationView}></${PointDestinationView}>
          <${PointTimeView}></${PointTimeView}>
          <${PointPriceView}></${PointPriceView}>
          
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <${PointOffersView}></${PointOffersView}> 
          <${PointDescriptionView}></${PointDescriptionView}>
        </section>
      </form>
    `;
  }

  open() {
    this.listView.prepend(this);
    this.pointTimeView.createCalendars();
    this.fadeInRight();
    document.addEventListener('keydown', this);
  }

  close(notify = true) {
    this.remove();
    this.pointTimeView.destroyCalendars();
    document.removeEventListener('keydown', this);

    if(notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }
  }

  /**
   * @param {boolean} flag
   */
  awaitSave(flag) {
    const text = saveButtonTextMap[Number(flag)];

    this.querySelector('.event__save-btn').textContent = text;
    this.uiBlockerView.toggle(flag);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * @param {string} name
   */
  findByName(name) {
    return this.querySelector('form').elements[name];
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
