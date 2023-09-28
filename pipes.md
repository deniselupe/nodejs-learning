# Pipes

In the previous lesson, we learned about streams in the context 
of reading and writing file contents.

We used `createReadStream` to create a readable stream that reads from a 
file, and we used `createWriteStream` that writes to a file. 

As it turns out, this is a common pattern, and Node.js has a simpler 
and better way to do the same, and that is, using Pipes. 

Let's learn about Pipes in this lesson.

In non-technical terms, we understand what a pipe is. For example, a 
pipe that connects a tank to a kitchen sink. The tank feeds water into 
the pipe, which can be released through a tap in the sink. 

From the pipe's point of view, we are reading water from the tank, and writing 
it into the sink.

In Node.js, a Pipe is very similar. It takes a readable stream, and connects it 
to a writeable stream.

We use the `pipe` method on a readable stream to implement the functionality.

Back in the code, in `index-fs2.js`, we can comment out the data event 
and instead write one line of code.

```
const fs = require("node:fs");

const readableStream = fs.createReadStream("./file.txt", { 
    encoding: "utf-8", 
    highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writeableStream);
```

If we now save `index-fs2.js` file, and clear the contents in `file2.txt`, 
and run `node index-fs2`, we can see the same output as before.

What is great about pipes is that it returns the destination's stream 
which enables chaining. However, the condition is that the destination's 
stream has to be readable, duplex, or a transform stream.

In our current example, we have a writeable stream, so we cannot chain by 
calling `.pipe`. Instead, let's make use another method called `zlib`.

Now this example might be slightly advanced at the moment, but we have to make 
sure you are aware of the concept of chaining with the pipe method. 

At the top, import the `zlib` module.

```
const fs = require("node:fs");
const zlib = require("node:zlib");

const readableStream = fs.createReadStream("./file.txt", {
    encoding: "utf-8",
    highWaterMark: 2,
});
```

The `zlib` module provides compression functionality implemented using `gzip` 
algorithm, or, in simple terms, `zlib` allows us to create zipped files 
if we can call it that. What is great about `zlib` is that it has 
a built-in transform stream.

So we can write:

```
const fs = require("node:fs");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();
```

And after we have created a readable stream, we can write:

```
const fs = require("node:fs");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./file.txt", {
    encoding: "utf-8",
    highWaterMark: 2,
});

readableStream.pipe(gzip);

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writeableStream);
```

Now, `readableStream.pipe(gzip)` returns a transform stream, so we can chain 
`.pipe(fs.WriteStream("./file2.txt.gz"))`.

We are chaining with `.pipe` as you can see.

Moving from a readable stream, to a transform stream, to a writeable stream.

```
const fs = require("node:fs");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./file.txt", {
    encoded: "utf-8",
    highWaterMark: 2,
});

readableStream.pipe(gzip).pipe(fs.WriteStream("./file2.txt.gz"));

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writeableStream);
```

Of course you can write `fs.WriteStream` as a constant and use it, but hopefully 
you are able to understand the concept of chaining with the `pipe` method.

If we run `node index-fs2`, you should see the new file `file2.txt.gz` created.

This is how pipes work in Node.js.