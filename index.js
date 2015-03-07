
/**
 * IE *requires* the `filter` to be a Function otherwise it throws an Error.
 * https://msdn.microsoft.com/en-us/library/ie/ff975301(v=vs.85).aspx
 *
 * Whereas MDN documents that NodeFilter *should* be an Object with an
 * `acceptNode` function, but that Firefox accepts a direct Function as well.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator
 */

let allowsFilterFn = (function () {
  let called = false;
  let d = document;
  let n = d.createTextNode('a');
  let it = d.createNodeIterator(n, NodeFilter.SHOW_ALL, () => called = true, false);
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
