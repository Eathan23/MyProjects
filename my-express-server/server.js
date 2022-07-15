const express = require("express")
const app = express();

app.get("/", function(req, res){
  res.send("<h1>This is just to understand express <br> try /contatct or /about </h1>");
});

app.get("/contact", function(req, res){
  res.send("contact me at Eathanwashington0@protonmail.com");
});

app.get("/about", function(req, res){
  res.send("Whats up? Names Eathan. 23 years old, and I made this so I can understand how to build an express server");
});

app.listen(3000, function(){
  console.log("Server started on port 3000")
});
