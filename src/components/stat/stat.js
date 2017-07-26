import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import {stat} from './stat_util'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { pomodarioActions } from 'core/pomodario';
import {scaleTime} from 'd3-scale';

//const data = [
//      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
//];


function count(data){
    var d = {}
    data.forEach(i=>{
        if (d[i]){
            d[i]++;
        }else{
            d[i] = 1
        }
    })
    return d
}

function formatDate(dateInt){
  console.log('dateToString', dateInt)
  const date = new Date(dateInt)

  return (date.getMonth()+1)+'-'+date.getDate()
}

const formatDate_ = (unixtime) => {
  var newDate = new Date();
  newDate.setTime(unixtime*1000);
  var dateString = newDate.toLocaleDateString();
  console.log('dateString is:', dateString, unixtime)
  return dateString;
}

class Stat extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: []}
  }

  changeData(){
    const {data} = this.state
    this.setState({data: data.filter(i=>i.startTime>(new Date().getTime()-86400000*6))})
  }

  changeDataAll(){
    const {pomodario} = this.props
    const value = pomodario.data
    this.setState({data: Object.keys(value).map(i=>{
      return value[i]
    })})
  }

  componentDidMount() {
    const {auth, firebase} = this.props
    const {startRegisterListeners } = this.props
    startRegisterListeners()
  }

  componentWillReceiveProps(nextprops){
		console.log('next props')
    const {pomodario} = nextprops
    const value = pomodario.data
    console.log('value is:', value)
    this.setState({data: Object.keys(value).map(i=>{
      return value[i]
    })})
  }

  render(){
    this.state.data.forEach(i=>{
      i.startTime = i.startTime - i.startTime%86400000
    })

    let data = this.state.data.map(i=>i.startTime)
    data = count(data)
    console.log(data)
    data = Object.keys(data).map(i=>{
      return {name: parseInt(i), pv: data[i]}
    })

    console.log('scaleTime:', data)
    const scale = scaleTime()
      .domain([new Date(2017, 6, 20), new Date(2017, 7, 2)])


		return (
      <div>
			  <BarChart width={600} height={300} data={data}
			  	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			  <XAxis dataKey="name" tickFormatter={formatDate} />
			  <YAxis/>
			  <CartesianGrid strokeDasharray="3 3"/>
			  <Tooltip/>
			  <Legend />
			  	<Bar dataKey="pv" fill="#8884d8" />
			  </BarChart>
        <button onClick={this.changeData.bind(this)}>change</button>
        <button onClick={this.changeDataAll.bind(this)}>changeAll</button>
      </div>
		)
	}
}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase,
  pomodario: state.pomodario,
}), pomodarioActions)(Stat);

