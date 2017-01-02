var express		= require("express");
var app			= express();
var server 		= require('http').createServer(app);
var io  		= require('socket.io').listen(server);

app.use(express.static(__dirname+'/public'));
app.set('port', (process.env.PORT || 5000));

require('./routes')(app, io);
require('./socket')(app, io);



var listen = server.listen(app.get('port'), function(){
	console.log("Started");
});





