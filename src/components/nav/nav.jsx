
import { connect } from 'react-redux'; 
import React, { Component } from 'react';
import {SplitButton, Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import LoginModal from "components/auth/login"
import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';
import { filesActions } from 'core/files';

class NavApp extends React.Component {

  render(){
    const {auth, login, logout , openLoginModal, pushToTab} = this.props
    let title = auth.uid?auth.uid:'loading'

    const {files} = this.props
    const l_files = files.idList.map(function(i, index){
      const fileName = files[i]==null?i:files[i].name
      //return <MenuItem key={index} eventKey={index} onClick={pushToTab.bind(this, i)}href={"#/files/"+i+"/"}>{fileName}</MenuItem>
      return <SplitButton href={"#/files/"+i+"/"} title={fileName} key={i} id={`split-button-basic-${i}`}>
        <MenuItem eventKey="1">Create panel</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="2">Delete</MenuItem>
      </SplitButton>

    })


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
            <NavDropdown eventKey={1} title="Files">
              {l_files}
              <MenuItem divider />
              <MenuItem eventKey={1.3} href="#" >New File</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="#articles">Pomodario</NavItem>
            <NavItem eventKey={3} href="#stat">Stat</NavItem>
            <NavItem eventKey={4} href="#pomodario">Timer</NavItem>
            <NavItem eventKey={5} href="#test2">Test</NavItem>
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
  files: state.files
}), Object.assign({}, authActions, uiActions, filesActions ))(NavApp);
