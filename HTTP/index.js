/*
Creating a Node Server

We'll be creating a Node server using the built-in HTTP module.

Step 1: 
Import the HTTP module.


Step 2: 
Invoke the createServer() method on the module.

This method accepts a callback function as it's argument. This function 
in turn receives two arguments, `request` and `response`.

---

Tip

`request` is an instance of `http.IncomingMessage`, and 
`resposne` is an instance of `http.ServerResponse`.

---

Now as it turns out, HTTP module also extends the EventEmitter class.

And the callback function that we specified here is actually a request listener, 
that is whenever a request reaches the server, this callback function is executed. 

The request argument contains information about the incoming request and we will
inspect a few properties on request object in the upcoming lessons.

The second argument is the server response and we use it to build the 
response that has to be send back to the client.

So Node will handle the incoming request and we have to write code to send 
back the response.

On the response object we first invoke the `writeHead()` method. We specify an 
argument which is the HTTP status code, this will be 200 for a successful response.

Next, we can end the response with some text. For that, we invoke the `end` method 
on the response and pass in a string. 

In our example we will pass in "Hello world".

    const http = require("node:http");

    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello world!");
    });

We have no written code to respond to any incoming request, however, we must also 
inform our server to listen to any incoming request.

For that, we store the server created using the `createServer()` method  
in a constant.

    const http = require("node:http");

    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello world!");
    });

Now, in the next line, we invoke the `server.listen()` method, passing 
in a port number. We'll pass in 3000 as the port number. You can think of the 
port number as a number in an apartment with many houses. 

On a machine there can be many other servers but our Node.js server will run 
on port 3000.

Optionally, you can specify a callback function instead for when the server 
starts to listen.

Let's add a callback function that logs to the console "Server running on 
port 3000".

And that is pretty much it.

    const http = require("node:http");

    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello world!");
    });

    server.listen(3000, () => {
        console.log("Server running on port 3000");
    });

-----

Now in the terminal we can run `node index`. We see the logged statement that 
says "Server running on port 3000". But what is important to note though is that 
the program does not exit. It is now waiting for requests on port 3000.

And how do we make a request? Well, we do it from the browser. 

In the address bar of your Web Browser, type in `localhost:3000`. Here, 
`localhost` refers to our own machine which is our server, and 3000 is the 
port number you specified in your code. Visit `localhost:3000`, and you should 
see "Hello world!" be displayed.

If you inspect element and open the Network tab, refresh, you can have a look
at the request and the response. You will see that it is standard HTTP.

-----

With just 10 lines of code, you are able to:
- Import the HTTP related code
- Create the server that listens to requests
- And respond to requests with text

It really is this simple to create a server with Node, and it is a popular 
example to come across when reading about Node.js.

Although not necessary, it is good practice to specify the 
content type of the response. Currently we are responding clean text, 
so let's add a second argument to `res.writehead()` where we specify 
content type as `text/plain`.

    const http = require("node:http");

    const server = http.createServer((req, res) => {
        res.writeHead(200,  { "Content-Type": "text/plain" });
        res.end("Hello world!");
    });

    server.listen(3000, () => {
        console.log("Server running on port 3000");
    });

If we now re-start `node index`, head to the browser, and refresh, 
we will see that in the response headers that `Content-Type` is 
`text/plain`.

Like mentioned, the `Content-Type` header is optional, but then you'd be leaving it to 
the browser to essentially guess what type of content you are returning.

It is always recommended to specify the `Content-Type`.
*/

const http = require("node:http");

const server = http.createServer((req, res) => {
    res.writeHead(200,  { "Content-Type": "text/plain" });
    res.end("Hello world!");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
