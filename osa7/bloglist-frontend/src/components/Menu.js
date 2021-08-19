import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logout from './Logout'


const Menu = () => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" id="menu" >
      <Navbar.Brand>Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link  to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link  to="/users">users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Text href="#" as="span">
          <Logout />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu