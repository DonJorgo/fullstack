import deepFreeze from 'deep-freeze'

import blogReducer from './blogReducer'
import { initialBlogs } from '../utils/testUtils'


describe('blogReduces', () => {


  test('should return the initial state', () => {
    expect(blogReducer(undefined, {})).toEqual([])
  })

  test('should initialize blogs with INIT_BLOGS', () => {
    const previousState = []
    const action =  {
      type: 'INIT_BLOGS',
      payload: initialBlogs
    }
    deepFreeze(previousState)
    deepFreeze(action)

    expect(blogReducer(previousState, action)).toEqual(initialBlogs)
  })


  test('should add new blog with NEW_BLOG', () => {
    const newBlog = {
      title: 'new blog',
      author: 'new author'
    }
    const previousState = initialBlogs
    const action =  {
      type: 'NEW_BLOG',
      payload: newBlog
    }
    deepFreeze(previousState)
    deepFreeze(action)

    expect(blogReducer(previousState, action)).toEqual([...initialBlogs, newBlog])

  })


  test('should update blog by id and sort by likes with UPDATE_BLOG', () => {
    const previousState = initialBlogs
    const updatedBlog = {
      ...initialBlogs[1],
      likes: initialBlogs[1].likes + 1
    }
    const action =  {
      type: 'UPDATE_BLOG',
      payload: updatedBlog
    }
    deepFreeze(previousState)
    deepFreeze(action)
    const expectedState = [
      updatedBlog,
      ...initialBlogs.slice(0,1),
      ...initialBlogs.slice(2)
    ]
    expect(blogReducer(previousState, action)).toEqual(expectedState)
  })


  test('should remove blog by id with REMOVE_BLOG', () => {
    const previousState = initialBlogs
    const toBeRemoved = initialBlogs[1]
    const action =  {
      type: 'REMOVE_BLOG',
      payload: toBeRemoved
    }
    deepFreeze(previousState)
    deepFreeze(action)
    const expectedState = [
      ...initialBlogs.slice(0,1),
      ...initialBlogs.slice(2)
    ]
    expect(blogReducer(previousState, action)).toEqual(expectedState)
  })
})