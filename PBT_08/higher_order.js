// PHIẾU BÀI TẬP 08 - BÀI B3: HIGHER-ORDER FUNCTIONS CHALLENGE

// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

console.log("=== 1. PIPE FUNCTION ===");
const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"

// Test thêm
const calculate = pipe(
    x => x + 5,
    x => x * 3,
    x => x - 10
);
console.log(calculate(10)); // (10 + 5) * 3 - 10 = 35

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log("📦 Lấy từ cache!");
            return cache[key];
        }
        
        console.log("🔄 Đang tính toán...");
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

console.log("\n=== 2. MEMOIZE FUNCTION ===");
const expensiveCalc = memoize((n) => {
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("Lần 1:", expensiveCalc(1000000)); // → Đang tính...
console.log("Lần 2:", expensiveCalc(1000000)); // → Lấy từ cache!
console.log("Lần 3:", expensiveCalc(1000000)); // → Lấy từ cache!

// Test với nhiều tham số
const add = memoize((a, b, c) => {
    return a + b + c;
});

console.log("\nTest memoize với nhiều tham số:");
console.log(add(1, 2, 3)); // → Đang tính...
console.log(add(1, 2, 3)); // → Lấy từ cache!
console.log(add(4, 5, 6)); // → Đang tính...

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

console.log("\n=== 3. DEBOUNCE FUNCTION ===");
const search = debounce((query) => {
    console.log("🔍 Searching:", query);
}, 500);

console.log("Gọi search liên tục (chỉ lần cuối được thực hiện):");
search("a");
search("ap");
search("app");
search("appl");
search("apple");
// Chỉ "apple" được search sau 500ms

// Demo với input simulation
console.log("\nDemo: User gõ từng ký tự...");
const debouncedLog = debounce((text) => {
    console.log("✓ Kết quả cuối cùng:", text);
}, 1000);

debouncedLog("H");
debouncedLog("He");
debouncedLog("Hel");
debouncedLog("Hell");
debouncedLog("Hello");

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`🔄 Thử lần ${attempt}/${maxAttempts}...`);
            const result = await fn();
            console.log(`✓ Thành công ở lần ${attempt}!`);
            return result;
        } catch (error) {
            console.log(`✗ Lần ${attempt} thất bại:`, error.message);
            
            if (attempt === maxAttempts) {
                console.log(`❌ Đã thử ${maxAttempts} lần, vẫn thất bại!`);
                throw error;
            }
            
            // Đợi một chút trước khi thử lại
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

console.log("\n=== 4. RETRY FUNCTION ===");

// Test case 1: Thành công ở lần thứ 2
let attemptCount = 0;
const unreliableFunction = async () => {
    attemptCount++;
    if (attemptCount < 2) {
        throw new Error("Network error");
    }
    return "Success!";
};

console.log("Test 1: Thành công ở lần 2");
retry(unreliableFunction, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(err => console.log("Lỗi cuối:", err.message));

// Test case 2: Luôn thất bại
setTimeout(() => {
    console.log("\nTest 2: Luôn thất bại");
    const alwaysFail = async () => {
        throw new Error("Server down");
    };
    
    retry(alwaysFail, 3)
        .then(result => console.log("Kết quả:", result))
        .catch(err => console.log("Lỗi cuối:", err.message));
}, 2000);

// Test case 3: Thành công ngay lần đầu
setTimeout(() => {
    console.log("\nTest 3: Thành công ngay lần đầu");
    const immediateSuccess = async () => {
        return "Immediate success!";
    };
    
    retry(immediateSuccess, 3)
        .then(result => console.log("Kết quả:", result))
        .catch(err => console.log("Lỗi cuối:", err.message));
}, 4000);

// === BONUS: Thêm một số higher-order functions khác ===

// 5. throttle() — Giới hạn số lần gọi trong khoảng thời gian
function throttle(fn, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log("\n=== BONUS: THROTTLE FUNCTION ===");
const throttledLog = throttle((msg) => {
    console.log("📢", msg, new Date().toLocaleTimeString());
}, 1000);

console.log("Gọi throttle nhiều lần (chỉ 1 lần/giây được thực hiện):");
throttledLog("Call 1");
setTimeout(() => throttledLog("Call 2"), 200);
setTimeout(() => throttledLog("Call 3"), 400);
setTimeout(() => throttledLog("Call 4"), 1100); // Lần này sẽ được thực hiện

// 6. compose() — Giống pipe nhưng chạy từ phải sang trái
function compose(...fns) {
    return function(value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

console.log("\n=== BONUS: COMPOSE FUNCTION ===");
const transform = compose(
    x => "Kết quả: " + x,
    x => x.toString(),
    x => x + 10,
    x => x * 2
);
console.log(transform(5)); // 5 * 2 + 10 = "Kết quả: 20"

// 7. curry() — Chuyển function nhiều tham số thành chuỗi functions 1 tham số
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}

console.log("\n=== BONUS: CURRY FUNCTION ===");
const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4));     // → 24
console.log(curriedMultiply(2, 3)(4));     // → 24
console.log(curriedMultiply(2)(3, 4));     // → 24
console.log(curriedMultiply(2, 3, 4));     // → 24

const double = curriedMultiply(2);
const doubleAndTriple = double(3);
console.log(doubleAndTriple(5));           // → 30
