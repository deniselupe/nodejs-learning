const fs = require("node:fs");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./file.txt", {
    encoding: "utf-8",
    highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writeableStream);

// method chaining for pipe
// can only method chain on Readable, Duplex, and Transform streams
readableStream.pipe(gzip).pipe(fs.WriteStream("./file2.txt.gz"));