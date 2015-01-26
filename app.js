var Stubby = require('stubby').Stubby;
var fs = require('fs');


// read the stubs file
var stubs = JSON.parse(fs.readFileSync('stubs.json', 'utf8'));

// can have as many of these running as want ...
var stubby = new Stubby();

var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 1081;

// stubbing options more available here
// https://github.com/mrak/stubby4node#startoptions-callback
var options = {
		stubs: port,
		location : host,
		data: stubs,
		mute: false
}
// start the stubbing service with options above
stubby.start(options);
console.log('Server running at http://' + host + ':' + port + '/');