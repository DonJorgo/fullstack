import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with SET_NOTIFICATION', () => {
    const state = {}
    const action = {
      type: 'SET_NOTIFICATION',
      payload: {
        message: 'New Message'
      }
    }
    deepFreeze(state)
    deepFreeze(action)
    const newState = notificationReducer(state, action)

    expect(newState).toMatchObject({ message: 'New Message' })
  })
})