/*
HTML Template

There may come a situation where you'd like to provide 
Dynamic HTML content. 

For example, you want to be able to render the logged in 
user's name on the HTML page instead of static content.

We can do this by using string replacement. Let's show 
how to do this.

-----

Within the request listener we are going to remove the 
`fs.createReadStream()` and go back to `fs.readFileSync()`
as we need to handle this a little different. 

First let us declare a constant.

We'll create a constant called `name` and set it to string
"DeniseLupe". This is the value that we need to display in our 
HTML.

In the `index.html` we will ahve the following HTML:

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Node.js Tutorial</title>
        </head>
        <body>
            <h1>Hello {{name}}, welcome to Node.js</h1>
        </body>
    </html>

Now what we have to do is replace the `{{name}}` with the variable 
`name`.

If you restart the Node server and visite `localhost:3000` on the web browser, 
we should see the expected response which says "Hello DeniseLupe, welcome to 
Node.js".
*/

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((request, response) => {
    const name = "DeniseLupe";
    response.writeHead(200, { "Content-Type": "text/html" });
    let html = fs.readFileSync("./index.html", "utf-8");
    html = html.replace("{{name}}", name);
    response.end(html);
});

server.listen(3000, () => {
    console.log("Server is listening to port 3000");
})
