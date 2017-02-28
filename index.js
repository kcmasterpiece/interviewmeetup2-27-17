var path    = require("path");
var fs = require("fs");
var express = require('express');
var fileupload = require('express-fileupload');

const app = express();
app.use(fileupload());

app.get('/', function(req, res) {
	res.status(200).sendFile(path.join(__dirname+'/index.html'));
});

app.post('/',  function(req, res) {

	if (req.files.file) {
		console.log('writing....');
		var fp = path.join(__dirname + '/uploaded_files/' + req.files.file.name);
		fs.writeFile(fp , req.files.file.data, (err) => {
			if (err) {
				throw err;
			}
			console.log('file written');
			res.status(200).sendFile(path.join(__dirname+'/index.html'));
		});
	}

});
app.listen(process.env.PORT || 8080);
