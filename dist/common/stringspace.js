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
  var val;

  this._loop(obj, key, {
    last: function (obj, parts, i) { val = obj[parts[i]]; },
    missing: function (obj, parts, i) {
      return false;
    }
  });

  return val;
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
Stringspace.prototype.set = function (obj, key, val, deep) {
  this._loop(obj, key, {
    last: function (obj, parts, i) {
      var curVal = obj[parts[i]];

      return (typeof curVal !== 'object' || !deep)
        ? (obj[parts[i]] = val)
        : (obj[parts[i]] = _.deep(curVal, val));
    },
    missing: function (obj, parts, i) {
      obj[parts[i]] = {};
    }
  });

  return val;
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
 * @param {string} key - String representing the key to remove.
 */
Stringspace.prototype.remove = function (obj, key) {
  var lastSpacer = key.lastIndexOf(':');
  var itemKey = key;
  var parent = obj;

  if (lastSpacer > 0) {
    parent = this.get(obj, key.slice(0, lastSpacer));
    itemKey = key.slice(lastSpacer + 1);
  }

  delete parent[itemKey];
};


/**
 * Helper method to recursively loop through object.
 *
 * @private
 *
 * @param {object} obj - The object to act on.
 * @param {string} key - Formatted string representing a key in
 *   the object.
 * @param {object} opts - Object containing methods on how to handle
 *   various situations encountered during loop.
 */
Stringspace.prototype._loop = function (obj, key, opts) {
  var parts = key.split(this.seperator);

  for (var i = 0, len = parts.length; i < len; i++) {
    // If last stringspace - set value
    if (len === i+1) {
      opts.last(obj, parts, i);
      return;
    }
    // If no stringspace - create & set obj to current
    if (!obj[parts[i]]) {
      if (opts.missing(obj, parts, i) === false) {
        return undefined;
      }
    }

    obj = obj[parts[i]];
  }
};


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

module.exports = Stringspace;


