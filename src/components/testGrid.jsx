import React from 'react';
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

var ReactGridLayout = require('react-grid-layout');
import Textarea from 'react-textarea-autosize';

var MyFirstGrid = React.createClass({
  render: function() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2},
      {i: 'd', x: 4, y: 0, w: 1, h: 2, isDraggable: false}
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key={'a'}>a</div>
        <div key={'b'}>b</div>
        <div key={'c'}>c</div>
        <div key={'d'}>
          <Textarea> </Textarea>

        </div>
      </ReactGridLayout>
    )
  }
});

export default MyFirstGrid
