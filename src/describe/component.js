/**
 *
 * @param {React.Component} obj
 * @returns {Descriptor}
 */
function describeComponent (obj) {
  const desc = {}
  const propNames = Object.getOwnPropertyNames(obj)

  for (let propName of propNames) {
    switch (propName) {
      case 'length':
        break

      case 'displayName':
        if (!desc.staticProperties) {
          desc.staticProperties = {}
        }

        const propValue = obj[propName]

        desc.staticProperties[propName] = propValue
        break

      case 'name':
        if (!desc.staticPropertyDescriptors) {
          desc.staticPropertyDescriptors = {}
        }

        const propDesc = Object.getOwnPropertyDescriptor(obj, propName)

        desc.staticPropertyDescriptors[propName] = propDesc
        break

      case 'prototype':
        const Ctor = obj.prototype.constructor

        const initializer = (options, {args, instance}) => {
          Ctor.apply(instance, args)
        }

        if (!desc.initializers) {
          desc.initializers = [initializer]
        } else {
          desc.initializers.push(initializer)
        }

        if (!desc.methods) {
          desc.methods = {}
        }

        for (
          let proto = obj.prototype;
          proto !== Object.prototype;
          proto = proto.__proto__ // eslint-disable-line no-proto
        ) {
          const protoNames = Object.getOwnPropertyNames(proto)

          for (let protoName of protoNames) {
            if (protoName in desc.methods) {
              continue
            }

            switch (protoName) {
              case 'isMounted':
              case 'replaceState':
                continue
            }

            desc.methods[protoName] = proto[protoName]
          }
        }
        break

      default:
        if (!desc.staticDeepProperties) {
          desc.staticDeepProperties = {}
        }

        desc.staticDeepProperties[propName] = obj[propName]
        break
    }
  }

  return desc
}

module.exports = describeComponent
