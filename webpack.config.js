const path = require('path')

module.exports = {
  /*
   ** for WebStorm
   */
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
