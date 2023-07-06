/*
    In the previous lesson about Events module, we learned that 
    Events module returns the EventEmitter class. 

    Using an instance of EventEmitter, we were able to emit events and 
    respond to the emitted events.

    In this lesson we will create our own module that builds on top of 
    EventEmitter class.

    Let's get started.

    In a new file called pizza-shop.js, we will create a Pizza Shop class. It will have an 
    instance variable called orderNumber, and two methods, order (increments 
    orderNumber by 1) and displayOrderNumber (logs the orderNumber).


        class PizzaShop {
            constructor() {
                this.orderNumber = 0;
            }

            order() {
                this.orderNumber++;
            }

            displayOrderNumber() {
                console.log(`Current order number: ${this.orderNumber}`);
            }
        }

        module.exports = PizzaShop;


    Let's export the PizzaShop class for use in index.js.

    ---

    In index.js, we will import the PizzaShop class.

    Afterwards, make a new instance.

    With the new instance called `pizzaShop`, you will be able 
    to call order() and dispalyOrderNumber() instance methods.


        const PizzaShop = require("./pizza-shop");

        const pizzaShop = new PizzaShop();

        pizzaShop.order();
        pizzaShop.displayOrderNumber(); 


    If we run index.js, we will get the console.log() message
    that says "Current order number: 1".

    ---

    So we have a pizza shop that has its own properties and methods.

    However, we would like this shop to be able to handle orders
    using the event-driven architecture. That is, using the Events module.

    Now the solution for that is inheritance. 

    In JavaScript, we can extend once class to inherit the functionality 
    of another class.

    In our case, PizzaShop class is going to inherit from the EventEmitter 
    class. 

    And here's how we'll do that.

    ---

    Begin by importing the EventEmitter class into the pizza-shop.js file.

    Next, still in pizza-shop.js, use the `extends` keyword with the PizzaShop class.

    And then within the constructor of PizzaShop, invoke super().

    This class-based inheritance is a feature introduced in ES2015.

    What this inheritance allows us to do is use the PizzaShop class 
    as if it is an EventEmitter class.

    This means that PizzaShop instances will be able to make use of the .emit() and .on()
    instance methods that come from EventEmitter class.

    So within the order() method, we can now emit an event. But this time, 
    we don't have a separate emitter object. We will use the `this` keyword
    to refer to the emitted object. 

    The PizzaShop class will now look like this:

        const EventEmitter = require("node:events");

        class PizzaShop extends EventEmitter {
            constructor() {
                super();
                this.orderNumber = 0;
            }

            order(size, topping) {
                this.orderNumber++;
                this.emit("order", size, topping);
            }

            displayOrderNumber() {
                console.log(`Current order number: ${this.orderNumber}`);
            }
        }

    With an event now being emitted from the order(size, topping) instance method, 
    we can go back to index.js and attach listeners from the index.js file.

    ---

    In index.js you will add the following to listen to the order() emitter.


        pizzaShop.on("order", (size, topping) => {
            console.log(`Order received! Baking a ${size} pizza with ${topping}`);
        });


    And you will then update the call to pizzaShop.order() so that it now looks like 
    this:


        pizzaShop.order("large", "mushrooms");


    Afterwards, run `node index` to run the index.js file, and you will see that 
    "Order received! Baking a large pizza with mushrooms" message is logged in the terminal.

    You also see the message logged in terminal due to .displayOrderNumber() being called:
    "Current order number: 1"


    Code Checkpoint:

        const PizzaShop = require("./pizza-shop");

        const pizzaShop = new PizzaShop();

        pizzaShop.on("order", (size, topping) => {
            console.log(`Order received! Baking a ${size} pizza with ${topping}`);
        });

        pizzaShop.order("large", "mushrooms");
        pizzaShop.displayOrderNumber();

    ---

    Let's now register the other event listener which has to do with 
    serving a drink. 

    Now what we will do is extract out the drink logic into a separate module.

    So let's create a new file called drink-machine.js, and within 
    this new file we will create a new class called DrinkMachine.


        class DrinkMachine {
            serveDrink(size) {
                if (size === "large") {
                    console.log("Serving complimentary drink");
                }
            }
        }

        module.exports = DrinkMachine;


    We will export this class for use within index.js.

    ---

    Back in index.js, we import DrinkMachine.


        const DrinkMachine = require("./drink-machine");


    And create a new instance.


        const drinkMachine = new DrinkMachine();


    Next, within the same order event listener, call drinkMachine.serveDrink(size).

    Rerun `node index`, and you will see the following output in ther terminal:
    Order received! Baking a large pizza with mushrooms
    Serving comlimentary drink
    Current order number: 1

    ---

    As you can see, using events, we're able to tie together different 
    modules without having to tightly couple them.

    But what we want you to take away from this is the fact that modules 
    such as PizzaShop can extend from EventEmitter, allowing them to emit and 
    react to their own custom events. 

    And the reason why it's important to remember this, is because most of 
    the built-in modules, especially fs, streams, and HTTP also extend from 
    the EventEmitter class.

    With this in mind, let's proceed to the remaining built-in modules for 
    Node.js.
*/

const PizzaShop = require("./pizza-shop");
const DrinkMachine = require("./drink-machine");

const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on("order", (size, topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping}`);
    drinkMachine.serveDrink(size);
});

pizzaShop.order("large", "mushrooms");
pizzaShop.displayOrderNumber();
