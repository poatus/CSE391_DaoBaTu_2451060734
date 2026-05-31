// B4: FizzBuzz

// Version 1: Classic
console.log("=== Classic FizzBuzz (1-100) ===");
for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    console.log(output || i);
}

// Version 2: Custom
function customFizzBuzz(n, rules) {
    console.log(`\n=== Custom FizzBuzz (1-${n}) ===`);
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (let rule of rules) {
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        console.log(output || i);
    }
}

// Test
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
// 21 = FizzJazz, 15 = FizzBuzz, 35 = BuzzJazz
