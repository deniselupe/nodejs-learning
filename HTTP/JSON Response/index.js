/*
JSON Response

In the previous lesson, we learned how to create an HTTP server 
with the built-in HTTP module in Node.js.

In that example we learned how to respond with some plain text.

In this lesson let's learn how to respond with some JSON data.

In the request listener, we are going to create a new object. 

    const superHero = {
        firstName: "Bruce",
        lastName: "Wayne",
    };

Now let's try and respond by sending this object to the client.

So:

    const http = require("node:http");

    const server = http.createServer((request, response) => {
        const superHero = {
            firstName: "Bruce",
            lastName: "Wayne",
        };

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(superHero);
    });

    server.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });

On the terminal, run `node index`, and if we now visit `localhost:3000` on the 
browser, we now see that we have an error. 

Head back to the terminal, and you will see an error that says:
    TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance 
    of Buffer or Uint8Array. Received an instance of Object

So we can't send JavaScript objects as-is in a response. What we have to do is convert it 
into what is called the JSON format. JSON which stands for JavaScript Object Notation, 
is a data interchange format that we can use with HTTP.

The nice thing about using JSON format is that the v8 engine has built-in 
functionality to support what we want to achieve. 

All we have to do is invoke the method `JSON.stringify()` and pass in 
`superHero` as the argument. 

We do also need to specify to the browser that the "Content-Type" is 
"application/json". 

So what we have now is:

    const http = require("node:http");

    const server = http.createServer((request, response) => {
        const superHero = {
            firstName: "Bruce",
            lastName: "Wayne",
        };

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(superHero));
    });

    server.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });

If we restart the server, and head back to the browser, and refresh, 
we will see the string representation of our object.

If you want to convert this back to an object you can use the built-in
`JSON.parse()` method.

But this is how you can send objects as JSON response.

You'll be pleasantly surprised to know that you have written 
your first API using Node.js.

We have one API endpoint, which is `localhost:3000`, and that endpoint returns 
some data. That data is an object with a first and last name. 

In doing this, not just the browser, but any server that is capable of making 
a request can now get this data from our application.

Now, we will learn what exactly is an API and we will learn all there is 
to designing APIs with Node.js, but that is for another lesson. 

-----

For now, understand that "Content-Type" set to "application/json" and 
`JSON.stringify()` are sufficient to send a JSON response back to the client.
It is a format that is different to plain text we have sent in the previous 
example. It wou
*/

const http = require("node:http");

const server = http.createServer((request, response) => {
    const superHero = {
        firstName: "Bruce",
        lastName: "Wayne",
    };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(superHero));
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
