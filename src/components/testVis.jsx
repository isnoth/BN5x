import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { myDate, getTimeStampHour, todayXhour} from "utils/date_util"
import {Button, Col} from "react-bootstrap"


import vis from 'vis'
import 'vis/dist/vis.css'
import 'styles/timeline.css'
import Timeline from 'react-visjs-timeline'

class TestVis extends React.Component {


  componentDidMount() {
    this.init()
  }


  init(){
    const {auth, firebase} = this.props
    const { container } = this.refs
    const that = this
    //const Date = myDate
    console.log(getTimeStampHour())

    const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
    pomodarioRef.once("value", function(snapshoot){
      console.log(snapshoot.val())

      const value = snapshoot.val()
      console.log(value)
      const items1 = Object.keys(value).map( function(i){
        const start = new Date(value[i].startTime)
        const end = new Date(value[i].endTime)
        const styleClass = value[i].type==="home" ? "orange":"green"
        return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
      })
      const items = [
        {id: 7, content: 'item 7', start: new Date()},
        {id: 8, content: 'item 8', start: new Date(), end: new Date(new Date().getTime()+1000*60*30)}]


      //const timelineItems = new vis.DataSet(items)
      const timelineItems = new vis.DataSet(items1)
      const options = {
        editable: true, 
        onAdd: function (item, cb){
          item.content = "hello"
          cb(item)
        }
      };
      that.TimelineElement = new vis.Timeline(container, timelineItems, options)

      //which part of time will be shown
      const startTime = todayXhour(9)
      const endTime = todayXhour(23)
      const shift = startTime.getTimezoneOffset()*60000
      that.TimelineElement.setWindow(startTime.getTime()+shift, endTime.getTime()+shift)


    })
  }

  transform(h1, h2){
    console.log(this.TimelineElement)

    const today = todayXhour(h1)
    const tomorrow = todayXhour(h2)
    const shift = today.getTimezoneOffset()*60000
    console.log(today)
    console.log(tomorrow)
    //this.TimelineElement.setWindow('2016-08-07', '2016-08-09')
    this.TimelineElement.setWindow(today.getTime()+shift, tomorrow.getTime()+shift)
  }






  render(){
    return (
      <Col>
        <p>hello vis</p>
        <div ref='container' />
        <Button onClick={this.transform.bind(this, 9, 23)}>Today</Button>
        <Button onClick={this.transform.bind(this, 9-24, 23-24)}>Yesterday</Button>
      </Col>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase
}), {})(TestVis);
