import {escape} from 'he';
/**
*@param {TemplateStringArray} strings
*@param {...*} values
*/
export const html = (string, ...values) => string.reduce((before, after, index) => {
  const value = values[index - 1];
  return before + escape(String(value)) + after;
});
