function makeResponsive() {

// THIS IS THE CODE FOR THE HEXAGON FROM VISUALCINNAMON:

var svgArea = d3.select("body").select("svg");

if (!svgArea.empty()) {
    svgArea.remove();
}

var svgHeight = window.innerHeight/2;
var svgHeight = 0
var svgWidth = 0

if (window.innerWidth > 1500){
    svgWidth = 1500
}else{
    svgWidth = window.innerWidth;
}

if (window.innerHeight < 500){
    svgHeight/3;
}else{
    svgHeight = window.innerHeight/2.5;
}

//SVG sizes and margins
var margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50,
    extra:window.innerWidth/60
}

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;



//The number of columns and rows of the heatmap
var MapColumns = 60,
    MapRows = 40;

//The maximum radius the hexagons can have to still fit the screen

var hexRadius = d3.min( [ width / ( (MapColumns + 0.5) * Math.sqrt(3) ),
    height / ( (MapRows + 1/3) * 1.5 ) ] );

if (hexRadius<=10){
    hexRadius = 16
}
    

//Calculate the center position of each hexagon
var points = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        var x = hexRadius * j * Math.sqrt(3)
        //Offset each uneven row by half of a "hex-width" to the right
        if(i%2 === 1) x += ( hexRadius * Math.sqrt(3) ) /2
        var y = hexRadius * i * 1.5
        points.push([x,y])
    }//for j
}//for i

    randomX = d3.randomNormal(width / 2, width*.1),
    randomY = d3.randomNormal(height / 2, height*.1),
    points = d3.range(100000).map(function() { return [randomX(), randomY()]; });


//Create SVG element
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.extra + "," + margin.top + ")");

//Set the hexagon radius
var hexbin = d3.hexbin().radius(hexRadius);

let points_amount = hexbin(points).length
// console.log(points_amount)

//Draw the hexagons
let hexagons = svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
        return "M" + d.x + "," + d.y + hexbin.hexagon();
    })
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .attr("value", function(d,i){
        return i
    })

    x_coordinates = []
    y_coordinates = []
    
    hexbin(points).forEach(d => {        
        x_coordinates.push(d.x)
        y_coordinates.push(d.y)
    })

    function select_Xpoints(x){
        let point_text = x_coordinates[x]
        return point_text
    }

    function select_Ypoints(x){
        let point_text = y_coordinates[x]
        return point_text
    }

    let hexagons_normal_opacity = .9

    d3.json("static/data/popularity.json").then(data =>{

    let labels_list = []
    let opacity = []
    let color_list = []

    var song_list = []
	var artist_list = []
	var album_list = []
	var album_release_date_list = []
	var external_url_list = []


    for (let i=0, j=points_amount; i<j; i++ ){
            labels_list.push(data[i]["popularity"])			
            song_list.push(data[i]["song_name"])

            artist_list.push(data[i]["artist"])
            album_list.push(data[i]["album"])
            album_release_date_list.push(data[i]["album_release_date"])
            external_url_list.push(data[i]["external_url"])

        let item_opacity = data[i]["popularity"]/data[0]["popularity"]
            opacity.push(item_opacity)

        let color = d3.interpolateSpectral(item_opacity)
            color_list.push(color)   
    }


    d3.select(".title_radar").text(`${song_list[0]}`).classed("text-center", true)
	d3.select(".artist_name_radar").text(`${artist_list[0]}`).classed("text-center", true)
	d3.select(".album_name_radar").text(`${album_list[0]}`).classed("text-center", true)
	d3.select(".album_date_radar").text(`${album_release_date_list[0]}`).classed("text-center", true)
    
    hexagons
    .on("mouseover", function(d,i) {
        d3.select(this)
            .style("opacity", 1)
			// .classed("active", true)

        let selected_row = d3.select(this).attr('value')

        d3.select(".title_radar").text(`${song_list[selected_row]}`)
        d3.select(".artist_name_radar").text(`${artist_list[selected_row]}`)
        d3.select(".album_name_radar").text(`${album_list[selected_row]}`)
        d3.select(".album_date_radar").text(`${album_release_date_list[selected_row]}`)

        let radar_data = [data_rc[selected_row]]
        RadarChart(".radarChart", radar_data, radarChartOptions)

    })
    .on('mouseout', function(d){
        d3.select(this)
            .style("opacity", hexagons_normal_opacity)
			// .classed("active", false)
    })
	.on("click",function(d){
		let selected_row = d3.select(this).attr('value')
		window.open(external_url_list[selected_row], '_blank')});


    function labels_hex(x){ 
        return labels_list[x]
    }

    // THIS IS FOR ADDING COLOR TO EACH HEXAGON:    

function select_color(x){
    let color = color_list[x]
    return color
}

    hexagons
    .transition()
    .duration(700)
    .style("fill", function(d,i){
        return select_color(i)
    })
    .style("opacity", hexagons_normal_opacity)


function select_text_color(x){
if (x>.86){
    var color2 = "white"
}else{
    var color2 = "black"
}
	// var color2 = "black"

    return color2
}



// Add Text to HEXAGONAL:

svg.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .classed("cicle_text",true)
    .style("text-anchor", "middle")
    .text( function(d,i){
        return labels_hex(i)
    })
    .attr("x", function(d,i){
            return select_Xpoints(i)
        })
    .attr("y", function(d,i){
            return select_Ypoints(i)
        })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
	.attr("value", function(d,i){
        return i
    })
    .style("font-size", 10)
    .style("fill", function (d,i){
        let x = opacity[i]
        return select_text_color(x)
    })
	.on("click",function(d){
		let selected_row = d3.select(this).attr('value')
		window.open(external_url_list[selected_row], '_blank')});

    })



