var nodeExternals = require('webpack-node-externals');

module.exports = {
  output: {
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "cheap-module-source-map",
  module: {
    preLoaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
    ],
    loaders: [
      { test: /\.js?/, loader: 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react', exclude: /node_modules/ },
      { test: /\.css$|\.scss$|\.sass$/, loader: 'style!css?modules!sass?sourceMap' },
      { test: /\.jpg$|\.png$/, loader: 'url-loader?limit=10000' }
    ]
  },
};
