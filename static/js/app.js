
//populate the metadata
function demoInfo(sample)

    //load data with d3
    d3.json('data/samples.json').then((data) =>
    {
        //grab all of the metadata
        let metaData = data.metadata;

        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];

        d3.select("#sample-metadata").html("");

        // Use Object.entries to get the value key pairs

        Object.entries(resultData).forEach(([key, value]) => {
            
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });

    });

}

//function that build bar chart
function buildBarChart(sample)
{

    //load data with d3
    d3.json('data/samples.json').then((data) =>
    {

        //all of the samples data
        let sampleData = data.samples;

        //filter based the sample value
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        //access index 0 from the array 
        let resultData = result[0];

        //parse and assign variables for otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //trace data for bar chart
        let barTrace = 
        {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar", 
            orientation: "h"
        }

        //layout for bar chart
        let barLayout = 
        {
            title: 'Top 10 Belly Button Bacteria'
        };

        //create bar chart with Plotly
        Plotly.newPlot("bar", [barTrace], barLayout);
    });
    
}

//bubble chart builder
function buildBubbleChart(sample)
{
    //load data with d3
    d3.json('data/samples.json').then((data) =>
    {

        //sample data
        let sampleData = data.samples;

        //filter based on the value of the sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        //access index 0 from the array 
        let resultData = result[0];
        // console.log(resultData);

        //parse and assign variables for otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //trace data for bubble chart
        let bubbleTrace = 
        {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            mode: "markers", 
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        //layout for bar chart
        let bubbleLayout = 
        {
            title: 'Bacteria Cultures Per Sample',
            hovermode: 'closest',
            xaxis: {title: "OTU ID"}
        };

        // Create barChart with Plotly
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
    });
}

//initilize everything
function init(data)

{

    //reference selector
    var select = d3.select("#selDataset");

        //create a variable to access 'names' from the data
        let sampleNames = data.names;

        //create a forEach to create an option in the dropdown in html 
        sampleNames.forEach((sample) => 
        {
            select.append("option")
            .text(sample)
            .property("value", sample);
        });
        let sample1 = sampleNames[0];

        //build the metadata
        demoInfo(sample1);

        //build the bar chart
        buildBarChart(sample1);

        //build bubble chart
        buildBubbleChart(sample1);       
}

//function that updates the dashboard
function optionChanged(item)
{
    //call the update to the metadata
    //pass value of item and update the demobox
    demoInfo(item);

    //funciton to build the bar chart
    buildBarChart(item);

    //function to build bubble chart
    buildBubbleChart(item);
}

//big exicute
d3.json("data/samples.json").then(
    init
);




/* 
To do: 

Create a function (init) that initilizes all the functions
Can use d3.json at the end to execute

Under init() do the following:
    Reference the selector from html <select> aka the dropdown

    Load the test subject 'names' from data create a variable to hold it, sampleNames

    Create a forEach to create an option in the dropdown in html so that each sample name is listed as text in the dropdown menu under the selector 


Create a function optionChanged(subject) so that it can reference each sampleName as subject when clicked on and prints into console, save for later

Build Demographic box and load metadata into it

When function is executed, the first sample in index 0 will load first
Create this code under sampleName.forEach

demoInfo box will now see and reference index 0 as first sample and will load in the info 

Under function demoInfo()
    Load metadata using d3 library and create a variable metaData

    Filter the metaData so that an object will refer to the metaData.id and referencing to sample 
        ** .filter(object => object.id == sample) **

    Assign variable resultData to only see index 0 of metadata array to see info like id, ethnicity, gender, etc..

    Use Object.entries to append key pairs (from resultData[0] age, id, gender etc..)
        Use d3.select to select the info from the key pairs and append to '#sample-metadata' (demographic info box) from html and insert as f-string

        Use d3.select to select the html tag '#sample-metadata' to clear out the demographic info box whenever a new sample is clicked. Otherwise will create a long list of samples rather than clearing out box. 


Next build the graphs:

    Function buildBarChart to build bar chart - buildBarChart(sample)

    Create calls in the demoInfo and init functions to execute buildBarChart functions -  buildBarChart(item), buildBArChart(sample)

    Create Trace datas and plot

    Do same for bubble chart

*/