var path = require('path');
var express = require('express');
var app = express();
const server = app.listen(80)

var io = require('socket.io').listen(server);


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/index'));

var port = process.env.PORT || 80;
let messages = [];

io.on('connection', function(socket){ 
	socket.emit('previousMessage', messages);

	console.log('socket conectado:', socket.id)
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	
	//Recebe as mensagens enviadas pelo front
	socket.on('chat message', function(obj){
		messages.push(obj)
		console.log('Autor: ' + obj.author + ' message: ' + obj.msg +'');
		//Envia as mensagens de volta apos armazenar
		io.emit('chat message', obj);
	});
})

// app.listen(port, function() {
// 	console.log('Our app is running on http://localhost:' + port);
// });




module.exports = app;