
import React from 'react';
import ReactDOM from 'react-dom';
import vis from 'vis'
import 'vis/dist/vis.css'

class TestVis extends React.Component {


  init(){
    const { container } = this.refs
    const items = [
      //{id: 1, content: 'item 1', start: '2013-04-20'},
      //{id: 2, content: 'item 2', start: '2013-04-14'},
      //{id: 3, content: 'item 3', start: '2013-04-18'},
      //{id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
      //{id: 5, content: 'item 5', start: '2013-04-25'},
      //{id: 6, content: 'item 6', start: '2013-04-27'},
      {id: 7, content: 'item 7', start: new Date()},
      {id: 8, content: 'item 8', start: new Date(), end: new Date(new Date().getTime()+1000*60*30)}]

    const timelineItems = new vis.DataSet(items)
    const options = {};
    this.TimelineElement = new vis.Timeline(container, timelineItems, options)
  }

  transform(){
    console.log(this.TimelineElement)
    this.TimelineElement.setWindow('2016-08-07', '2016-08-09')
  }

  componentDidMount() {
    this.init()
  }

  render(){
    return (
      <div>
        <p>hello vis</p>
        <div ref='container' />
        <button onClick={this.transform.bind(this)}>1</button>
      </div>
    )
  }
}

export default TestVis 
