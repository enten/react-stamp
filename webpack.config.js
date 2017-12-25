const Config = require('webpack-chain')
const {resolve} = require('path')

const R = resolve.bind(null, __dirname)

const webpackConfig = () => new Config()
  .set('name', 'dist')
  .context(R())
  .entry('index')
    .add('./src/index.js')
    .end()
  .output
    .path(R('dist'))
    .filename('react-stamp.js')
    .end()
  .devtool('source-maps')
  .module
    .rule('transpile')
      .test(/\.js$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel')
        .loader('babel-loader')
        .end()
      .end()
    .end()

const webpackConfigMin = () => webpackConfig()
  .set('name', 'dist-min')
  .output
    .filename('react-stamp.min.js')
    .end()
  .plugin('uglifyjs')
    .use(require('webpack/lib/optimize/UglifyJsPlugin'), [
      {
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
      }
    ])
    .end()

module.exports = [
  webpackConfig().toConfig(),
  webpackConfigMin().toConfig()
]