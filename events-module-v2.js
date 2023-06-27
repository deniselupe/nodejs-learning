const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("order-pizza", () => {
    console.log("Order received! Baking a pizza!");
});

emitter.emit("order-pizza");

emitter.on("order-new-pizza", (size, topping) => {
    console.log(`Backing a ${size} pizza with ${topping}!`);
});

emitter.on("order-new-pizza", (size) => {
    if (size === "large") {
        console.log("Serving complimentary drink!");
    }
});

emitter.emit("order-new-pizza", "large", "mushrooms");
