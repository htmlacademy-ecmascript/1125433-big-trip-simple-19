
import './views/filter-view';
import './views/sort-view';
import './views/point-view';
import './views/list-view';
import './views/new-point-editor-view';

import Store from './store';

import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestinationAdapter from './adapters/destination-adapter';
import OfferGroupAdapter from './adapters/offerGroup-adapter';

import {FilterType, SortType} from './enums';
import {filterCallbackMap, sortCallbackMap} from './maps';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic rjycgtrn321';
/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.FUTURE],
  sort: sortCallbackMap[SortType.DAY]
});
/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (item) => new DestinationAdapter(item)
});
/**
 * @type {Store<Offers>}
 */
const offerGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offerGroupsModel = new CollectionModel({
  store: offerGroupsStore,
  adapt: (item) => new OfferGroupAdapter(item)
});

const models = [pointsModel, destinationsModel, offerGroupsModel];

const {log, table} = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then( async () => {
    table(pointsModel.list());
    // log('Points', pointsModel.listAll());
    // log('Points: item', pointsModel.item());
    // log('PointsID: findById', pointsModel.findById('1'));
    // log('Destinations', destinationsModel.listAll());
    // log('Offer groups', offerGroupsModel.listAll());
    // log('Points: findIndexById', pointsModel.findIndexById('3'));
    // const logEvent = (event) => log(event.type, event.detail);

    // pointsModel.addEventListener('add', logEvent);
    // pointsModel.addEventListener('update', logEvent);

    // const item = pointsModel.item();
    // item.basePrice = 100;
    // item.startDate = new Date().toJSON();
    // item.endDate = item.startDate;
    // item.destinationId = '1';
    // item.offers = [];
    // item.type = 'bus';

    // const addedItem = await pointsModel.add(item);

    // addedItem.basePrice = 200;
    // addedItem.type = 'taxi';

    // await pointsModel.update(addedItem);
  })

  .catch((error) => {
    log(error);
  });

