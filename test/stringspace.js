/*!
 * test/stringspace.js
 * 
 * Copyright (c) 2014
 */

define([
  'underscore',
  'proclaim',
  'stringspace'
], function (_, assert, Stringspace) {


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

// Namespace instance
var strspc = new Stringspace();

// Base object to extend from
var base = {
  prop: 'val',
  nested: {
    attr: 'str',
    params: { name: 'name' }
  }
};

// Common values
var nameStr = 'nested.params.name',
    descStr = 'nested.params.desc',
    attrStr = 'nested.attr',
    ageStr  = 'nested.params.meta.age';

// Object to manipulte each time
var obj;


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('stringspace', function () {

  // Reset object to base before each test
  beforeEach(function () {
    obj = _.extend({}, base);
  });

  /* ---------------------------------------------------------------------------
   * constructor
   * -------------------------------------------------------------------------*/

  describe('constructor', function () {

    it('Should mixin options', function () {
      var strspc = new Stringspace(':');
      assert.equal(strspc.seperator, ':');
    });

  });


  /* ---------------------------------------------------------------------------
   * get
   * -------------------------------------------------------------------------*/

  describe('get', function () {

    it('Should return specified property', function () {
      assert.equal(strspc.get(obj, nameStr), 'name');
    });

    it('Should return undefined if property does not exist', function () {
      assert.equal(typeof strspc.get(obj, descStr), 'undefined');
    });

  });


  /* ---------------------------------------------------------------------------
   * set
   * -------------------------------------------------------------------------*/

  describe('set', function () {

    it('Should set value for specified property', function () {
      strspc.set(obj, attrStr, 'value');
      assert.equal(obj.nested.attr, 'value');
    });

    it('Should create empty stringspace objects if necessary', function () {
      strspc.set(obj, ageStr, 23);
      assert.equal(obj.nested.params.meta.age, 23);
    });
    
    it('Should return value set', function () {
      var value = strspc.set(obj, ageStr, 23);
      assert.equal(value, 23);
    });

  });

});


});