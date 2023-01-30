import {pointIconMap, pointTitleMap} from '../maps';
import {formatDate, formatNumber, formatTime} from '../utils';
import PointView from '../views/point-view';
import Presenter from './presenter';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();

    this.view.addEventListener('edit', this.handleViewEdit.bind(this));

    this.pointsModel.addEventListener('filter', this.handlePointModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointModelSort.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointModelDelete.bind(this));
  }

  updateView() {
    const points = this.pointsModel.list();
    const pointViewStates = points.map(this.createPointViewState, this);

    this.view.setItems(pointViewStates);
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);

    const OfferViewStates = offerGroup.items
      .filter((offer) =>
        point.offerIds.includes(offer.id)
      )
      .map((offer) => ({
        title: offer.title,
        price: formatNumber(offer.price),
      }));

    return {
      id: point.id,
      date: formatDate(point.startDate),
      icon: pointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: formatTime(point.startDate),
      startDate: point.startDate,
      endTime: formatTime(point.endDate),
      endDate: point.endDate,
      basePrice: formatNumber(point.basePrice),
      offers: OfferViewStates,
    };
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  handleViewEdit(event) {
    this.navigate('/edit', event.target.dataset);
  }

  handlePointModelFilter() {
    this.updateView();
  }

  handlePointModelSort() {
    this.updateView();
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointModelAdd(event) {
    this.updateView(event.detail);
  }

  /**
   * @param {CustomEvent<{newItem: PointAdapter}>} event
   */
  handlePointModelUpdate(event) {
    this.updateView(event.detail.newItem);
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointModelDelete(event) {
    this.updateView(event.detail);
  }

}
