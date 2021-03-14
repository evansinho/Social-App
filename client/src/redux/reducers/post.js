/* eslint-disable import/no-anonymous-default-export */
import { 
  GET_POSTS,
  POST_ERRORS
 } from '../constants/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action; 
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case POST_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
