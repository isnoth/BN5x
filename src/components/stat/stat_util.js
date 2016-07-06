

import Firebase from 'firebase';
import d3 from "d3"
import _ from "lodash"


export function toDate(i) {
  return (i-i%86400000)
}

export function generateDateArray(f, t){
  var base = toDate(f)
  var l = []
  for (var i=0; i<100; i++){
    if ((base+i*86400000) > t){
      return l
    }
    l.push(base+i*86400000 )
  }
  return l
}


export function mapTolist(l){
  //to date
  var l1 =  l.map(function(i){
    return Object.assign({}, i, {date: toDate(i.date)})
  })

  //count 
  var l2 = _.countBy(l1, function(i){
      return i.date
  })


  //to array
  return Object.keys(l2).map(function(key){
    //return [parseInt(key), l2[key]]
    return {date: parseInt(key), count: l2[key]}
  })
}


export function toListHome(l){
  var l2 = l.filter(function (i){
    return i.type == "home"
  })


  return mapTolist(l2)
}

export function toListWork(l){
  var l2 = l.filter(function (i){
    return i.type == "work"
  })

  //console.log(l2)

  return mapTolist(l2)
}

//module.exports = {
export function stat(e){
       function render(e, data1, data2){
         console.log('render')
           var margin = {top: 20, right: 20, bottom: 70, left: 40},
               width = 600 - margin.left - margin.right,
               height = 300 - margin.top - margin.bottom;
           
           // Parse the date / time
           //var parseDate = d3.time.format("%Y-%m").parse;
           //var parseDate = d3.time.format("%Y-%m")
           
           var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
           
           var y = d3.scale.linear().range([height, 0]);
           
           var xAxis = d3.svg.axis()
               .scale(x)
               .orient("bottom")
               .tickFormat(d3.time.format("%m-%d"));
           
           var yAxis = d3.svg.axis()
               .scale(y)
               .orient("left")
               .ticks(10);
           
           var svg = d3.select(e).append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
             .append("g")
               .attr("transform", 
                     "translate(" + margin.left + "," + margin.top + ")");
           
              
           
           data1.forEach(function(d) {
               d.date = new Date(d.date)
               d.value = +d.count;
               return d
           });
           console.log(data1)

           data2.forEach(function(d) {
               d.date = new Date(d.date)
               d.value = +d.count;
               return d
           });
         
         x.domain(data1.map(function(d) { return d.date; }));
         //var current = new Date()
         //var l = generateDateArray(current-86400000*7, current)
         //console.log(l)
         //x.domain(l);
         //y.domain([0, d3.max(data1, function(d) { return d.value; })]);
         y.domain([0, 16]);
       
         svg.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis)
           .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", "-.55em")
             .attr("transform", "rotate(-90)" );
       
         svg.append("g")
             .attr("class", "y axis")
             .call(yAxis)
           .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("Value ($)");
       
         svg.selectAll("bar")
             .data(data1)
           .enter().append("rect")
             .style("fill", "steelblue")
             .attr("x", function(d) { return x(d.date); })
             .attr("width", x.rangeBand()/2)
             .attr("y", function(d) { return y(d.value); })
             .attr("height", function(d) { return height - y(d.value); });
       
         svg.selectAll("bar")
             .data(data2)
           .enter().append("rect")
             .style("fill", "orange")
             .attr("x", function(d) { return x(d.date) + x.rangeBand()/2; })
             .attr("width", x.rangeBand()/2)
             .attr("y", function(d) { return y(d.value); })
             .attr("height", function(d) { return height - y(d.value); });


         var yTextPadding = 20;
         svg.selectAll(".bartext")
         .data(data1)
         .enter()
         .append("text")
         .attr("class", "bartext")
         .attr("text-anchor", "middle")
         .attr("fill", "white")
         .attr("x", function(d) { return x(d.date)+10; })
         .attr("y", function(d) { return y(d.value)+10; })
         .text(function(d){
           return d.value;
         });

       //limit lines
       var line = svg.append("line")
         .attr("x1",0)
         .attr("y1", y(4))
         .attr("x2", width)
         .attr("y2", y(4))
         //.attr("transform", "translate(0," + height + ")")
         .attr("stroke","orange")
         .attr("stroke-width",2)

       //limit lines2
       var line = svg.append("line")
         .attr("x1",0)
         .attr("y1", y(15))
         .attr("x2", width)
         .attr("y2", y(15))
         //.attr("transform", "translate(0," + height + ")")
         .attr("stroke","steelblue")
         .attr("stroke-width",2)
       };
       



            

      
      var url = 'https://thisisatestapp.firebaseio.com/items/test4/'
      var ref = new Firebase(url).child('pomodarios'); 
      ref.on("value", function(snapshoot){
        console.log(snapshoot.val())
        var data = snapshoot.val()

        var dataArray = Object.keys(data).map(function(key){
          return data[key]
        })

        console.log("dataArray is:", dataArray)
        console.log(dataArray.length)

        var filterData = dataArray.filter(function(each){
          return ((each.date != undefined) && (each.qid != undefined) )
        })

        console.log("filterData:", filterData)
        console.log(filterData.length)


        var data1 = toListWork(filterData)
        var data2 = toListHome(filterData)
        console.log("data1, data2", data1, data2)

        render(e, data1, data2)
      })

      //d3.csv("geonames_cities_top3.csv", type, render);
    }
//}

