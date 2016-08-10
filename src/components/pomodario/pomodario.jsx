import React from 'react';
import { connect } from 'react-redux';
import actions from "core/pomodario/actions"
import articleActions from 'core/article/actions';
//import actions from '../../actions';
import C from 'core/article/action-types';
import {
  SHOW_POMODARIO,
  HIDE_POMODARIO,
  TOGLE_POMODARIO,
  CHANGE_REF_KEY
} from "core/pomodario/action-types"



import {Col, Input, Button, ProgressBar } from "react-bootstrap"

var Notify = require('notifyjs');

var LaterApp = React.createClass({
  getInitialState: function(){
    return {
      timer: this.props.timer,
      count:0
    }
  },
  onTimeOut: function(evt){
    this.props.onTimeOut()
  },


  componentDidMount: function(){
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
  },

  componentWillUnmount: function() {
    clearInterval(this.timer)

    //stop sound
    if(this.audio){
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },
  
  render: function(){
    var remain = this.state.timer - this.state.count

    return (
      <div> 
        <Col xs={4}>
          <ProgressBar active 
            now={(this.state.count/ this.state.timer)*100}
          />
        </Col>
        {Math.floor(remain/60)} : {remain%60}
      </div>
    )
  },

  onPermissionGranted: function() {
      console.log('Permission has been granted by the user');
      doNotification();
  },

  doNotification: function () {
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

  },

  doNotify: function(){
    if (!Notify.needsPermission) {
        this.doNotification();
    } else if (Notify.isSupported()) {
        Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
    }
  },


})




class TestNotify extends React.Component {
  constructor(props){
    super(props);
    this.state={
      edit: false,
      timer: 0,
      min: 25,
      sec: 0
    }

    this.changeEdit = this.changeEdit.bind(this)
  }

  changeEdit(){
    this.setState({
      timer: parseInt(this.state.min)*60 + parseInt(this.state.sec)
    })
    //console.log('min: ', this.state.min, 'sec: ', this.state.sec, 'timer: ', this.state.timer )
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

    if (this.state.edit){
      return (
        <div onClick={this.changeEdit}>
          <LaterApp 
            timer={this.state.timer}
            onTimeOut={p.onTimeOut.bind(this, p.pomodario.refkey, p.pomodario.type)}
          />
        </div>
      )
    }else{
      return (
        <div >
          <Col xs={2}>
            <Input type="text" 
                   value={this.state.min} 
                   onChange = {this.changeMin}
                   placeholder="minute"/> 
          </Col>
          <Col xs={2}>
            <Input type="text" 
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

const mapStateToProps = (appState) => {
	return { pomodario: appState.pomodario };
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTimeOut(qid, type) { 
      console.log('disp=>', qid)
      dispatch(articleActions.testPlusTomato(qid, {type: C.ACTUAL_POMODARIO_PLUS}));
      dispatch(actions.toglePomodarioOff(qid, "reserve"));
      dispatch(actions.setPomodarioDone(qid, type));
    },

		changeQid(qid) { 
      console.log('change qid', qid)
      dispatch(actions.changePomodarioKey(qid))
    },

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestNotify);
