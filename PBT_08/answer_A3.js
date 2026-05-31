// PHẦN A - CÂU A3: Array Methods

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== ARRAY METHODS - 1 DÒNG CODE ===\n");

// 1. Lấy các số chẵn → [2, 4, 6, 8, 10]
const even = nums.filter(n => n % 2 === 0);
console.log("1. Số chẵn:", even);

// 2. Nhân mỗi số với 3 → [3, 6, 9, ..., 30]
const triple = nums.map(n => n * 3);
console.log("2. Nhân 3:", triple);

// 3. Tính tổng tất cả → 55
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log("3. Tổng:", sum);

// 4. Tìm số đầu tiên > 7 → 8
const firstGreater7 = nums.find(n => n > 7);
console.log("4. Số đầu tiên > 7:", firstGreater7);

// 5. Kiểm tra CÓ số > 10 không → false
const hasGreater10 = nums.some(n => n > 10);
console.log("5. Có số > 10?", hasGreater10);

// 6. Kiểm tra TẤT CẢ đều > 0 → true
const allPositive = nums.every(n => n > 0);
console.log("6. Tất cả > 0?", allPositive);

// 7. Tạo mảng "Số X là [chẵn/lẻ]" → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);
console.log("7. Mô tả:", descriptions);

// 8. Đảo ngược mảng (không mutate gốc) → [10, 9, ..., 1]
const reversed = [...nums].reverse();
console.log("8. Đảo ngược:", reversed);
console.log("   Mảng gốc:", nums, "(không thay đổi)");

// === BONUS: Thêm các array methods khác ===
console.log("\n=== BONUS: CÁC METHODS KHÁC ===\n");

// findIndex - Tìm vị trí đầu tiên thỏa điều kiện
const index = nums.findIndex(n => n > 5);
console.log("findIndex (> 5):", index); // 5 (vị trí của số 6)

// includes - Kiểm tra có chứa phần tử không
console.log("includes(5):", nums.includes(5)); // true
console.log("includes(15):", nums.includes(15)); // false

// slice - Cắt mảng (không mutate)
console.log("slice(2, 5):", nums.slice(2, 5)); // [3, 4, 5]

// concat - Nối mảng
console.log("concat([11, 12]):", nums.concat([11, 12]));

// join - Nối thành chuỗi
console.log("join(', '):", nums.join(', '));

// fill - Điền giá trị (mutate!)
const arr = [1, 2, 3, 4, 5];
console.log("fill(0, 1, 3):", arr.fill(0, 1, 3)); // [1, 0, 0, 4, 5]

// flat - Làm phẳng mảng lồng nhau
const nested = [1, [2, 3], [4, [5, 6]]];
console.log("flat():", nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log("flat(2):", nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap - map + flat
const words = ["hello world", "foo bar"];
console.log("flatMap(split):", words.flatMap(s => s.split(' ')));
// ["hello", "world", "foo", "bar"]

// === CHAIN METHODS ===
console.log("\n=== CHAIN METHODS ===\n");

// Lấy số chẵn, nhân 2, tính tổng
const result1 = nums
    .filter(n => n % 2 === 0)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0);
console.log("Chẵn → x2 → tổng:", result1); // (2+4+6+8+10)*2 = 60

// Lấy số lẻ, bình phương, lấy 3 số đầu
const result2 = nums
    .filter(n => n % 2 !== 0)
    .map(n => n ** 2)
    .slice(0, 3);
console.log("Lẻ → ^2 → 3 đầu:", result2); // [1, 9, 25]

// Sắp xếp giảm dần, lấy 5 số đầu, tính trung bình
const result3 = nums
    .sort((a, b) => b - a)
    .slice(0, 5)
    .reduce((acc, n, i, arr) => acc + n / arr.length, 0);
console.log("Top 5 → trung bình:", result3); // (10+9+8+7+6)/5 = 8

// === SO SÁNH FOR vs ARRAY METHODS ===
console.log("\n=== SO SÁNH: FOR vs ARRAY METHODS ===\n");

// Cách cũ: for loop
console.log("Cách cũ (for loop):");
let evenOld = [];
for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
        evenOld.push(nums[i]);
    }
}
console.log(evenOld);

// Cách mới: array methods
console.log("\nCách mới (array methods):");
const evenNew = nums.filter(n => n % 2 === 0);
console.log(evenNew);

console.log("\n✓ Array methods: Ngắn gọn, dễ đọc, functional programming!");
