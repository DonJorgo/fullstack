import React from 'react'

const Notification = ({ message, isError }) => {

  const NotificationStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const successStyle = {
    ...NotificationStyle,
    color: 'green'
  }

  const errorStyle = {
    ...NotificationStyle,
    color:'red'
  }


  if (message === null) {
    return null
  }

  return (
    <div style={isError ? errorStyle : successStyle}>
      {message}
    </div>
  )
}

export default Notification