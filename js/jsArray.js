// 1. Basic Array Operations

// Creating Arrays
let courses = ["HTML", "CSS", "JavaScript", "React"];
let otherCourses = ["Node.js", "Express.js"];
let finalCourses = ['C++', 'C'];

// Concatenating Arrays
// concat1 merges courses and otherCourses
// concat2 merges courses, otherCourses, and finalCourses
let concat1 = courses.concat(otherCourses);
let concat2 = courses.concat(otherCourses, finalCourses);

// Uncomment to see the results
// console.log(concat1); // ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js"]
// console.log(concat2); // ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "C++", "C"]

// Accessing Elements
// console.log(concat1[0]); // "HTML"
// console.log(concat1[concat1.length - 1]); // "Express.js"

// Checking for Elements
// console.log(concat2.includes("C++")); // true
// console.log(concat2.indexOf("C++")); // 6

// 2. Array Methods

// Converting to String
// console.log(concat1.toString()); // "HTML,CSS,JavaScript,React,Node.js,Express.js"
// console.log(typeof concat1); // "object"
// console.log(concat1.join("|")); // "HTML|CSS|JavaScript|React|Node.js|Express.js"

// Sorting Arrays
// console.log(concat1.sort()); // ["CSS", "HTML", "JavaScript", "Node.js", "React", "Express.js"] (sorted alphabetically)

// 3. Using map Method
// map is used to create a new array by applying a function to each element of the original array.

// Doubling Numbers
// Using a for loop:
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    doubledNumbers.push(numbers[i] * 2);
}
console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// Using map:
const doubledNumbersMap = numbers.map(num => num * 2);
console.log(doubledNumbersMap); // [2, 4, 6, 8, 10]

// Extracting User IDs
// Using a for loop:
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' }
];
const userIds = [];
for (let i = 0; i < users.length; i++) {
    userIds.push(users[i].id);
}
console.log(userIds); // [1, 2, 3]

// Using map:
const userIdsMap = users.map(user => user.id);
console.log(userIdsMap); // [1, 2, 3]

const userNamesMap = users.map(user => user.name);
console.log(userNamesMap); // ["John", "Jane", "Doe"]

// Uppercasing Names
// Using a for loop:
const names = ['John', 'Jane', 'Doe'];
const uppercasedNames = [];
for (let i = 0; i < names.length; i++) {
    uppercasedNames.push(names[i].toUpperCase());
}
console.log(uppercasedNames); // ["JOHN", "JANE", "DOE"]

// Using map:
const uppercasedNamesMap = names.map(name => name.toUpperCase());
console.log(uppercasedNamesMap); // ["JOHN", "JANE", "DOE"]

// Copying an Array
// Using the spread operator:
const lil = ['ek', 'do', 'teen'];
const pil = [...lil];
console.log(pil); // ["ek", "do", "teen"]

// Using Index in map
const incrementedNumbers = numbers.map((num, index) => num + index);
console.log(incrementedNumbers); // [1, 3, 5, 7, 9]

// 4. Using forEach Method
// forEach is used to execute a function for each element in the array.
const apps = ['Calculator', 'Messaging', 'Clock'];
apps.forEach(function (app, index) {
    console.log(index, app);
});
// Output:
// 0 "Calculator"
// 1 "Messaging"
// 2 "Clock"


// const number = [1, 2, 3, 4, 5];
// const incrementedNumber = number.map((num, index) => num + index);
// // Get the container element
// const container = document.getElementById('incrementedNumbersContainer');
// // Create a string to hold the HTML
// let htmlContent = '<ul>';

// // Add each incremented number to the HTML string
// incrementedNumber.forEach(num => {
//     htmlContent += `<li>${num}</li>`;
// });

// htmlContent += '</ul>';

// // Set the HTML content of the container
// container.innerHTML = htmlContent;



// memoize ex (it will take a long time to execute)
// function fibonacci(n) {
//     if (n <= 1) {
//         return n;
//     }
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }
// const start = performance.now();
// console.log(fibonacci(40)); // This can take a long time
// const end = performance.now();
// let time = Math.floor(end - start);
// console.log(`Time taken: ${time} milliseconds`);


// // memoize ex (it will take a very short time to execute)
// function memoize(fn) {
//     const cache = {};   

//     return function (...args) {
//         const key = JSON.stringify(args);
//         if (cache[key]) {
//             return cache[key];
//         }
//         const result = fn.apply(this, args);
//         cache[key] = result;
//         return result;
//     };
// }

// const memoizedFibonacci = memoize(function (n) {
//     if (n <= 1) {
//         return n;
//     }
//     return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
// });

// const start1 = performance.now();
// console.log(memoizedFibonacci(500)); // Fast calculation
// const end1 = performance.now();
// let memoizedTime = Math.floor(end1 - start1);
// console.log(`Execution time: ${memoizedTime} milliseconds`);

// memoize ex2

// function memoize(fn) {
//     const cache = {};

//     return function (...args) {
//         const key = JSON.stringify(args);
//         if (cache[key]) {
//             return cache[key];
//         }
//         const result = fn.apply(this, args);
//         cache[key] = result;
//         return result;
//     };
// }

// const memoizedFactorial = memoize(function (n) {
//     if (n === 0 || n === 1) {
//         return 1;
//     }
//     return n * memoizedFactorial(n - 1);
// });

// // Measure memoized factorial execution time
// const startMemoized = performance.now();
// console.log(memoizedFactorial(100)); // Fast calculation
// const endMemoized = performance.now();
// const memoizedTime = Math.floor(endMemoized - startMemoized);
// console.log(`Memoized Factorial execution time: ${memoizedTime} milliseconds`);


// promise
// Function that returns a promise
function orderPizza() {
    return new Promise((resolve, reject) => {
        console.log("Ordering pizza...");

        // Simulate pizza delivery with a timeout
        setTimeout(() => {
            const isDelivered = true; // Simulate a successful pizza delivery

            if (isDelivered) {
                resolve("Pizza is delivered!"); // Resolve the promise
            } else {
                reject("Pizza delivery failed."); // Reject the promise
            }
        }, 3000); // Wait for 3 seconds
    });
}

// Use the promise
const pizzaPromise = orderPizza();

console.log("Pizza order is pending...");

pizzaPromise
    .then((message) => {
        console.log(message); // This runs if the promise is resolved
    })
    .catch((error) => {
        console.error(error); // This runs if the promise is rejected
    });

console.log("Waiting for the pizza...");
