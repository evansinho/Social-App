/* eslint-disable no-unused-vars */
import { 
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERRORS,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from '../constants/types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async(dispatch) => {
  try{
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const getPost = (id) => async(dispatch) => {
  try{
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const addLike = (id) => async(dispatch) => {
  try{
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data}
    })

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const removeLike = (id) => async(dispatch) => {
  try{
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data}
    })

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const deletePost = (id) => async(dispatch) => {
  try{
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    })

    dispatch(setAlert('Post Removed', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const addPost = (formData) => async(dispatch) => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Created', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const addComment = ( postId, formData ) => async(dispatch) => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Added', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const deleteComment = (commentId, postId) => async(dispatch) => {
  try{
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Removed', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};
