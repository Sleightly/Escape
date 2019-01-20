var http = require('http'),
    express = require('express'),
    path = require('path'),
    StringDecoder = require('string_decoder').StringDecoder;


const execFile = require('child_process').execFile;
var decoder = new StringDecoder('utf8');

const PORT = process.env.PORT || 1500

var app = express();

app.use(express.static(__dirname+'/public/views'));
app.use(express.static(__dirname+'/public/style'));
app.use(express.static(__dirname+'/public/scripts'));
app.use(express.static(__dirname+'/public/media'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+"/public/views", 'index.html'));
})

app.post('/gen', function(req, res){
	const child = execFile('MazeGenerator', ['10,10,10'], (error, stdout, stderr) => {
	    if (error) {
	        console.error('stderr', stderr);
	        throw error;
	    }
	    console.log('stdout', stdout);
	});
})


app.post('/sim', function(req, res){
	var input = req.body.input
	var pro = spawn('java',["./PathGenerator.java", 
                            input] ); 
    pro.stdout.on('data', function(data) { 
        res.send({d:data.toString()}); 
    }) 
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))