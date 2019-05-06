const path              = require('path')
const webpack           = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports          = {
  entry: {
    main: './src/client/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // отображение пути при подключении файла, например, вместо dist/index.js будет /index.js, если publicPath: '/'
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    // при запуске дев сервера будет мониториться эта папка
    contentBase: 'dist',
    overlay: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]

      },
      {
        test: /\.html$/,
        use: [
          // обработка html
          {
            loader: 'html-loader',
          },

        ]
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]

      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/client/index.html'
    })

  ]
}