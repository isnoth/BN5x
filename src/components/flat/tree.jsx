import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
import Textarea from 'react-textarea-autosize';
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'

import Node from './node'
import TreeMenu from './tree-menu'
import CountDown from 'components/pomodario/pomodario'

export class Tree extends Node{
  constructor(props){
    super(props)
    const { nodeCreate, nodeUpdate, nodeDelete, nodeUpdateLayout, nodeUpdateMd} = this.props
    //this.nodeCreate = nodeCreate.bind(this)
    //this.nodeUpdate = nodeUpdate.bind(this)
    //this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    //this.updateContent = this.updateContent.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
    this.setHot = this.setHot.bind(this)
    this.clearHot = this.clearHot.bind(this)
    this.state={
      hot: false,
      showMenu: false,
      menuTmr: null
    }
  }

  setHot(ev){
    this.setState({hot:true})
    this.state.menuTmr = setTimeout(()=>{
      this.setState({showMenu: true});
      console.log("tmr set");
      this.state.menuTmr = null;
    }, 500)
  }


  clearHot(ev){
    this.setState({hot: false})
    this.setState({showMenu: false});

    if (this.state.menuTmr){
      clearTimeout(this.state.menuTmr)
      this.state.menuTmr = null;
      console.log("tmr clear")
    }
  }

  updateContent(evt){
    const {_key, content} = this.props
    const val = evt.target.value

    this._input.style.height = "1px";
    evt.target.style.height  = evt.target.scrollHeight+ "px"
    evt.preventDefault()

    //console.log(val)
    if (val.indexOf("_md_")>-1){
      this.nodeUpdateMd({key: _key, content: val, md: val.slice(4)})
    }else{
      this.nodeUpdate(Object.assign({}, content[_key], {content: val}))
    }
  }

  updateFold(fold){
    const {_key, content} = this.props
    this.nodeUpdate(Object.assign({}, content[_key], {fold: fold}))
  }

  drag(_key){
    const {  nodeCut } = this.props
    nodeCut(_key)
  }

  drop(_key){
    const {  nodePaste } = this.props
    nodePaste(_key)
  }

  allowDrop(ev){
    ev.preventDefault();
  }

  layoutChange(current, all){
    const {_key, content} = this.props
    this.nodeUpdateLayout(_key, Object.assign({}, content[_key], {layout:current}))
  }

  componentDidMount(){
    this.bindKeys()
    this._input.style.height = "1px";
    this._input.style.height  = this._input.scrollHeight+ "px"
  }

  render(){
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste, nodeUpdateLayout } = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Tree 
                 flatIsDragable={flatIsDragable}
                 className="tree-node-wrap"
                 nodeCreate={this.nodeCreate}
                 nodeUpdate={this.nodeUpdate}
                 nodeDelete={this.nodeDelete}
                 nodeUpdateMd={this.nodeUpdateMd}
                 nodeCut={nodeCut}
                 nodePaste={nodePaste}
                 nodeUpdateLayout={nodeUpdateLayout}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}/>
             </div>
    }):null

    let nodeUrl = content[_key].md?("/md/"+content[_key].md):("/newflat/"+_key)
    
    //const textAreastyle = content[_key].styles? "tree-textarea node-text-"+content[_key].styles: "tree-textarea"
    let textAreastyle = "tree-textarea "
    if (content[_key].styles){
      textAreastyle += "node-text-" + content[_key].styles +' '
    }
    if (content[_key].icon){
      textAreastyle += "node-icon-" + content[_key].icon +' '
    }

    const btnWrap = (
      <div className="node-btn-wrap" onMouseEnter ={this.setHot}>
        {content[_key].children?<Glyphicon className="fold" glyph={content[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !content[_key].fold)}/>:null}
        <div className={content[_key].md?"dot-md":"dot"}></div>
        {content[_key].fold?<div className="dot-fold" ></div>:null}
        {this.state.hot?<div 
          draggable='true' 
          className="dot-hot" 
          onDragStart={this.drag.bind(this, _key)}
          onClick={()=>{ hashHistory.push(nodeUrl) }} 
          ></div>:null}
          {this.state.showMenu?<TreeMenu nodeUpdate={this.nodeUpdate} node={content[_key]}/>:null}
      </div>)

    return (<div onDragOver={this.allowDrop} className="tree-node-wrap">
        <div onMouseLeave={this.clearHot} onDrop={this.drop.bind(this, _key)}>
          {btnWrap}
          <textarea
            className={textAreastyle}
            style={content[_key].style}
            ref={(c) => this._input = c}
            onChange={this.updateContent} 
            value={content[_key].content?content[_key].content:""} />
          {content[_key].pomodario?<CountDown timer={60*25} onTimeOut={()=>{console.log("timeout")}}/>:""}
        </div>
        {content[_key].fold?null:children}
      </div>)
  }
}
export default Tree
