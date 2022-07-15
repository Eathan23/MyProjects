//============packages===============//
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

//=======home route=========//
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//===========post request=========//
app.post("/", function(req, res) {
  const query = req.body.CityName;
  const apiKey = "d56ac95053e4f56ac4ce4e59239433d9";
  const unitsOfMessurements = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unitsOfMessurements;

  https.get(url, function(response) {
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

app.listen(3000, function() {
  console.log("server is running on port 3000.")
});
