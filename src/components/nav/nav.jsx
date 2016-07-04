
import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

class NavApp extends React.Component {

  render(){
    const navbarInstance = (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#tree">Tree</NavItem>
            <NavItem eventKey={2} href="#articles">Pomodario</NavItem>
            <NavItem eventKey={3} href="#stat">Stat</NavItem>
            <NavItem eventKey={4} href="#pomodario">Timer</NavItem>
            <NavItem eventKey={5} href="#test2">Test</NavItem>
            <NavItem eventKey={6} href="#tree2">Tree2</NavItem>
            <NavItem eventKey={6} href="#resize">Tree2</NavItem>
            {/*
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            */}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    return navbarInstance

  }
}

export default NavApp 
