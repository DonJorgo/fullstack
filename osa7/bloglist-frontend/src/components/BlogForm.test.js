import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogFrom /> calls onSubmit with correct data', () => {

  const onSubmitMock = jest.fn()

  const component = render(
    <BlogForm onSubmit={onSubmitMock} />
  )

  const blogForm = component.container.querySelector('form')
  const titleInput = component.container.querySelector('[name=Title]')
  const authorInput = component.container.querySelector('[name=Author]')
  const urlInput = component.container.querySelector('[name=Url]')

  fireEvent.change(titleInput, { target: { value: 'BlogForm.test Title' } })
  fireEvent.change(authorInput, { target: { value: 'BlogForm.test Author' } })
  fireEvent.change(urlInput, { target: { value: 'BlogForm.test URL' } })

  fireEvent.submit(blogForm)

  expect(onSubmitMock.mock.calls).toHaveLength(1)
  expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('title','BlogForm.test Title')
  expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('author','BlogForm.test Author')
  expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('url','BlogForm.test URL')
})