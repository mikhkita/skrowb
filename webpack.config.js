var webpack = require('webpack');
var path = require('path');

const config = {
    cache: true,
    entry: {
        app: './src/js/main.js'
    },
    output: {
        filename: 'main.js'
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')],
        extensions: ['.js', '.json', '.html'],
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            _: path.join(__dirname, './src/js/vendor/lodash.custom.min.js'),
        })
    ]
}

if (process.env.NODE_ENV == 'production') {

} else {
    config.devtool = "source-map";
}



module.exports = config