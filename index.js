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
    if(typeof child === 'function') child = child()
    if(typeof child.then === 'function') {
      child.then(data => {
        stream.push(data)
        if(bool) return stream.push(null)
        next(idx)
      }, err => {
        if(bool) return stream.push(null)
        next(idx)
      })
    } else if(typeof child.on === 'function') {
      child.on('data', data => stream.push(data))
      child.on('end', () => {
        if(bool) return stream.push(null)
        next(idx)
      })
    } else {
      stream.push(child)
      if(bool) return stream.push(null)
      next(idx)
    }
  }
  next(0)
  return stream
}
