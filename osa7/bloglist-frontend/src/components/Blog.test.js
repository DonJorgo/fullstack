import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, initialBlogs, initialUsers } from '../utils/testUtils'

import Blog from './Blog'


describe('<Blog />', () => {

  const updateMock = jest.fn()
  const removeMock = jest.fn()

  const server = setupServer(
    rest.put('/api/blogs/:id', (req, res, ctx) => {
      updateMock(Number(req.params.id), req.body)
      return res(ctx.json(req.body))
    }),
    rest.delete('/api/blogs/:id', (req, res, ctx) => {
      removeMock(Number(req.params.id))
      return res(ctx.status(204))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())


  describe('given own blog of the user', () => {
    const user = initialUsers[0]
    const blog = initialBlogs[0]

    let component
    beforeEach(() => {
      component = render(
        <Blog blog={blog}/>,
        {
          preloadedState: { login: user }
        }
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

    describe('when view button is pressed', () => {
      beforeEach(() => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)
      })

      test('shows url and likes', () => {
        const urlElement = component.container.querySelector('.url')
        const likesElement = component.container.querySelector('.likes')

        expect(urlElement).toBeVisible()
        expect(urlElement).toHaveTextContent(blog.url)
        expect(likesElement).toBeVisible()
        expect(likesElement).toHaveTextContent(blog.likes)
      })

      test('shows remove button', () => {
        const removeButton = component.getByText('Remove')
        expect(removeButton).toBeVisible()
        expect(removeButton).toBeEnabled()
      })

      describe('and like button is pressed', () => {
        beforeEach(() => {
          const likeButton = component.getByText('like')
          fireEvent.click(likeButton)
        })

        test('sends updated blog to server', () => {
          const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
          }
          expect(updateMock).toHaveBeenCalledTimes(1)
          expect(updateMock).toHaveBeenCalledWith(blog.id, updatedBlog)
        })
      })

      describe('and remove button is pressed', () => {
        let confirmSpy

        beforeEach(() => {
          confirmSpy = jest.spyOn(window, 'confirm')
          confirmSpy.mockImplementation(() => true)
          const removeButton = component.getByText('Remove')
          fireEvent.click(removeButton)
        })

        afterEach(() => confirmSpy.mockRestore())

        test('sends a delete request server', () => {
          expect(removeMock).toHaveBeenCalledTimes(1)
          expect(removeMock).toHaveBeenCalledWith(blog.id)
        })
      })
    })
  })

  describe('given a blog of another user', () => {
    const user = initialUsers[0]
    const otherUsersBlog = initialBlogs[2]

    test('when view button is pressed does not show remove ', () => {
      const component = render(
        <Blog blog={otherUsersBlog}/>,
        {
          preloadedState: { login: user }
        }
      )
      const viewButton = component.getByText('view')
      const removeButton = component.getByText('Remove')

      fireEvent.click(viewButton)

      expect(removeButton).not.toBeVisible()
    })
  })
})