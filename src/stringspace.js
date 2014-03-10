/*!
 * stringspace.js
 * 
 * Copyright (c) 2013
 */

define(function () {


// ----------------------------------------------------------------------------
// Stringspace
//
// Utility for getting and setting stringspace properties that may or may not
// already exist.
// ----------------------------------------------------------------------------

//
// Stringspace - initialize and pass in opts to extend
//
var Stringspace = function (opts) {
  _.extend(this, {
    seperator: '.'
  }, opts);
};

//
// Get an object prop by string stringspace
//
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

//
// Set an object prop by string stringspace
//
Stringspace.prototype.set = function (obj, key, val) {
  this._loop(obj, key, {
    last: function (obj, parts, i) { obj[parts[i]] = val;  },
    missing: function (obj, parts, i) { obj[parts[i]] = {}; }
  });

  return val;
};

//
// Loop over stringspaced string
//
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


// ----------------------------------------------------------------------------
// Expose
// ----------------------------------------------------------------------------
return Stringspace;


});