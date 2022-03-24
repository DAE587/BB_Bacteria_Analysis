function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
  console.log(data);

    //// 3. Create a variable that holds the samples array. 


  var samplesArray = data.samples;

    console.log(samplesArray)

    //// 4. Create a variable that filters the samples for the object with the desired sample number.
  var filteredSamples = samplesArray.filter(i => i.id == sample);
    ////  5. Create a variable that holds the first sample in the array.
    var firstFilteredSample = filteredSamples[0];

    
    //// 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var chart_otu_ids = firstFilteredSample.otu_ids;
  var chart_otu_labels = firstFilteredSample.otu_labels;
  var chart_sample_values = firstFilteredSample.sample_values;


////----Create a Bar Chart----

    //// 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = chart_otu_ids.slice(0, 10).reverse().map(i => "OTU ID " + i); 

    //// 8. Create the trace for the bar chart. 
    var barData = [{
      x: chart_sample_values.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      text: chart_otu_labels
       
  }];

    //// 9. Create the layout for the bar chart. 
    var barLayout = {   
      title:{
        text: 'Top 10 Bacterias Found',
        font: {
          size: 20,
          color: "black"}},
    };
    //// 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout); 
 


 
   ////----Create a Bubble Chart----
   
   //// 1. Create the trace for the bubble chart
   var bubbleData = [{
    x: chart_otu_ids,
    y: chart_sample_values,
    text: chart_otu_labels ,
    mode: 'markers',
    marker: {
      color: chart_otu_ids,
      size: chart_sample_values, 
      colorscale: 'Earth' 
    }
  }];
  
   //// 2. Create the layout for the bubble char
   var bubbleLayout = {
    title: {
      text: 'Bacterias Per Sample',
      font: {
        size: 20,
        color: "black"}},
    xaxis: {title: "OTU ID"},
    autoexpand: 'true'
    
  };
     
   //// 3. Use Plotly to plot the data with the 
   Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
 
   
 ////----Create a Gauge Chart----


 //// 1. Create a variable that filters the metadata array for the object with the desired sample number.
  var metadata = data.metadata;
  var gaugeArray = metadata.filter(metaObject => metaObject.id == sample);


  // Create a variable that holds the first sample in the array.

 //// 2. Create a variable that holds the first sample in the metadata array.
  var gaugeResults = gaugeArray[0];


  // Create variables that hold the otu_ids, otu_labels, and sample_values.

 //// 3. Create a variable that holds the washing frequency.
 var washFreq = gaugeResults.wfreq;
 

  // 4. Create the trace for the gauge chart.
  var guageData = [{
    domain: {x:[0,1],y:[0,1]},
    value: washFreq,
    type: "indicator",
    mode: "gauge+number",
    title: {
      text: "Belly Button Washing Frequency<br><sup>Scrubs per week</sup>", 
      font: {
        size: 20,
        color: "black"}},
    gauge: {
      axis: {range: [0, 10],dtick: 2,tickwidth: 1, tickcolor: "black"},
      bar: {color: "black"},
      steps: [
        { range: [0, 2], color: "red" }, 
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "yellowgreen" },
        { range: [8, 10], color: "green" }
      ]}
    }];
  
  // 5. Create the layout for the gauge chart.
  var gaugeLayout = { 
    // width: 200, 
    // height: 600, 
    // margin: { t: 0, b: 0 }
  };
   
  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('gauge', guageData, gaugeLayout);

 });

}



