

//module.exports is the object that's actually returned as the result of a require call
module.exports = function(app,io){
	
	
	app.get('/',function(req,res){
					 
		 res.sendFile(__dirname + '/index.html');
	
	});
	
	
}