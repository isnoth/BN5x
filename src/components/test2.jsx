import React from 'react';
import ReactDOM from 'react-dom';


var ResizableAndMovable =require('react-resizable-and-movable')




var TestApp = React.createClass({
  //mixins: [componentWidthMixin],

  render: function() {
    return (
      <div >
        <ResizableAndMovable
          x={20}
          y={20}
          width={200}
          height={200}
          style={{'backgroundColor': "lightgrey"}}
          onResize={function(direction,  styleSize, clientSize, delta){
            console.log(clientSize)
          }}
          onDrag={function(event, ui){
            console.log(ui.position)
          }}
        >  
          <p>Example</p>
          <textarea> </textarea>

        </ResizableAndMovable>
      </div>
    
    )
  }
})





export default TestApp 
