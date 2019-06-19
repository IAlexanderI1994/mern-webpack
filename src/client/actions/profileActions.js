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

export const createProfile    = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
       .then(res => history.push('/dashboard'))
       .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}
export const deleteAccount    = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios.delete('/api/profile')
         .then(res => dispatch({ type: 'SET_CURRENT_USER', payload: {} }))
         .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
  }
}
// add experience
export const addExperience    = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}
export const addEducation     = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}
// Delete experience
export const deleteExperience = (id) => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}
// Delete education
export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(({ response }) => dispatch({ type: GET_ERRORS, payload: response.data }))
}



