import {FilterType, PointType, SortType} from './enums';

const filterTitleMap = {
  [FilterType.EVERYTHING]: 'Everything',
  [FilterType.FUTURE]: 'Future',
};

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (point) => Date.now() < point.endDateAsNumber,
};

const sortTitleMap = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFERS]: 'Offers',
};

const sortDisabilityMap = {
  [SortType.DAY]: false,
  [SortType.EVENT]: true,
  [SortType.TIME]: true,
  [SortType.PRICE]: false,
  [SortType.OFFERS]: true,
};

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
const sortCallbackMap = {
  [SortType.DAY]: (point, nextPoint) => point.startDateAsNumber - nextPoint.startDateAsNumber,
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (point, nextPoint) => nextPoint.basePrice - point.basePrice,
  [SortType.OFFERS]: () => 0,
};

const pointTitleMap = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant',
};

const pointIconMap = Object.fromEntries(
  Object.values(PointType).map((value) => [value, `img/icons/${value}.png`])
);

export {
  filterTitleMap,
  filterCallbackMap,
  sortTitleMap,
  sortDisabilityMap,
  sortCallbackMap,
  pointTitleMap,
  pointIconMap,
};
