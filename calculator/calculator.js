//this variable alows us to use the express package
const express = require("express");
//this variable alows us to use the body-parser package
const bodyParser = require("body-parser");
//this variable enables our express package
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
//================ FOR REGULAR CALULATOR ===============//
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2
  res.send("The result of the calculation is " + result);
});
//=============== FOR BMI CALCULATOR ===============//
app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html")
});

app.post("/bmicalculator", function(req, res){
  let weight = parseFloat(req.body.Weight);
  let height = parseFloat(req.body.Height);
  let bmi = weight / (height + height);
  res.send("Your BMI is " + bmi);
});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});
