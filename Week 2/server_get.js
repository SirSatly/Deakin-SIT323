//Imports the express npm package 
const express= require("express");

//Creates an instance of Express
const app= express();

//Defines a function to add two numbers together 
const addTwoNumber = (n1,n2) => n1+n2;

//Defines a GET request at the root/addTwoNumber url which take two query parameters n1 and n2 which should both be numbers
//These to parameters are converted from strings to ints the added together then the result then the result plus the status code 200 is outputted to the page
app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = addTwoNumber(n1,n2);
    res.json({statuscocde:200, data: result });
});

//Defines a GET request at the root url to display the heading HELLO THERE in the web browser
app.get("/", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})

//Logs the result of 19+12 to the console
console.log (addTwoNumber(19,12));

//Sets the webapp to use port 3040 to listen for the GET requests defined above
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
})