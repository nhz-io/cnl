# cnl

## CNL [![Build Status][travis-image]][travis-url]
[![NPM][npm-image]][npm-url]

## Install
```
npm install --save cnl
```

## Browser
* [cnl.js][dist-browser-js-url]
* [cnl.min.js][min-dist-browser-js-url]
* [cnl.pack.min.js][pack-min-dist-browser-js-url]

## Usage

```coffeescript
cnl = require 'cnl'
```

## Build
```
git clone https://github.com/nhz-io/cnl.git
cd cnl
npm install
gulp
```

## Benchmark
###  [JSPERF][jsperf-url]

LICENSE
-------
#### [MIT](LICENSE)

VERSION
-------
#### 0.0.15
* Added missing font setter in TextPen

#### 0.0.14
* Removed style and state from Element and Shape
* Added update to Element and removed from Shape

#### 0.0.13
* Added origin and size to Shape
* Added style method to Shape
* Added update method to Shape

#### 0.0.8
* Added Shape style

#### 0.0.6
* Added pens

#### 0.0.2
* Added structural classes

#### 0.0.1
* Initial commit

[travis-image]: https://travis-ci.org/nhz-io/cnl.svg
[travis-url]: https://travis-ci.org/nhz-io/cnl

[npm-image]: https://nodei.co/npm/cnl.png
[npm-url]: https://nodei.co/npm/cnl

[jsperf-url]: http://jsperf.com/cnl

[dist-browser-js-url]: cnl.js
[min-dist-browser-js-url]: cnl.min.js
[pack-min-dist-browser-js-url]: cnl.pack.min.js
