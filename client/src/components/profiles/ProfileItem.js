import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile }) => {
  return (
    <Fragment>
      <div class="profile bg-light">
        <img
          class="round-img"
          src={profile.user.avatar}
          alt="avartar"
        />
        <div>
          <h2>{profile.user.name}</h2>
          <p>{profile.status} { profile.company && <span>at {profile.comapany}</span>}</p>
          <p>{profile.location && <span>at {profile.location}</span> }</p>
          <Link to={`/profile/${profile.user._id}`} class="btn btn-primary">View Profile</Link>
        </div>
        <ul className="list-group">
          {profile.skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="list-group-item">
              <i className="fa fa-check pr-1" />
                {skill}
            </li>
            ))}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem;
