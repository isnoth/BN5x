
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
  componentDidMount(){
    const {startRegisterListeners} = this.props
    startRegisterListeners()
  }

  render(){

    const {pomodario } = this.props
    const value = pomodario.data
    const items = Object.keys(value).map( function(i){
      const start = new Date(value[i].startTime)
      const end = new Date(value[i].endTime)
      const styleClass = value[i].type==="home" ? "orange":"green"
      return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
    })

    const start = todayXhour(9)
    const end= todayXhour(23)
    const shift = start.getTimezoneOffset()*60000
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
      start: start.getTime()+shift,
      end: end.getTime()+shift,
    }

    return (
      <Col>
        <p>hello vis</p>
        <Timeline options={options} items={items} />
        <Button >Today</Button>
        <Button >Yesterday</Button>
      </Col>
    )
  }

}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase,
  pomodario: state.pomodario
}), pomodarioActions)(TestVis);
