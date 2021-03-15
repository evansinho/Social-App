import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/post';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { loading, post }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  return loading || post === null ? <Spinner /> :  (
    <Fragment>
      <Link to="/posts" className="btn">Back To Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
      { post.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post);
