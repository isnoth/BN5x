import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
import Textarea from 'react-textarea-autosize';
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'
import { bindKeys } from "utils/keys"

import Node from './node'
import TreeMenu from './tree-menu'
import CountDown from 'components/pomodario/pomodario'

class Tree extends React.Component{
  constructor(props){
    super(props)
    const { nodeCreate, nodeCreateChild, nodeUpdate, nodeDelete, nodeUpdateLayout, nodeUpdateMd, resized} = this.props
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeCreateChild = nodeCreateChild.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
    this.setHot = this.setHot.bind(this)
    this.clearHot = this.clearHot.bind(this)
    this.state={
      hot: false,
      showMenu: false,
      menuTmr: null,
    }
    this.resized = resized
  }

  componentWillReceiveProps(nextProps){
    const {resized} = nextProps
    if (this.resized !== resized){
      this.resizeHeight(this._input)
      this.resized = resized
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

  //calulate auto height of input
  resizeHeight(el){
    if (el){
      el.style.height = "1px";
      el.style.height  = el.scrollHeight+ "px"
    }
  }

  updateContent(evt){
    const {_key, content} = this.props

    this.resizeHeight(evt.target)
    const val = evt.target.value
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
    this.bindShortCuts()
    this.resizeHeight(this._input)
  }

  bindShortCuts(){
    const { _ref, content, _key, nodeCreate, nodeCreateNebour, nodeCreateChild, nodeDelete, nodeUpdate, nodeCut, nodePaste } = this.props
    if (this._input){
      bindKeys({
        el: ReactDOM.findDOMNode(this._input),
        keyList: [
          { keys: {ctrlKey: true, key: 'Delete'}, fn: nodeDelete.bind(this, _key) },
          { keys: {ctrlKey: true, shiftKey: false, key: 'Enter'}, fn: nodeCreateNebour.bind(this, _key, '') },
          { keys: {shiftKey: true, key: 'Enter'}, fn: nodeCreateChild.bind(this, _key) },
          { keys: {ctrlKey: true, shiftKey: true, key: 'X'}, fn: nodeCut.bind(this, _key) },
          { keys: {ctrlKey: true, shiftKey: true, key: 'V'}, fn: nodePaste.bind(this, _key) }
        ]
      });
    }
  }

  render(){
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste, nodeCreateNebour, nodeUpdateLayout, resized } = this.props
    //console.log(isRoot, content, _key, _ref)

    if (!content[_key]){
      return <textarea value={"some error occured:"+ this.props._parent+ "->" +_key}></textarea>
    }

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Tree 
                 flatIsDragable={flatIsDragable}
                 className="tree-node-wrap"
                 nodeCreate={this.nodeCreate}
                 nodeCreateNebour={nodeCreateNebour}
                 nodeCreateChild={this.nodeCreateChild}
                 nodeUpdate={this.nodeUpdate}
                 nodeDelete={this.nodeDelete}
                 nodeUpdateMd={this.nodeUpdateMd}
                 nodeCut={nodeCut}
                 nodePaste={nodePaste}
                 nodeUpdateLayout={nodeUpdateLayout}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}
                 _parent={_key}
                 resized={resized}/ >
             </div>
    }):null

    let nodeUrl = content[_key].md?("/md/"+content[_key].md):("/newflat/"+_key)

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
          <TreeMenu show={this.state.showMenu} nodeUpdate={this.nodeUpdate} node={content[_key]} onMouseBlur={this.clearHot}/>
      </div>)

    return (<div onDragOver={this.allowDrop} className="tree-node-wrap">
        <div onMouseLeave={this.clearHot} onDrop={this.drop.bind(this, _key)}>
          {btnWrap}
          <textarea
            className="tree-textarea"
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
