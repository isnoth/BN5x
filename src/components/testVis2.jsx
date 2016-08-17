
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { myDate, getTimeStampHour, todayXhour} from "utils/date_util"
import {Button, Col} from "react-bootstrap"
import { pomodarioActions } from 'core/pomodario';


import vis from 'vis'
import 'vis/dist/vis.css'
import 'styles/timeline.css'
import Timeline from 'react-visjs-timeline'


class TestVis extends React.Component {
  constructor(props){
    super(props)

    const shift = todayXhour(0).getTimezoneOffset()*60000
    const start = todayXhour(9).getTime()+shift
    const end= todayXhour(23).getTime()+shift

    this.state={
      start: start,
      end: end,
    }
  }

  setTime(a, b){
    console.log('setTime..', a, b)
    const shift = todayXhour(a).getTimezoneOffset()*60000
    const start = todayXhour(a).getTime()+shift
    const end= todayXhour(b).getTime()+shift
    this.setState({
      start: start,
      end: end,
    })
  }



  componentDidMount(){
    const {startRegisterListeners} = this.props
    startRegisterListeners()
  }

  render(){

    const {pomodario } = this.props
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

    const options = {
      //width: '100%',
      //height: '60px',
      //stack: false,
      //showMajorLabels: true,
      //showCurrentTime: true,
      //zoomMin: 1000000,
      //type: 'background',
      //format: {
      //  minorLabels: {
      //    minute: 'h:mma',
      //    hour: 'ha'
      //  }
      //}
      start: this.state.start,
      end: this.state.end,
    }
    console.log(options)

    return (
      <Col>
        <p>hello vis</p>
        <Timeline options={options} items={items} />
        <Button onClick={this.setTime.bind(this, 9, 23)}>Today</Button>
        <Button onClick={this.setTime.bind(this, 9-24, 23-24)}>Yesterday</Button>
      </Col>
    )
  }

}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase,
  pomodario: state.pomodario
}), pomodarioActions)(TestVis);
