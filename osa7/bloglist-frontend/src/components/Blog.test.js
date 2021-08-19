import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, initialBlogs, initialUsers } from '../utils/testUtils'
// import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'
import { Route } from 'react-router-dom'


describe('<Blog />', () => {

  const getAllServerMock = jest.fn()
  const updateServerMock = jest.fn()
  const removeServerMock = jest.fn()

  const server = setupServer(
    rest.get('/api/blogs', (req, res, ctx) => {
      getAllServerMock()
      return res(ctx.json(initialBlogs))
    }),
    rest.put('/api/blogs/:id', (req, res, ctx) => {
      updateServerMock((req.params.id), req.body)
      return res(ctx.json(req.body))
    }),
    rest.delete('/api/blogs/:id', (req, res, ctx) => {
      removeServerMock(req.params.id)
      return res(ctx.status(204))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())


  describe('given own blog of the user', () => {
    const user = initialUsers[0]
    const blog = initialBlogs[0]
    const route = `/blogs/${blog.id}`
    let component

    beforeEach(() => {
      component = render(
        <Route path="/blogs/:id">
          <Blog/>
        </Route>,
        {
          preloadedState: { login: user },
          initialEntries: [route]
        }
      )
    })

    test('renders title', async () => {
      await waitFor(() => expect(component.container).toHaveTextContent(blog.title))
    })

    test('renders author', async () => {
      await waitFor(() => expect(component.container).toHaveTextContent(blog.author))
    })

    test('renders url', async () => {
      await waitFor(() => expect(component.container).toHaveTextContent(blog.url))
    })

    test('renders likes', async () => {
      const likesDiv = await component.findByText(/likes/)
      expect(likesDiv).toBeVisible()
      expect(likesDiv).toHaveTextContent(blog.likes)
    })

    test('shows remove button', async () => {
      const removeButton = await component.findByText('Remove')
      expect(removeButton).toBeVisible()
      expect(removeButton).toBeEnabled()
    })


    describe('when like button is pressed', () => {
      beforeEach( async () => {
        const likeButton = await component.findByText('like')
        fireEvent.click(likeButton)
      })

      test('sends updated blog to server', async () => {
        const updatedBlog = {
          ...blog,
          likes: blog.likes + 1,
        }
        await waitFor(() => expect(updateServerMock).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(updateServerMock).toHaveBeenCalledWith(blog.id, updatedBlog))
      })
    })

    describe('when remove button is pressed', () => {
      let confirmSpy
      let removeButton

      beforeEach( async () => {
        confirmSpy = jest.spyOn(window, 'confirm')
        confirmSpy.mockReturnValue(false)
        removeButton = await component.findByText('Remove')
      })

      afterEach(() => confirmSpy.mockRestore())

      test('confirmation is shown', () => {
        fireEvent.click(removeButton)
        expect(confirmSpy).toHaveBeenCalledTimes(1)
      })

      describe('and remove is confirmed', () => {
        beforeEach(() => {
          confirmSpy.mockReset()
          confirmSpy.mockReturnValue(true)
        })

        test('sends a delete request server', async () => {
          fireEvent.click(removeButton)
          await waitFor(() => expect(removeServerMock).toHaveBeenCalledTimes(1))
          await waitFor(() => expect(removeServerMock).toHaveBeenCalledWith(blog.id))
        })
      })

      describe('and remove is not confirmed', () => {
        beforeEach(() => {
          confirmSpy.mockReset()
          confirmSpy.mockReturnValue(false)
        })

        test('does not send a delete request server', async () => {
          fireEvent.click(removeButton)
          await waitFor(() => expect(removeServerMock).not.toHaveBeenCalled())
        })
      })
    })
  })

  describe('given a blog of another user', () => {
    const user = initialUsers[0]
    const otherUsersBlog = initialBlogs[2]
    const route = `/blogs/${otherUsersBlog.id}`

    test('does not show remove button', async () => {
      const component = render(
        <Route path="/blogs/:id">
          <Blog/>
        </Route>,
        {
          preloadedState: { login: user },
          initialEntries: [route]
        }
      )
      const removeButton = await component.findByText('Remove')
      expect(removeButton).toBeDefined()
      expect(removeButton).not.toBeVisible()
    })
  })
})