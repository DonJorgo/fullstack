import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'http://localhost',
    likes: 2,
    user: {
      name: 'TestUser'
    }
  }

  let component

  const onLikeMock = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} onLike={onLikeMock}/>
    )
  })


  test('renders name and author but not by default url or likes ', () => {

    const detailsDiv = component.container.querySelector('.details')
    const urlElement = component.getByText(blog.url)
    const likesElement = component.getByText(blog.likes)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(detailsDiv).toHaveStyle('display: none')
    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })


  test('shows url and likes after view button is pressed', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const urlElement = component.getByText(blog.url)
    const likesElement = component.getByText(blog.likes)

    expect(urlElement).toBeVisible()
    expect(urlElement).toHaveTextContent(blog.url)

    expect(likesElement).toBeVisible()
    expect(likesElement).toHaveTextContent(blog.likes)
  })


  test('calls props.onLike every time the like button is pressed', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(onLikeMock.mock.calls).toHaveLength(2)
  })
})