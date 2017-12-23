const compose = require('@stamp/compose')
const describe = require('./describe')

function reactCompose () {
  'use strict'

  const args = [].map.call(arguments, describe)
  const Stamp = compose.apply(this, args)
  const desc = {...Stamp.compose}
  const _compose = reactCompose.bind(desc)

  Stamp.compose = Object.assign(_compose, desc)

  return Stamp
}

module.exports = reactCompose
