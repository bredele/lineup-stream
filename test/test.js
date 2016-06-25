/**
 * Test dependencies.
 */

var test = require('tape')
var Readable = require('stream').Readable
var concat = require('concat-stream')
var lineup = require('..')


test('concat multiple streams together', (assert) => {
  assert.plan(1)
  var stream1 = stream('hello')
  var stream2 = stream('world')
  var result = concat(data => {
    assert.equal(data.toString(), 'helloworld')
  });
  lineup(stream1, stream2)
    .pipe(result)
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
