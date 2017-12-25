const isDescriptor = require('@stamp/is/descriptor')

const DESCRIPTOR_PROP_NAMES = [
  'composers',
  'configuration',
  'deepConfiguration',
  'deepProperties',
  'initializers',
  'methods',
  'properties',
  'propertyDescriptors',
  'staticProperties',
  'staticDeepProperties',
  'staticPropertyDescriptors'
]

/**
 *
 * @param {any} obj
 * @returns {boolean}
 */
function isStampDescriptor (obj) {
  if (isDescriptor(obj) === true) {
    for (let key in obj) {
      if (DESCRIPTOR_PROP_NAMES.indexOf(key) !== -1) {
        return true
      }
    }
  }

  return false
}

module.exports = isStampDescriptor
