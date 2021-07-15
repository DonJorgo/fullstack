import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> renders name and author but not by default url or likes ', () => {
  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'http://localhost',
    likes: 2,
    user: {
      name: 'TestUser'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )

  const detailsDiv = component.container.querySelector('.details')
  const urlElement = component.getByText(blog.url)
  const likesElement = component.getByText(blog.likes)


  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(detailsDiv).toHaveStyle('display: none')
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
})