
const path = require('path'); 
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    /* Frontend */
    {
		/**
		 * default entry folder is ./src
		 */
		entry: {
            bundle: [path.resolve( __dirname, 'src/render/main.js' )],
		},

		/**
		 * default output folder is ./dist
		 */
		output: { 
			path: path.resolve( __dirname, 'build' ),
            filename: '[name].js' /* name: entry's key(bundle) */
		},

		/**
		 * webpack provide target compiler environment，default is web
		 */
		target: 'electron-renderer', 

		plugins: [
            /* CopyWebpackPlugin: plugin for copy file*/
			new CopyWebpackPlugin([
				{ from: path.resolve( __dirname, 'src/render/html' ), to: 'html' },
				{ from: path.resolve( __dirname, 'src/render/lib' ), to: 'lib' },
				{ from: path.resolve( __dirname, 'src/assets' ), to: 'assets' }
            ])
		],

		module: {
            rules: [
                /* need to set .babelrc config */
                {
					test: /\.(js|jsx)?$/,
					exclude: /(node_modules|bower_components)/, // ignore folder
					loader: 'babel-loader'
				},
                {   
                    test: /\.css?$/, 
                    loader: 'css-loader'
				},
				{   
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					// use: 'url-loader?limit=1024&name=[path][name].[hash:10].[ext]&outputPath=img/&publicPath=output/',
                    use: [
						{
							loader: 'file-loader',
							options: {
								
								/**
								 * name: img original name
								 * hash: hash value length is 10，default is 32
								 * ext: img ext name
								 * 
								 * source code(in SimpleCard.jsx):
								 * let imgURL = require('../../../assets/mars.png')
								 * 
								 * after webpack:
								 * img will copy to build/img/[name].[hash:10].[ext]
								 */
								name: 'assets/[name].[hash:10].[ext]',
								publicPath: path.resolve( __dirname, 'build' )
							}
						}
					]
                },
            ]
        },
        resolve: {
			
			/* import or require don't need ext file name */
			extensions: [ '.js', '.jsx' ],

			/**
			 * create aliases to import or require certain modules more easily
			 * Ex: 
			 * alias Lib: './path/to/lib/'
			 * Import lib from 'Lib/aaa/bbb' equal ./path/to/lib/aaa/bbb 
			 */
			alias: {
				Components: path.resolve(__dirname, 'src/render/js/components/'),
				Assets: path.resolve(__dirname, 'src/assets/')
			}

        },
    },
    
    /* Backend */
    {
		entry: {
            'main': [path.resolve( __dirname, 'src/core/main.js' )]
		},
		output: {
            path: path.resolve( __dirname, 'build' ),
			filename: '[name].js'
		},
		target: 'electron-main',

		// tell webpack don't bundle up node_modules to output file
		externals: [nodeExternals()],
		module: {
            rules: [
                {
					test: /\.js?$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader'
				},
                {
					test: /\.json?$/,
					loader: 'json-loader'
				},
            ]
		},
		resolve: {
			extensions: [ '.js' ],
        },
    },
   
]
