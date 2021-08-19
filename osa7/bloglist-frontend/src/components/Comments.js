import React,{ useState }  from 'react'
import PropTypes from 'prop-types'
import { Card, ListGroup } from 'react-bootstrap'


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
    <ListGroup variant="flush">
      {
        blog.comments.map(comment =>
          <ListGroup.Item key={comment.id}>
            {comment.content}
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}


const Comments = (props) => {

  if (!props.blog) {
    return null
  }

  return (
    <Card>
      <Card.Header>Comments</Card.Header>
      <Card.Body>
        <CommentForm {...props} />
        <CommentList {...props} />
      </Card.Body>
    </Card>
  )
}

Comments.propTypes = {
  blog: PropTypes.shape({
    comments: PropTypes.array.isRequired
  }),
  onSubmitComment: PropTypes.func.isRequired
}

export default Comments