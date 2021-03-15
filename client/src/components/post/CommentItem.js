import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions/post';
import { connect } from 'react-redux';

const CommentItem = ({ postId, comment, deleteComment, auth }) => {
  return (
    <Fragment>
      <div class="post bg-white p-1 my-1">
          <div>
            <Link href={`/profile/{comment.user}`}>
              <img
                class="round-img"
                src={comment.avatar}
                alt=""
              />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {comment.text}
            </p>
             <p class="post-date">
             Posted on <Moment format='YYY/MM/DD'>{comment.date}</Moment>
            </p>
            { !auth.loading && comment.user === auth.user._id && (
                <button      
                  type="button"
                  className="btn btn-danger"
                  onClick={e => deleteComment(comment._id,postId)}
                >
                  <i className="fas fa-times"></i>
                </button>)}
          </div>
        </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);
