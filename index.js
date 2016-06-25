/**
 * Module dependencies
 */

var Readable = require('stream').Readable


/**
 * Concatenate multiple streams together.
 *
 * @api public
 */

module.exports = function(...args) {
  var stream = new Readable
  stream._read = function() {}
  var length = args.length
  function next(idx) {
    var child = args[idx]
    child.on('data', data => stream.push(data))
    child.on('end', () => {
      if(++idx == length) return stream.push(null);
      next(idx)
    })
  }

  next(0)
  return stream
}
