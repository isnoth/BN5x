import React from 'react';
import ReactDOM from 'react-dom';
import {Panel} from "react-bootstrap"
import mousetrap from "mousetrap"
import { connect } from 'react-redux';
import { tree2Actions } from 'core/tree2';



class Tree2 extends React.Component {

  componentDidMount(){
    var that= this
  }

  create(value){
    const {createNode} = this.props
    createNode(value)
  }

  render(){

    const {tree2 } = this.props
    console.log(tree2)

    var list = function(l){
      return l.map(function(item){
        return <p>{item}</p>
      })
    }

    return (
      <div>
        {list(tree2)}
        <button onClick={this.create.bind(this, "test")}> create </button>
      </div>
    )
  }
}

export default connect(state => ({
  tree2: state.tree2
}), Object.assign({}, tree2Actions ))(Tree2);

