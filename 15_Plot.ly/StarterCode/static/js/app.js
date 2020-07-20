// d3.json("static/data/samples.json").then(function(data) {
//     console.log(data);
// });

$(document).ready(function() {
    IDFilter();
});

function IDFilter() {
    $.ajax({
        type: 'GET',
        url: "static/data/samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            console.log(data);
            data["names"].forEach(function(id) {
                // console.log(id);
                let option = `<option>${id}</option>`;
                $('#selDataset').append(option);
            });

            let initID = data["names"][0]

            optionChanged(initID);
        }
    });
}

function optionChanged(id) {
    loadMetaData(id);
    makeBarPlot(id);
    makeBubblePlot(id);
    makeGuagePlot(id);
}

function loadMetaData(id) {
    $.ajax({
        type: 'GET',
        url: "static/data/samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let metaData = data["metadata"].filter(x => x.id == id)[0];
            console.log(metaData);

            $('#sample-metadata').empty();

            Object.entries(metaData).forEach(function([key, value]) {
                let info = `<p><b>${key.toUpperCase()}</b> : ${value} </p>`;
                $('#sample-metadata').append(info);
            });
        }
    });
}

function makeBarPlot(id) {
    $.ajax({
        type: 'GET',
        url: "static/data/samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sampleData = data["samples"].filter(x => x.id == id)[0];
            let plotData = sampleData["otu_ids"].map(function(e, i) {
                return [e, sampleData["sample_values"][i]];
            });
            let plotData_Sorted = plotData.sort((a, b) => b[1] - a[1]);
            x = plotData_Sorted.map(x => x[1]).slice(0, 10).reverse()
            y = plotData_Sorted.map(x => "OTU " + x[0]).slice(0, 10).reverse()

            var traces = [{
                type: 'bar',
                x: x,
                y: y,
                marker: {
                    color: x
                },
                orientation: 'h'
            }];

            var layout = {
                title: 'Top 10 OTUs',
                xaxis: {
                    title: 'sample_values'
                },
                yaxis: {
                    title: 'otu_ids'
                },
            };

            Plotly.newPlot('bar', traces, layout);
        }
    });
}

function makeBubblePlot(id) {
    $.ajax({
        type: 'GET',
        url: "static/data/samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sampleData = data["samples"].filter(x => x.id == id)[0];

            var trace1 = {
                x: sampleData["otu_ids"],
                y: sampleData["sample_values"],
                mode: 'markers',
                marker: {
                    color: sampleData["sample_values"],
                    opacity: [1, 0.8, 0.6, 0.4],
                    size: sampleData["sample_values"]
                }
            };

            var data = [trace1];

            var layout = {
                title: 'Samples Values',
                xaxis: {
                    title: 'otu_ids'
                },
                yaxis: {
                    title: 'sample_values'
                },
                showlegend: false,
            };

            Plotly.newPlot('bubble', data, layout);
        }
    });
}

function makeGuagePlot(id) {
    $.ajax({
        type: 'GET',
        url: "static/data/samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let guageData = data["metadata"].filter(x => x.id == id)[0];
            console.log(guageData);

            var gData = {
                domain: { x: [0, 1], y: [0, 1] },
                value: guageData["wfreq"],
                title: `Weekly Washing Frequency`,
                type: "indicator",
                mode: "gauge",
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 2], color: "yellow" },
                        { range: [2, 4], color: "cyan" },
                        { range: [4, 6], color: "teal" },
                        { range: [6, 8], color: "lime" },
                        { range: [8, 9], color: "green" },
                    ]
                }
            };
            var gLayout = {
                title: 'Belly Button Washing Frequency',
                width: 700,
                height: 600,
            };
            Plotly.newPlot('gauge', gData, gLayout);
        }
    });
}