import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { storeWithState } from '../store'


export const initialUsers =[
  {
    name: 'User1',
    username: 'username1'
  },
  {
    name: 'User2',
    username: 'username2'
  }
]


export const initialBlogs = [
  {
    id: 1,
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 0,
    user: initialUsers[0]
  },
  {
    id: 2,
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 0,
    user: initialUsers[0]
  },
  {
    id: 3,
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 0,
    user: initialUsers[1]
  },
]


// Purpose of this function is to hide Redux as implementation detail from tests
function customRender(
  ui, {
    preloadedState,
    store = storeWithState(preloadedState),
    ...renderOptions
  } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>
      {children}
    </Provider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }