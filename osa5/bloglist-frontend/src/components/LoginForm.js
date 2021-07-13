import React from 'react'

const LoginForm = (props) => 
  <div>
    <form onSubmit={props.onSubmit}>
      <div>
        username
        <input 
          type="text"
          value={props.username}
          name="Username"
          onChange={props.onUsernameChange}
        />
      </div>
      <div>
        password
        <input 
          type="password"
          value={props.password}
          name="Password"
          onChange={props.onPasswordChange}
      />
      </div>
      <button type="submit">login</button>
    </form>
  </div>


export default LoginForm