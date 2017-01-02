

var nicknames 	= [];
var users		= {};


module.exports = function(app,io){
	
	
var chat = 	io.sockets.on('connection',function(socket){
										
										
			
			
			
			socket.on('new user',function(data, callback){
						
					setTimeout(function(){ console.log("Server new user"); console.log(socket.nickname);	 
											  
						if(data in users){
								callback({status : false, name : data});
						} else{
							console.log(data);
							socket.nickname = data;	// each user have its own socket	
							users[socket.nickname] = socket;
							callback({status : true, name : data});
							nicknames.push(socket.nickname);
							
							updateNicknames();
						}
					
					}, 3000); 						  
			});
			
			
			function updateNicknames(){
				
				//console.log(Object.keys(users));			
				io.sockets.emit('usernames',Object.keys(users));			
			}
			
			
			
			socket.on('send message',function(data,callback){
			
				var msg = data.trim();
				
				
				if(msg.substr(0,3) === '/w '){
					
					msg = msg.substr(3);
					var ind = msg.indexOf(' ');
					if(ind != -1){
						var name = msg.substr(0,ind);
						msg = msg.substr(ind+1);
						if(name in users){
						users[name].emit('secreat message',{msg : msg, nick : socket.nickname});
							//console.log('secreat message');
						}else{
							callback("Error: Enter a valid user.");	
						}
					}else{
						
						callback("Error: Please enter a private message.");
					}
					
					
				}else{
			
					io.sockets.emit('new message',{msg : msg, nick : socket.nickname});
					
				}
				
				
				//io.sockets.emit('new message',{msg : data, nick : socket.nickname});  // Send to all including sender
				//socket.broadcast.emit('new message',data); //except sender
			
			});
			
			
			socket.on('disconnect',function(data){
			
				if(!socket.nickname) return;  //came to page and diconnect without picking name
				delete users[socket.nickname];
				//nicknames.splice(nicknames.indexOf(socket.nickname),1);
				updateNicknames();
			
			});
			
	});	
	
	
}