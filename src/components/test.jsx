import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import {Panel} from "react-bootstrap"


import { flatActions } from 'core/flat';
import { getUniqueId } from "utils/node"

//import { BarChart } from 'react-d3';


class TestApp extends React.Component {

  componentDidMount(){
    var that= this
    const{nodeCreate, nodeUpdate} = this.props
    this.onChange = this.onChange.bind(this)
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
  }


  saveData (data, fileName){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var json = JSON.stringify(data),
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    console.log(url)
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }


  onChange(event){
    console.log(event)
    const {flat} = this.props
    let reader = new FileReader();
    let file = event.target.files[0];
    let url = reader.readAsText(file);
    //console.log(url) // Would see a path?
    //console.log(file)

    reader.onloadend = () => {
      console.log(reader.result)
      let obj = JSON.parse(reader.result)
      console.log(obj)



      let id1 = getUniqueId()
      let id2 = getUniqueId()
      console.log(id1, id2)

      //change firstChild
      let first = obj['first_node']
      if (first){
        first.id = id1
        delete(obj['first_node'])
        obj[id1] = first
      }

      //change root
      let root = obj.root
      delete(obj.root)

      if (first){
        //update children
        root.children.splice(root.children.indexOf('first_node'), 1, id1)
      }
      root.id = id2
      obj[id2] = root
      console.log(obj)


      //console.log("outside:", this, that)
      //upload
      Object.keys(obj).forEach((_key, index)=>{
        setTimeout(_=>{
          this.nodeCreate(Object.assign({}, obj[_key], {key: _key}))
        }, index*1000*1)
      })


      //update root
      let rootNode = flat.content["root"]
      if (rootNode){
        let newNode = Object.assign({}, rootNode, {children: [...rootNode.children, id2]})
        console.log(newNode)
        this.nodeUpdate(newNode)
      }



    }
  }

  render(){

    const {flat} = this.props
    const now = new Date()
    const fileName = "bn5x_" + (now.getMonth()+1)+'_' +now.getDate()+".json"
    const title = (
      <h3>Panel title</h3>
    );
    const panelsInstance = (
      <div>
        <input type="file" id="myFile" onChange={this.onChange.bind(this)}/>

        <button onClick={()=>this.saveData(flat.content, fileName)}>backup</button>
      </div>
    );
    
    

    return panelsInstance 
  }
}





class TestBarChart extends React.Component {

  render(){
    const barData = [
      {
        "name": "Series A",
        "values": [
          { "x": 1, "y":  91},
          { "x": 2, "y": 290},
          { "x": 3, "y": 25},
        ]
      },
      {
        "name": "Series B",
        "values": [
          { "x": 1, "y":  9},
          { "x": 2, "y": 49},
          { "x": 3, "y": 20},
        ]
      },
      {
        "name": "Series C",
        "values": [
          { "x": 1, "y":  14},
          { "x": 2, "y": 77},
          { "x": 3, "y": 70}
        ]
      },
      {
        "name": "Series D",
        "values": [
          { "x": 1, "y":  1},
          { "x": 2, "y":  1},
          { "x": 3, "y": 70}
        ]
      },
    ];

    return (
      <BarChart
        data={barData}
        width={500}
        height={300}
        fill={'#3182bd'}
        title='Bar Chart'
        yAxisLabel='Label'
        xAxisLabel='Value'
      />
    )
  }
}
  



export default connect( state=>({flat: state.flat}), flatActions)(TestApp);
