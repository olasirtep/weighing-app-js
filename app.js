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
    res.end(mainView.generateWebPage(currentWeight, currentTotal));
  }
  else if (req.url == '/weigh') {
    // Generate random weight in range of 10kg -> 2000kg
    currentWeight = Math.floor((Math.random*1991)+10);
    // Add to total
    currentTotal += currentWeight;

    // Set headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // Generate object and serialize to JSON
    let data = {'currentWeight' : currentWeight, 'currentTotal' : currentTotal};
    let json = JSON.stringify(data);
    res.end(json);
  }
});

// Open server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
