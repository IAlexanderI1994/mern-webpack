import { GET_ERRORS } from './types'
import axios from 'axios'
// register user

export const registerUser = (userData, history)  => dispatch => {
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