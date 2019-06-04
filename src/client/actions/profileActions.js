import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types'

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

export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
       .then(res => history.push('/dashboard'))
       .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}