import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import PrivateRoute from './components/common/PrivateRoute'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { Footer } from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'

import './App.css'

// check for token

if (localStorage.jwtToken) {
  // set auth token
  setAuthToken(localStorage.jwtToken)
  // decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // check for  expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }

}

export class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profiles" component={Profiles}/>

              <PrivateRoute exact path="/dashboard" component={Dashboard}/>

              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>


              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>


              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>


            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>

    )

  }
}