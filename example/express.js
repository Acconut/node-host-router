/**
 * Before running this you may need to add following to your hosts.txt

	127.0.0.1	dom-ain.cc
	127.0.0.1	doma-in.nl
	127.0.0.1	foo.doma-in.nl
	127.0.0.1	hi.bar.doma-in.nl
	127.0.0.1	foo-bar
	127.0.0.1	bafoo-barhi.co

 * Run this file, enter the urls and watch your browser
 */

var express = require("express"),
	router = require("../");

var cc = express();
cc.use("/", function(req, res) {
	res.send("Hellow from dom-ain.cc");
});

var nl = express();
nl.use("/", function(req, res) {
	res.send("Hi, you entered " + req.host.split(".")[0]);
});

var foobar = express();
foobar.use("/", function(req, res) {
	res.send("Seems like foobar, ok?");
});

var match = express();
match.use("/", function(req, res) {
	res.send("No Luke, whhhhhy? Arg!");
});

router({
	
	"dom-ain.cc": cc,
	".doma-in.nl": nl,
	"/foo-bar/": foobar,
	"*": match
	
}, 80, "localhost", function() {
	console.log("Running on port 80");
});