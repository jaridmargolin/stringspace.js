(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Stringspace'] = factory();
  }
}(this, function () {

/*!
 * isObject.js
 * 
 * Copyright (c) 2014
 */
var utlIsObject, utlIsArray, utlCompanionDeepMerge, utils, stringspace;
utlIsObject = function (value) {
  return value === Object(value);
};
/*!
 * isArray.js
 * 
 * Copyright (c) 2014
 */
utlIsArray = function (value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};
/*!
 * deepMerge.js
 * 
 * Copyright (c) 2014
 */
utlCompanionDeepMerge = function (isArray, isObject) {
  /* -----------------------------------------------------------------------------
   * deepMerge
   * ---------------------------------------------------------------------------*/
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
  var deepMerge = function (dest, obj) {
    for (var k in obj) {
      var destVal = dest[k] || {};
      var objVal = obj[k];
      var isObj = isObject(objVal);
      var isArr = isArray(objVal);
      if (isObj || isArr) {
        if (isObj && !isObject(destVal)) {
          dest[k] = {};
        }
        if (isArr && !isArray(destVal)) {
          dest[k] = [];
        }
        dest[k] = deepMerge(destVal, objVal);
      } else {
        dest[k] = objVal;
      }
    }
    return dest;
  };
  /* -----------------------------------------------------------------------------
   * deepMerge
   * ---------------------------------------------------------------------------*/
  return deepMerge;
}(utlIsArray, utlIsObject);
/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */
utils = function (isObject, deepMerge) {
  /* -----------------------------------------------------------------------------
   * utils
   * ---------------------------------------------------------------------------*/
  return {
    isObject: isObject,
    deepMerge: deepMerge
  };
}(utlIsObject, utlCompanionDeepMerge);
/*!
 * stringspace.js
 * 
 * Copyright (c) 2014
 */
stringspace = function (_) {
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
    var key = result.key;
    var shouldMerge = _.isObject(curVal) && deep;
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
    var key = result.key;
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
      var val = obj[key];
      var isLast = len === i + 1;
      var isUndf = !val && !create;
      if (isLast || isUndf) {
        return {
          key: key,
          val: val,
          parent: obj
        };
      }
      obj = obj[key] = val || {};
    }
  };
  /* -----------------------------------------------------------------------------
   * export
   * ---------------------------------------------------------------------------*/
  return Stringspace;
}(utils);

return stringspace;


}));