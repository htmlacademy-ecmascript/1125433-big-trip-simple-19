import { PointType } from '../enums';
import { pointTitleMap } from '../maps';
import { formatNumber } from '../utils';
import Presenter from './presenter';


/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const pointTypeOptions = Object.entries(pointTitleMap).map(([value, title]) => ({title, value}));

    const destinationOptions = this.destinationsModel.listAll().map(({name}) => ({title: '', value:name}));

    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    this.view.pointDestinationView.setOptions(destinationOptions);
    this.view.pointDestinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.pointTimeView.setConfig({
      dateFormat: 'd/m/y H:i',
      locale: {firstDayOfWeek: 1, 'time_24hr': true},
    });

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.pointDestinationView.setLabel(pointTitleMap[point.type]);
    this.view.pointDestinationView.setValue(destination.name);
    this.view.pointTimeView.setValues([point.startDate, point.endDate]);
    this.view.pointPriceView.setValue(point.basePrice);

    this.updateOffersView(point.offerIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    const pointType = this.view.pointTypeView.getValue();
    const offerGroup = this.offerGroupsModel.findById(pointType);

    const options = offerGroup.items.map((offer) => ({
      ...offer,
      price: formatNumber(offer.price),
      checked: offerIds.includes(offer.id),
    }));

    this.view.pointOffersView.setOptions(options);
    this.view.pointOffersView.hidden = !options.length;
  }

  /**
   * @param {DestinationAdapter} [destination]
   */
  updateDestinationDetailsView(destination) {
    this.view.pointDescriptionView.hidden = !destination;

    if (destination) {
      this.view.pointDescriptionView.setContent(destination);
    }
  }

  /**
   * @override
   */
  handleNavigation() {
    if(this.location.pathname === '/new') {
      const point = this.pointsModel.item();

      point.type = PointType.BUS;
      point.destinationId = this.destinationsModel.item(1).id;
      point.startDate = new Date().toJSON();
      point.endDate = new Date().toJSON();
      point.basePrice = 100;
      point.offerIds = [];
      this.view.open();
      this.updateView(point);
    } else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
  */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointTypeView = this.view.pointTypeView.getValue();

    this.view.pointDestinationView.setLabel(pointTitleMap[pointTypeView]);
    this.updateOffersView();
  }


  handleDestinationViewInput() {
    const destinationName = this.view.pointDestinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);

    this.updateDestinationDetailsView(destination);
  }

}
