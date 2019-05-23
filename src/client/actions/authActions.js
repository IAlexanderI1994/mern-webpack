import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users/register', userData)
    .then(({ data: user }) => history.push('/login'))
    .catch(e => {
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      })
    })
}

// Login - get user token

export const loginUser = (userData) => dispatch => {

  axios.post('api/users/login', userData)
       .then(({ data }) => {
         // save to local storage
         const { token } = data
         localStorage.setItem('jwtToken', token)
         // set token to auth header
         setAuthToken(token)
         // decode token to get user data
         const decoded = jwt_decode(token)
         // set current user
         dispatch(setCurrentUser(decoded))

       })
       .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }))
}

// set current user

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
})

// log user out

export const logoutUser = () => dispatch => {
  // remove token form local storage
  localStorage.removeItem('jwtToken')
  // remove auth header
  setAuthToken(false)
  // set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}))
}