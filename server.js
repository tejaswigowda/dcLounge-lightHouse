var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;
var Client = require('node-rest-client').Client;



app.get("/updateColor", function (req, res) {
  var t = req.query;
  var client = new Client();
  var devs = t.id.split(",");
  for(var i = 0; i < devs.length; i++){
    client.get("https://foxden.xyz/updateColor?id=" + devs[i] + "&r=" + t.r + "&g=" + t.g + "&b=" + t.b, function (data, response) {}); 
  }
  res.send("1");
});



app.get("/", function (req, res) {
      res.redirect("/index.html");
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

function changeColor(devList, r, g, b){
  var client = new Client();
  var devs = devList.split(",");
  for(var i = 0; i < devs.length; i++){
    client.get("https://foxden.xyz/updateColor?id=" + devs[i] + "&r=" + r + "&g=" + g + "&b=" + b, function (data, response) {}); 
  }
}

var mode = 0;
function alt()
{
	mode = (mode + 1) %2;
	if(mode == 1){
		changeColor("5c_cf_7f_ff_f4_e2", 100, 100, 100);
	}
	else{
		changeColor("5c_cf_7f_ff_f4_e2", 01, 99, 101);
	}
}

setInterval(alt, 20);
