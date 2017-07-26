import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import {PomodarioBar, CountDown, CountDownOutside} from 'components/pomodario/pomodario'
import TestVis from "components/testVis"
import { uiActions } from 'core/ui';
import { pomodarioActions } from 'core/pomodario';
import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'

import 'styles/electron.less'

const checkOngoingPomodario = (list)=>{
  console.log('checkOngoingPomodario:', list)

  let data = list.filter(i=>{
    return  (Date.now() > i.start.getTime()) &&(Date.now() < i.end.getTime())
  })
  console.log('filtered items', data)
  return data.length>0? data[0]:null
}


export class Newflat extends React.Component {
  constructor(props){
    super(props)
    this.state = {items:[]}
    const {startRegisterListeners, togglePomodario} = this.props
    this.togglePomodario = togglePomodario.bind(this)

    startRegisterListeners() //listen to auth info
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
    this.setState({items:items})
  }

  componentDidMount(){
    const {startRegisterListeners , setPomodarioMeta, pomodarioRun, pomodarioTimeout} = this.props
    startRegisterListeners()

    //check items
    setInterval(()=>{
      let currentPomodario = checkOngoingPomodario(this.state.items)
      if (currentPomodario){
        setPomodarioMeta(currentPomodario)
        pomodarioRun()
      }else{
        pomodarioTimeout()
      }
    }, 1000)
  }

  render(){
    const {ui, pomodario } = this.props
    const countDown = pomodario.state == "ONGOING"?<CountDownOutside
        start = {pomodario.current.start}
        end = {pomodario.current.end}
        onTimeOut={()=>{console.log("timeout")}}
        content = {pomodario.current.content}
    />: 'not show'

    return (
      <div>
          <div style={{width: '90%', float: 'left'}} onClick={this.togglePomodario}>
            {countDown}
          </div>
          <div style={{width: '10%', float: 'left'}}>
            <Button  bsStyle="primary" bsSize="xsmall" className="drag">x</Button>
          </div>
          {/*<TestVis/>*/}
      </div>
    )
  }
}

export default connect( state=>({ui: state.uiState, pomodario: state.pomodario}), Object.assign( uiActions, pomodarioActions))(Newflat);
