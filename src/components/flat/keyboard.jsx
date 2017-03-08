// src/components/interval-enhance.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'

// 1
export let IntervalEnhance = ComponsedComponent => class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0 // 2
    };

    const { nodeCreate, content, _key,  nodeUpdate, nodeDelete, nodeUpdateMd} = this.props
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)


  }

	bindKeys(el){
		console.log("bind keys!", ReactDOM.findDOMNode(el))


		if (el){
      ReactDOM.findDOMNode(el).addEventListener("keydown", (event)=>{
        const keyName = event.key;
        //const {  content, _key, nodeCreate, nodeUpdate, nodeCut, nodePaste } = this.props

        if (keyName === 'Control') {
          return;
        }
        //console.log(event)
        
        if (event.ctrlKey && keyName=="Enter") {
          let nNodeKey = getUniqueId()
          //console.log("nodeCreate is :", nodeCreate)
          this.nodeCreate({key: nNodeKey, content:""})

          let parent = getParent( this._key, this.content)
          if (parent){
            let children = this.content[parent].children
            console.log("children:", children)
            children?children.splice(children.indexOf(_key)+1,0,nNodeKey):[nNodeKey]
            console.log("children:", children)
            console.log("parent", parent)
            this.nodeUpdate( Object.assign({}, this.content[parent], { children: children}))
          }

        }

        if (event.ctrlKey && (keyName=="Delete" || keyName=="\\")) {
		      this.nodeDelete(_key)
        }

        if (event.shiftKey && keyName=="Enter"){

          let nNodeKey = getUniqueId()
          //console.log("nodeCreate is :", nodeCreate)
          this.nodeCreate({key: nNodeKey, content:""})

          let cNode = this.content[this._key]
          this.nodeUpdate(
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

  // 3
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  // 3
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      seconds: this.state.seconds + 1000
    });
  }

  render() {
    
    // 4
    return <ComponsedComponent {...this.props} {...this.state} bindKeys={this.bindKeys} />;
  }
};
