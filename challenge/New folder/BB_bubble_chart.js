// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
 

    // 1. Create the trace for the bubble chart.
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
   

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
        text: 'Bacteria Cultures Per Sample',
        font: {
          size: 20,
          color: "black"}},
      xaxis: {title: "OTU ID"},
      autoexpand: 'true'
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}
