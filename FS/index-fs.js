const fs = require("node:fs");

// Reading Files
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

// Writing Files
fs.writeFileSync("./greet.txt", "Hello world!");

fs.writeFile("./greet.txt", " Hello DeniseLupe", { flag: "a" }, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("file written");
    }
});
