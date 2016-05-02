import React from 'react';
import ReactDOM from 'react-dom';
import {Panel} from "react-bootstrap"
import mousetrap from "mousetrap"


class TestApp extends React.Component {

  componentDidMount(){
    var that= this
    Mousetrap.bind('-', function() { console.log(that.props); })
    //ReactDOM.findDOMNode(this.refs.nameInput).focus(function(){
    //  console.log('focus')
    //}); 
  }

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
        <div>
          <input name="two" value="Won't focus" />
          <input name="one" ref="nameInput" value="will focus"/>
        </div>
        
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
