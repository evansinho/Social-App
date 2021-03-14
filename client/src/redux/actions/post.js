/* eslint-disable no-unused-vars */
import { 
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERRORS,
  UPDATE_LIKES,
} from '../constants/types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async(dispatch) => {
  try{
    const res = await axios.get('http://localhost:5000/api/posts');

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
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);

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
    const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);

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
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);

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
    await axios.delete(`http://localhost:5000/api/posts/${id}`);

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

    const res = await axios.post('http://localhost:5000/api/posts', formData, config);

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