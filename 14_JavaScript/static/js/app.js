// from data.js
var tableData = data;

// YOUR CODE HERE!
// 1. ADD THE DATA TO THE TABLE
//  a. WHERE ARE WE ADDING THE DATA? => TO THE TBODY ELEMENT
//  b. LOPP THROUGHT THE DATA ADN APPEND TO TR ELEMENT
//  c. LOOP THROUGH EACH FIELD IN THE ROW AND APPEND TO TD ELEMENT
//  d. ADD THE VALUES FROM THE DATA.JS TO THE TD ELEMENT

var tbody = d3.select("tbody");

function buildTable(data) {
    tbody.html("");

    data.forEach((dataRow) => {
        var row = tbody.append("tr");

        Object.values(dataRow).forEach((val) => {
            var cell = row.append("td");
            cell.text(val);
        });
    });
}

// 2. ADD A SEARCH FORM TO FILTER THE TABLE
//  a. GRAB THE DATETIME VALUE FROM THE FILTER
//  b. CHECK TO SEE IF A DATE WAS ENTERED AND FILTER THE DATA USING THAT DATE
//  c. APPLY 'FILTER' TO THE TABLE DATA TO ONLY KEEP THE ROWS WHERE THE 'DATETIME' VALUE MATCHES THE FILTER VALUE
//  d. REBUILD THE TABLE USING THE FILTERED DATA

// 3. ATTACH AN EVENT TO LISTEN FOR THE FORM BUTTON WHEN ITS CLICKED THAT WILL CALL THE FUNCTION TO FILTER THE TABLE
function handleClick() {
    d3.event.preventDefault();

    var date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }

    buildTable(filteredData);
}

d3.selectAll("#filter-btn").on("click", handleClick);
buildTable(tableData);