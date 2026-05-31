// PHẦN A - CÂU A2: Scope & Closure

console.log("=== ĐOẠN 1: CLOSURE ===");

// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

console.log("\n=== GIẢI THÍCH ĐOẠN 1 ===");
console.log(`
Closure cho phép các hàm increment, decrement, getCount "nhớ" được biến count
từ hàm cha counter() ngay cả sau khi counter() đã thực thi xong.

- c.increment() lần 1: ++count → count = 1, return 1
- c.increment() lần 2: ++count → count = 2, return 2
- c.increment() lần 3: ++count → count = 3, return 3
- c.decrement(): --count → count = 2, return 2
- c.getCount(): return count → 2

Biến count là "private" - không thể truy cập trực tiếp từ bên ngoài!
`);

console.log("\n=== ĐOẠN 2: VAR vs LET TRONG VÒNG LẶP ===");

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}

// Output sau 200ms:
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2

setTimeout(() => {
    console.log("\n=== GIẢI THÍCH ĐOẠN 2 ===");
    console.log(`
TẠI SAO VAR VÀ LET CHO KẾT QUẢ KHÁC NHAU?

1. VAR - Function Scope:
   - 'var i' được khai báo ở function scope (hoặc global scope)
   - Chỉ có MỘT biến 'i' duy nhất cho cả vòng lặp
   - Khi setTimeout chạy (sau 100ms), vòng lặp đã kết thúc
   - Lúc này i = 3 (điều kiện dừng)
   - Cả 3 callback đều tham chiếu đến CÙNG biến i = 3
   → In ra: 3, 3, 3

2. LET - Block Scope:
   - 'let j' được khai báo ở block scope (trong mỗi lần lặp)
   - Mỗi lần lặp tạo ra một biến 'j' MỚI
   - Mỗi callback "nhớ" giá trị j của lần lặp riêng của nó (closure)
   - Lần 1: j = 0, callback nhớ j = 0
   - Lần 2: j = 1, callback nhớ j = 1
   - Lần 3: j = 2, callback nhớ j = 2
   → In ra: 0, 1, 2

CÁCH FIX CHO VAR (nếu muốn giống let):
`);

    console.log("\n=== CÁCH FIX VAR ===");
    
    // Cách 1: Dùng IIFE (Immediately Invoked Function Expression)
    for (var k = 0; k < 3; k++) {
        (function(index) {
            setTimeout(() => console.log("var fixed (IIFE):", index), 300);
        })(k);
    }
    
    // Cách 2: Dùng let thay vì var (khuyến nghị)
    for (let m = 0; m < 3; m++) {
        setTimeout(() => console.log("let (recommended):", m), 400);
    }
    
}, 250);

// Demo thêm về scope
setTimeout(() => {
    console.log("\n=== DEMO THÊM VỀ SCOPE ===");
    
    // var - function scope
    function testVar() {
        if (true) {
            var x = 10;
        }
        console.log("var x:", x); // 10 - vẫn truy cập được!
    }
    testVar();
    
    // let - block scope
    function testLet() {
        if (true) {
            let y = 20;
        }
        try {
            console.log("let y:", y); // Lỗi!
        } catch (e) {
            console.log("let y: ReferenceError -", e.message);
        }
    }
    testLet();
    
}, 500);
