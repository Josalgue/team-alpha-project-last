function bar_chart(kind_of_chart, type_of_feature) {

let svgArea = d3.select("body").select("svg");
let plotlyArea = d3.select(".plot-container")

if (!plotlyArea.empty()) {
  plotlyArea.remove();
  d3.select(".comparison_title").text("")
}

if (!svgArea.empty()) {
    svgArea.remove();
}

let svgHeight = 0;
let svgWidth = 0;

if (window.innerWidth > 1500){
<<<<<<< HEAD
  svgWidth = 1500
}else{
  svgWidth = window.innerWidth;
}

if (window.innerHeight < 500){
  svgHeight = window.innerHeight/2;
}else{
  svgHeight = 400;
=======
    svgWidth = 1500
}else{
    svgWidth = window.innerWidth;
}

if (window.innerHeight < 500){
    svgHeight/3;
}else{
    svgHeight = 400;
>>>>>>> f15123b2121d3c48f68ec1ca847e8317b454bd08
}

//SVG sizes and margins
let margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50,
    // extra:window.innerWidth/60
}

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

<<<<<<< HEAD
// console.log(height*1.4)
=======
console.log(height*1.4)
>>>>>>> f15123b2121d3c48f68ec1ca847e8317b454bd08



//Create SVG element
let svg = d3.select("#bar_chart")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// This is to give format to the titles:
  var capitalized_type_of_feature = type_of_feature[0].toUpperCase()+type_of_feature.slice(1)

  if (kind_of_chart === "cons"){
    var title_of_chart = "Consumption"
  }else if (kind_of_chart === "prod"){
    var title_of_chart = "Production"
  }


  d3.select(".study_title").text(`"${capitalized_type_of_feature}" according to "${title_of_chart}" `)

  d3.json("static/data/countries_comparison.json").then(data =>{

    max_value = d3.max([d3.max(data, d => d.danceability), d3.max(data, d => d.energy), d3.max(data, d => d.valence)])
    
    let production_data = data.filter(d => d.type_of_info === "prod")
    y_production = d3.map(production_data, function(d){
      return d[`${type_of_feature}`]
    })

    let consumption_data = data.filter(d => d.type_of_info === "cons")
    y_consumption = d3.map(consumption_data, function(d){
      return d[`${type_of_feature}`]
    })  
    
    var data = data.filter(d => d.type_of_info === kind_of_chart)
  
    
  // THIS IS FOR ADDING COLOR TO EACH BAR:

  let color_list = []

  for (let i=0, n=data.length; i<n; i++){ 

     let color = d3.schemeDark2[i]
    //  let color = d3.schemeTableau10[i]
    color_list.push(color)
  }

  function select_color(x){
    let color = color_list[x]
    return color
  }

  let list_of_countries=[]

  // Cast the hours value to a number for each piece of tvData
  data.forEach(function(d) {
    d.danceability = +d.danceability;
    d.energy = +d.energy;
    d.valence = +d.valence;
    list_of_countries.push(d.countries)
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.countries))
    .padding(0.3);


  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
        .domain([0, max_value*1.1])
        .range([height, 0]);

 
  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);


  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // TOOLTIP
// THIS ONE WORKS WITHOUT LOCATION:
let tooltip =  d3.select("#bar_chart")
  .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "7px")
    .style("padding", "10px")



  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll("#bar_chart")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.countries))
    .attr("y", d => yLinearScale(d[`${type_of_feature}`]))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => height - yLinearScale(d[`${type_of_feature}`]))
    .attr("value", (d,i) => select_color(i))
    .style("fill", (d,i) => select_color(i))
    .on('mouseover', function(d,i) {
        
        tooltip
        .style("visibility", "visible")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px")
        .html((i[`${type_of_feature}`]))


    })
    .on('mouseout', function(d) {
        let color = d3.select(this).attr("value")
        d3.select(this)
        .transition()
        .duration(50)
        .style("fill", color)

        tooltip.style("visibility", "hidden");
      })


    let button_comparison = d3.select("#comparison_button")

    button_comparison.on('click', function(d) {
      
      d3.select(".study_title").text("");
<<<<<<< HEAD
      d3.selectAll(svg).remove()

      d3.select(".comparison_title").text(`Feature compared: "${capitalized_type_of_feature}"`)

    //   if (!svgArea.empty()) {
    //     svgArea.remove();
        
    // }

=======
      d3.select(".comparison_title").text(`Feature compared: "${capitalized_type_of_feature}"`)

      d3.selectAll(svg).remove()

      if (!svgArea.empty()) {
        svgArea.remove();
        
    }
>>>>>>> f15123b2121d3c48f68ec1ca847e8317b454bd08
      var trace2 = {
        x: list_of_countries,
        y: y_production,
        name: 'Production',
        marker:{
          color: color_list[3]
        },
        type: 'bar'
      };
      
      var trace1 = {
        x: list_of_countries,
        y: y_consumption,
        name: 'Consumption',
        marker:{
          opacity: 0.6,
          color: color_list[5]
        },
        type: 'bar'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        barmode: 'group',
        width: width,
        height: height*1.4,
        margin: {
          l: margin.left,
          r: margin.right,
          b: margin.bottom,
          t: margin.top,
        },
    };
      
      Plotly.newPlot('bar_chart', data, layout);

  })


}).catch(function(error) {
  console.log(error);
});

}

var kind_of_chart = "cons"
var type_of_feature = "danceability"

bar_chart(kind_of_chart, type_of_feature)

d3.select(".select_chart").on("change",function(){
  kind_of_chart = d3.select(this).property("value")
  bar_chart(kind_of_chart, type_of_feature)
  })

d3.select(".select_feature").on("change",function(){
  type_of_feature = d3.select(this).property("value")
  bar_chart(kind_of_chart, type_of_feature)
  })

<<<<<<< HEAD
// function makeResponsive() {
//   bar_chart(kind_of_chart, type_of_feature)
// }


// d3.select(window).on("resize", makeResponsive);
=======
function makeResponsive() {
  bar_chart(kind_of_chart, type_of_feature)
}


d3.select(window).on("resize", makeResponsive);
>>>>>>> f15123b2121d3c48f68ec1ca847e8317b454bd08
    
