import React from 'react';
import ReactDOM from 'react-dom';
import {Panel} from "react-bootstrap"
import mousetrap from "mousetrap"

import { BarChart } from 'react-d3';


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





class TestBarChart extends React.Component {

  render(){
    const barData = [
      {
        "name": "Series A",
        "values": [
          { "x": 1, "y":  91},
          { "x": 2, "y": 290},
          { "x": 3, "y": 25},
        ]
      },
      {
        "name": "Series B",
        "values": [
          { "x": 1, "y":  9},
          { "x": 2, "y": 49},
          { "x": 3, "y": 20},
        ]
      },
      {
        "name": "Series C",
        "values": [
          { "x": 1, "y":  14},
          { "x": 2, "y": 77},
          { "x": 3, "y": 70}
        ]
      }
    ];

    return (
      <BarChart
        data={barData}
        width={500}
        height={300}
        fill={'#3182bd'}
        title='Bar Chart'
        yAxisLabel='Label'
        xAxisLabel='Value'
      />
    )
  }
}
  



export default TestBarChart 
