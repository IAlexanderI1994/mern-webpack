import path from 'path'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import keys from '../../config/keys'

import express from 'express'
import fallback from 'express-history-api-fallback'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportConfig from '../../config/passport'

import users from './routes/api/users'
import posts from './routes/api/posts'
import profile from './routes/api/profile'

const server = express()

// Body parser middleware (for post requests handling )
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// getting db config
const { mongoURI: db } = keys

mongoose
  .connect(db, { useFindAndModify: false, useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e))

// passport middleware
server.use(passport.initialize())

passportConfig(passport)

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

//server.use(fallback('index.html', { root: path.resolve(__dirname, '../../dist') }))

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'))
})

server.listen(8080, () => {
  console.log('Listening 8080... ')
})
