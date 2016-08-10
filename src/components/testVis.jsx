import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import vis from 'vis'
import 'vis/dist/vis.css'
import 'styles/timeline.css'

class TestVis extends React.Component {


  init(){
    const {auth, firebase} = this.props
    const { container } = this.refs
    const that = this

    const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
    pomodarioRef.once("value", function(snapshoot){
      console.log(snapshoot.val())

      const value = snapshoot.val()
      //console.log(value)
      const items1 = Object.keys(value).map( function(i){
        const start = new Date(value[i].date-1000*60*25)
        const end = new Date(value[i].date)
        const styleClass = value[i].type==="home" ? "orange":"green"
        return ({id: value[i].key, content: value[i].type, start:start, end: end , className: styleClass  })
      })
      const items = [
        {id: 7, content: 'item 7', start: new Date()},
        {id: 8, content: 'item 8', start: new Date(), end: new Date(new Date().getTime()+1000*60*30)}]


      //const timelineItems = new vis.DataSet(items)
      const timelineItems = new vis.DataSet(items1)
      const options = {};
      that.TimelineElement = new vis.Timeline(container, timelineItems, options)


    })
  }

  transform(){
    console.log(this.TimelineElement)

    Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

    const today = new Date(new Date().getTime()+1000*60*60*9)
    const tomorrow = new Date(new Date().getTime()+1000*60*60*24)
    //this.TimelineElement.setWindow('2016-08-07', '2016-08-09')
    this.TimelineElement.setWindow(today.Format("yyyy-MM-dd"), tomorrow.Format("yyyy-MM-dd"))
  }

  componentDidMount() {
    this.init()
  }

  render(){
    return (
      <div>
        <p>hello vis</p>
        <div ref='container' />
        <button onClick={this.transform.bind(this)}>Today</button>
      </div>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase
}), {})(TestVis);
