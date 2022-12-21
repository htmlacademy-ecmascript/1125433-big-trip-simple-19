import Adapter from './adapter';

export default class offerGroupAdapter extends Adapter {
/**
   * @param {OfferGroup} data
  */

  constructor(data) {
    super();

    this.id = data.type;
    this.OfferGroup = data.offers.map((item) => ({
      ...item,
      id: String(item.id)
    }));
  }
}
