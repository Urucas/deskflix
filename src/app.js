var gui = require("nw.gui");
		gui.Window.get().showDevTools();

try {

	var os=require('os');
	var localname = os.hostname();
	console.log("local machine name: " +localname);

	var ifaces=os.networkInterfaces();

	for (var dev in ifaces) {
		var alias=0;
		ifaces[dev].forEach(function(details){
			if(details.family=='IPv4') {
				if(dev.match(/^en/)) {
					intra = details.address;
				}
			}
		});
	}

	var rcapp  = require('express')();
	var rchttp = require('http').Server(rcapp);

	rcapp.get('', function(req, res){
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end("It's deskflix remote control");
	});

	rcapp.get('/', function(req, res){
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end("It's deskflix time remote control");
	});

	var io = require('socket.io')(rchttp);
	io.on('connection', function(socket){

		console.log("connected");
		var body = window.document.getElementByTagName("body")[0];
		console.log(body);

	});

	rchttp.listen(8008, function(){
		console.log(intra +":8008 server listening to socket.io");
	});

}catch(e){ 

	alert("rm error");
	alert(e); 
}

window.location.assign("http://netflix.com");
/*

var frame = document.getElementById("nf-frame");
		frame.src = "http://netflix.com";
*/
