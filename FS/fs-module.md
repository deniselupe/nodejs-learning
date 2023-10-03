# fs Module

The file system (fs) module allows you to work with the file system 
on your computer.

Let's understand how to work with it.

We are in `index-fs.js` which is our main module. It is empty to begin with.

To make use of a built-in module, we first have to import it.

And to import a built-in module, we use the 'require' function.

So at the top of `index-fs.js` add:

```
	const fs = require("node:fs");
```	

Here, `fs` is the name of our built-in module.

Once we have the module loaded, we can access the various properties and methods 
exposed by the `fs` module. 

For our first method, let's learn how to read the contents of a file.

-----

## Reading contents of a file.

We are going to create a new file called `file.txt`.

Within the file, we are going to add:

```
	Hello DeniseLupe
```

as text.

Now back in `index-fs.js`, in the fs object returned from the `fs` module, 
we are going to invoke a method called `readFileSync`. 

### fs.readFileSync
	
To this method we are going to pass in the path to the file we want to read.
If you are happy with relative paths, it is as simple as `./file.txt`.

We can capture the returned value within a constact called `fileContents`, 
and log it to the console.

```
	const fs = require("node:fs");
	
	const fileContents = fs.readFileSync("./file.txt");
	console.log(fileContents);
```	

If we run `node index-fs`, we see we have a Buffer with binary data.

```
	Output:
	<Buffer 48 65 6c 6c 6f 20 44 65 6e 69 73 65 4c 75 70 65>
```

To view it in human-readable format, let's set a second argument to `fs.readFileSync`:

```
	const fs = require("node:fs");
	
	const fileContents = fs.readFileSync("./file.txt", "utf-8");
	console.log(fileContents);
```

We pass in `utf-8` as the second argument, which is the character encoding.

--- 

### Fun Fact:
You get a returned Buffer with Hexadecimal numbers. 

```
<Buffer 48 65 6c 6c 6f 20 44 65 6e 69 73 65 4c 75 70 65>
```

The first letter is 48, when 
the number is converted from Hex to Binary, you get 01001000 (utf-8), which is binary for the 
number 72, which in Unicode (Character Set) equals to capital H.

When specifying the Character Encoding UTF-8 as the second argument for `fs.readFileSync`, 
the conversion is done for you.

---

Let's save our file and re-run `node index-fs`, we will see `Hello DeniseLupe` which 
is the file contents.

Hopefully you are now able to relay back to the lesson on binary data, buffers, 
encoding and how it is relevant to understanding the `fs` module. The `fs` module 
internally uses the buffer. 

Now you might have noticed that the method is called `readFileSync`. Here, the suffix `sync` 
is very important. 

This basically tells us the method is a synchronous way of reading a file. 

In other words, the JavaScript engine will wait until the file contents are read before moving 
on to the next line. 

Now, it might be okay to block the JavaScript main thread and read data if that is essential 
for code written further down the line. 

For example,
Reading configuration data from a file and using it further down the line.

However, more often than not, you do not want this synchronous behevior. If 
you have a lot of concurrent users and the file size is large, they will be blocked for some time as 
JavaScript is single threaded and synchronous. The performance will be really poor.

What you have to keep in mind is that Node.js is asynchronous. Node.js has features to do 
tasks asynchronously, without blocking the main thread. 

And for that reason, another method exists on the `fs` object which is the `readFile` method.

### fs.readFile()

The first argument is the filepath, which is `./file.txt`.

The second argument is a callback function which will be invoked after the file 
contents have been read. 

```
	const fs = require("node:fs");
	
	const fileContents = fs.readFileSync("./file.txt", "utf-8");
	console.log(fileContents);
	
	fs.readFile("./file.txt", () => {
		
	});
```

Remember, a function that is passed in as an argument to another function is 
called a Callback Function. 

The callback function for `fs.readFile()` receives two parameters, `error` and `data`.

`error` is the error that was identified when reading the file if there was any. However, 
if there is no data, `error` is set to `null` and data is populated with the file contents. 

This pattern of using callbacks where the first argument is the `error` is called 
`error first callback pattern`, something you will find commonly used in Node.js.

Now within the callback function body, if there is an error, let's log it to the console.
If there is no data, let's log the data to the console.

```
	const fs = require("node:fs");
	
	const fileContents = fs.readFileSync("./file.txt", "utf-8");
	console.log(fileContents);
	
	fs.readFile("./file.txt", (error, data) => {
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	});
```

