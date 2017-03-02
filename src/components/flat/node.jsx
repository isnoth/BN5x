import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
import Textarea from 'react-textarea-autosize';
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'


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
        //console.log(event)
        
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
    return <p>render</p>
  }
}
export default Node
