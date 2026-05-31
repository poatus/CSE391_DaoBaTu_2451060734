# PBT07 - JAVASCRIPT BASICS - ANSWERS

## PHẦN A — ĐỌC HIỂU

### A1: var/let/const

**Dự đoán:**
```javascript
// Đoạn 1: undefined (hoisting)
// Đoạn 2: ReferenceError (TDZ)
// Đoạn 3: TypeError (const reassignment)
// Đoạn 4: [1,2,3,4] (array mutation OK)
// Đoạn 5: "Trong block: 2", "Ngoài block: 1" (block scope)
```

**Giải thích:**
- `var` hoisting → khai báo đưa lên đầu, giá trị undefined
- `let/const` có TDZ (Temporal Dead Zone) → lỗi trước khi khai báo
- `const` không cho gán lại, nhưng object/array vẫn mutate được

### A2: Data Types & Coercion

**Kết quả:**
```javascript
typeof null              // "object" (bug lịch sử JS)
typeof undefined         // "undefined"
typeof NaN              // "number"
"5" + 3                 // "53" (+ nối chuỗi)
"5" - 3                 // 2 (- convert số)
"5" * "3"              // 15 (* convert số)
true + true            // 2 (true = 1)
[] + []                // "" (cả 2 thành "")
[] + {}                // "[object Object]"
{} + []                // 0 (browser) hoặc "[object Object]" (Node)
```

**Tại sao khác nhau?**
- `+` operator: Nếu có string → nối chuỗi
- `-`, `*`, `/`: Luôn convert sang số

### A3: == vs ===

```javascript
5 == "5"              // true (type coercion)
5 === "5"             // false (strict)
null == undefined     // true (đặc biệt)
null === undefined    // false
NaN == NaN           // false (NaN ≠ NaN)
0 == false           // true
0 === false          // false
"" == false          // true
```

**Quy tắc:** Luôn dùng `===` (strict equality) để tránh bug.

### A4: Truthy & Falsy

**6 giá trị Falsy:**
1. `false`
2. `0`
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

**Kết quả:**
```javascript
if ("0") console.log("A");    // In (string không rỗng = truthy)
if ("") console.log("B");     // Không in
if ([]) console.log("C");     // In (array rỗng = truthy)
if ({}) console.log("D");     // In (object rỗng = truthy)
if (null) console.log("E");   // Không in
if (0) console.log("F");      // Không in
if (-1) console.log("G");     // In (số khác 0 = truthy)
if (" ") console.log("H");    // In (string có space = truthy)
```

### A5: Template Literals

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

## PHẦN C — SUY LUẬN

### C1: Debug JavaScript

**6+ lỗi tìm được:**

1. **Thiếu semicolon** sau return (line 3)
2. **Gán thay vì so sánh** `if (giaSauGiam = 0)` → `if (giaSauGiam === 0)`
3. **Input không validate** - "100000" là string, cần `parseFloat()`
4. **var trong setTimeout** - in ra "Item 5" 5 lần (closure issue)
5. **Không xử lý giá âm** khi giảm > 100%
6. **Type coercion** khi nối chuỗi với số

**Code đã sửa:**
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Validate input
    giaBan = parseFloat(giaBan);
    if (isNaN(giaBan) || giaBan < 0) {
        return "Lỗi: Giá bán không hợp lệ";
    }
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia("100000", 20);
console.log(`Giá sau giảm: ${gia}đ`);

const gia2 = tinhGiaGiamGia(50000, 110);
console.log(`Giá: ${gia2}`);

// Fix var → let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(`Item ${i}`);
    }, 1000);
}
```

**Giải thích lỗi var:**
- `var` có function scope → chỉ có 1 biến `i` dùng chung
- Khi setTimeout chạy, vòng lặp đã kết thúc, `i = 5`
- `let` có block scope → mỗi iteration có `i` riêng

---

**Hoàn thành:** 30/05/2026
