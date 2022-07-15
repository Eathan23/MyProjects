//this variable makes expres required in our js server. its a web framework for Node.js.
const express = require("express");
//this variable requires the https module.
const https = require("https");
/*this variable requires the body parser module. Ths allows us
  to parse through the data that we get from external sites and
  trun it into JSON data, Which can then be turned into regular
  JavaScript Objects. We can work with those.
*/
const bodyParser = require("body-parser");
//this enables our express framework.
const app = express();

//this enables the body parser module.
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
this app.get() method waits for a user to asscess our site and when they do
we display the index.html page for the user.
*/
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

/*
this app.post() method waits for a post request from the user and dose the following
1.create a variable called query and have it equal to the value of what the user
  typed in. We do this by accessing the req argument, then tapping into the body of
  the request argument and then from there tapping into the CityName HTML element.
2.creates a veriable called apiKey, and sets its value to the value of my apiKey.
  with out it, we couldnt access weather data from the API.
3.creates a variable called unitsOfMessurements and sets its value to the string
  "imperial". this sets what unit of messurements we recive from the API.
 4.creates a variable called url it contactinates the last 3 variables together and adds
   3 stings in between. which peices together the url we'll be using to contact the API.
5.we use an https.get() method and we pass the url into it and we create a callback
  function and pass in a response argument into the callback
6.we use the response argument passed into our previous callback and use a .on()
  method on it. we pass in 2 arguments, a string "data", specifying that we are looking
  for data and a callback function(). We pass an argument of data into the callback
7.create a variable called weatherData and set its value to JSON.parse(data).
  JSON.parse(data) parses through the weather data we recived and parses it into
  a JSON format which we then are able to work with.
8.create a variabel named icon and set its value to weatherData then we search
  through the weather arry and we select the the 1st and only object within
  the weather arry and we select the icon item within the 1st object
  in the weather arry
9.create a variabel named description and set its value to weatherData then we search
  through the weather arry and we select the the 1st and only object within
  the weather arry and we select the description item within the 1st object
  in the weather arry
10.create a variabel named temp and set its value to weatherData then we search
  through the main object and select the temp item.
11.create a variable called imageURL and set its value to the URL of whatever
   image corresponds with the weather.
12.the 3 res.write()'s on the bottom print out what the temparture is in their
   selected place.as well as the current weather conditions and and icon
   corresponding to the weather conditions.
13.res.send() then sends all the data to the user.
*/
app.post("/", function(req, res) {
  const query = req.body.CityName;
  const apiKey = "d56ac95053e4f56ac4ce4e59239433d9";
  const unitsOfMessurements = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unitsOfMessurements;

  https.get(url, function(response) {
    //console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      let icon = weatherData.weather[0].icon;
      let description = weatherData.weather[0].description;
      let temp = weatherData.main.temp;
      let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(weatherData);
      console.log(temp);
      console.log(description);
      res.write("<h1>The temparture in " + query + " is " + temp + " degrees fahrenheit</h1>");
      res.write("<h2>The weather outside is looking like " + description);
      res.write("<img src=" + imageURL + ">")
      res.send()
    })


  })
})

/*

*/





//this app.listen() listens for requests to our server.
app.listen(3000, function() {
  console.log("server is running on port 3000.")
});
