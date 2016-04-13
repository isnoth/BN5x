import React, from 'react';
improt {Col, Input, Button, ProgressBar } from "react-bootstrap"


var LaterApp = React.createClass({
  getInitialState: function(){
    return {
      timer: this.props.timer,
      count:0
    }
  },

  componentDidMount: function(){
    this.timer = setInterval(function () {
      this.setState({
        count: this.state.count +1
      })

      console.log(this.state.count)
      if (this.state.count == this.state.timer){
        this.doNotify()
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
    var ProgressBar = ReactBootstrap.ProgressBar
    var Col = ReactBootstrap.Col
    var remain = this.state.timer - this.state.count

    return (
      <div> 
        <Col xs={3}>
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



var TestNotify= React.createClass({
  getInitialState: function(){
    return {
      edit: false,
      timer: 0,
      min: 25,
      sec: 0
    };
  },

  changeEdit: function(){
    this.setState({
      timer: parseInt(this.state.min)*60 + parseInt(this.state.sec)
    })
    console.log('min: ', this.state.min, 'sec: ', this.state.sec, 'timer: ', this.state.timer )

    this.setState({edit: !this.state.edit});
  },
  changeMin: function(event){
    this.setState({
      min: event.target.value,
    })
  },
  changeSec: function(event){
    this.setState({
      sec: event.target.value,
    })
  },
  render: function(){
    var Button = ReactBootstrap.Button
    var Input = ReactBootstrap.Input
    var Col = ReactBootstrap.Col

    if (this.state.edit){
      return (
        <div onClick={this.changeEdit}>
          <LaterApp timer={this.state.timer}/>
        </div>
      )
    }else{
      return (
        <div >
          <Col xs={1}>
            <Input type="text" 
                   value={this.state.min} 
                   onChange = {this.changeMin}
                   placeholder="minute"/> 
          </Col>
          <Col xs={1}>
            <Input type="text" 
                   value={this.state.sec} 
                   onChange = {this.changeSec}
                   placeholder="second"/> 
          </Col>
          <Button onClick={this.changeEdit}>OK</Button>
        </div>
      )
    }
  }
})

export default TestNotify;
