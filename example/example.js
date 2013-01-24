/**
 * Before running this you may need to add following to your hosts.txt

	127.0.0.1	dom-ain.cc
	127.0.0.1	doma-in.nl
	127.0.0.1	foo.doma-in.nl
	127.0.0.1	hi.bar.doma-in.nl
	127.0.0.1	foo-bar
	127.0.0.1	bafoo-barhi.co

 * Run this file, enter the urls and watch your console
 */

require("./")({
	
	"dom-ain.cc": function() { console.log(1); },
	".doma-in.nl": function() { console.log(2); },
	"/foo-bar/": function() { console.log(3); },
	"*": function() { console.log(4); }
	
}, 80, "localhost", function() {
	console.log("Running on port 80");
});