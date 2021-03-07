import { 
  GET_PROFILE,
  PROFILE_ERROR 
} from '../constants/types';
//import { setAlert } from './alert';
import axios from 'axios';

export const getCurrentProfile = () => async(dispatch) => {
  try{
    const res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};
