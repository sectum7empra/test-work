
let mix = require('laravel-mix');
/*mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules(?!\/foundation-sites)|bower_components/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react',
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari 7"]
                                },
                                "debug": true
                            }]
                        ],
                        "plugins": [
                            ["transform-runtime", {
                                "helpers": false,
                                "polyfill": false,
                                "regenerator": true,
                                "moduleName": "babel-runtime"
                            }],
                            "transform-class-properties"
                        ]
                    }
                }
            }
        ]
    }
});*/
mix.options({ processCssUrls: false });
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
/*
 mix.js('public/js6/app.js', 'public/js')
     .sass('resources/assets/sass/app.scss', 'public/css');
*/
