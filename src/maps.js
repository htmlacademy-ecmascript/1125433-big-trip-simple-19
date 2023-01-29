import {FilterType, PointType, SortType, ButtonState} from './enums';

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
  [SortType.EVENT]: false,
  [SortType.TIME]: false,
  [SortType.PRICE]: false,
  [SortType.OFFERS]: false,
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

const saveButtonTextMap = {
  [ButtonState.DEFAULT]: 'Save',
  [ButtonState.PRESSED]: 'Saving...',
};

const deleteButtonTextMap = {
  [ButtonState.DEFAULT]: 'Delete',
  [ButtonState.PRESSED]: 'Deleting...',
};

export {
  filterTitleMap,
  filterCallbackMap,
  sortTitleMap,
  sortDisabilityMap,
  sortCallbackMap,
  pointTitleMap,
  pointIconMap,
  saveButtonTextMap,
  deleteButtonTextMap
};
