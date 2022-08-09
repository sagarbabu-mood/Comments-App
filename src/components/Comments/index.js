import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const bgColorClass = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const comment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: bgColorClass,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, comment],
      nameInput: '',
      commentInput: '',
    }))
  }

  updateName = event => {
    this.setState({nameInput: event.target.value})
  }

  updateComment = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    console.log(commentsList)
    return (
      <>
        <div className="container">
          <h1 className="main-heading">Comments</h1>
          <div className="top-container">
            <div className="order-1">
              <p className="heading-para">
                Say Something about 4.0 Technologies
              </p>
              <form onSubmit={this.onAddComment}>
                <input
                  placeholder="Your Name"
                  className="input"
                  value={nameInput}
                  onChange={this.updateName}
                />
                <br />
                <textarea
                  rows="5"
                  placeholder="Your Comment"
                  className="input"
                  value={commentInput}
                  onChange={this.updateComment}
                />
                <br />
                <button type="submit" className="add-comment-button">
                  Add Comment
                </button>
              </form>
            </div>
            <div className="order-2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comments-image"
              />
            </div>
          </div>
          <hr className="line" />
          <div>
            <p>
              <span className="span">{commentsList.length}</span>
              Comments
            </p>
          </div>
          <ul>{this.renderCommentsList()}</ul>
        </div>
      </>
    )
  }
}

export default Comments
