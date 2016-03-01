var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {

  render(){
    return (
      <div style={ { paddingTop: '30px' } }>
        hello 
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
