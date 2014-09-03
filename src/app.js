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

	var remotecontrol = new (function(){
		
		this.triggerKeyPress = function(key) {
			var el = document.getElementsByTagName("body");
				  el = el[0];
			if(document.createEventObject){
				var eventObj = document.createEventObject();
				eventObj.keyCode = key;
				el.fireEvent("onkeydown", eventObj);   
			} else if(document.createEvent)	{
				var eventObj = document.createEvent("Events");
				eventObj.initEvent("keydown", true, true);
				eventObj.which = key;
				el.dispatchEvent(eventObj);
			} 
		}

		this.enter = function() {
			this.triggerKeyPress(13);
		}

		this.esc = function() {
			this.triggerKeyPress(27);
		}

		this.toggle = function() {
			this.triggerKeyPress(32);
		}

		this.fullscreenToggle = function() {
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
		}

	});

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
			console.log("fullscreen toogle");
			remotecontrol.fullscreenToggle();
		});

		socket.on("toggle play", function(){
			console.log("toggle");
			remotecontrol.toggle();
		});

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
