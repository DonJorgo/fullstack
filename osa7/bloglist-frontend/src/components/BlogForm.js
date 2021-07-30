import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ onSubmit }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()

    dispatch(createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id="submitNewBlog" type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm