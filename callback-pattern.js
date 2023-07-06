/*
    Callbacks

    Before we proceed further, we need to take a detour to understand the 
    callback pattern, or, callback style of programming in Node.js.

    In JavaScript, functions are first-class objects. 

    This means that just like an object, a function can be passed as an argument 
    to a function. 

    And a function can also be returned as values from other functions.

    Let's understand this with a simple example.

    ---

    We are going to define a function called greet(name), which accepts a name 
    parameter and logs to the console `helloe` followed by the name.
*/

function greet(name) {
    console.log(`Hello ${name}`);
}

/*
    We will also define another function called greetPerson(greetFn), which accepts another 
    function as its argument. Within the greetPersion(greetFn) function body we 
    have a const declaration name equal to "Denise" and we call the passed in 
    function with name as its argument. 
*/

function greetPerson(greetFn) {
    const name = "Denise";
    greetFn(name);
}

/*
    Finally we invoke the greetPerson(greetFn) function, passing in 
    the greet function as the argument. 
*/

greetPerson(greet);

/*
    When we run this file, the control goes to greetPerson(greetFn) which calls 
    greetFn. greetFn is nothing but the greet(name) function, which we have defined on line 
    22.

    Execution goes to the greet(name) function with name equal to "Denise", and 
    "Hello Denise" is going to be logged in the terminal.

    ---

    In this example, greetPerson(greetFn) is a function which accepts another 
    function as an argument. 
    
    And you might be pleasantly surprised to learn that any function that is 
    passed as an argument to another function is called a callback function 
    in JavaScript.

    Also the function which accepts a function as its argument or returns a 
    function is called a higher order function.

    ---

    If we simply rename the function and its argument to convey 
    what they stand for, it would look like this:


        function higherOrderFunction(callback) {
            const name = "Denise";
            callback(name);
        }

        higherOrderFunction(greet);


    higherOrderFunction accepts callback function and on line 76 calls that callback 
    function passing in the name constant.

    ---

    So now we know what a callback function is.

    You might be thinking, "Is that it?".

    Well, yes. 

    A function passed as an argument to another function is called a callback function. 

    But what we need to understand is why do we need a callback function?

    We can answer that by categorizing callbacks into:
        - Synchronous Callbacks
        - Asynchronous Callbacks

    ---

    Synchronous Callbacks

    A callback which is executed immediately is called a Synchronous Callback.

    Our greet callback function here is an example as the function gets
    executed immediately when the control goes inside the higher order function.

    A more practical example is a callback function passed to methods like .sort(), 
    .map(), or .filter().

        
        let numbers = [1, 2, 4, 7, 3, 5, 6];
        numbers.sort((a, b) => a - b);
        numbers.filter((n) => n % 2 === 0);
        numbers.map((n) => n / 2);

    
    In these cases the callback function defines a logic that the higher 
    order function needs to apply.

    Nothing too fancy when it comes to Synchronous Callbacks.

    ---

    Asynchronous Callbacks

    Understanding async callbacks will bring our focus back on Asynchronous JavaScript. 

    An async callback is a callback that is often used to continue or 
    resume code execution after an asynchronous operation has completed.

    So in the async world, callbacks are used to delay the execution of a function
    until a particular time or even has occurred. 

    And this use case is really important because most of modules in Node.js have an 
    asynchronous nature to prevent blocking of execution.

    For example, reading data from a file, fetching data from a database, or 
    handling a network request.

    Now we will understand each of these in more detail as we progress through 
    the lessons but for now let us go back to the browser JavaScript to help
    us understand with an example.

    First Example:
    Our first example is that of event handlers.

        
        function callback() {
            document.getElementById("demo").innerHTML = "Hello World";
        }
        
        document.getElementById("btn").addEventListener("click", callback);


    When JavaScript encounters .addEventListener, it does not immediately run the 
    callback function. The callback function is only run when the user clicks 
    on the button.

    In other words, the execution of the callback function is delayed 
    until an even occurs in the browser, and that event is the click event.

    ---

    So this is the callback pattern or callback style of programming 
    that is very popular in Node.js.

    They allow you to delay the exuction of a function until a particular 
    time or event has occurred.

    With this understanding of callbacks, let's resume learning about the different 
    built-in modules in Node.js.
*/