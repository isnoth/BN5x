
import { connect } from 'react-redux'; 
import React, { Component } from 'react';
import {SplitButton, Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import LoginModal from "components/auth/login"
import EditFileModal from "./editFile"
import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';
import { filesActions } from 'core/files';

import 'styles/nav.css'

//var FileSaver = require('file-saver');

class NavApp extends React.Component {

	constructor(props) {
		super(props);
		this.backup = this.backup.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  saveData (data, fileName){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var json = JSON.stringify(data),
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    console.log(url)
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  backup () {
      const now = new Date()
      const fileName = "BN5x_"+(now.getMonth()+1)+'_' +now.getDate()+".json"
      const {auth, firebase, files2} = this.props
      //let childRef = auth.userRef
      //let ref = firebase.tree.child(childRef)
      let ref = files2.ref

      console.log('ref is :', ref)
      ref.once('value', (snapshot) => {
          console.log(snapshot.val())
          this.saveData(snapshot.val(), fileName)
          //FileSaver.saveAs(snapshot.val(), "hello world.txt");
      })

  };


  updateFileName(fileId){
    const {renameFile} = this.props
    return function(id){
      let pwd = window.prompt("please enter new name", "");
      console.log(pwd, fileId)
      renameFile.bind(this, id, pwd)
    }(fileId)
  }
  


  render(){
    const {auth, login, logout , openLoginModal, pushToTab, createFile, renameFile, files, openModifyFilenameModal, startEditFileName, enableEditLayout, disableEditLayout} = this.props
    let title = auth.uid?auth.uid:'loading'
    const updateFileName = this.updateFileName
    const l_files = files.idList.map(function(i, index){
      const fileName = files[i]==null?i:files[i].name
      //return <MenuItem key={index} eventKey={index} onClick={pushToTab.bind(this, i)}href={"#/files/"+i+"/"}>{fileName}</MenuItem>
      return (
        <SplitButton key={index} title={fileName} href={"#/files/"+i+"/"} onClick={pushToTab.bind(this, i)} pullRight id="split-button-pull-right">
          <MenuItem eventKey="1" onClick={startEditFileName.bind(this, i)}>Rename</MenuItem>
          <MenuItem eventKey="2" onClick={enableEditLayout.bind(this, i)}>enable</MenuItem>
          <MenuItem eventKey="3" onClick={disableEditLayout.bind(this, i)}>disable</MenuItem>
        </SplitButton>
      
      )
      /*
      return <SplitButton href={"#/files/"+i+"/"} title={fileName} key={i} id={`split-button-basic-${i}`}>
        <MenuItem eventKey="1">Create panel</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="2">Delete</MenuItem>
      </SplitButton>
      */

    })


    const navbarInstance = (
      <Navbar inverse>
        <EditFileModal/>
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
              <MenuItem eventKey={1.3} onClick={createFile.bind(this)}>New File</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="#articles">Pomodario</NavItem>
            <NavItem eventKey={3} href="#stat">Stat</NavItem>
            <NavItem eventKey={4} href="#pomodario">Timer</NavItem>
            <NavItem eventKey={5} href="#flat">flat</NavItem>
            <NavItem eventKey={6} href="#resize">Tree2</NavItem>
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
  files: state.files,
  firebase: state.firebase,
  files2: state.files2,
  ui: state.uiState,
}), Object.assign({}, authActions, uiActions, filesActions ))(NavApp);
