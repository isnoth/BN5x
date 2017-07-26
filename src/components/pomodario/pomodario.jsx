import React from 'react';
import { connect } from 'react-redux';
import { pomodarioActions } from 'core/pomodario';
import {
  SHOW_POMODARIO,
  HIDE_POMODARIO,
  TOGLE_POMODARIO,
  CHANGE_REF_KEY
} from "core/pomodario/action-types"


import {Col, Input, Button, ProgressBar } from "react-bootstrap"

var Notify = require('notifyjs');

export class CountDownOutside extends React.Component {
  render(){
    const { content, start, end } = this.props
    const remain = Math.floor((end.getTime()-Date.now())/1000)
    const remainText = Math.floor(remain/60) +' : '+  remain%60
    const label = remainText + ' - ' +(content?content:"")

    return (
      <ProgressBar active 
        now={(Date.now() - start.getTime())/ (end.getTime() - start.getTime())*100}
        bsStyle={"success"}
        label={label}
      />
    )
  }
}


export class CountDown extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      timer: this.props.timer,
      count:0
    }
  }

  onTimeOut(evt){
    this.props.onTimeOut()
  }

  componentDidMount(){
    this.timer = setInterval(function () {
      this.setState({
        count: this.state.count +1
      })

      console.log(this.state.count)
      if (this.state.count == this.state.timer){
        this.doNotify()
        this.onTimeOut()
        clearInterval(this.timer)
      }
    }.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)

    //stop sound
    if(this.audio){
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
  k
  
  render(){
    const { content } = this.props
    var remain = this.state.timer - this.state.count
    const remainText = Math.floor(remain/60) +' : '+  remain%60
    console.log(remainText)
    const label = remainText + ' - ' +(content?content:"")

    console.log(label)

    return (
      <ProgressBar active 
        now={(this.state.count/ this.state.timer)*100}
        bsStyle={this.state.count>=this.state.timer?"danger":"success"}
        label={label}
      />
    )
  }

  onPermissionGranted() {
      console.log('Permission has been granted by the user');
      doNotification();
  }

  doNotification() {
      var myNotification = new Notify('Yo dawg!', {
          body: 'This is an awesome notification',
          tag: 'unique tag',
          timeout: 30,
          icon: 'assets/CD.jpg'
      });
      myNotification.show();

      //play a sound
      this.audio = new Audio('Kalimba.mp3');
      this.audio.play()

  }

  doNotify(){
    if (!Notify.needsPermission) {
        this.doNotification();
    } else if (Notify.isSupported()) {
        Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
    }
  }
}




class CountDownWithInput extends React.Component {
  constructor(props){
    super(props);
    this.state={
      edit: false,
      timer: 0,
      min: 25,
      sec: 0
    }

    const {
      setRefObj,
      pomodarioRun,
      pomodarioTimeout,
      pomodarioAbort,
      pushPomodarioToServer
    } = this.props

    this.changeEdit = this.changeEdit.bind(this)
    this.changeMin = this.changeMin.bind(this)
    this.changeSec = this.changeSec.bind(this)
    this.pomodarioRun = pomodarioRun.bind(this)
  }

  changeEdit(){
    this.setState({
      timer: parseInt(this.state.min)*60 + parseInt(this.state.sec)
    })
    //console.log('min: ', this.state.min, 'sec: ', this.state.sec, 'timer: ', this.state.timer )
    
    if (!this.state.edit){
      this.pomodarioRun()
    }
    this.setState({edit: !this.state.edit});
  }


  changeMin(event){
    this.setState({
      min: event.target.value,
    })
  }

  changeSec(event){
    this.setState({
      sec: event.target.value,
    })
  }

  render(){
    let p = this.props
    const {pomodarioTimeout} = this.props

    if (this.state.edit){
      return (
        <div onClick={this.changeEdit}>
          <CountDown 
            timer={this.state.timer}
            onTimeOut={pomodarioTimeout}

          />
        </div>
      )
    }else{
      return (
        <div >
          <Col xs={2}>
            <input type="text" 
                   value={this.state.min} 
                   onChange = {this.changeMin}
                   placeholder="minute"/> 
          </Col>
          <Col xs={2}>
            <input type="text" 
                   value={this.state.sec} 
                   onChange = {this.changeSec}
                   placeholder="second"/> 
          </Col>
          <span><Button onClick={this.changeEdit}>OK</Button></span>
          <span>{p.pomodario.refkey}</span>
          <span><Button onClick={p.changeQid.bind(this, null)}>x </Button></span>
        </div>
      )
    }
  }
}


class PomodarioBar_ extends React.Component {
  constructor(props){
    super(props)
    const {timer, onTimeOut} = this.props
    this.timer = timer;
    this.onTimeOut = onTimeOut
  }

  timeOut(){
    this.onTimeOut()
  }


  render(){
    const {timer, onTimeOut,  pomodario} = this.props
    console.log(pomodario.data)
    const content = pomodario.data?pomodario.data.content:""

    return<div>
      <CountDown timer={this.timer} onTimeOut={this.timeOut} />
      {content}
    </div>
  }
}

//export default CountDown
//export default connect(state =>({pomodario: state.pomodario}), Object.assign({}, pomodarioActions))(PomodarioBar);

export let PomodarioBar = connect(state =>({pomodario: state.pomodario}), Object.assign({}, pomodarioActions))(PomodarioBar_);

