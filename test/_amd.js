/*!
 * test/_amd.js
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

describe('amd - stringspace.js', function () {

  it('Should create a new instance.', function () {
    var stringspace = new Stringspace();
    assert.isInstanceOf(stringspace, Stringspace);
  });

});


});