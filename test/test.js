/**
 * Test dependencies.
 */

var test = require('tape')
var Readable = require('stream').Readable
var concat = require('concat-stream')
var lineup = require('..')


test('concat multiple streams together', (assert) => {
  var stream1 = stream('hello')
  var stream2 = stream('world')
  concat(lineup(stream1, stream2), (result => assert.equal(result, ['hello', 'world'])))
})

/**
 * Create readable stream
 */

function stream(str) {
  var read = new Readable
  read._read = function() {}
  setTimeout(() => read.push(str), 500)
  read.push(null)
  return read
}
