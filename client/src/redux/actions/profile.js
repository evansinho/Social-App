import { 
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR, 
  UPDATE_PROFILE,
  DELETE_ACCOUNT
} from '../constants/types';
import { setAlert } from './alert';
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

export const createProfile = (formData, history, edit=false) => async(dispatch) => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('http://localhost:5000/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;

    if ( errors ) errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    console.log(err)
     
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const addExperience = (formData, history) => async(dispatch) => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('http://localhost:5000/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;

    if ( errors ) errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    console.log(err)
     
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const addEducation = (formData, history) => async(dispatch) => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('http://localhost:5000/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;

    if ( errors ) errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    console.log(err)
     
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const deleteExperience = (id) => async(dispatch) => {
  try{
    const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Deleted', 'success'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const deleteEducation = (id) => async(dispatch) => {
  try{
    const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Deleted', 'success'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

export const deleteAccount = () => async(dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try{
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete('http://localhost:5000/api/profile');
  
      dispatch({type: CLEAR_PROFILE})

      dispatch({type: DELETE_ACCOUNT})
  
      dispatch(setAlert('Your account has been permanently deleted'));
  
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
      })
    }
  }
};
