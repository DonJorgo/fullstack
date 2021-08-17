import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {

  const { message, isError } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return (
    <Alert variant={isError ? 'danger' : 'success'}>
      {message}
    </Alert>
  )
}

export default Notification