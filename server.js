var http = require('http'),
    express = require('express'),
    path = require('path');

const PORT = process.env.PORT || 1500

var app = express();

app.use(express.static(__dirname+'/public/views'));
app.use(express.static(__dirname+'/public/styles'));
app.use(express.static(__dirname+'/public/scripts'));
app.use(express.static(__dirname+'/public/media'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+"/public/views", 'index.html'));
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))