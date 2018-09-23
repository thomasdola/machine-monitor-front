const path = require('path');
const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config = injectBabelPlugin('babel-plugin-transform-flow-strip-types', config);

    config.module.rules.push(
        {
            test: /\.js$/,
            loader: "babel-loader",
            include: [
                path.resolve(__dirname, 'node_modules/@mapbox'),
                path.resolve(__dirname, 'node_modules/ol-mapbox-style')
            ],
            exclude: /node_modules\/(?!(@mapbox|ol-mapbox-style)\/).*/,
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['babel-plugin-transform-flow-strip-types']
            }
        }
    );

    return config;
};