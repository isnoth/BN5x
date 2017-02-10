import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import { flatActions } from 'core/flat';

import {Col, Glyphicon} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Textarea from 'react-textarea-autosize';

import {createChildNode, createBrotherNode, nodeDelete, nodeUpdate} from 'utils/firebase'
import {getUniqueId, initLayout, getRootPath} from 'utils/node2'

import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

export class Node extends React.Component {
  constructor(props){
    super(props)
    const { nodeUpdateMd } = this.props
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.layoutChange = this.layoutChange.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
    this.setHot = this.setHot.bind(this)
    this.clearHot = this.clearHot.bind(this)
    this.state={
      hot: false
    }
  }

  setHot(ev){
    this.setState({hot:true})
  }

  clearHot(ev){
    this.setState({hot: false})
  }

  updateContent(evt){
    const {_ref, _key} = this.props
    const val = evt.target.value
    if (val.indexOf("_md_")>-1){
      this.nodeUpdateMd({key: _key, content: val, md: val.slice(4)})
    }else{
      nodeUpdate(_ref, {key: _key, content: val})
    }
  }

  updateFold(fold){
    const {_ref, _key} = this.props
    nodeUpdate(_ref, {key: _key, fold: fold})
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
    const {_ref, _key} = this.props
    const newlayout = current.map(i=>(
      {
      i:i.i,
      x:i.x,
      y:i.y,
      w:i.w,
      h:i.h, }
    ))
    nodeUpdate(_ref, {key: _key, layout: newlayout})
  }

  componentDidMount(){
    if (this._input){
      //bind keys
      ReactDOM.findDOMNode(this._input).addEventListener("keydown", (event)=>{
        const keyName = event.key;
        const { _ref, content, _key, nodeCut, nodePaste } = this.props

        if (keyName === 'Control') {
          return;
        }

        //console.log(event)
        
        if (event.ctrlKey && keyName=="Enter") {
		      createBrotherNode( _ref, content, _key, {key: getUniqueId(), content:""}, console.log )
        }

        if (event.ctrlKey && keyName=="Delete") {
		      nodeDelete( _ref, content, _key)
        }

        if (event.shiftKey && keyName=="Enter"){
		      createChildNode( _ref, content, _key, {key: getUniqueId(), content:""}, console.log )
          event.preventDefault()
        }

        if (event.ctrlKey && event.shiftKey && keyName=="X"){
          //console.log("nodeCut")
          nodeCut(_key)
        }

        if (event.ctrlKey && event.shiftKey && keyName=="V"){
          //console.log("nodePaste")
          nodePaste(_key)
          event.preventDefault()
        }
      });
    }
  }

  render(){
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste } = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Node 
                 flatIsDragable={flatIsDragable}
                 className="tree-node-wrap"
                 nodeUpdateMd={this.nodeUpdateMd}
                 nodeCut={nodeCut}
                 nodePaste={nodePaste}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}/>
             </div>
    }):null

    let nodeUrl = content[_key].md?("/md/"+content[_key].md):("/newflat/"+_key)

    if (isRoot){
      /*
      let paths = getRootPath(_key, content).map((i)=>{
        //let path = "#newflat/"+i
        return <span><a href={'#/newflat/'+i+'/'}>{content[i].content!=""||content[i].content?content[i].content:"_"}</a> > </span>
      })
      */

      return <div >
            <div>
            {/*<span className='bread-crumbs'>{paths}</span>*/}
              <Textarea 
                ref={(c) => this._input = c}
                className='tree-textarea-root'
                onChange={this.updateContent} 
                value={content[_key].content?content[_key].content:""}/>
            </div>

            <ResponsiveReactGridLayout 
            layouts={{lg:content[_key].layout?content[_key].layout:initLayout(content, _key)}}
            breakpoints={{lg: 1200,  xs: 480}}
            cols={{lg: 48, xs: 1 }}
            rowHeight={30} 
            isDraggable={flatIsDragable}
            isResizable={true}
            onLayoutChange={(current, all)=>{ this.layoutChange( current, all)}}
            >
            {children}
          </ResponsiveReactGridLayout>
        </div>
    }else{
      return <div 
              onDragOver={this.allowDrop} 
              className="tree-node-wrap">
              <div
                onDrop={this.drop.bind(this, _key)}  
              >
                <div className="node-btn-wrap" 
                  onMouseEnter ={this.setHot}
                  onMouseLeave={this.clearHot}
                >
                  {content[_key].children?<Glyphicon className="fold" glyph={content[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !content[_key].fold)}/>:null}
                  <div className={content[_key].md?"dot-md":"dot"}></div>
                  {content[_key].fold?<div className="dot-fold" ></div>:null}
                  {this.state.hot?<div 
                    draggable='true' 
                    className="dot-hot" 
                    onDragStart={this.drag.bind(this, _key)}
                    onClick={()=>{ hashHistory.push(nodeUrl) }} 
                    ></div>:null}
                </div>
                <Textarea 
                  className='tree-textarea'
                  ref={(c) => this._input = c}
                  onChange={this.updateContent} 
                  value={content[_key].content?content[_key].content:""}/>
              </div>
            {content[_key].fold?null:children}
        </div>

    }
  }
}

export class Newflat extends React.Component {
  constructor(props){
    super(props)
    const { createRoot, nodeUpdateMd } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
  }

  componentDidMount(){
    const {enableDragableFlat, disableDragableFlat } = this.props

    document.body.addEventListener("keydown", (ev)=>{
      console.log()
      if (ev.keyCode=="18"){
        enableDragableFlat()
      }
    })

    document.body.addEventListener("keyup", (ev)=>{
      if (ev.keyCode=="18"){
        disableDragableFlat()
      }
    })
  }

  // check id if avaliable in the root ref
  componentWillReceiveProps(nextProps) {
    const {flat, params, startListening} = nextProps
    //not find in then root ref, check files
    
    let allContent = []
    Object.keys(flat.files).map(i=>(allContent = Object.assign({}, allContent, flat.files[i].content)))
    if (!flat.files[params.id] && !allContent[params.id]){
      startListening(params.id)
    }

    console.log(allContent)
    let l = 0;
    Object.keys(allContent).forEach(i=>{
      let node = allContent[i]
      if (node.children){
        let lc = node.children.length
        l = l+lc
        if(node.layout){
          l = l+lc*5
        }
      }
      l = l+3 //content & key & current
    })

    console.log('length is: ', l)
  }


  render(){
    const {flat, params, nodeCut, nodePaste } = this.props

    let allContent = []
    let _ref;
    Object.keys(flat.files).map(i=>{
      //search and get ref
      if (flat.files[i].content[params.id]){
        _ref = flat.files[i].ref
      }

      allContent = Object.assign({}, allContent, flat.files[i].content)
    })

    return (
      <Col>
        <Col md={12}>
          {(Object.keys(allContent).length) && allContent[params.id] ?  (<Node 
             flatIsDragable={flat.flatIsDragable}
             nodeUpdateMd={this.nodeUpdateMd}
             nodeCut={nodeCut}
             nodePaste={nodePaste}
             isRoot={true} 
             content={allContent} 
             _ref={_ref}
             _key={params.id?params.id:"root"}/>):"loading"}
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat}), flatActions)(Newflat);
