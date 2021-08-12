import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor } from '../utils/testUtils'
// import { prettyDOM } from '@testing-library/dom'

import BlogForm from './BlogForm'

describe('<BlogFrom />', () => {

  const postMock = jest.fn()

  const server = setupServer(
    rest.post('/api/blogs', (req, res, ctx) => {
      postMock(req.body)
      postMock()
      return res(ctx.json({ ...req.body, id: 1 }))
    })
  )

  beforeAll(() => server.listen())

  let component
  beforeEach(() => {
    component = render(
      <BlogForm />
    )
  })

  afterEach(() => {
    server.resetHandlers()
    postMock.mockClear()
  })
  afterAll(() => server.close())


  test('on submit posts new blog to the server', async () => {
    const blog = {
      title:'BlogForm.test Title',
      author: 'BlogForm.test Author',
      url: 'BlogForm.test URL'
    }

    const blogForm = component.container.querySelector('form')
    const titleInput = component.container.querySelector('[name=Title]')
    const authorInput = component.container.querySelector('[name=Author]')
    const urlInput = component.container.querySelector('[name=Url]')

    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.change(authorInput, { target: { value: blog.author } })
    fireEvent.change(urlInput, { target: { value: blog.url } })
    fireEvent.submit(blogForm)

    waitFor(() => expect(postMock).toHaveBeenCalledTimes(1))
    waitFor(() => expect(postMock).toHaveBeenCalledWith(blog))
  })
})