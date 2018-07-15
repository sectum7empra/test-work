var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var BabiliPlugin = require('babel-preset-babili');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs-extra')
var hash = Date.now();
var plugins = [
    new ExtractTextPlugin('css/app.' + hash +'.css')
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify('5fa3b9'),
    }));
    plugins.push(new UglifyJsPlugin);
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: false,
        mangle: false,
    }));
}
module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'resources', 'assets', 'js', 'app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'js/app.' + hash + '.js',
        publicPath: '/public/'
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'], // todo add eslint loader

            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    // fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ]
                            }
                        }]
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return 'images/[name].[ext]?[hash]';
                                }

                                return 'images/vendor/' + path
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                    ) + '?[hash]';
                            },
                            publicPath: '/public/'
                        }
                    },

                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {},
                            mozjpeg: {},
                            optipng: {},
                            svgo: {}
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (!/node_modules|bower_components/.test(path)) {
                            return 'fonts/[name].[ext]?[hash]';
                        }

                        return 'fonts/vendor/' + path
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                            ) + '?[hash]';
                    },
                    publicPath: '/public/'
                }
                // loaders: ['style-loader', 'css-loader', 'sass-loader']
            }

        ],

    }
};

(async () => {
    try {
        await fs.ensureDir(path.join('public'));
        await fs.ensureFile(path.join('public') + '/mix-manifest.json');
        await fs.outputJson(path.join('public') + '/mix-manifest.json', {
            "/js/app.js": "js/app." + hash + ".js",
            "/css/app.css": "css/app." + hash + ".css"
        });
        console.log('Manifest file successfully created.')
    } catch (error) {
        console.error(error)
    }
})();
