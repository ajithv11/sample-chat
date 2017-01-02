var app  		= require('express')();
var server 		= require('http').createServer(app);
var io  		= require('socket.io').listen(server);

app.set('port', (process.env.PORT || 5000));

require('./routes')(app, io);
require('./socket')(app, io);



var listen = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


