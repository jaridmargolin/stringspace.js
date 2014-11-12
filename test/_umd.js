/*!
 * test/_umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'stringspace/stringspace'
], function (assert, Stringspace) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - stringspace.js', function () {

  it('Should create a new instance.', function () {
    var stringspace = new Stringspace();
    assert.isInstanceOf(stringspace, Stringspace);
  });

});


});