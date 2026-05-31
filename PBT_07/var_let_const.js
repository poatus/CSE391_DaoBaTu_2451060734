// A1: var/let/const Test

console.log("=== Đoạn 1: var hoisting ===");
console.log(x);
var x = 5;

console.log("\n=== Đoạn 2: let TDZ ===");
try {
    console.log(y);
    let y = 10;
} catch(e) {
    console.log("Error:", e.message);
}

console.log("\n=== Đoạn 3: const reassignment ===");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch(e) {
    console.log("Error:", e.message);
}

console.log("\n=== Đoạn 4: const array mutation ===");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("\n=== Đoạn 5: block scope ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
