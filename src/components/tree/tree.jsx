import React, { Component } from 'react';
import { treeActions } from 'core/tree';
import { connect } from 'react-redux';

class About extends React.Component {

  componentWillMount() {
    console.log(this.props.registerListeners)
    this.props.registerListeners();
  }

  render(){

    var nodes = function(list){
      return list.map(function(item){
        return <p>
          {item.content}
        </p>
      })
    }

    return <div> 
        {nodes(this.props.tree)}
      </div>
  }
}

export default connect(state => ({
  //notification: state.notification,
  tree: state.tree.list
}), Object.assign({}, treeActions ))(About);
