import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, initialBlogs, initialUsers } from '../utils/testUtils'

import BlogList from './BlogList'

describe('<BlogList />', () => {

  const server = setupServer(
    rest.get('/api/blogs', (req, res, ctx) =>
      res(ctx.json(initialBlogs), ctx.delay(150)))
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Shows all blogs from the server', async () => {

    render(<BlogList user={initialUsers[0]}/>)

    initialBlogs.forEach(blog => {
      expect(screen.findByText(`${blog.title} ${blog.author}`)).toBeDefined()
    })
  })

})