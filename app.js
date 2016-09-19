var express = require('express');

var app = express();

var api_url = 'api.tradingeconomics.com';
var path = 'markets/commodities';
var client_key = "guest";
var client_secret = "guest";

var fetch = require('node-fetch');
var resp = "";

fetch('http://'+api_url+'/'+path+'?c='+client_key+':'+client_secret)
.then(function(response){
    return response.json();
})
.then(function(json){
	//console.log(json);
	resp = json;
});

app.set('view engine', 'ejs');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//home
app.get('/', function(req, res) {
    res.render('home', {
        title : "TRADING ECONOMICS",
        data : resp
    });
});

// notFound
app.get('*', function(req, res) {
    res.render('notFound', {
        title : "TRADING ECONOMICS",
        desc : "Page Not Found"
    });
});
/*app.get('*', function(req, res){
   res.send('Page Not Found'); 
});*/

app.listen(3000, function() {
    console.log("The app is running on localhost:3000");
});