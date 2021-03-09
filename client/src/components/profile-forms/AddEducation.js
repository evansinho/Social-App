import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [ formData, setFormData ] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [ toDateDisabled, toggleToDateDisabled ] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onchange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
      <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => onchange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onchange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input 
            type="text" 
            placeholder="Field Of Study" 
            name="fieldofstudy" 
            value={fieldofstudy}
            onChange={e => onchange(e)} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onchange(e)} />
        </div>
         <div class="form-group">
          <p><input 
              type="checkbox" 
              name="current" 
              value={current}
              checked={current}
              onChange={e => { 
                setFormData({...formData, current: !current}); 
                toggleToDateDisabled(!toDateDisabled)
              }} 
              /> {''}Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input 
            type="date" 
            name="to" 
            value={to}
            onChange={e => onchange(e)}
            disabled={toDateDisabled ? 'disabled' : '' }
            />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={e => onchange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation));
