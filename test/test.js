
var assert = require('assert');
var NodeIterator = require('../');

describe('node-iterator', function () {

  var div = document.createElement('div');
  div.style.display = 'none';
  document.body.appendChild(div);

  after(function () {
    // clean up
    document.body.removeChild(div);
  });

  it('should return an ES6 Iterator', function () {
    div.innerHTML = 'hello world';

    var next;
    var iterator = NodeIterator(div);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.ELEMENT_NODE, next.value.nodeType);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('hello world', next.value.nodeValue);

    next = iterator.next();
    assert.equal(true, next.done);
  });

  it('should allow only selecting TextNodes', function () {
    div.innerHTML = 'hello world';

    var next;
    var iterator = NodeIterator(div, NodeFilter.SHOW_TEXT);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('hello world', next.value.nodeValue);

    next = iterator.next();
    assert.equal(true, next.done);
  });

});
