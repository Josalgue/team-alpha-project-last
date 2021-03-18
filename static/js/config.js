
let jsondata = d3.json("/json_gauges")
// let jsondata = d3.json("decades.json")
console.log(jsondata)

let data = jsondata.then(data=>{
    danceabilityarray = data.map(d=>d.danceability)
    energyarray = data.map(d=>d.energy)
    valencearray = data.map(d=>d.valence)
    poparray = data.map(d=>d.popularity)
    console.log(danceabilityarray)
    console.log(energyarray)
    console.log(valencearray)
    console.log(poparray)
}) ;

function init() {
    
    let chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['Danceability', 55]
            ],
            type: 'gauge',
        
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#5c5b5b00'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
                values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Energy gauge chart
    let chart1 = c3.generate({
        bindto: '#chart1',
        data: {
            columns: [
                ['Energy', 55]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#5c5b5b00'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Valence gauge chart
    let chart2 = c3.generate({
        bindto: '#chart2',
        data: {
            columns: [
                ['Valence', 55]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#5c5b5b00'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Popularity gauge chart
    let chart3 = c3.generate({
        bindto: '#chart3',
        data: {
            columns: [
                ['Popularity', 55]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#5c5b5b00'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });
}

// Call updatePlot() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

// This function is called when a dropdown menu item is selected
function updatePlot() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize data arrays
    let danceabilityvalue = [];
    let energyvalue= [];
    let valencevalue = [];
    let popvalue = [];
  
    if (dataset === '1950') {
        danceabilityvalue = danceabilityarray[0]
        energyvalue = energyarray[0]
        valencevalue = valencearray[0]
        popvalue = poparray[0]
    }
  
    if (dataset === '1960') {
        danceabilityvalue = danceabilityarray[1]
        energyvalue = energyarray[1]
        valencevalue = valencearray[1]
        popvalue = poparray[1]
    }

    if (dataset === '1970') {
        danceabilityvalue = danceabilityarray[2]
        energyvalue = energyarray[2]
        valencevalue = valencearray[2]
        popvalue = poparray[2]
    }

    if (dataset === '1980') {
        danceabilityvalue = danceabilityarray[3]
        energyvalue = energyarray[3]
        valencevalue = valencearray[3]
        popvalue = poparray[3]
    }

    if (dataset === '1990') {
        danceabilityvalue = danceabilityarray[4]
        energyvalue = energyarray[4]
        valencevalue = valencearray[4]
        popvalue = poparray[4]
    }

    if (dataset === '2000') {
        danceabilityvalue = danceabilityarray[5]
        energyvalue = energyarray[5]
        valencevalue = valencearray[5]
        popvalue = poparray[5]
    }

    if (dataset === '2010') {
        danceabilityvalue = danceabilityarray[6]
        energyvalue = energyarray[6]
        valencevalue = valencearray[6]
        popvalue = poparray[6]
    }


    // Danceability gauge chart
    let chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['Danceability', danceabilityvalue]
            ],
            type: 'gauge',
        
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Energy gauge chart
    let chart1 = c3.generate({
        bindto: '#chart1',
        data: {
            columns: [
                ['Energy', energyvalue]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Valence gauge chart
    let chart2 = c3.generate({
        bindto: '#chart2',
        data: {
            columns: [
                ['Valence', valencevalue]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });

    // Popularity gauge chart
    let chart3 = c3.generate({
        bindto: '#chart3',
        data: {
            columns: [
                ['Popularity', popvalue]
            ],
            type: 'gauge',
            
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: true // to turn off the min/max labels.
        },
    min: 30, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 80, // 100 is default
    units: ' %',
    width: 50 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
            unit: 'value', // percentage is default
            max: 200, // 100 is default
            values: [40, 50, 60, 70]
            }
        },
        size: {
            height: 180
        }
    });
}

init();
