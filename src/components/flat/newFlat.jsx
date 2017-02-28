import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import { flatActions } from 'core/flat';

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Textarea from 'react-textarea-autosize';

import {createChildNode, createBrotherNode } from 'utils/firebase'
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'



import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

class NodeMenu extends React.Component {
  render(){
    return <div className="node-menu">
      <button>btn1 </button>
      <button>btn2 </button>
    </div>

  }
}

export class Node extends React.Component {
  constructor(props){
    super(props)
    const { nodeCreate, nodeUpdate, nodeDelete, nodeUpdateLayout, nodeUpdateMd} = this.props
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.layoutChange = this.layoutChange.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
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
    if (this._input){
      //bind keys
      ReactDOM.findDOMNode(this._input).addEventListener("keydown", (event)=>{
        const keyName = event.key;
        const { _ref, content, _key, nodeCreate, nodeUpdate, nodeCut, nodePaste } = this.props

        if (keyName === 'Control') {
          return;
        }

        console.log(event)
        
        if (event.ctrlKey && keyName=="Enter") {
          let nNodeKey = getUniqueId()
          console.log("nodeCreate is :", nodeCreate)
          nodeCreate({key: nNodeKey, content:""})

          let parent = getParent( _key, content)
          if (parent){
            let children = content[parent].children
            console.log("children:", children)
            children?children.splice(children.indexOf(_key)+1,0,nNodeKey):[nNodeKey]
            console.log("children:", children)
            console.log("parent", parent)
            nodeUpdate( Object.assign({}, content[parent], { children: children}))
          }

        }

        if (event.ctrlKey && (keyName=="Delete" || keyName=="\\")) {
		      this.nodeDelete(_key)
        }

        if (event.shiftKey && keyName=="Enter"){

          let nNodeKey = getUniqueId()
          console.log("nodeCreate is :", nodeCreate)
          nodeCreate({key: nNodeKey, content:""})

          let cNode = content[_key]
          nodeUpdate(
            Object.assign({}, cNode, { children: cNode.children?[...cNode.children, nNodeKey]:[nNodeKey] })
          )

		      //createChildNode( _ref, content, _key, {key: getUniqueId(), content:""}, console.log )
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

        if (event.ctrlKey && event.shiftKey && keyName=="!"){
          //console.log("nodePaste")
          nodeUpdate( Object.assign({}, content[_key], { styles: 1}))

          event.preventDefault()
        }

        if (event.ctrlKey && event.shiftKey && keyName=="~"){
          //console.log("nodePaste")
          nodeUpdate( Object.assign({}, content[_key], { styles: 0}))

          event.preventDefault()
        }



      });
    }
  }

  render(){
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste, nodeUpdateLayout } = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Node 
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

    if (isRoot){
      let paths = getRootPath(_key, content).map((i)=>{
        //let path = "#newflat/"+i
        return <span><a href={'#/newflat/'+i+'/'}>{content[i].content!=""||content[i].content?content[i].content:"_"}</a> > </span>
      })


      const layouts={lg:content[_key].layout?content[_key].layout:initLayout(content, _key)}
      //console.log("layouts is:", layouts)

      return <div >
            <div>
              <span className='bread-crumbs'>{paths}</span>
              <Textarea 
                ref={(c) => this._input = c}
                className='tree-textarea-root'
                onChange={this.updateContent} 
                value={content[_key].content?content[_key].content:""}/>
            </div>
            <ResponsiveReactGridLayout 
            layouts={layouts}
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
              onMouseLeave={this.clearHot}
              onDrop={this.drop.bind(this, _key)}>
                <div className="node-btn-wrap" 
                  onMouseEnter ={this.setHot}>
                  {content[_key].children?<Glyphicon className="fold" glyph={content[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !content[_key].fold)}/>:null}
                  <div className={content[_key].md?"dot-md":"dot"}></div>
                  {content[_key].fold?<div className="dot-fold" ></div>:null}
                  {this.state.hot?<div 
                    draggable='true' 
                    className="dot-hot" 
                    onDragStart={this.drag.bind(this, _key)}
                    onClick={()=>{ hashHistory.push(nodeUrl) }} 
                    ></div>:null}
                    {this.state.showMenu?<NodeMenu/>:null}
                </div>
                <Textarea 
                  className={textAreastyle}
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
    const { createRoot, nodeCreate, nodeUpdate, nodeDelete, nodeUpdateMd, nodeUpdateLayout } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
    
  }

  componentDidMount(){
    const {enableDragableFlat, disableDragableFlat} = this.props

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
  render(){
    const {flat, params, nodeCut, nodePaste } = this.props


    return (
      <Col>
        <Col md={12}>
          {flat.state == "FINISHED"?  (<Node 
             flatIsDragable={flat.flatIsDragable}
             nodeCreate={this.nodeCreate}
             nodeUpdate={this.nodeUpdate}
             nodeUpdateMd={this.nodeUpdateMd}
             nodeCut={nodeCut}
             nodePaste={nodePaste}
             nodeDelete={this.nodeDelete}
             nodeUpdateLayout={this.nodeUpdateLayout}
             isRoot={true} 
             content={flat.content} 
             _ref={flat.ref}
             _key={params.id}/>):"loading"}
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat}), flatActions)(Newflat);
