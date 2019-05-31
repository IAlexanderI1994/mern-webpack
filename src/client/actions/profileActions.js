import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'

// get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile')
       .then(({ data }) => dispatch({ type: GET_PROFILE, payload: data }))
       .catch(err => dispatch({ type: GET_PROFILE, payload: {} }))
}

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
})

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
})