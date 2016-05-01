import React from 'react';
import {Panel} from "react-bootstrap"


class TestApp extends React.Component {
  render(){

    const title = (
      <h3>Panel title</h3>
    );
    const panelsInstance = (
      <div>
        <Panel id='testPanel' header={title}>
          Panel content
        </Panel>
        <Panel id='testPanel2' header={title} bsStyle="primary">
          Panel content
        </Panel>
        {/*
        <Panel header={title} bsStyle="success">
          Panel content
        </Panel>
        <Panel header={title} bsStyle="info">
          Panel content
        </Panel>
        <Panel header={title} bsStyle="warning">
          Panel content
        </Panel>
        <Panel header={title} bsStyle="danger">
          Panel content
        </Panel>
        */}
      </div>
    );
    
    


    return panelsInstance 
  }
}

export default TestApp 
