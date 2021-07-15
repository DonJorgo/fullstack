import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  username,
  password
  }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={onUsernameChange}
        />
      </div>
      <div>
        password
        <input 
          type="password"
          value={password}
          name="Password"
          onChange={onPasswordChange}
      />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )

LoginForm.propTypes  = {
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm