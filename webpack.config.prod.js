var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve : {
        extensions : ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
        ],
        loaders: [
            { test: /\.js?/, loader: 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react', exclude: /node_modules/ },
            { test: /\.css$|\.scss$|\.sass$/, loader: 'style!css?modules!sass?sourceMap'},
            { test: /\.jpg$|\.png$/, loader: 'url-loader?limit=10000' }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};
