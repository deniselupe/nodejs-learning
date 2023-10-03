/*
HTML Response

We're going to learn how to send back HTML instead of 
JSON with the response. 

We'll start off by making "Content-Type" equal to "text/plain", and 
`res.end("Hello world!");`.

    const http = require("node:http");

    const server = http.createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Hello world!");
    });

    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

If you run the node server, and visit `localhost:3000` on the 
web browser, you'll see "Hello world!" is served as the response.

But the goal here is to respond with HTML. Let's go ahead and change the argument 
in `response.end()` to `<h1>Hello world!</h1>`.

If we re-run the Node server and re-fresh the browser, you will see that 
`<h1>Hello world!</h1>` was returned as a string, and not as an HTML element.

Why is this?

Well the reason for that is because the "Content-Type" value is still "text/plain", 
so the browser is being told to render the response as plain text.

In order for the browser to parse the response as HTML, we need to specify the 
"Content-Type" as "text/html" instead.

    const http = require("node:http");

    const server = http.createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Hello world!</h1>");
    });

    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

Restart the Node server and refresh the browser, we should see the larger styling 
of Hello world! text in bold. This is the default styling of an <h1> tag.

And this is how you send HTML content as a response.

Although this works fine, we typically don't build HTML as a string 
in the same JavaScript fle. Instead we define the HTML in a separate file, and send 
the file's contents as a response.

Let's take a look and see how to do that.

-----

We create a file `index.html`.

Within the `index.html` file:
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node.js Tutorial</title>
    </head>
    <body>
        <h1>From index.html</h1>
    </body>
</html>


Next, we need to read the contents of HTML in our request listener. 

And for reading a file, we know that we can use the `fs` module.
We import that `fs` module, and then within the request listener, 
we'll use `fs.readFileSync` to read the contents of `index.html`.

The reason why we are using `fs.readFileSync` and not `fs.readFile` is
because we want to wait for the file content to be read before responding.

Now that we have the file content as `html`, we send it as response.

If we restart our Node server and refresh the Web Browser, we will see 
the expected HTML now. If we inspect the elements, we will see the 
HTML we wrote. 

    const fs = require("node:fs");
    const http = require("node:http");

    const server = http.createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync("./index.html", "utf-8");
        response.end(html);
    });

    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

-----

Although this works, using `fs.readFileSync` reads the entire file contents 
at once. If you have a large HTML file, we are storing all that content in a 
temporary buffer, which will lead to an unecessary use of memory.

Instead, we can rely on streams, which we have already learned about.

    const fs = require("node:fs");
    const http = require("node:http");

    const server = http.createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./index.html").pipe(response);
    });

    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

If we use this code instead, restart the Node server, and refresh the browser, 
you will see the same content as before. But this time, our code is more
performant. 

For simplicity in this example, we used relative paths to `index.html`, but you 
should stick to using `__dirname` whenever you can. 

    const fs = require("node:fs");
    const http = require("node:http");

    const server = http.createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/index.html").pipe(response);
    });

    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

You will receive the same output for this.

-----

So this is how you can respond with HTML. For now, we have a simple 
HTML file, but you can add any HTML tag along with CSS for styling.

"Content-Type" : "text/html", is the key.

If you don't want to keep restarting manually the server, please make use
of the watch mode that you should have already learned about.
*/

const fs = require("node:fs");
const http = require("node:http");

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/index.html").pipe(response);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
