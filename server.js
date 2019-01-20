var http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    StringDecoder = require('string_decoder').StringDecoder;


const execFile = require('child_process').execFile;
var decoder = new StringDecoder('utf8');

const PORT = process.env.PORT || 1500

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public/views'));
app.use(express.static(__dirname+'/public/style'));
app.use(express.static(__dirname+'/public/scripts'));
app.use(express.static(__dirname+'/public/media'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+"/public/views", 'index.html'));
})

app.post('/gen', function(req, res){
	var exec = require('child_process').exec, child;
	child = exec('java -jar ./MazeGenerator.jar',
	  function (error, stdout, stderr){
	    res.send({d:stdout})
	    if(error !== null){
	      console.log('exec error: ' + error);
	    }
	});
})


app.post('/sim', function(req, res){
	var input = req.body.input
	var exec = require('child_process').exec, child;
	child = exec('java -jar ./PathGen.jar'+" "+'\"'+input+'\"',
	  function (error, stdout, stderr){
	  	console.log(stdout)
	    res.send({d:stdout.toString()}); 
	    if(error !== null){
	      console.log('exec error: ' + error);
	    }
	});
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))