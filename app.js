// Define a global variable to store filtered samples
let filteredSamplesArray = [];
let samplesArray = []; // Define a global variable to store samples
let metadata = []; // Define a global variable to store metadata

// Define optionChanged function in the global scope
function optionChanged() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Filter samples based on the selected dataset
  const selectedSamples = filteredSamplesArray.filter(sample => sample.id === dataset);
  console.log(selectedSamples);

  // Extract otu_ids and sample_values for the selected dataset
  let x = selectedSamples.map(sample => sample.otu_ids);
  let y = selectedSamples.map(sample => sample.sample_values);
  let markerColors = selectedSamples.map(sample => getColor(sample.otu_ids)); // Get colors for each otu_id
  let text = selectedSamples.map(sample => sample.sample_otu_labels);

  // Update the bubble chart
  Plotly.restyle("bubble", "x", [x]);
  Plotly.restyle("bubble", "y", [y]);
  Plotly.restyle("bubble", "marker.color", [markerColors]); // Update marker colors
  Plotly.restyle("bubble", "text", [text]); 

  // Update the bar chart data to include only the top 10 values of the selected dataset
  let barData = [{
    x: selectedSamples.slice(0, 10).map(sample => sample.sample_values),
    y: selectedSamples.slice(0, 10).map(sample => sample.otuIds),
    type: 'bar',
    orientation: 'h',
    text: selectedSamples.slice(0,10).map(sample =>sample.otu_labels)
  }];

  // Bar chart layout
  let barLayout = {
    title: 'Top 10 Bacteria Samples Per Test Subject',
    xaxis: {
      title: 'Volume of Bacteria'
    }
  };

  // Plotly.react is used to update the bar chart
  Plotly.react("bar", barData, barLayout);
  
  // Update the Card with Demo data
  updateCard();
}

// Function to update the card body content based on the selected dataset
function updateCard() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Filter metadata based on the selected dataset
  const selectedMetadata = metadata.find(meta => meta.id === parseInt(dataset));

  // Update the content of specific elements in the card body
  d3.select("#sample-metadata")
    .html(""); // Clear existing content
  Object.entries(selectedMetadata).forEach(([key, value]) => {
    d3.select("#sample-metadata")
      .append("p")
      .text(`${key.toUpperCase()}: ${value}`);
  });
}

 // Function to get color based on otu_id
 function getColor(otu_id) {
  // return a random color for new otu_id
  return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}

// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and initialize the plot
d3.json(url)
  .then(function(data) {
    // Once the data is fetched, process it
    console.log(data);
    samplesArray = data.samples;
    metadata = data.metadata;

    // Process samples data and store the filtered samples
    filteredSamplesArray = processSamples(samplesArray);

    console.log(filteredSamplesArray);

    // Add new property to filteredSamplesArray for bar chart usage 
    filteredSamplesArray.forEach(obj => {
      obj.otuIds = "otu_id" + " " + obj.otu_ids
    });

    // Extract unique IDs from the filtered samples
    const uniqueIds = filteredSamplesArray.map(sample => sample.id);

    // Remove duplicates from the unique IDs
    const uniqueIdsSet = new Set(uniqueIds);
    const uniqueIdsArray = Array.from(uniqueIdsSet);

    // Select the dropdown menu
    const dropdownMenu = d3.select("#selDataset");

    // Populate the dropdown menu with unique IDs
    uniqueIdsArray.forEach(id => {
      dropdownMenu.append("option")
        .text(id)
        .attr("value", id);
    });

    // Initialize the plots with default data
    init();
  })
  .catch(error => console.error(error));

// Create function to process samples
function processSamples(samples) {
  let filteredSamples = [];

  // Group samples by ID
  samples.forEach(sample => {
    const id = sample.id;
    const otuIds = sample.otu_ids;
    const sampleValues = sample.sample_values;
    const otuLabels = sample.otu_labels;

    // Combine sample data
    const combinedSamples = otuIds.map((otuId, index) => {
      return {
        id: id,
        otu_ids: otuId,
        sample_values: sampleValues[index],
        otu_labels: otuLabels[index]
      };
    });

    // Sort combined samples in descending order of sample values
    combinedSamples.sort((a, b) => b.sample_values - a.sample_values);

    // Add sorted combined samples to filteredSamples
    filteredSamples.push(...combinedSamples);
  });

  return filteredSamples;
}

// Initializes the page with default plots
function init() {
  // Bar chart data
  let barData = [{
    x: filteredSamplesArray.slice(0, 10).map(sample => sample.sample_values),
    y: filteredSamplesArray.slice(0, 10).map(sample => sample.otuIds),
    type: 'bar',
    orientation: 'h',
    text: filteredSamplesArray.slice(0, 10).map(sample => sample.sample_otuLabels)
  }];

  // Bar chart layout
  let barLayout = {
    title: 'Top 10 Bacteria Samples Per Test Subject',
    xaxis: {
      title: 'Volume of Bacteria'
    }
  };

  // Plot the bar chart
  Plotly.newPlot("bar", barData, barLayout);

  // Bubble chart data
  let bubbleData = [{
    x: filteredSamplesArray.map(sample => sample.otu_ids),
    y: filteredSamplesArray.map(sample => sample.sample_values),
    mode: 'markers',
    marker: {
      size: filteredSamplesArray.map(sample => sample.sample_values),
    },
    text: filteredSamplesArray.map(sample => sample.otu_labels),
  }];

  // Bubble chart layout
  let bubbleLayout = {
    title: "Bacteria Values per Sample",
    showlegend: false,
    height: 600,
    width: 1200
  };

  // Plot the bubble chart
  Plotly.newPlot('bubble', bubbleData, bubbleLayout);

  // Call optionChanged function to initialize the card with default data
  optionChanged();
}
