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
    var bool = ++idx == length
    if(isStream(child)) {
      child.on('data', data => stream.push(data))
      child.on('end', () => {
        if(bool) return stream.push(null)
        next(idx)
      })
    } else {
      stream.push(transform(child))
      if(bool) return stream.push(null)
      next(idx)
    }
  }
  next(0)
  return stream
}


function transform(value) {
  if(typeof value === 'function') value = value()
  return value
}

/**
 * Return true is stream
 *
 * @param {Any} value
 * @return {Boolean}
 * @api private
 */

function isStream(value) {
  return value && (typeof value.pipe === 'function')
}
