
/**
 * IE *requires* the `filter` to be a Function otherwise it throws an Error.
 * Whereas MDN documents that NodeFilter should be an Object with an
 * `acceptNode` function.
 */

let allowsFilterFn = (function () {
  var called = false;
  var d = document;
  var n = d.createTextNode('a');
  var it = d.createNodeIterator(n, NodeFilter.SHOW_ALL, function () {
    called = true;
  }, false);
  it.nextNode();
  return called;
})();

/**
 * A ES6 Generator that traverses the child nodes within the given `Node`.
 *
 * Basically identical to the native `createNodeIterator()`, but exposed as
 * an ES6 Iterator interface.
 *
 * @param {Node} node - Range instance to iterator over selected Nodes
 * @param {Number} [whatToShow] - Bitwise OR'd list of Filter specification constants from the NodeFilter DOM interface
 * @param {NodeFilter} [filter] - An object implementing the NodeFilter interface
 * @param {Boolean} [entityReferenceExpansion] - A flag that specifies whether entity reference nodes are expanded
 * @public
 */

function* NodeIterator(node, whatToShow = NodeFilter.SHOW_ALL, filter = () => NodeFilter.FILTER_ACCEPT, entityReferenceExpansion = false) {
  if (!allowsFilterFn && 'function' === typeof filter) {
    filter = { acceptNode: filter };
  }

  let next;
  let iterator = node.ownerDocument.createNodeIterator(node, whatToShow, filter, entityReferenceExpansion);
  while (next = iterator.nextNode()) {
    yield next;
  }
}

module.exports = NodeIterator;
