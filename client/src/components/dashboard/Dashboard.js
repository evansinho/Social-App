import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount, getCurrentProfile } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth:{ user }, profile: { loading, profile }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return loading && profile === null ? <Spinner /> : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">
          Dashboard
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome { user && user.name}</p>
        { profile !== null ? 
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <div className="my-2" onClick={() => deleteAccount()}>
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"></i>
                {''}Delete My Account
            </button>
          </div>
        </Fragment> : 
        <Fragment>
          <p>You have not setup a profile yet, Please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
        </Fragment>}
      </section>
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
