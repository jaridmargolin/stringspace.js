/*!
 * stringspace.js
 * 
 * Copyright (c) 2014
 */

define(function () {


/* -----------------------------------------------------------------------------
 * utils
 * ---------------------------------------------------------------------------*/

var _ = {};


/**
 * Determine if a given value is an Object.
 *
 * @example
 * var isObj = isObject(obj);
 *
 * @public
 *
 * @param {*} value - Value to test.
 */
_.isObject = function (value) {
  return typeof value === 'object';
};


/**
 * Determine if a given value is an Array.
 *
 * @example
 * var isArr = isArray(array);
 *
 * @public
 *
 * @param {*} value - Value to test.
 */
_.isArray = function (value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};


/**
 * Deep merge 2 objects.
 *
 * @example
 * var dest = deep(dest, objToMerge);
 *
 * @public
 *
 * @param {object} dest - Object to merge properties into.
 * @param {object} obj - Object to merge properties from.
 */
_.deep = function (dest, obj) {
  for (var k in obj) {
    var destVal = dest[k] || {};
    var objVal = obj[k];

    var isObj = _.isObject(objVal);
    var isArr = _.isArray(objVal);

    if (isObj || isArr) {
      if (isObj && !_.isObject(destVal)) { dest[k] = {}; }
      if (isArr && !_.isArray(destVal)) { dest[k] = []; }

      dest[k] = _.deep(destVal, objVal);
    } else {
      dest[k] = objVal;
    }
  }

  return dest;
};


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

return _;


});