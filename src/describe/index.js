const describeComponent = require('./component')
const describeFunction = require('./function')
const describeObject = require('./object')
const isStamp = require('@stamp/is/stamp')
const isStampDescriptor = require('../is/stampDescriptor')
const isReactComponent = require('../is/reactComponent')

/**
 * 
 * @param {Object|Function|React.Component} obj 
 * @returns {Descriptor}
 */
function describe (obj) {
  if (isStamp(obj)) {
    return obj.compose
  }

  if (isStampDescriptor(obj)) {
    return obj
  }

  if (isReactComponent(obj)) {
    return describeComponent(obj)
  }

  if (typeof obj === 'function') {
    return describeFunction(obj)
  }

  return describeObject(obj)
}

describe.class = describeComponent
describe.function = describeFunction
describe.object = describeObject

module.exports = describe
