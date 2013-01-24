var http = require("http"),
	util = require("util");

module.exports = function(r, port, host, callback) {
	
	/** "Compiled" routes **/
	var routes = [];
	
	/** Cache **/
	var cache = {};
	
	/** Unmatching routes **/
	var unmatch = [];
	
	/** Escape strings for regular expressions **/
	function escape(s) {
		return s.replace(/\./g, "\\.")
				.replace(/\-/g, "\\-");
	}
	
	
	// Compiling routes
	for(var i in r) {
		if(!r.hasOwnProperty(i)) break;
		
		var k = null;
		
		// only *
		if(i === "*") {
			unmatch.push(r[i]);
			break;
			
		// e.g. /\w\.domain\.uk/
		} else if(/^\/.*\/$/.test(i)) {
			k = new RegExp(i.substr(1, i.length - 2), "i");
			
		// e.g. .domain.cc
		} else if(/^\./.test(i)) {
			k = new RegExp(".*" + escape(i), "i");
			
		// e.g. domain.nl	
		} else if(/[\w\.\-\d]*/.test(i)) {
			k = new RegExp("^" + escape(i) + "$", "i");
		}
		
		var f = null;
		
		// Function
		if(typeof r[i] === "function") f = r[i];
		
		// HTTP server
		else if(util.inherits(r[i], http.httpServer)) {
			
			f = function(req, res) {
				r[i].emit("request", req, res);
			}
			
		}
		
		routes.push({
			regexp: k,
			action: f
		});
		
		
		
	}
	
	var server = http.createServer(function(req, res) {
		
		var h = req.headers.host.toLowerCase();
		
		// Ask cache
		if(h in cache) return cache[h].apply(this, [req, res]);
		
		// Loop
		for(var i = 0; i < routes.length; i++) {
			var r = routes[i];
			if(r.regexp.test(h)) {
				var f = r.action;
				break;
			}
		}
		
		if(f && f.apply) {
			f.apply(this, [req, res]);
			
			// Insert into cache
			cache[h] = f;
		} else {
			
			// No matches
			for(var j = 0; j < unmatch.length; j++) unmatch[j].apply(this, [req, res]);
			
		}
		
	});
	
	server.listen(port, host, callback);
	
};