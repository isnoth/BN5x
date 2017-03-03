import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import { uiActions } from 'core/ui';
import { pomodarioActions } from 'core/pomodario';

class TreeMenu extends React.Component {
  constructor(props){
    super(props)
    const {nodeUpdate, node, togglePomodario, setPomodarioMeta} = this.props
    this.nodeUpdate = nodeUpdate
    this.node = node
    this.styles = [
      {"background-color": "#b53f45", "color":"#fff", "border-radius":"4px"},
      {"background-color": "#acba9d", "color":"#fff", "border-radius":"4px"},
      {"background-color": "#eed19c", "color":"#fff", "border-radius":"4px"},
      {"background-color": "#efb28c", "color":"#fff", "border-radius":"4px"},
      {"background-color": "#749db9", "color":"#fff", "border-radius":"4px"},
      {"background-color": "#fff", "color":"#000", "border-radius":"4px"},
      {'text-decoration':'line-through', "color":"rgb(186, 186, 186)"},
    ]
    this.updateIcon = this.updateIcon.bind(this)
    this.togglePomodario = togglePomodario.bind(this, node)
    this.setPomodarioMeta = setPomodarioMeta.bind(this)
    this.startPomodario = this.startPomodario.bind(this)
  }

  updateIcon(index){
    this.nodeUpdate(Object.assign({}, this.node, {style: this.styles[index]}))
  }

  startPomodario(){
    this.togglePomodario()
    this.setPomodarioMeta(this.node)
  }

  render(){
    const {node} = this.props
    return <div className="node-menu">
      <button onClick={this.updateIcon.bind(this, 6)}> complete </button>
      <button onClick={this.startPomodario}> pomodario </button>
      <span className="color-item" onClick={this.updateIcon.bind(this, 0)} style={this.styles[ 0 ]}> </span>
      <span className="color-item" onClick={this.updateIcon.bind(this, 1)} style={this.styles[ 1 ]}> </span>
      <span className="color-item" onClick={this.updateIcon.bind(this, 2)} style={this.styles[ 2 ]}> </span>
      <span className="color-item" onClick={this.updateIcon.bind(this, 3)} style={this.styles[ 3 ]}> </span>
      <span className="color-item" onClick={this.updateIcon.bind(this, 4)} style={this.styles[ 4 ]}> </span>
      <span className="color-item" onClick={this.updateIcon.bind(this, 5)} style={this.styles[ 5 ]}> </span>
    </div>

  }
}

export default connect(state =>({ui: state.uiState}), Object.assign(uiActions, pomodarioActions))(TreeMenu);
