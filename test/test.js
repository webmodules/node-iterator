
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

  it('should allow only selecting TextNodes and BR elements', function () {
    div.innerHTML = 'hello<br>world';

    var next;
    var iterator = NodeIterator(div, NodeFilter.SHOW_ALL, function (node) {
      return node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR';
    });

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('hello', next.value.nodeValue);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.ELEMENT_NODE, next.value.nodeType);
    assert.equal('BR', next.value.nodeName);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('world', next.value.nodeValue);

    next = iterator.next();
    assert.equal(true, next.done);
  });

  it('should allow passing a NodeFilter function as 2nd parameter', function () {
    div.innerHTML = 'hello<br>world';

    var next;
    var iterator = NodeIterator(div, function (node) {
      return node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR';
    });

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('hello', next.value.nodeValue);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.ELEMENT_NODE, next.value.nodeType);
    assert.equal('BR', next.value.nodeName);

    next = iterator.next();
    assert.equal(false, next.done);
    assert.equal(Node.TEXT_NODE, next.value.nodeType);
    assert.equal('world', next.value.nodeValue);

    next = iterator.next();
    assert.equal(true, next.done);
  });

});
