import Adapter from './adapter';

export default class PointAdapter extends Adapter {
  /**
   * @param {Partial<Point>} data
  */
  constructor(data = {}) {
    super();

    this.basePrice = data.base_price;
    this.StartDate = data.date_from;
    this.endDate = data.date_to;
    this.destinationID = String(data.destination);
    this.id = data.id;
    this.offersIds = data.offers?.map(String);
    this.type = data.type;
  }

  /**
   * @override
   * @return {Partial<Point>}
   */
  toJSON() {
    return {
      'base_price': this.basePrice,
      'date_from': this.StartDate,
      'date_to': this.EndDate,
      'destination': +this.destinationID,
      'id': this.id,
      'offers': this.offers?.map(Number),
      'type': this.type
    };
  }

}

