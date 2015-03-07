
# node-iterator

A ES6 Generator that traverses the child nodes within the given `Node`

[![Sauce Test Status](https://saucelabs.com/browser-matrix/node-iterator.svg)](https://saucelabs.com/u/node-iterator)

[![Build Status](https://travis-ci.org/webmodules/node-iterator.svg?branch=master)](https://travis-ci.org/webmodules/node-iterator)


## Installation

``` bash
$ npm install node-iterator
```

## Example

``` js
import NodeIterator from 'node-iterator';

// manual iteration
let node;
for (node of NodeIterator(document.body)) {
  console.log(node.nodeName);
}

// cast to an Array
let nodes = [...NodeIterator(document.body)];
console.log(nodes.length);
```

## License

MIT
