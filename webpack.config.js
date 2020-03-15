const path = require('path');
const ModuleWrapperPlugin = require('./moduleWrapperPlugin');
module.exports = {
  entry: {
    a: './src/a.js', 
    b: './src/b.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: `sub-[name]`
  },
  plugins: [
    new ModuleWrapperPlugin()
  ]
};