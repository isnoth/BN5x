var React = require('react');

class Node extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      parent: this.props.parent
      list: []
    }
  }


  componentDidMount(){
    this.base = Rebase.createClass('https://test-201601.firebaseio.com/' + this.state.parent);
    this.ref = base.
  }

  componentWillUnmount(){
    this.base.removeBinding(this.ref);
  }





}
