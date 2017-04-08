# Lineup-stream

[![Build Status](https://travis-ci.org/bredele/lineup-stream.svg?branch=master)](https://travis-ci.org/bredele/lineup-stream)
[![NPM](https://img.shields.io/npm/v/lineup-stream.svg?style=flat-square)](https://www.npmjs.com/package/lineup-stream)
[![Downloads](https://img.shields.io/npm/dm/lineup-stream.svg?style=flat-square)](http://npm-stat.com/charts.html?package=lineup-stream)
[![pledge](https://bredele.github.io/contributing-guide/community-pledge.svg)](https://github.com/bredele/contributing-guide/blob/master/community.md)

Lineup stream allows you to combine multiple streams, primitives and promises into a single stream. When the first stream of data ends, the next one starts, and so on, until all buffers are passed.


## Usage

```js
const line = require('lineup-stream')
const fs = require('fs')

line(
  fs.createReadStream(__dirname + '/hello.txt'),
  'world and ',
  fs.createReadStream(__dirname + '/lorem.txt')
).pipe(process.stdout)
```

You also can lazily create buffers of data by wrapping them in a function and/or promises.

```js
line(
  ()=> fs.createReadStream(__dirname + '/hello.txt'),
  () => 'world'.
  new Promise(resolve => {
    setTimeout(() => resolve('something'), 2000)
  })
).pipe(process.stdout)
```


## Installation

```shell
npm install lineup-stream --save
```

[![NPM](https://nodei.co/npm/lineup-stream.png)](https://nodei.co/npm/lineup-stream/)

## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

Lineup-stream is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">guideline</a> before making a pull request. If you have any lineup-stream related project, component or other let everyone know in our wiki.


## Licence

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
