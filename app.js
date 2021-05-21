'use strict';

const http = require('http');
const fs = require('fs');

// Get main view from view-directory
const mainView = require("./view/main.js");
const { randomBytes } = require('crypto');

// Set hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create empty list for weighing data
var weighData = [];

var currentWeight = 0;
var currentTotal = 0;

// Try to read previous weighings from JSON file
fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    weighData = JSON.parse(data);
    console.log(weighData);
});

// Create the web server
const server = http.createServer((req, res) => {
  if (req.url == '/index.html' || req.url == '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(mainView.generateMainPage(currentWeight, currentTotal));
  }
  else if (req.url == '/history') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(mainView.generateHistoryPage(weighData));
  }
  else if (req.url == '/weigh') {
    console.log("Weigh initiated!");
    // Generate random weight in range of 10kg -> 2000kg
    currentWeight = Math.floor((Math.random()*1991)+10);
    // Add to list and save
    addWeightToList(currentWeight);
    // Add to total
    currentTotal += currentWeight;

    // Set headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    console.log("currentWeight : "+currentWeight);

    // Generate object and serialize to JSON
    let data = {'currentWeight' : currentWeight, 'currentTotal' : currentTotal};
    let json = JSON.stringify(data);
    res.end(json);
  }
  else if (req.url == '/reset') {
    console.log("Reset initiated!");
    // Reset variables
    currentWeight = 0;
    currentTotal = 0;

    // Set headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // Generate object and serialize to JSON
    let data = {'currentWeight' : currentWeight, 'currentTotal' : currentTotal};
    let json = JSON.stringify(data);
    res.end(json);
  }
});

// Add new weight to list and save list to file
function addWeightToList(weight) {
  let weightObject = {'weight' : weight, 'datetime' : getDateString()};
  weighData.push(weightObject);
  saveWeightList();
}

// Saves JSON serialized version of list
function saveWeightList() {
  let json = JSON.stringify(weighData);

  fs.writeFile('data.json', json, (err) => {
    if (err) throw err;
    console.log('Weight data written to file');
  });
}

function getDateString() {
  var d = new Date();

  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  var yyyy = d.getFullYear();

  var hours = String(d.getHours()).padStart(2, '0');
  var minutes = String(d.getMinutes()).padStart(2, '0');

  return dd+"."+mm+"."+yyyy+" "+hours+":"+minutes;
}

// Open server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
