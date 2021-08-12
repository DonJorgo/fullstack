import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'


const Menu = () => {

  const menuStyle = {
    backgroundColor: 'lightgray'
  }

  const padding = { padding: 5 }

  return (
    <div id="menu" style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <Logout />
    </div>
  )
}

export default Menu