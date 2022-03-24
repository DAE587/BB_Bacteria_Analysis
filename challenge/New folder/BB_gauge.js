// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetaArray = data.metadata.filter(i => i.id == sample);
   
    // Create a variable that holds the first sample in the array.
    // 2. Create a variable that holds the first sample in the metadata array.
    var firstFilteredMeta = filteredMetaArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    // 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(firstFilteredMeta.wfreq);
   
  
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: washFreq,
      type: "indicator",
      mode: "gauge+number",
      title: {
        text: "Belly Button Washing Frequency<br><sup>Scrubs per week</sup>", 
        font: {
          size: 20,
          color: "black"}},
      gauge: {
        axis: {range: [0, 10]},
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
