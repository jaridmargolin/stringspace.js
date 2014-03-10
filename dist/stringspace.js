(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['underscore'], factory);
    }
    else {
        root['stringspace'] = factory(root.underscore);
    }
}(this, function(underscore) {

  /*!
   * stringspace.js
   * 
   * Copyright (c) 2013
   */
  var stringspace = function () {
      var Stringspace = function (opts) {
        _.extend(this, { seperator: '.' }, opts);
      };
      Stringspace.prototype.get = function (obj, key) {
        var val;
        this._loop(obj, key, {
          last: function (obj, parts, i) {
            val = obj[parts[i]];
          },
          missing: function (obj, parts, i) {
            return false;
          }
        });
        return val;
      };
      Stringspace.prototype.set = function (obj, key, val) {
        this._loop(obj, key, {
          last: function (obj, parts, i) {
            obj[parts[i]] = val;
          },
          missing: function (obj, parts, i) {
            obj[parts[i]] = {};
          }
        });
        return val;
      };
      Stringspace.prototype._loop = function (obj, key, opts) {
        var parts = key.split(this.seperator);
        for (var i = 0, len = parts.length; i < len; i++) {
          if (len === i + 1) {
            opts.last(obj, parts, i);
            return;
          }
          if (!obj[parts[i]]) {
            if (opts.missing(obj, parts, i) === false) {
              return undefined;
            }
          }
          obj = obj[parts[i]];
        }
      };
      return Stringspace;
    }();
  

  return stringspace;

}));
