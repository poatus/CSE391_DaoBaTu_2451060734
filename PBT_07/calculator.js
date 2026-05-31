// B1: Calculator

function calculate(num1, operator, num2) {
    // Validate numbers
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }
    
    // Check division by zero
    if (operator === '/' && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }
    
    // Calculate
    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        case '%': return num1 % num2;
        case '**': return num1 ** num2;
        default: return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// Test
console.log(calculate(10, "+", 5));    // 15
console.log(calculate(10, "/", 0));    // Lỗi
console.log(calculate(10, "^", 5));    // Lỗi
console.log(calculate("abc", "+", 5)); // Lỗi
console.log(calculate(2, "**", 10));   // 1024
