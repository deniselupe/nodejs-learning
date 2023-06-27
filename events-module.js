/*
Events Module

NOTE:
The order in which .emit() and .on() gets called is incorrect in this lesson. 
If you run this file, you will not see any results in the terminal due to the incorrect
order. However, this incorrect order is intentional to help better explain 
the .emit() and .on() functions and their relationship to EventEmitter. Please 
refer to 'events-module-v2.js' in order to see the correct order in which .emit() and 
.on() should be used.

The events module allows us to work with events in Node.js.

An event is an action or occurance that has happened in our application
that we can respond to.

Using the events module, we can dispatch our own custom events and respond 
to those custom events in a non-blocking manner.


Events Module - Scenario

Let's say you're feeling hungry and head out to Dominos to have pizza.
At the counter, you place your order for a pizza.
When you place the order, the line cook sees the order on the screen and bakes a pizza for you.
Order being placed is the event.
Baking a pizza is a response to that event.

Let's use the built-in events module to write code that can mimic this 
day-to-day scenario.
*/

// To make use of a built-in module, we need to import.
// With Node we will use the require() function.
const EventEmitter = require("node:events");

/*
Why did we call the constant 'EventEmitter' and not 'events'?

That is because the events module returns a class called 'EventEmitter' 
which encapsulates functionality to emit events and respond to events.

You could call it 'events' but 'EventEmitter' is more appropriate.

In the next line let's instantiate the class.
*/

const emitter = new EventEmitter();

/*
Now using this 'emitter' object, we can emit events. 

Let's emit an order placed event.

To emit an event, we use the emit method(). So in 
this cause, 'emitter.emit()'.

The emit() method accepts the event name as the argument.
Let's call it "order-pizza".
*/

emitter.emit("order-pizza");

/*
So when when execution reaches line number 54, an event is 
broadcasted in our code. But that is pretty much it.

To respond to this order pizza event, we need to register a listener.
For that, we need to use the on() method.

The on() method accepts 2 parameters:
- The first parameter is the event name which is "order-pizza".
- The second parameter is the listener. A listener is a callback function that gets executed
  when the corresponding event is emitted. A callback function allows us to delay execution 
  until an event has occurred.

  The callback function will be an arrow function which simply logs to the console "Order received! 
  Baking a pizza!". And that's pretty much it.
*/

emitter.on("order-pizza", () => {
    console.log("Order received! Baking a pizza!");
});

/*
If we run this file, we see the message "Order received! Baking a pizza!". 
So dispatching and responding to custom events courtesy of the events module.

Sometimes when emitting an event you may want to pass data to the listener.
For example, when ordering a pizza, we want to specify the size and the topping.

To achieve that, all you have to do is specify the arguments, after the event name 
while emitting the event.

Let's add 2 arguments, "large", which is the size, and "mushroom", which is the topping.
When you do this, Node.js will automatically pass on the arguments to the listener function.

You can now accept parameters ('size', 'topping') to your callback function.
*/

emitter.emit("order-new-pizza", "large", "mushrooms");
emitter.on("order-new-pizza", (size, topping) => {
    console.log(`Backing a ${size} pizza with ${topping}!`);
});

/*
If you run the file, you will see "Baking a large pizza with mushrooms!".

It's also worth noting that can you register multiple listeners for the same event. 

For example, we can add another emitter.on("order-new-pizza") call, but with a 
different listener.
*/

emitter.on("order-new-pizza", (size) => {
    if (size === "large") {
        console.log("Serving complimentary drink!");
    }
});