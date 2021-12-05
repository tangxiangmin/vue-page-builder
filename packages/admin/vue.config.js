
let publicPath = '/'

module.exports = {
  publicPath,
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    overlay: false
  }
}
