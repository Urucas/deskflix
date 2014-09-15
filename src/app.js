var gui = require("nw.gui");
		gui.Window.get().showDevTools();

var mb = new gui.Menu({type:"menubar"});
		mb.createMacBuiltin("Deskflix");
		gui.Window.get().menu = mb;

var win = gui.Window.get();

/*
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

		console.log("socket connected");
		socket.emit("my name is", {name:localname});
		
		socket.on("fullscreen", function(){
			try {
				var nativeWindow = require('nw.gui').Window.get();
				if(nativeWindow.isFullscreen) {
					nativeWindow.leaveFullscreen();
					nativeWindow.focus();
				}else{
					nativeWindow.enterFullscreen();
					nativeWindow.focus();
				}
			}catch(e){
				alert(e);
			}
		});

		socket.on("toggle play", function(){
			console.log("toggle");	
			var nativeWindow = require('nw.gui').Window.get();
			try {
			var document = nativeWindow.window.document;
			var el = document.getElementsByTagName("body");
				  el = el[0];

			var el = document.getElementById("SLPlayer");		

				if(document.createEventObject){
					var eventObj = document.createEventObject();
					eventObj.keyCode = 32;
					el.fireEvent("onkeydown", eventObj);   
				} else if(document.createEvent)	{
					var eventObj = document.createEvent("Events");
					eventObj.initEvent("keydown", true, true);
					eventObj.which = 32;
					el.dispatchEvent(eventObj);
				} 

			}catch(e) { alert(e); }
		});

	});

	rchttp.listen(8008, function(){
		console.log(intra +":8008 server listening to socket.io");
	});

}catch(e){ 

	alert("rm error");
	alert(e); 
}
*/

window.location.assign("http://netflix.com");
