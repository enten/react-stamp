const Start = require('start').default
const babel = require('start-babel').default
const clean = require('start-clean').default
const env = require('start-env').default
const files = require('start-files').default
const inputConnector = require('start-input-connector').default
const read = require('start-read').default
const reporter = require('start-pretty-reporter').default
const watch = require('start-watch').default
const write = require('start-write').default
const webpack = require('start-webpack').default

const start = Start(reporter())

const dev = () => start(
  env('NODE_ENV', 'development'),
  files('lib/'),
  clean(),
  files('src/**/*.js'),
  watch('src/**/*.js')((changedFiles) => start(
    inputConnector(changedFiles),
    read(),
    babel(),
    write('lib/')
  ))
)

const dist = () => {
  const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

  return start(
    env('NODE_ENV', 'production'),
    files('dist/'),
    clean(),
    webpack({
      context: __dirname,
      target: 'web',
      entry: './src/index.js',
      devtool: 'source-map',
      output: {
        path: __dirname + '/dist',
        filename: 'react-stamp.js',
        library: 'ReactStamp',
        libraryTarget: 'umd'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      plugins: [
        new UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            screw_ie8: true,
            comments: false
          },
          sourceMap: true
        })
      ]
    })
  )
}

const lib = () => start(
  env('NODE_ENV', 'production'),
  files('lib/'),
  clean(),
  files('src/**/*.js'),
  read(),
  babel(),
  write('lib/')
)

const build = () => start(
  dist,
  lib
)

module.exports = {
  build,
  dev,
  dist,
  lib,
}