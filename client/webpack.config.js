const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'Webpack Plugin'
            }),
            new WorkboxPlugin.GenerateSW(),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js'
            }),
            new WebpackPwaManifest({
                name:'Just Another Text Editor',
                short_name:'JATE',
                description: 'A free online text editor',
                background_color: '#ffffff',
                theme_color: '#000000',
                start_url: './',
                publicPath: './',
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96,192,512],
                        destination: path.join('assets','icons')
                    }
                ],
                prefer_related_applications: true,
                related_applications: [
                  {
                    platform: "play",
                    id: "myId"
                  }
                ]
            })
      
    ],

    module: {
      rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test:/\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modulues|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
        
      ],
    },
  };
};
