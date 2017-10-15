// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var strftime = require('strftime')
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.send("GET /:time")
});

app.get("/:time", function (request, response) {
  var time = request.params.time;
  
  var num = Number(time);
  var naturalDate = new Date(time)
  if(isNaN(num)){
    if(naturalDate){
      response.json({"unix" : naturalDate.getTime(), "natural" : strftime("%B %d, %Y", naturalDate)})
    }
    else{
      response.json({"unix" : null, "natural" : null})
    }
  }
  else{
    var d = new Date(time * 1000)
    response.json({"unix" : time, "natural" : strftime("%B %d, %Y", d)})
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
