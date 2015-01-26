BlueStubby (Stubby4Node on IBM Bluemix)
==========

A RESTful stubbing solution using [stubby4node] (https://github.com/mrak/stubby4node). BlueStubby contains a wrapper that allows projects quickly and easily create RESTful stub endpoints and check them into Bluemix. BlueStubby was written for use with IBM MobileFirst Platform Adapters but can be used to mock any RESTful api. Some handy features of  [stubby4node] (https://github.com/mrak/stubby4node) are its use of SSL and ability to mock POST as well as GET requests - all of which can now be hosted in the cloud on Bluemix

How to use this
-----
1. Download the source code (`git clone`)
2. Change the contents of `stubs.json` to reflect your project requirements. Use the examples to guide you.
3. Login into Bluemix `cf login` 
3. Push the app to your target environment e.g. `cf push my-blue-stubby-project` 
4. Start connecting to your stubs!

Example Stubs
-----
For a more complete list of the possibilities of this app have a look at the [fake endpoint example] (https://github.com/mrak/stubby4node#endpoint-configuration) on [stubby4node] (https://github.com/mrak/stubby4node). BlueStubby is just a wrapper for this and so all these features should work on Bluemix   
Some example stubs have been written in `example.stubs.json` to show off some of the features

#### Simple GET
Example of request being made on a URL starting with `^/hello/world`. `method` is specified as `GET` but will default to this. `latency` is an optional value in milliseconds.   
```json
	{
	    "request": {
	        "url": "^/hello/world",
	        "method": "GET"
	    },
	    "response": {
	        "status": 200,
	        "headers": {
	            "Content-Type": "application/json",
	            "server":"stubby-on-bluemix/0.1"
	        },
	        "latency": 1200,
	        "body": {
	        	"message" :"Hello World"
	        }
	    }
	}
```

#### Slightly Complicated GET
The request is being made on a url that starts with (`^/hello`) and has some query parameters (`$`). The query parameters are specified in a separate JSON block defined by `query`. In the case below; a query parameter of `apiKey` is expected and it should be an alphanumeric string. The example below shows capturing the key passed to the url and sending it back in the response using `<% query.apiKey %>` where apiKey is the value of some defined query passed to the endpoint. For more, see [Dynamic-Token-Replacement] (https://github.com/mrak/stubby4node#dynamic-token-replacement). 
```json
{
	    "request": {
	        "url": "^/hello/with/queryparams$",
	        "method": "GET",
	        "query" :{
	        	"apiKey" : "[a-zA-Z0-9]+"
	        }
	    },
	    "response": {
	        "status": 200,
	        "headers": {
	            "Content-Type": "application/json"
	        },
	        "latency": 1200,
	        "body": {
	        	"message" :"Hello World",
	        	"Key" : "The API Key supplied was <% query.apiKey %>"
	        }
	    }
	}
```

#### Simple POST
`method` name `POST` must be specified. `url` pattern must have the start (`^`) with character as well as the ends with (`$`) for `POST` to work
```json
{
	    "request": {
	        "url": "^/hello/with/simple/post$",
	        "method": "POST",
	        "post" : "Here is some data"
	    },
	    "response": {
	        "status": 200,
	        "headers": {
	            "Content-Type": "application/json"
	        },
	        "latency": 1200,
	        "body": {
	        	"message" :"Thanks for the post data"
	        }
	    }
	}
```

#### Slightly Complicated POST
`POST` can take query parameters as well as XML data. Capturing of data can occur like in the `GET` example above. `URL` data capture can also occur as documented in [Dynamic-Token-Replacement] (https://github.com/mrak/stubby4node#dynamic-token-replacement). 
```json
{
	    "request": {
	        "url": "^/hello/with/post/data$",
	        "method": "POST",
	        "post" : "<!xml blah='blah blah blah'><envelope><letter>Hope I catch the mid day POST</letter></envelope>",
	        "headers": {
	            "Content-Type": "application/xml"
	        },
	        "query" :{
	        	"apiKey" : "[a-zA-Z0-9]+"
	        }
	    },
	    "response": {
	        "status": 200,
	        "headers": {
	            "Content-Type": "application/json"
	        },
	        "latency": 1200,
	        "body": {
	        	"message" :"You caught the mid-day POST",
	        	"Key" : "The API Key supplied was <% query.apiKey %>"
	        }
	    }
	}
```