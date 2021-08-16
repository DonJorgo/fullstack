import React,{ useState }  from 'react'
import PropTypes from 'prop-types'


const CommentForm = ({ onSubmitComment }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmitComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={comment} onChange={({ target }) => setComment(target.value)}/>
      <button id="submitNewComment" type="submit">add comment</button>
    </form>
  )
}


const CommentList = ({ blog }) => {
  if (!blog.comments){
    return null
  }

  return (
    <ul>
      {
        blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )
      }
    </ul>
  )
}


const Comments = (props) => {

  if (!props.blog) {
    return null
  }

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm {...props} />
      <CommentList {...props} />
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.shape({
    comments: PropTypes.array.isRequired
  }),
  onSubmitComment: PropTypes.func.isRequired
}

export default Comments