Now if we run `node index-fs` we see `Hello DeniseLupe` from our 
`fs.readFileSync()` read, and the same buffer object with binary data from our 
asynchronous `fs.readFile()`.

We can pass in `utf-8` as the second argument, pushing the callback as the third argument 
for `fs.readFile()`. The argument "utf-8" is our encoding.

```
	const fs = require("node:fs");
	
	const fileContents = fs.readFileSync("./file.txt", "utf-8");
	console.log(fileContents);
	
	fs.readFile("./file.txt", "utf-8", (error, data) => {
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	});
```

Now, we run `node index-fs` and we see Hello DeniseLupe logged for both 
`fs.readFileSync` and `fs.readFile`.

So reading synchronously, versus reading file asynchronously. 

---

In fact, let's prove we are reading the file asynchronously by adding a few log statements.

At the top, add a log statement, that prints `first`. And in between the two file reads, 
let's add a log statement `second`. And at the end, another log statement that says `third`.

```
	const fs = require("node:fs");
	
	console.log("first");
	
	const fileContents = fs.readFileSync("./file.txt", "utf-8");
	console.log(fileContents);
	
	console.log("second");
	
	fs.readFile("./file.txt", "utf-8", (error, data) => {
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	});
	
	console.log("third");
```

Now run `node index-fs`, we see the following output:

```
	First
	Hello DeniseLupe
	Second
	Third
	Hello DeniseLupe
```

-----

## Writing to a file

There are a few methods on the `fs` module, but let's take a look at one more
just to get the hang of things.

Let's see how to write contents into a file.

We are going to be using the `writeFile` method which has both 
synchronous and asynchronous versions.

Let's start with synchronous. 


### fs.writeFileSync

The first argument is the path to the file. Let's specify `greet.txt`. 
And the second argument is the file's contents. Let's make the second 
argument `Hello world!`.

```
	fs.writeFieldSync("./greet.txt", "Hello world!");
```
	
If we run `node index-fs`, we can see a new file `greet.txt` has been created with 
`Hello world!` as the contents.

Let's take a look at the async version. 

### fs.writeFile

The first argument remains the same, the filename, which is `./greet.txt`.
And the sedcond argument is still file contents. 

```
	fs.writeFile("./greet.txt", "Hello DeniseLupe!");
```

Now we can specify the third argument which is an error first callback. 
Within the function body, check for an error, and if error exists, log it 
to the console. If there is no error, the contents have been written to the file, 
and we can log a message that says so.

```
	fs.writeFile("./greet.txt", "Hello DeniseLupe!", (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("file written");
		}
	});
```

We run `node index-fs`, and this time we see `file written` in the print statements. 
We open `greet.txt`, and we see the updated text. By default, `writeFile` overwrites 
the file contents. This is the reason that `Hello world!` has been overwritten 
with `Hello DeniseLupe!`. 

However, if you want to append to the existing content, you can add an option as a third 
argument. It's an object, with a `reset` flag as append. And we then make sure to add a whitespace 
before the text content.

```
	fs.writeFile("./greet.txt", " Hello DeniseLupe!", { flag: "a" }, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("file written");
		}
	});
```

We save the file and re-run `node index-fs`, and we have the following content inside the 
`./greet.txt` file. 

```
	Hello world! Hello DeniseLupe!
```

Both content exists in the file. Now if you're wondering as to why you might see
`Hello DeniseLupe` logged at the very end, it just so happened that in this run, reading 
the `./file.txt` took a lot more time than writing to `./greet.txt`. 

And we will learn more about this on a section on asynchronous node under the hood. 

-----

## Summary 

In Node, we rely on the `fs` module to work with the filesystem. 

We can use the `readFileSync` to read file contents, but that will block 
execution and potentially hang execution when multiple users interact with the app. 

The recommended approach is to use read file, which does not block execution when 
the file contents are being read. The rest of the code gets executed, and when JavaScript 
gets a signal that the file has been read, it will execute the callback function. 

If there was an error while reading the file, the error argument is set. If there was no 
error, then error is null, and the data argument is set.

You can use data for processing the file contents if necessary.

We also had a look at `writeFileSync` and `writeFile` methods to write content 
into a file. If the file does not exist, a new file is created. If the file does 
exist, the file's contents are overwritten. 

You can also add a flag, to append the contents instead of overwriting. 

Now although the callback based `readFile` and `writeFile` methods do the job, 
Node decided to add a promise based version of the `fs` module which we can use 
in our app.

Let's learn about that in the next lesson.