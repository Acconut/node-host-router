# Node HTTP host router #

... does what it's called: It routes HTTP request by their host.

## Features ##

* Wildcards and Regular Expressions
* Unmatching operator
* WebSocket support (HTTPS comming later)
* Full Express-integration (optional)

## Example ##

```javascript

var router = require("host-router"),
	express = require("express"),
	http = require("http");

// Raw function to handle request
function req(res, req) {
	res.end("Hello World from a function!");
}

// Express app
var app = express();
app.use("/", function(res, req, next) {
	res.send("This is express!");
});

// HTTP server
var server = http.createServer(function(res, req) {
	res.end("HTTP, ok?");
});

// Do routing
router({
	
	// Simple usage & function
	"foobar.com": req,

	// Wildcard & express
	".yolo.nl": app,

	// Regular Expression & HTTP server
	"/some-regexp/": server

},
80, // Port
"localhost", // Host (optional)
function() {
	console.log("Up and running");
});
```

## Routers ##

> foobar.com

Only works for `foobar.com`.

> .yolo.nl

Routes `hi.yolo.nl`, `sub.foo.yolo.nl` but *not* `yolo.nl`.

> /some-regexp/

A normal Regular Expression, e.g. `some-regexp.com` or `baz.some-regexp.hi.nz`.

## License ##

![](http://i.creativecommons.org/l/by/3.0/88x31.png)

[Attribution 3.0 Unported (CC BY 3.0)](http://creativecommons.org/licenses/by/3.0/deed)

### Attribution

No attribution needed.
