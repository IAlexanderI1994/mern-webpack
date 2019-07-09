import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteComment } from '../../actions/postActions'
import CommentFeed from './CommentFeed'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => ({

  deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))

})

class CommentItem extends Component {

  onDeleteClick (postId, commentId) {
    this.props.deleteComment(postId, commentId)
  }

  render () {
    const { comment, postId, auth } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/feed">
              <img className="rounded-circle d-none d-md-block"
                   src={comment.avatar} alt=""/>
            </Link>
            <br/>
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ?
              (<button type="button" className="btn btn-danger mr-1"
                       onClick={this.onDeleteClick.bind(this, postId, comment._id)}>
                <i className="fas fa-times"/>
              </button>) : null

            }
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem)