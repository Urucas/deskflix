try {

	var popUp = document.getElementById("BobMovie");
	if(popUp == undefined) return;

	var script = document.createElement("script");
			script.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");

	document.head.appendChild(script);

	var popUpObserver = new MutationObserver(function (mutations) {
		var mutation = mutations[0];
		var el = mutation.target;
		if(mutation.attributeName === "style"){
			if(el.style.display == "none") return;

			var title = el.getElementsByClassName("title")[0];
			if(title == undefined) return;

			title = title.firstChild.nodeValue;
			title = title.trim();

			var duration = el.getElementsByClassName("duration")[0];
					duration = duration.firstChild.nodeValue;

			title+= duration.indexOf("min") == -1 ?	" series trailer" : " movie trailer";

			console.log(title);
			title = encodeURIComponent(title);	

			var searchURL = "http://gdata.youtube.com/feeds/api/videos?q="+title+"&format=1&alt=json";
			$.get(searchURL, [], function(response){
				try {
					var href = response.feed.entry[0].link[0].href;
					var fec = el.getElementsByClassName("year")[0];
					var a = document.createElement("a");
					a.innerHTML = '<span class="mpaaRating">View Trailer</span>';
					a.style.cursor = "pointer";
					a.addEventListener('click', function(){
						openTrailerWindow(href);
					});

					var dad = fec.parentNode;
					dad.insertBefore(a, fec);

				}catch(e) { console.log(e); }
			},'json');
		}
	});

	var observerConfig = {
		attributes: true,
		characterData: true
	};

	popUpObserver.observe(popUp, observerConfig);

}catch(e) { }

function openTrailerWindow(url) {

	// example iframe
	// <iframe width="1280" height="720" src="//www.youtube.com/embed/u9av38iK_Y0?rel=0" frameborder="0" allowfullscreen></iframe>
	var src = "//www.youtube.com/embed/";
			src+= getVideoID(url);
			src+= "?rel=0&showinfo=0&autoplay=1";
	
	

	var modal = document.createElement('div');
			modal.style.position = "fixed";
			modal.style.width = "100%";
			modal.style.height = "100%";
			modal.style.top = 0;
			modal.style.left = 0;
			modal.id = "trailer-modal";
			modal.style.backgroundColor = "rgba(0,0,0,0.8)";
			modal.style.zIndex = 99999;
			modal.innerHTML = '<a class="trailer-modal-close" onclick="closeTrailerWindow();">Close</a><iframe width="100%" height="100%" src="'+src+'" frameborder="0"></iframe>';

	var body = document.getElementsByTagName("body")[0];
			body.appendChild(modal);

	var a = modal.getElementsByClassName("trailer-modal-close")[0];
			a.style.position = "absolute";
			a.style.color = "#fff";
			a.style.top = "0px";
			a.style.right = "0px";
			a.style.padding = "10px";
			a.style.cursor = "pointer";
}

function closeTrailerWindow() {
	var body = document.getElementsByTagName("body")[0];
	var modal = document.getElementById("trailer-modal");
	body.removeChild(modal);
}

function getVideoID(ytURL) {

	var aURL = ytURL.split('?'); 
	try {
		aURL = aURL[1].toString();
	}catch(e) {
		console.log("Invalid url format, missing ?");
		console.log(ytURL);
		return false;
	}
	if (aURL.indexOf('&') == -1) {
		aURL += '&';
	}
	var nvPairs = aURL.split("&");
	var videoID = null;
	for (i = 0; i < nvPairs.length; i++) {
		var nvPair = nvPairs[i].split("=");
		var name = nvPair[0];
		if (name == "v") {
			videoID = nvPair[1];
		}
	}
	if(videoID == null) {
		console.log("Invalid url format, missing v param");
		console.log(ytURL);
		return false;
	}
	return videoID;
}	
