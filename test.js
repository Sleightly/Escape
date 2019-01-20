var http = require('http'),
    express = require('express'),
    path = require('path');

const PORT = process.env.PORT || 1500

var app = express();

app.use(express.static(__dirname+'/public/views'));
app.use(express.static(__dirname+'/public/style'));
app.use(express.static(__dirname+'/public/scripts'));
app.use(express.static(__dirname+'/public/media'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+"/public/views", 'index.html'));
})

var exec = require('child_process').exec, child;
child = exec('/usr/bin/java -jar ./MazeGenerator.jar',
  function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});

var exec = require('child_process').exec, child;
child = exec('/usr/bin/java -jar ./PathGen.jar "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 4 1 0 1 4 1 4 1 4 1 0 1 4 1 4 1 4 1 0 0 4 0 4 0 4 0 0 0 4 0 0 0 4 0 0 0 0 0 4 0 0 1 0 1 0 1 0 1 4 1 0 1 4 1 0 1 4 1 4 1 0 0 4 0 0 0 4 0 4 0 0 0 4 0 0 0 4 0 0 0 4 0 0 1 4 1 4 1 0 1 0 1 4 1 0 1 0 1 4 1 0 1 0 0 4 0 0 0 0 0 4 0 4 0 0 0 4 0 0 0 4 0 0 0 0 1 4 1 4 1 4 1 4 1 0 1 4 1 4 1 0 1 4 1 0 0 0 0 0 0 4 0 0 0 0 0 4 0 4 0 0 0 0 0 4 0 0 1 0 1 4 1 0 1 4 1 4 1 0 1 4 1 4 1 0 1 0 0 4 0 4 0 0 0 0 0 4 0 4 0 0 0 4 0 4 0 4 0 0 1 4 1 4 1 4 1 4 1 4 1 4 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 4 0 4 0 0 0 4 0 4 0 0 1 4 1 4 1 4 1 4 1 0 1 4 1 4 1 4 1 0 1 0 0 4 0 0 0 4 0 4 0 4 0 4 0 0 0 0 0 0 0 4 0 0 1 4 1 0 1 4 1 0 1 4 1 4 1 4 1 4 1 4 1 0 0 0 0 4 0 0 0 4 0 0 0 0 0 4 0 4 0 0 0 4 0 0 1 4 1 0 1 0 1 4 1 4 1 0 1 0 1 0 1 4 1 0 0 4 0 0 0 4 0 0 0 0 0 4 0 0 0 4 0 4 0 0 0 0 1 0 1 4 1 4 1 4 1 4 1 4 1 4 1 0 1 4 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"',
  function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});
