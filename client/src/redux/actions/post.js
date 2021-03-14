import { 
  GET_POSTS,
  POST_ERRORS
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