/**
 * Test dependencies.
 */

var test = require('tape')
var Readable = require('stream').Readable
var concat = require('concat-stream')
var lineup = require('..')
var promise = require('promises-a')


test('should concat multiple streams together', (assert) => {
  assert.plan(1)
  var stream1 = stream('hello ')
  var stream2 = stream('world!')
  var result = concat(data => assert.equal(data.toString(), 'hello world!'))
  lineup(stream1, stream2)
    .pipe(result)
})

test('should concat streams and other primitives', (assert) => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), 'hello world!'))
  lineup('hello ', stream('world'), '!')
    .pipe(result)
})


test('should concat functions', (assert) => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), 'hello world!'))
  lineup(function() {
    return 'hello'
  }, function() {
    return ' world!'
  }).pipe(result)
})

test('should concat promises', (assert) => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), 'hello world!'))
  lineup(async('hello'), async(' world!')).pipe(result)
})


test('should concat promise that fails', (assert) => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), ' world!'))
  lineup(async('hello', true), async(' world!')).pipe(result)
})

test('should concat promises that return promises', assert => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), 'hello world!'))
  lineup(async([
    async('hello '),
    async('world')
  ]), async('!')).pipe(result)
})

/**
 * Create readable stream
 */

function stream(str) {
  var read = new Readable
  read._read = function() {}
  read.push(str)
  read.push(null)
  return read
}


/**
 * Return value after 500ms using promises.
 *
 * @param  {Any} value
 * @return {Promise}
 * @api private
 */

function async(value, bool) {
  var def = promise()
  setTimeout(function() {
	   if(!bool) def.fulfill(value)
     else def.reject('error')
  }, 500)
  return def.promise
}
