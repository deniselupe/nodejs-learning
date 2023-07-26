/*
	Streams and Buffers
	
	A stream is a sequence of data that is being moved from one point 
	to another over time.
	
	Example:
	A stream of data over the internet being moved from one computer to another.
	
	Example:
	A stream of data being transferred from one file to another within the same computer.
	
	In Node.js, the idea is to process streams of data in chunks as they arrive
	instead of waiting for the entire data to be available before processing.
	
	---
	
	Example: Watching a video on YouTube
	
	You don't wait for the entire video to be downloaded to watch it.
	
	The data arrives in chunks, and you watch in chunks while the rest of 
	the data arrives over time.
	
	---
	
	Example: Transferring file contents from File A to File B.
	
	You don't wait for the entire File A content to be saved in temporary 
	memory before moving it to File B.
	
	The contents arrive in chunks, and you transfer in chunks while the 
	remaining contents arrive over time.
	
	In doing so, you're preventing unnecessary data downloads and 
	memory usage.
	
	And we're sure you'll agree that this is always good.
	
	---
	
	Hopefully, it is clear to you now that a stream is a sequence of data 
	that is being moved from one point to another over time.
	
	---
	
	But what the question is, how is that sequence of data moved?
	
	That brings us to the next topic in this lesson, which is Buffers.
	
	-----
	
	Now to understand what a Buffer is, we are going to give an analogy
	that is hopefully easy to understand.
	
	Consider the scenario of an amusement park with a rollercoaster.
	
	The rollercoaster can accomadate up to 30 people.
	
	But we don't know at what pace people arrive at the rollercoaster.
	
	If 100 people arrive at a time, 30 people are accomadated, and the 
	remaining 70 people have to wait in line for the next round.
	
	On the other hand, if only 1 person arrives, they have to wait in line 
	for at least 10 people to arrive in total, and that is a guideline 
	set to improve efficiency. 
	
	But the bottom line is, you cannot control the pace at which people arrive.
	
	You can only decide, when is the right time to send people on the ride.
	
	If people are already on the ride, or if there are too few people to start 
	the ride, you have to have people arriving waiting in line.
	
	As it turns out, this area where people wait is nothing but the Buffer.
	
	---
	
	Node.js cannot control the pace at which data arrives in the stream.
	
	If can only decide when it's the right time to send the data for processing.
	
	If there is data already being processed, or too little data to procses, Node.js 
	puts the arriving data in a Buffer. 
	
	It is an intentionally small area that Node.js maintains in the runtime to process a 
	stream of data. 
	
	---
	
	A familiar example where you can see a buffer in action, is when you're streaming a 
	video online.
	
	If you're internet connection is fast enough, the speed of the stream 
	will be fast enough to instantly fill up the buffer and send it out for processing.
	
	That will repeat until the stream is finished. 
	
	But if your internet connection is slow, after processing the first chunk of data 
	that arrived, the video player will display a loading spinner which indicates that it is 
	waiting for more data to arrive.
	
	Once the Buffer is filled up, and the data is processed, the video player shows the video.
	
	While the video is playing, more data will continue to arrive, and wait in the buffer.
	
	Hopefully, the concept of streams and buffers is now clear to you.
	
	-----
	
	What is the connection between Binary Data, Character Sets, and Encoding to Buffers?
	
	To understand that, we need to head back to the IDE and implement some code.
	
	What you should know is that Node.js provides the Buffer feature as a global feature 
	that you can use without having to import it.
	
	Inside our "index.js" file, let's create a Buffer that holds the string "deniselupe".
	
	You create a new variable called 'buffer', which is equal to 'new Buffer'.
	
	Now on 'Buffer' we use the '.from()' which accepts a string "deniselupe".
	
	We can also specify the character encoding for the second parameter of '.from()'.
	
	In this case we will specify UTF-8 as the character encoding.
	
		
		const buffer = new Buffer.from("deniselupe", "utf-8");
		
	
	Now UTF-8 is the default encoding value, so that second parameter is optional.
	
	---
	
	Now in the next line, we are going to log 'buffer.toJSON()'.
	
	
		const buffer = new Buffer.from("deniselupe", "utf-8");
		
		console.log(buffer.toJSON());
		
	
	Now if we run 'node index' on the terminal, we see an object:
	
	
		{
			type: 'Buffer',
			data: [
				100, 101, 110, 105,
				115, 101, 108, 117,
				112, 101
			]
		}
		
	
	The value of the 'type' key is set to 'Buffer', and the 'data' key is an array 
	which contains 10 numbers.
	
	And this is our first connection to the previous lesson.
	
	Each number in the 'data' array is the Unicode character code for the character in the 
	string "deniselupe".
	
	---
	
	Let's add another log statement. This time we log just buffer.
	
	
		const buffer = new Buffer.from("deniselupe", "utf-8");
		
		console.log(buffer.toJSON());
		console.log(buffer);
		
		
	If we run 'node index' on the terminal, we see a different representation of the buffer.
	
	
		{
			type: 'Buffer',
			data: [
				100, 101, 110, 105,
				115, 101, 108, 117,
				112, 101
			]
		}
		
		<Buffer 64 65 6e 69 73 65 6c 75 70 65>
		
	
	And this is our second connection to the previous lesson.
	
	A buffer contains raw binary data that is displayed as output when we log to the console.
	
	But hang on, isn't binary just 0s and 1s? Well, it is.
	
	What Node.js does is print the Hexadecimal, or, Base16 representation of the number as 
	printing 8 bits binary for every character can flood your terminal. 
	
	But if we copy the number 64, which is the representation for the letter 'd' in 'deniselupe', 
	and head over to the browser, where we have a Hexadecimal converter (https://www.rapidtables.com/convert/number/hex-to-binary.html), 
	we see 01100100 which is the binary representation of the character 'd', and the 
	binary representation of the Unicode character code 100. 
	
	If we would've tried to explain these log statements without any knowledge of the concepts 
	in the previous lesson (Character Sets and Encoding), we would not have been able to explain 
	what a buffer holds.
	
	But hopefully, you now understand.
	
	---
	
	You can also log 'bugger.toString()', and this will give back the 
	string representation of the binary data in the buffer. 
	
	
		const buffer = new Buffer.from("deniselupe", "utf-8");
		
		
		console.log(buffer.toJSON());
		console.log(buffer);
		console.log(buffer.toString());
		
		
	If you run 'node index', you will receive the following output:
	
	
		{
			type: 'Buffer',
			data: [
				100, 101, 110, 105,
				115, 101, 108, 117,
				112, 101
			]
		}
		<Buffer 64 65 6e 69 73 65 6c 75 70 65>
		deniselupe
	
	
	---
	
	You can also write to the Buffer by using the '.write()' method.
	
	
		const buffer = new Buffer.from("deniselupe", "utf-8");
		
		buffer.write("Code");
		
		console.log(buffer.toJSON());
		console.log(buffer);
		console.log(buffer.toString());
		
		
	If we run 'node index', we see that the string is now "Codeselupe".
	
	
		{
			type: 'Buffer',
			data: [
				67, 111, 100, 101,
				115, 101, 108, 117,
				112, 101
			]
		}
		<Buffer 43 6f 64 65 73 65 6c 75 70 65>
		Codeselupe
		
	
	This is because Buffers have limited memory. 
	
	The 4 characters of "Code" overwrite the 4 characters of "deniselupe".
	
	And if you were to write "thisisrandom", and then run 'node index', you will see that the last few 
	characters will be skipped, as they cannot be stored in the Buffer.
	
	
		{
			type: 'Buffer',
			data: [
				116, 104, 105, 115,
				105, 115, 114,  97,
				110, 100
			]
		}
		<Buffer 74 68 69 73 69 73 72 61 6e 64>
		thisisrand
		
		
	-----
	
	Hopefully you now know what are Buffers, and how to interact with them in Node.js.
	
	In Node.js internally uses Buffer where required, and you may never have to work with Buffers 
	directly. 
	
	In fact, we could have learned about the fs() and HTTP modules without understand about 
	buffers in this levle of detail.
	
	But as always, we would like for you to understand the foundations, as they are key to 
	forming a mental model of any technology that you are learning. 
*/

const buffer = new Buffer.from("deniselupe", "utf-8");

buffer.write("thisisrandom");

console.log(buffer.toJSON());
console.log(buffer);
console.log(buffer.toString());