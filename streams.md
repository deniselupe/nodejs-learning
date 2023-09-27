# Streams

In the previous lesson, we learned about the `fs` module for 
working in the file system. In this lesson, let's rely on the same `fs` module 
and learn about streams in Node.js.

A few lessons ago, we briefly explained streams as:

```
A stream is a sequence of data that is being moved form one point 
to another over time.

Ex. A stream of data being transferred from one file to another within 
the same computer.
```

The idea is to work with data in chunks instead of waiting for the entire 
data to be available at once. 

If you're transferring contents from fileA to fileB, you don't wait for 
entire fileA content to be saved in temporary memory before moving it into 
fileB. 

Instead, the content is transferred in chunks over time which prevents unnecessary 
memory usage. 

Stream is infact a built-in node module that inherits from the event emitter class. 

But we rarely use streams directly. Other modules internally use streams for their 
functioning. 

Let's learn how the `fs` module uses streams to read and write data. 

---

## createReadStream and createWriteStream

We create a file called `file2.txt` which is currently empty. We are going 
to transfer the contents from `file.txt` to `file2.txt`.

In `index-fs2.js` import the `fs` module.

```
const fs = require("node:fs");
```

Next, to read the data, we use a readable stream made available using the 
`createReadStream` method on the `fs` module.

`createReadStream` accepts the file path as the first method, so we'll pass 
in `./file.txt` as the file path. `createReadStream` accepts an options 
object as the second argument, which we will pass in { encoding: "utf-8" }` 
for that options object.

```
const fs = require("node:fs");

const readableStream = fs.createReadStream("./file.txt", { encoding: "utf-8" });
```

We have now created a readable stream to read data in chunks from `file.txt`.

Next, let's create a writeable stream to write data in chunks into `file2.txt`.
To do this, we'll use `fs` module's `createWriteStream` method.

Just like with `createReadStream`, the first argument will be a file path. In the case for 
`createWriteStream`, the file path is `./file2.txt` since this is the file we want to 
write to.

```
const fs = require("node:fs");

const readableStream = fs.createReadStream("./file.txt", { encoding: "utf-8" });
const writeableStream = fs.createWriteStream("./file2.txt");
```

We now have a readable stream and a writeable stream.

As it turns out, streams extend from the EventEmitter class. EventEmitter allows 
us to add listeners to events.

The `readableStream` emits a `data` event to which we can listen. 

```
readableStream.on("data", (chunk) => {
    console.log(chunk);
});
```

So the event name is `data`, and we specify a callback that gets executed on the 
data event. This callback function is the listener, which automatically receives a 
chunk of data, and we are going to log that to the console. 

In the next line after logging on the console, we are going to write to 
`file2.txt` by passing `writeableStream.write(chunk)`.

```
readableStream.on("data", (chunk) => {
    console.log(chunk);
    writableStream.write(chunk);
});
```

And that is pretty much it.

We save the file and run `node index-fs2`, and we can see our chunk is the 
entire file contents `Hello DeniseLupe`. The same is written to `./file2.txt`.

Now you might be wondering, "Isn't the chunk the entire file contents of 
`file.txt`?" Well, yes, it is. 

This is because the buffer that streams use has a default size of 64KB. 

`file.txt` has a total of 18 characters which is just 18 Bytes. 

So, the chunk contains the entire 18 bytes. 

---

## Modifying Chunk Size

What we can do is add another option when reading data. 

```
const readableStream = fs.createReadStream("./file.txt", { 
    encoding: "utf-8", 
    highWaterMark: 2 
});

```

So we now deal with data in chunks of 2 bytes!

If you run `node index-fs2`, you can see only 2 chracters 
are locked at a time which corresponds to each chunk. 

The file though, still contains the full text as expected. 

`Hello DeniseLupe` has been written to `./file2.txt`.

Now we don't see the benefit here when working with a small file size, 
but when you have large files that are Megabytes in size, streaming the 
data from one file to another will save you a lot of time and memory. 

The `fs` module is just one of the many modules that uses streams. 

Another example is the HTTP module which we will learn about in 
upcoming lessons. HTTP request is a readable stream, and HTTP response 
is a writeable stream. 

In fact, there are four types of streams. 

---

## 4 Types of Streams

### Readable Streams
From which data can be read

### Writeable Streams
To which we can write data

### Duplex Streams
That are both readable and writeable

### Transform Streams
That can modify or transform the data as it is written and read

As examples, we can have reading from a file as readable stream, writing 
to a file as writeable tream, sockets as a duplex stream, and finally file compression 
where you can write compressed data and read compressed data to and from a 
file as a transform stream.

For now, just keep in mind that there exists the concept of streams in Node.js, which 
allows us to work with chunks of data rather than large amounts of data at once.
