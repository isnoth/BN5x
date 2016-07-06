
import { connect } from 'react-redux'; 
import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import LoginModal from "components/auth/login"
import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';

class NavApp extends React.Component {

  render(){
    const {auth, login, logout , openLoginModal} = this.props
    let title = auth.uid?auth.uid:'loading'

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
            <NavItem eventKey={6} href="#files">Files</NavItem>
            <NavItem eventKey={6} href="#resize">Tree2</NavItem>
          </Nav>
          <LoginModal/>
            {auth.authenticated?(
              <Nav pullRight>
                <NavDropdown eventKey={7} title={title} id="basic-nav-dropdown">
                  <MenuItem eventKey={7.1} onClick={logout.bind(this)}>Log out</MenuItem>
                </NavDropdown>
              </Nav>
            ):(
              <Nav pullRight>
                <NavItem eventKey={8} onClick={openLoginModal.bind(this)}>login</NavItem>
              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    );

    return navbarInstance

  }
}

export default connect((state, ownProps) => ({
  auth: state.auth,
}), Object.assign({}, authActions, uiActions ))(NavApp);
