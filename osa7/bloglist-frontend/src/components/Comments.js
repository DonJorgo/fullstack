import React  from 'react'
import PropTypes from 'prop-types'

const Comments = ({ blog }) => {

  if (!blog || !blog.comments) {
    return null
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {
          blog.comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )
        }
      </ul>
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.shape({
    comments: PropTypes.array.isRequired
  })
}

export default Comments