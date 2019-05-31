if (process.env.NODE_ENV === 'development') {
  require('babel-runtime/regenerator')
  require('webpack-hot-middleware/client?reload=true')
}

import './index.html'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

ReactDOM.render(<App/>, document.getElementById('app'))

//debugger