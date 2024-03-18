//Imports the express npm package 
var express = require("express")

//Creates an instance of Express
var app = express()

//Defines the port for the app to run on
var port = process.env.port || 3000;

//Sets the app to listen for a request on it's port and then runs an anonymous function logging to the console when that is complete 
app.listen(port,()=>{
    console.log("App listening to: " + port)
})