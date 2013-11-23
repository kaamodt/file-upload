var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')


var fileupload = require('fileupload').createFileUpload(path.resolve(__dirname)+'/uploadDir').middleware

var app = express();
app.use(express.bodyParser());

 app.post('/upload', function(req, res) {
   
 	console.log("REQ path: "+ req.files.upload_file.path);
 	console.log("REQ: "+ req.files.upload_file.name);
   	fs.readFile(req.files.upload_file.path, function (err, data) {
  		var newPath = __dirname + "/uploadDir/"+ req.files.upload_file.name;
  		console.log("PATH: "+newPath);
  		fs.writeFile(newPath, data, function (err) {
    	res.redirect("back");
  		});
	});
 });


 app.get('/', function(req, res){
 	display_form(req, res);
 });

// Server would listen on port 8000
app.listen(8000);

/*
 * Display upload form
 */
function display_form(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload_file">'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
    res.end();
}


