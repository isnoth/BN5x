var React = require('react');
var ReactDOM = require('react-dom');
import Rebase from 're-base';

var base = Rebase.createClass('https://jt-ts.firebaseio.com/rebase-chat');
console.log('Please change to your own firebase address in components/Container.js');

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
