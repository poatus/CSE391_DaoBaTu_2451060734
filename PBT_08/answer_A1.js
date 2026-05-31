// PHẦN A - CÂU A1: Function Declaration vs Expression vs Arrow

// 1. Function Declaration
function tinhThueBaoHiem_Declaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuong = 0; // Giả sử không có thưởng
    const thuc_nhan = luong - thue;
    
    return { thuong, thuc_nhan };
}

// 2. Function Expression
const tinhThueBaoHiem_Expression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuong = 0;
    const thuc_nhan = luong - thue;
    
    return { thuong, thuc_nhan };
};

// 3. Arrow Function
const tinhThueBaoHiem_Arrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuong = 0;
    const thuc_nhan = luong - thue;
    
    return { thuong, thuc_nhan };
};

// Test
console.log("=== TEST 3 CÁCH VIẾT HÀM ===");
console.log("Lương 15 triệu:");
console.log("Declaration:", tinhThueBaoHiem_Declaration(15000000));
console.log("Expression:", tinhThueBaoHiem_Expression(15000000));
console.log("Arrow:", tinhThueBaoHiem_Arrow(15000000));

console.log("\nLương 10 triệu:");
console.log("Declaration:", tinhThueBaoHiem_Declaration(10000000));
console.log("Expression:", tinhThueBaoHiem_Expression(10000000));
console.log("Arrow:", tinhThueBaoHiem_Arrow(10000000));

// === GIẢI THÍCH VỀ HOISTING ===
console.log("\n=== HOISTING ===");

// Function Declaration được hoisted → có thể gọi trước khi khai báo
console.log("Gọi trước khi khai báo:");
try {
    console.log(testDeclaration()); // ✓ Hoạt động!
} catch (e) {
    console.log("Lỗi:", e.message);
}

function testDeclaration() {
    return "Declaration works!";
}

// Function Expression KHÔNG được hoisted → lỗi nếu gọi trước
try {
    console.log(testExpression()); // ✗ Lỗi!
} catch (e) {
    console.log("Lỗi Expression:", e.message);
}

const testExpression = function() {
    return "Expression works!";
};

// Arrow Function cũng KHÔNG được hoisted
try {
    console.log(testArrow()); // ✗ Lỗi!
} catch (e) {
    console.log("Lỗi Arrow:", e.message);
}

const testArrow = () => "Arrow works!";

console.log("\n=== KẾT LUẬN ===");
console.log(`
1. Function Declaration:
   - Được HOISTED (có thể gọi trước khi khai báo)
   - Có 'this' binding riêng
   - Có thể dùng làm constructor

2. Function Expression:
   - KHÔNG được hoisted
   - Có 'this' binding riêng
   - Có thể dùng làm constructor

3. Arrow Function:
   - KHÔNG được hoisted
   - KHÔNG có 'this' riêng (kế thừa từ scope cha)
   - KHÔNG thể dùng làm constructor
   - Cú pháp ngắn gọn hơn
`);
