# HTTP Module

We're going to take a look at the HTTP Module, however, before 
we understand what the HTTP module is about, let's briefly understand how 
the web works.

In simple terms, let's understand what happens when a user types 
in a URL in the web browser on the computer.

---

### Clients and Servers

Computers connected to the internet are called Clients and Servers.

Clients are internet connected devices such as computers or mobile 
phones, along with web accessing software on those devices such as 
a Web Browser.

Servers on the other hand are computers that store web pages, 
sites, or applications.

When you type a URL in the browser, the client device requests 
access to the webpage. A copy of the webpage is downloaded from the 
server, and sent as a response to the client to be displayed on 
the Web Browser.

This model is popularily called the "client-server model". 

Now we understand that there is data transfer between the client and 
the server, but in what format is that data?

What if the request sent by the client cannot be understood by the 
server? And what if the response sent by the server cannot be understood 
by the client?

Well, this is how HTTP comes into the picture.

---

### HTTP (Hypertext Tranfer Protocol)

This protocol defines a format for clients and servers to speak to each other.

A client sends an HTTP request, and the server responds with an HTTP response.

This is how the web works at a very high level.

No where does Node fit in?

As it turns out, we can create a Web Server, using Node.js

---

### Where Node.js steps in

Node.js has access to operating system functionality like networking, and 
given the fact that Node.js has event loop to run tasks asynchronously, 
it is perfect for creating Web Servers that can simultaneously handle 
large volumes of requests.

Of course, the Node server we create still has to respect the HTTP format.

And for that we use the built-in HTTP module. 

---

Recap

The HTTP Module allows creation of Web Server that can tranfer data over HTTP.
We'll take a look into creating a Web Server in the next lesson.