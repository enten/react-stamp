const compose = require('./compose')

const ReactStamp = compose({
  staticProperties: {
    compose
  },
  staticPropertyDescriptors: {
    name: {
      value: 'ReactStamp'
    }
  }
})

module.exports = ReactStamp
