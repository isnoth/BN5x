import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { myDate, getTimeStampHour, todayXhour} from "utils/date_util"
import {Button, Col} from "react-bootstrap"

var Notify = require('notifyjs');

import { pomodarioActions } from 'core/pomodario';
import { uiActions } from 'core/ui';


import vis from 'vis'
import 'vis/dist/vis.css'
import 'styles/timeline.css'
import Timeline from 'react-visjs-timeline'

class TestVis extends React.Component {
  constructor(props){
    super(props)
    this.onAdd = this.onAdd.bind(this)
    this.state = {items:[]}
    const {togglePomodario} = this.props
    this.togglePomodario = togglePomodario.bind(this)
  }

  checkUpcomingEvt(items){
    items.forEach(i=>{console.log('start: ', i.start)})
  }

  onPermissionGranted() {
      console.log('Permission has been granted by the user');
      doNotification();
  }

  doNotification(content, interval) {
      var myNotification = new Notify( content, {
          body: content + '-' + interval/1000,
          tag: 'unique tag',
          timeout: interval/1000,
          icon: 'assets/CD.jpg'
      });
      myNotification.show();

      //play a sound
      this.audio = new Audio('Kalimba.mp3');
      this.audio.play()

      setTimeout(()=>{
        if(this.audio){
          this.audio.pause();
          this.audio.currentTime = 0;
        }
      }, 30000)

  }

  doNotify(content, interval){
    if (!Notify.needsPermission) {
        this.doNotification(content, interval);
    } else if (Notify.isSupported()) {
        Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
    }
  }



  componentDidMount() {
    const {startRegisterListeners , setPomodarioMeta} = this.props
    console.log('startRegisterListeners')
    startRegisterListeners()
    this.initTimeline()


    setInterval(()=>{
      let data = this.state.items.filter(i=>{
        return  (Date.now() - i.start.getTime()> 0) &&(Date.now()-i.start.getTime()<1000)
      })
      console.log('filtered items', data)
      if(data.length>0){
        //alert(data[0].content)
        console.log(data[0])
        this.doNotify(data[0].content, data[0].end.getTime() - data[0].start.getTime())
        this.togglePomodario()
        setPomodarioMeta(data[0])
      }
    }, 1000)
  }

  componentWillReceiveProps(nextprops){
    const {pomodario} = nextprops
    const value = pomodario.data

    let items
    if (!value){
      items = [{id:0, content:"initial", start:new Date(), end:new Date(), className: "green"}]
    }else{
      items = Object.keys(value).map( function(i){
        const start = new Date(value[i].startTime)
        const end = new Date(value[i].endTime)
        const styleClass = value[i].type==="home" ? "orange":"green"
        return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
      })
    }
    console.log('items is:', items)
    //this.checkUpcomingEvt(items)
    this.setState({items:items})
    this.TimelineElement.setItems(items)
    //this.transform(9, 23)
  }


  onAdd(item, cb){
    console.log('onAdd: ', item)
    const { pushPomodarioToServer } = this.props

    const data = window.prompt()
    //item.content = "test"
    item.content = data
    item.endTime = item.start.getTime()+ 25*60*1000
    item.startTime = item.start.getTime()
    console.log('end is:', item.end)
    item.className = "green"
    //


    pushPomodarioToServer(item)

    cb()
  }

  initTimeline(){
    const { container } = this.refs
    const {updatePomodario, deletePomodario} = this.props

    //init timeline
    const options = {
      editable: true, 
      start: todayXhour(0),
      end: todayXhour(12),
      onAdd: this.onAdd,
      onUpdate: (item, cb)=>{
        console.log('onUpdate', item)
        item.startTime = item.start.getTime()
        item.endTime = item.end.getTime()
        updatePomodario(item)
        cb()
      },
      onRemove: (item, cb)=>{
        console.log('onRemove', item)
        deletePomodario(item)
      }
    };
    const timelineItems = []
    this.TimelineElement = new vis.Timeline(container, timelineItems, options)
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
    const {ui} = this.props
    const styles = {display: ui.showTimeline?"block":'none'}
    return (
      <div style={styles}>
        <p>hello vis</p>
        <div ref='container' />
        <Button onClick={this.transform.bind(this, 9, 23)}>Today</Button>
        <Button onClick={this.transform.bind(this, 9-24, 23-24)}>Yesterday</Button>
      </div>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase,
  pomodario: state.pomodario,
  ui: state.uiState,
}), Object.assign(pomodarioActions, uiActions))(TestVis);
