var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: path.join(__dirname, "./entry.js"),
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
}