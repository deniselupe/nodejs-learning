const path = require("node:path"); 

console.log(__filename);
console.log(__dirname);

// 1. path.basename - returns last portion of a path
console.log(path.basename(__filename));
console.log(path.basename(__dirname));

// 2. path.extname - returns the extension of the path
console.log(path.extname(__filename)); // .js
console.log(path.extname(__dirname)); // blank, nothing, empoty, no .* in the path

// 3. path.parse - returns an object with significant properties about a path
console.log(path.parse(__filename));

// 4. path.format - returns a path string given an object (inverse of path.parse)
console.log(path.format(path.parse(__filename)));

// 5. path.isAbsolute - returns boolean, whether a path is absolute or not
console.log(path.isAbsolute(__filename));

// 6. path.join - joins all given path segments together, using platform specific separator as a delimiter and then normalizes resulting path
// Accepts one or more strings as arguments
console.log(path.join('folder1', 'folder2', 'index.html'));
console.log(path.join('/folder1', 'folder2', 'index.html'));
console.log(path.join('/folder1', '//folder2', 'index.html'));
console.log(path.join('/folder1', '//folder2', '../index.html'));
console.log(path.join(__dirname, 'data.json'));

// 7. path.resolves - results a sequence of paths or path segments to an absolute path
console.log(path.resolve('folder1', 'folder2', 'index.html'));
console.log(path.resolve('/folder1', 'folder2', 'index.html'));
console.log(path.resolve('/folder1', '//folder2', 'index.html'));
console.log(path.resolve('/folder1', '//folder2', '../index.html'));
console.log(path.resolve(__dirname, 'data.json'));