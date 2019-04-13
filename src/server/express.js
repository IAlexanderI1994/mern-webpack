import express from 'express'
import path from 'path'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import keys from '../../config/keys'

import users from './routes/api/users'
import posts from './routes/api/posts'
import profile from './routes/api/profile'

const server   = express()
const mongoose = require('mongoose')

// получаем конфиг базы
const { mongoURI: db } = keys

mongoose
  .connect(db)
  .then(() => console.log('DB connected'))
  .catch( e => console.log(e))

const compiler             = webpack(config)
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer)
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)
const staticMiddleware     = express.static('dist')

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
server.use(staticMiddleware)

// апи РОУТЫ
server.use('/api/users/', users)
server.use('/api/posts/', posts)
server.use('/api/profile/', profile)

server.listen(8080, () => {
  console.log('Listening 8080... ')
})