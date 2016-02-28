import React          from 'react';
import { Button }     from 'react-bootstrap';

class LayoutComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {

    }
  }

  render() {
	
  	return (

		  <div>
        <p> this is test app </p>
        <Button />
  		</div>

  	);
  }
}

export default LayoutComponent
