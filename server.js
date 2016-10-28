const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    errorDetails: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
        ],
        loaders: [
            { test: /\.js?/, loader: 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react', exclude: /node_modules/ },
            { test: /\.css$|\.scss$|\.sass$/, loader: 'style!css?modules!sass?sourceMap' },
            { test: /\.jpg$|\.png$/, loader: 'url-loader?limit=10000' }
        ]
    }
}

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('./static'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(process.env.PORT || 3000, 'localhost', (err)=> {
    if (err) console.log(err)
    else console.log('Listening at http://localhost:3000');
})