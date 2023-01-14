import dayjs from 'dayjs';
import {escape} from 'he';
/**
*@param {TemplateStringArray} strings
*@param {...*} values
*/
export const html = (string, ...values) => string.reduce((before, after, index) => {
  const value = values[index - 1];
  return before + escape(String(value)) + after;
});

/**
 * @param {string} value
 */
export const formatDate = (value) => dayjs(value).format('DDMMM');

/**
 * @param {string} value
 */
export const formatTime = (value) => dayjs(value).format('HH:mm');

/**
 * @param {number} value
 */
export const formatNumber = (value) => value.toLocaleString('en');

/**
 * @param {Object} target
 * @param {*} value
 */
export const findKey = (target, value) => Object.keys(target).find((key) => target[key] === value);

