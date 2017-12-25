const describeObject = require('./object')

/**
 *
 * @param {Function} fn
 * @returns {Descriptor}
 */
function describeFunction (fn) {
  const obj = {}

  const propNames = Object.getOwnPropertyNames(fn)

  for (let propName of propNames) {
    switch (propName) {
      case 'arguments':
      case 'caller':
      case 'length':
      case 'prototype':
        break

      case 'childContextTypes':
      case 'contextTypes':
      case 'defaultProps':
      case 'displayName':
      case 'name':
      case 'propTypes':
      case 'state':
        obj[propName] = fn[propName]
        break

      default:
        !obj.statics && (obj.statics = {})
        obj.statics[propName] = fn[propName]
        break
    }
  }

  obj.render = function render () {
    return fn.call(this, this.props, this.context, this.updater)
  }

  return describeObject(obj)
}

module.exports = describeFunction
