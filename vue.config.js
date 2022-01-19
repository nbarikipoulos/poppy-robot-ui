module.exports = {
  productionSourceMap: false,
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      fallback: {
        dns: false
      }
    }
  }
}
