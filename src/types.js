/**
 * /**
 * @template Item
 * @typedef {import('./store').default<Item>} Store
 *
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {string} type
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Picture[]} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type это идентефикатор
 * @prop {Offer[]} offers это items   все эти идентефикаторы привести к строке
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */
