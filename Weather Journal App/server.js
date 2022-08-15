 const { application } = require("express");
// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require("express"); 
// Start up an instance of app
const app = express (); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require("cors"); 
app.use(cors()); 
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000; 

const server = app.listen (port, () => {
    console.log("server running"); 
    console.log(`server listening on port ${5000}`); 
}); 

//Function for the get request to send data that will be retrieved from the API to object projectData
function gettingData (req, res){
    res.send(projectData); 
}
//GET Request 
app.get('/all', gettingData);

//POST Request and it takes a function parameter to add the data received in the object projectData
app.post('/add', (req, res) => {
    projectData = req.body; 
    res.send(projectData);
}); 
