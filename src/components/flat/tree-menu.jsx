import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import { uiActions } from 'core/ui';
import { pomodarioActions } from 'core/pomodario';

class TreeMenu extends React.Component {
  constructor(props){
    super(props)
    const {nodeUpdate, node, togglePomodario, setPomodarioMeta, onMouseBlur} = this.props
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
    this.onMouseBlur = onMouseBlur.bind(this)
  }

  updateIcon(index){
    const {node} = this.props
    this.nodeUpdate(Object.assign({}, node, {style: this.styles[index]}))
  }

  startPomodario(){
    this.togglePomodario()
    this.setPomodarioMeta(this.node)
  }

  render(){
    const {node, show} = this.props
    if (show){
    return <div className="node-menu" onBlur={this.onMouseBlur}>
      <div className="arrow">
        <div className="arrow-content"></div>
        <div className="arrow-shadow"></div>
      </div>
        <div className="node-menu-content">
          <a onClick={this.updateIcon.bind(this, 6)} href={null}> complete </a>
          <a onClick={this.startPomodario}> pomod</a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 0)} style={this.styles[ 0 ]}> </a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 1)} style={this.styles[ 1 ]}> </a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 2)} style={this.styles[ 2 ]}> </a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 3)} style={this.styles[ 3 ]}> </a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 4)} style={this.styles[ 4 ]}> </a>
          <a className="color-item" onClick={this.updateIcon.bind(this, 5)} style={this.styles[ 5 ]}> </a>
      </div>
    </div>
    }else{
      return null
    }

  }
}

export default connect(state =>({ui: state.uiState}), Object.assign(uiActions, pomodarioActions))(TreeMenu);
