import React from 'react';
import ReactDOM from 'react-dom';
import {Col, Row, Panel, } from "react-bootstrap";


export class AboutUs extends React.Component {
  render(){
    return (
      <Row>
      <Col md={12} >

      <Col md={6} mdOffset={1}>
      <Row>
      <h3> Tree+Flat note for all knowledges </h3>
      <video controls src="demo.webm" style={{width: '100%'}}></video>
      <div>
        <p>flexiable tree+flat note</p>
        <p> can be used as GTD system, Kanban ...</p>
        <p> Back-end based on Wilddog front end use Redux+React</p>
        <p><a href="https://github.com/isnoth/BN5x">Project page: https://github.com/isnoth/BN5x </a></p>
      </div>
      </Row>

      <Row>
        <p>Contract: isnoth <a href="mailto: isnothe@gmail.com">&lt;isnothe@gmail.com&gt;</a> </p>
      </Row>
      </Col>

      <Col md={5} >
       <h3>Change Log</h3>
         please refer to project page
       <div>
        <h4> 2016-12-04:</h4>
         <li > flat(D) </li>
         <li > node drag and drop(D) </li>
       </div>
       <div>
        <h4> 2016-11-21:</h4>
         <li > alpha version</li>
       </div>
      </Col>

      </Col>
      </Row>
    )
  }
}

export default AboutUs 
