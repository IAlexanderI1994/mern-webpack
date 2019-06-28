import axios from 'axios'
import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_ERRORS } from './types'

// add post
export const addPost = postData => dispatch => {
  axios
    .post('api/posts', postData)
    .then(({ data }) => dispatch({
      type: ADD_POST,
      payload: data
    }))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}