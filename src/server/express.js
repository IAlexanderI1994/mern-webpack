import express from 'express'
import path from 'path'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import keys from '../../config/keys'
import mongoose from 'mongoose'
import users from './routes/api/users'
import posts from './routes/api/posts'
import profile from './routes/api/profile'
import bodyParser from 'body-parser'


const server   = express()


// Body parser middleware (for post requests handling )
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// getting db config
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

// API Routes
server.use('/api/users/', users)
server.use('/api/posts/', posts)
server.use('/api/profile/', profile)

server.listen(8080, () => {
  console.log('Listening 8080... ')
})