/**
 * Webpack config to convert chessboard.js into a UMD module so it can be loaded
 * with import/require.
 */

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

// chessboard.js doesn't provide an AMD- or CommonJS-loadable version, so we
// have to include the dist file
const dist = path.resolve(
    __dirname,
    'node_modules',
    '@chrisoakman',
    'chessboardjs',
    'dist'
);

const entry = glob.sync(
    `${dist}/chessboard-+([0-9]).+([0-9]).+([0-9]).js`
).pop();

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chessboard.js',
        globalObject: 'this',
        library: 'ChessboardJS',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery'
        })
    ],
    externals: {
        react: {
            amd: 'react',
            commonjs: 'react',
            commonjs2: 'react',
            root: 'React'
       },
       jquery: {
            amd: 'jquery',
            commonjs: 'jquery',
            commonjs2: 'jquery',
            root: 'jQuery'
       }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: entry,
                loader: 'exports-loader',
                options: {
                    exports: {
                        syntax: 'default',
                        name: 'window.Chessboard'
                    }
                }
            }
        ]
    }
};
