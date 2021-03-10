import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';

const Profile = ({auth, profile: { profile, loading }, getProfileById, match}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return profile === null || loading ? <Spinner /> : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
      { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
        <Link to='/edit-profile' className="btn btn-dark"> Edit Profile </Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile}/>
        <ProfileAbout profile={profile}/>
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience.length < 0 ? <Fragment>No Experience Credentials</Fragment>: (
            <Fragment>
              { profile.experience.map(exp => (
              <div key={exp._id}>
                <h3 class="text-dark">{exp.comapany}</h3>
                <p>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                  {exp.to === null ? (
                    ' Now'
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </p>
                <p><strong>Position: </strong>{exp.title}</p>
                <p>
                  <strong>Description: </strong>{exp.description && exp.description}
                </p>
              </div>
            ))}
            </Fragment>
          )}
        </div>

        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          { profile.education.length < 0 ? <Fragment>No Education Credentials</Fragment>: (
            <Fragment>
              { profile.education.map(edu => (
              <div key={edu._id}>
                <h3>{edu.school}</h3>
                <p>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (
                      ' Now'
                    ) : (
                      <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                  </p>
                <p><strong>Degree: </strong>{edu.degree}</p>
                <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                  <strong>Description: </strong>{edu.description && edu.description}
                </p>
              </div>
          ))}
            </Fragment>
          )}
        </div>
        { profile.githubusername && (
          <ProfileGithub username={profile.githubusername}/>
        )}
      </div>
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile);
