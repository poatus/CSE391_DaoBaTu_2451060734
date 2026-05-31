// PHẦN A - CÂU A4: Object Destructuring & Spread

const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

console.log("=== DESTRUCTURING ===\n");

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log("name:", name);           // "iPhone 16"
console.log("price:", price);         // 25990000
console.log("ram:", ram);             // 8
console.log("color:", color);         // "Titan"

try {
    console.log("specs:", specs);     // ReferenceError!
} catch (e) {
    console.log("specs:", "ReferenceError -", e.message);
    console.log("→ 'specs' không được khai báo vì ta destructure nested object");
}

console.log("\n=== SPREAD OPERATOR ===\n");

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log("updated.price:", updated.price);    // 23990000
console.log("updated.sale:", updated.sale);      // true
console.log("product.price:", product.price);    // 25990000 (gốc KHÔNG đổi!)

console.log("\n=== SPREAD GOTCHA (SHALLOW COPY) ===\n");

// Spread gotcha - Shallow copy
const copy = { ...product };
copy.specs.ram = 16;
console.log("product.specs.ram:", product.specs.ram);  // 16 (ĐÃ THAY ĐỔI!)
console.log("copy.specs.ram:", copy.specs.ram);        // 16

console.log("\n=== GIẢI THÍCH CHI TIẾT ===\n");

console.log(`
1. DESTRUCTURING:
   const { name, price, specs: { ram, color } } = product;
   
   - Lấy 'name' và 'price' từ product
   - Destructure NESTED: lấy 'ram' và 'color' từ product.specs
   - Biến 'specs' KHÔNG được tạo (chỉ destructure bên trong nó)
   - Nếu muốn cả 'specs', viết: const { name, price, specs } = product;

2. SPREAD - Tạo object mới:
   const updated = { ...product, price: 23990000, sale: true };
   
   - Copy tất cả properties từ product
   - Ghi đè 'price' = 23990000
   - Thêm property mới 'sale' = true
   - Object gốc 'product' KHÔNG thay đổi

3. SHALLOW COPY GOTCHA:
   const copy = { ...product };
   copy.specs.ram = 16;
   
   - Spread chỉ copy SHALLOW (1 cấp)
   - 'specs' là object nested → chỉ copy REFERENCE
   - copy.specs và product.specs trỏ đến CÙNG object
   - Thay đổi copy.specs.ram → product.specs.ram cũng đổi!
   
   ┌─────────┐         ┌──────────────┐
   │ product │────────>│ name: "..."  │
   └─────────┘         │ price: 25M   │
                       │ specs: ●─────┼──> { ram: 16, ... }
                       └──────────────┘         ↑
   ┌─────────┐         ┌──────────────┐         │
   │  copy   │────────>│ name: "..."  │         │
   └─────────┘         │ price: 25M   │         │
                       │ specs: ●─────┼─────────┘
                       └──────────────┘
   
   CÁCH FIX: Deep copy
`);

console.log("\n=== CÁCH FIX: DEEP COPY ===\n");

// Cách 1: Spread nested object
const deepCopy1 = { 
    ...product, 
    specs: { ...product.specs } 
};
deepCopy1.specs.ram = 32;
console.log("Cách 1 - Spread nested:");
console.log("  product.specs.ram:", product.specs.ram);  // 16 (không đổi)
console.log("  deepCopy1.specs.ram:", deepCopy1.specs.ram); // 32

// Cách 2: JSON.parse(JSON.stringify())
const deepCopy2 = JSON.parse(JSON.stringify(product));
deepCopy2.specs.storage = 512;
console.log("\nCách 2 - JSON:");
console.log("  product.specs.storage:", product.specs.storage);  // 256
console.log("  deepCopy2.specs.storage:", deepCopy2.specs.storage); // 512

// Cách 3: structuredClone (modern browsers)
const deepCopy3 = structuredClone(product);
deepCopy3.specs.color = "Black";
console.log("\nCách 3 - structuredClone:");
console.log("  product.specs.color:", product.specs.color);  // "Titan"
console.log("  deepCopy3.specs.color:", deepCopy3.specs.color); // "Black"

console.log("\n=== THÊM VÍ DỤ VỀ DESTRUCTURING ===\n");

// Default values
const { discount = 0, warranty = "1 năm" } = product;
console.log("discount:", discount);     // 0 (default)
console.log("warranty:", warranty);     // "1 năm" (default)

// Rename variables
const { name: productName, price: productPrice } = product;
console.log("productName:", productName);
console.log("productPrice:", productPrice);

// Rest operator
const { name: n, ...rest } = product;
console.log("name:", n);
console.log("rest:", rest); // { price, specs }

// Array destructuring
const colors = ["Red", "Green", "Blue"];
const [first, second, third] = colors;
console.log("\nArray destructuring:");
console.log("first:", first);   // "Red"
console.log("second:", second); // "Green"
console.log("third:", third);   // "Blue"

// Skip elements
const [, , lastColor] = colors;
console.log("lastColor:", lastColor); // "Blue"

// Rest in arrays
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...others] = numbers;
console.log("\nArray rest:");
console.log("one:", one);       // 1
console.log("two:", two);       // 2
console.log("others:", others); // [3, 4, 5]

console.log("\n=== SPREAD VỚI ARRAYS ===\n");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Nối arrays
const combined = [...arr1, ...arr2];
console.log("combined:", combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const arrCopy = [...arr1];
arrCopy.push(4);
console.log("arr1:", arr1);         // [1, 2, 3] (không đổi)
console.log("arrCopy:", arrCopy);   // [1, 2, 3, 4]

// Thêm phần tử
const withExtra = [0, ...arr1, 4];
console.log("withExtra:", withExtra); // [0, 1, 2, 3, 4]

console.log("\n✓ Destructuring & Spread: Công cụ mạnh mẽ của ES6+!");
