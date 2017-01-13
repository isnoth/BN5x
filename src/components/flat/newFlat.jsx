import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import { flatActions } from 'core/flat';

import {Col} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import {createChildNode} from 'utils/firebase'
import {getUniqueId, initLayout} from 'utils/node2'

import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'
//import 'styles/styles.css'



export class Node extends React.Component {
  constructor(props){
    super(props)
    const { nodeUpdate } = this.props
    this.nodeUpdate = nodeUpdate.bind(this)
    this.updateContent = this.updateContent.bind(this)
  }

  updateContent(evt){
    const {_key} = this.props
    this.nodeUpdate({key: _key, content: evt.target.value})
  }


  render(){
    const {isRoot, content, _key, _ref, nodeUpdate} = this.props
    console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div className="node-wrap" key={i}> 
               <Node 
                 nodeUpdate={nodeUpdate}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}/>
             </div>
    }):null

    let nodeUrl = "#newflat/"+_key

    if (isRoot){
      return <div >
          <button onClick={createChildNode.bind(this, _ref, content, _key, {key: getUniqueId(), content:""}, console.log )}>+</button>
          <a href={nodeUrl}> link </a>
          <textarea 
          onChange={this.updateContent} 
          value={content[_key].content?content[_key].content:""}/>

          <ReactGridLayout 
            className="layout" 
            layout={initLayout(content, _key)} 
            cols={48}
            rowHeight={30} 
            width={1580} >
          {children}
          </ReactGridLayout>

            {/*<ResponsiveReactGridLayout 
            className="layout" 
            layouts={{lg:initLayout(content, _key)}}
            breakpoints={{lg: 1200,  xs: 480}}
            cols={{lg: 48, xs: 1 }}
            rowHeight={30} 
            isDraggable={true}
            isResizable={true}
            >
          {children}
          </ResponsiveReactGridLayout>*/}
        </div>
    }else{
      return <div className="node-wrap">
          <button onClick={createChildNode.bind(this, _ref, content, _key, {key: getUniqueId(), content:""}, console.log )}>+</button>
          <a href={nodeUrl}> link </a>
          <textarea 
          onChange={this.updateContent} 
          value={content[_key].content?content[_key].content:""}/>
          {children}
        </div>

    }
  }
}

export class Newflat extends React.Component {
  constructor(props){
    super(props)
    const { createRoot, nodeUpdate } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
  }
  render(){
    const {flat, params} = this.props


    return (
      <Col>
        <Col md={6}>
          <b>newflat <button onClick={this.createRoot}>create root</button></b>
        </Col>

        <Col md={6}>
          {flat.content?  (<Node 
             nodeUpdate={this.nodeUpdate}
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
