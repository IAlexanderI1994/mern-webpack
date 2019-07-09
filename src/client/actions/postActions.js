import axios from 'axios'
import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_ERRORS, CLEAR_ERRORS } from './types'

// add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
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

// add like
export const addLike = id => dispatch => {
  axios
    .post(`api/posts/like/${id}`)
    .then(({ data }) => dispatch(getPosts()))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}

// remove like
export const removeLike = id => dispatch => {
  axios
    .post(`api/posts/unlike/${id}`)
    .then(({ data }) => dispatch(getPosts()))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}

// delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`api/posts/${id}`)
    .then(({ data }) => dispatch({
      type: DELETE_POST,
      payload: id
    }))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}
// get posts
export const getPosts   = () => dispatch => {

  dispatch(setPostLoading())
  axios
    .get('/api/posts',)
    .then(({ data }) => dispatch({
      type: GET_POSTS,
      payload: data
    }))
    .catch(({ response }) => dispatch({
      type: GET_POSTS,
      payload: null
    }))
}
// get post
export const getPost   = id => dispatch => {

  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${id}`,)
    .then(({ data }) => dispatch({
      type: GET_POST,
      payload: data
    }))
    .catch(({ response }) => dispatch({
      type: GET_POST,
      payload: null
    }))
}


export const setPostLoading = () => ({
  type: POST_LOADING
})


// add comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/posts/${postId}/comments/`, commentData)
    .then(({ data }) => dispatch({
      type: GET_POST,
      payload: data
    }))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}
// delete comment
export const deleteComment = (postId, commentId) => dispatch => {

  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then(({ data }) => dispatch({
      type: GET_POST,
      payload: data
    }))
    .catch(({ response }) => dispatch({
      type: GET_ERRORS,
      payload: response.data
    }))
}

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})