/**
 * 
 * @param {Object} obj 
 * @returns {Descriptor}
 */
function describeObject (obj) {
  const desc = {}

  const {
    childContextTypes,
    contextTypes,
    defaultProps,
    displayName,
    init,
    name,
    propTypes,
    state,
    statics,
    ...methods
  } = obj

  init && (desc.initializers = [
    (options, {args, instance}) => {
      init.apply(instance, args)
    }
  ])

  if (name || displayName) {
    name && (desc.staticPropertyDescriptors = {name: {value: name}})
    displayName && (desc.staticProperties = {displayName})
  }

  if (statics) {
    desc.staticDeepProperties = {...statics}
  } else if (propTypes || defaultProps || contextTypes || childContextTypes) {
    desc.staticDeepProperties = {}
  }

  childContextTypes && (desc.staticDeepProperties.childContextTypes = childContextTypes)
  contextTypes && (desc.staticDeepProperties.contextTypes = contextTypes)
  defaultProps && (desc.staticDeepProperties.defaultProps = defaultProps)
  propTypes && (desc.staticDeepProperties.propTypes = propTypes)

  state && (desc.deepProperties = {state})
  methods && (desc.methods = methods)

  return desc
}

module.exports = describeObject
