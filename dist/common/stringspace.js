/*!
 * stringspace.js
 * 
 * Copyright (c) 2014
 */

var _ = require('./utils');


/* -----------------------------------------------------------------------------
 * Stringspace
 * ---------------------------------------------------------------------------*/

/**
 * Utility for getting and setting stringspace properties that may
 * or may not already exist.
 *
 * @example
 * var stringspace = new Stringspace();
 *
 * @constructor
 * @public
 *
 * @param {string} seperator - Key seperator.
 */
var Stringspace = function (seperator) {
  this.seperator = seperator || '.';
};

/**
 * Get an object prop by string stringspace.
 *
 * @example
 * stringspace.get(obj, 'nested:key');
 *
 * @public
 *
 * @param {object} obj - The object to retrieve data from.
 * @param {string} key - Formatted string representing a key in
 *   the object.
 */
Stringspace.prototype.get = function (obj, key) {
  return this._get(obj, key).val;
};

/**
 * Set an object prop by string stringspace.
 *
 * @example
 * stringspace.set(obj, 'nested:key', 'value');
 *
 * @public
 *
 * @param {object} obj - The object to add data to.
 * @param {string} key - Formatted string representing a key in
 *   the object.
 * @param {*} val - Value of the specified key.
 * @param {boolean} deep - Indicated if conflicts should be reserved
 *   with a deep merge or an overwrite.
 */
Stringspace.prototype.set = function (obj, keyStr, val, deep) {
  var result = this._get(obj, keyStr, true);
  var curVal = result.val;
  var parent = result.parent;
  var key    = result.key;

  var shouldMerge  = _.isObject(curVal) && deep;

  parent[key] = shouldMerge ? _.deepMerge(curVal, val) : val;
  return parent[key];
};

/**
 * Remove value from obj
 *
 * @example
 * strspc.remove('nested');
 *
 * @public
 *
 * @param {object} obj - The object to remove value from.
 * @param {string} keyStr - String representing the key to remove.
 */
Stringspace.prototype.remove = function (obj, keyStr) {
  var result = this._get(obj, keyStr);
  var parent = result.parent;
  var key    = result.key;

  delete parent[key];
};

/**
 * Helper method to recursively loop through object.
 *
 * @private
 *
 * @param {object} obj - The object to act on.
 * @param {string} keyStr - Formatted string representing a key in
 *   the object.
 * @param {object} create - Flag for if we should create an empty object
 *   when an undefined property is found.
 */
Stringspace.prototype._get = function (obj, keyStr, create) {
  var parts = keyStr.split(this.seperator);

  for (var i = 0, len = parts.length; i < len; i++) {
    var key = parts[i];
    var val  = obj[key];

    var isLast = len === i + 1;
    var isUndf = !val && !create;

    if (isLast || isUndf) {
      return { key: key, val: val, parent: obj };
    }

    obj = obj[key] = val || {};
  }
};


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

module.exports = Stringspace;


