
import { connect } from 'react-redux'; 
import React, { Component } from 'react';
import {SplitButton, Navbar, NavItem, Nav, NavDropdown, MenuItem, Label} from 'react-bootstrap'
import LoginModal from "components/auth/login"
import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';

import 'styles/nav.css'

//var FileSaver = require('file-saver');

class NavApp extends React.Component {

  render(){
    const {auth, login, logout , openLoginModal, pushToTab, createFile, renameFile,  openModifyFilenameModal, startEditFileName, enableEditLayout, disableEditLayout} = this.props
    let title = auth.uid?auth.password.email:'loading'

    const navbarInstance = (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">BN5x</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={3} href="#md">md</NavItem>
            <NavItem eventKey={4} href="#newFlat/root">NewFlat</NavItem>
          </Nav>
          <LoginModal/>
            {auth.authenticated === "TRUE"?(
              <Nav pullRight>
                <NavDropdown eventKey={7} title={title} id="basic-nav-dropdown">
                  <MenuItem eventKey={7.1} onClick={this.backup}>Backup</MenuItem>
                  <MenuItem eventKey={7.2} onClick={logout.bind(this)}>Log out</MenuItem>
                </NavDropdown>
              </Nav>
            ):(
              <Nav pullRight>
                <NavItem eventKey={9} href="#register">Register</NavItem>
                <NavItem eventKey={8} onClick={openLoginModal.bind(this)}>Login</NavItem>
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
  firebase: state.firebase,
  ui: state.uiState,
}), Object.assign({}, authActions, uiActions ))(NavApp);