/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, data, options) {
	var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 9, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 1, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	};

	let color = d3.interpolateSinebow(Math.random())	//Color variable

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = 1;
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('.0%'),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
	

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	// Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){
			return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
	   .append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){
		return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) {
		    return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");

	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){
			return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2);
		})
		.attr("y2", function(d, i){
			return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2);
		})
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){
			return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2)-10;
		})
		.attr("y", function(d, i){
			return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2)-20;
		})
        .style("font-size","18")
		.text(function(d){
			return d
		})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	//The radial line function
	var radarLine = d3.lineRadial()
		.curve(d3.curveBasisClosed)
		.radius(function(d) {
			return rScale(d.value);
		})
		.angle(function(d,i) {
			return i*angleSlice;
		});
		
	if(cfg.roundStrokes) {
		radarLine.curve(d3.curveCardinalClosed);
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter()
		.append("g")
		.attr("class", "radarWrapper");
			
	// Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) {
			return radarLine(d);
		})
		.style("fill", function(d,i) {
			return color;
		})
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.05); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.55);	
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) {
			return radarLine(d);
		})
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) {
			return color;
		})
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	

	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) {
            return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){
            return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){
            return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return color; })
		.style("fill-opacity", 0.8)
        
                

//  TEXTO PARA CADA C??RCULO DENTRO DEL RADAR
          
    blobWrapper
            .selectAll(".text")
            .data(function(d){
                return d
            })
            .enter()
            .append("text")
            .attr('x', (d,i) => {
                return parseFloat(rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2))+10 })
            .attr('y', function(d,i){
                return parseFloat(rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2))-10 })
            .text(function(d,i) {
                return Format(d.value)
            })

         

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) {
			return d;
		})
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.attr("value", function(d,i){
			return Format(d["value"])
		})     
        
        var tooltip = g.append("text")
			.attr("class", "tooltip")
			.style("opacity", 0);



	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
	
}//RadarChart

let radar_data = [data_rc[0]]

var margin = {top: 100, right: 100, bottom: 100, left: 0},
width = window.innerWidth/1.3,
height = window.innerHeight/3;

 
var radarChartOptions = {
w: width,
h: height,
margin: margin,
maxValue: 0.5,
levels: 5,
roundStrokes: true,
};

RadarChart(".radarChart", radar_data, radarChartOptions)


    }
    
    d3.select(window).on("resize", makeResponsive);

    makeResponsive()