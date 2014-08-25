/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */

define([
  'assist/isArray',
  'assist/isObject',
  'assist/deepMerge'
], function (isArray, isObject, deepMerge) {


/* -----------------------------------------------------------------------------
 * utils
 * ---------------------------------------------------------------------------*/

return {
  isObject: isObject,
  isArray: isArray,
  deepMerge: deepMerge
};


});