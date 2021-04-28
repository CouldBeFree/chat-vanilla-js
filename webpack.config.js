const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    lib: './src/lib'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'Management',
      minify: false
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
}
