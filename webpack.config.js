const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

// chessboard.js doesn't provide an AMD- or CommonJS-loadable version, so we
// have to include the dist file
const chessboardjsDist = path.resolve(
    __dirname,
    'node_modules',
    '@chrisoakman',
    'chessboardjs',
    'dist'
);

const prefix = `${chessboardjsDist}/chessboard-+([0-9]).+([0-9]).+([0-9])`;
const chessboardjsEntry = glob.sync(`${prefix}.js`).pop();
const chessboardjsCss = glob.sync(`${prefix}.css`).pop();

module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            '@chrisoakman/chessboardjs$': chessboardjsEntry,
            '@chrisoakman/chessboardjs.css$': chessboardjsCss,
            img: path.resolve(__dirname, 'public/img')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-simple-chessboard.js',
        globalObject: 'this',
        library: 'Chessboard',
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
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: chessboardjsEntry,
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
