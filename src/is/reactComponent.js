/**
 * 
 * @param {Descriptor} obj 
 * @returns {boolean}
 */
function isReactComponent (obj) {
  if (typeof obj === 'function' && obj.prototype) {
    return 'isReactComponent' in obj.prototype
  }

  return false
}

module.exports = isReactComponent
