var React = require('react');
var ReactDOM = require('react-dom');
var AddItem = require('./AddItem');
var List = require('./List');
import Rebase from 're-base';

var base = Rebase.createClass('https://test-201601.firebaseio.com/');


base.push('-KBlVOQst7m8WKxd4cT_', {
  data: {name: 'George', type: 'Grizzly'},
  then(){
    console.log('set ok')
  }
})

/*
base.fetch('-KBMQ3AV_W0sXMT4gB9_', {
  context: this,
  asArray: true,
  then(data){
    console.log(data);
  }
});
*/

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount(){
    this.ref = base.syncState('todoList', {
      context: this,
      state: 'list',
      asArray: true,
      then(){
        this.setState({loading: false})
        console.log(this.state.list)
      }
    })
  }
  componentWillUnmount(){
    base.removeBinding(this.ref)
  }
  handleAddItem(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  }
  handleRemoveItem(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  }

  render(){
    return (
      <div>
        {this.state.loading === true ? <h3> LOADING... </h3> : <List items={this.state.list} remove={this.handleRemoveItem.bind(this)}/>}
        <AddItem add={this.handleAddItem.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
