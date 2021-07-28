import React from 'react'

const Logout = ({ name, onLogout }) =>
  <p>
    {name} logged in
    <button onClick={onLogout}>
      logout
    </button>
  </p>

export default Logout