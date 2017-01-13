import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import { flatActions } from 'core/flat';

import {Col} from 'react-bootstrap'

import {createChildNode} from 'utils/firebase'
import {getUniqueId} from 'utils/node2'

import 'styles/flat.less'



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
      return <Node 
             nodeUpdate={nodeUpdate}
             isRoot={false} 
             content={content} 
             _ref={_ref}
             _key={i}/>
    }):null

    return <div className="node-wrap">
        <textarea 
        onChange={this.updateContent} 
        value={content[_key].content?content[_key].content:""}/>
        <button onClick={createChildNode.bind(this, _ref, content, _key, {key: getUniqueId(), content:""}, console.log )}>+</button>
        {children}
      </div>
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
    const {flat} = this.props


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
             _key="root"/>):"loading"}
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat}), flatActions)(Newflat);
