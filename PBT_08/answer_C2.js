// PHẦN C - CÂU C2: Thiết kế API - miniArray Library

const miniArray = {
    // map: Áp dụng function cho mỗi phần tử, trả về mảng mới
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    
    // filter: Lọc các phần tử thỏa điều kiện
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    
    // reduce: Gộp mảng thành 1 giá trị duy nhất
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;
        
        // Nếu không có initialValue, dùng phần tử đầu làm accumulator
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            accumulator = arr[0];
            startIndex = 1;
        }
        
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        
        return accumulator;
    }
};

// === TEST CASES ===
console.log("=== TEST miniArray LIBRARY ===\n");

// Test 1: map
console.log("1. MAP - Nhân mỗi số với 2:");
const mapResult = miniArray.map([1, 2, 3], x => x * 2);
console.log("  Input: [1, 2, 3]");
console.log("  Output:", mapResult);
console.log("  Expected: [2, 4, 6]");
console.log("  ✓ Pass:", JSON.stringify(mapResult) === JSON.stringify([2, 4, 6]));

// Test 2: filter
console.log("\n2. FILTER - Lọc số > 2:");
const filterResult = miniArray.filter([1, 2, 3, 4], x => x > 2);
console.log("  Input: [1, 2, 3, 4]");
console.log("  Output:", filterResult);
console.log("  Expected: [3, 4]");
console.log("  ✓ Pass:", JSON.stringify(filterResult) === JSON.stringify([3, 4]));

// Test 3: reduce
console.log("\n3. REDUCE - Tính tổng:");
const reduceResult = miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0);
console.log("  Input: [1, 2, 3, 4]");
console.log("  Output:", reduceResult);
console.log("  Expected: 10");
console.log("  ✓ Pass:", reduceResult === 10);

// === THÊM TEST CASES ===
console.log("\n=== THÊM TEST CASES ===\n");

// Test 4: map với index
console.log("4. MAP với index:");
const mapWithIndex = miniArray.map(['a', 'b', 'c'], (item, index) => `${index}: ${item}`);
console.log("  Output:", mapWithIndex);

// Test 5: filter với điều kiện phức tạp
console.log("\n5. FILTER số chẵn:");
const evenNumbers = miniArray.filter([1, 2, 3, 4, 5, 6], x => x % 2 === 0);
console.log("  Output:", evenNumbers);

// Test 6: reduce không có initialValue
console.log("\n6. REDUCE không có initialValue:");
const reduceNoInit = miniArray.reduce([1, 2, 3, 4], (a, b) => a + b);
console.log("  Output:", reduceNoInit);

// Test 7: reduce tìm max
console.log("\n7. REDUCE tìm số lớn nhất:");
const max = miniArray.reduce([5, 2, 8, 1, 9, 3], (max, current) => 
    current > max ? current : max
);
console.log("  Output:", max);

// Test 8: Chain methods
console.log("\n8. CHAIN METHODS:");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chainResult = miniArray.reduce(
    miniArray.map(
        miniArray.filter(numbers, x => x % 2 === 0),
        x => x * 2
    ),
    (sum, x) => sum + x,
    0
);
console.log("  Lọc chẵn → nhân 2 → tổng");
console.log("  Output:", chainResult);
console.log("  Expected:", (2+4+6+8+10)*2); // 60

// === SO SÁNH VỚI BUILT-IN ===
console.log("\n=== SO SÁNH VỚI BUILT-IN ===\n");

const testArr = [1, 2, 3, 4, 5];

console.log("miniArray.map:", miniArray.map(testArr, x => x * 2));
console.log("Array.map:    ", testArr.map(x => x * 2));

console.log("\nminiArray.filter:", miniArray.filter(testArr, x => x > 2));
console.log("Array.filter:    ", testArr.filter(x => x > 2));

console.log("\nminiArray.reduce:", miniArray.reduce(testArr, (a, b) => a + b, 0));
console.log("Array.reduce:    ", testArr.reduce((a, b) => a + b, 0));

// === GIẢI THÍCH IMPLEMENTATION ===
console.log("\n=== GIẢI THÍCH IMPLEMENTATION ===\n");

console.log(`
1. MAP:
   - Tạo mảng rỗng 'result'
   - Duyệt qua từng phần tử của mảng gốc
   - Áp dụng function fn(element, index, array)
   - Push kết quả vào 'result'
   - Return 'result'
   
   Độ phức tạp: O(n)

2. FILTER:
   - Tạo mảng rỗng 'result'
   - Duyệt qua từng phần tử
   - Nếu fn(element) trả về truthy → push vào 'result'
   - Return 'result'
   
   Độ phức tạp: O(n)

3. REDUCE:
   - Khởi tạo accumulator = initialValue (hoặc arr[0])
   - Duyệt qua từng phần tử
   - accumulator = fn(accumulator, currentValue)
   - Return accumulator cuối cùng
   
   Độ phức tạp: O(n)

ƯU ĐIỂM:
✓ Không mutate mảng gốc
✓ Functional programming
✓ Dễ test và debug
✓ Có thể chain methods

NHƯỢC ĐIỂM SO VỚI BUILT-IN:
- Không tối ưu như native implementation
- Thiếu một số tính năng (thisArg, sparse arrays)
- Performance kém hơn
`);

// === BONUS: Thêm methods khác ===
console.log("\n=== BONUS: THÊM METHODS ===\n");

miniArray.find = function(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i, arr)) {
            return arr[i];
        }
    }
    return undefined;
};

miniArray.some = function(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i, arr)) {
            return true;
        }
    }
    return false;
};

miniArray.every = function(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (!fn(arr[i], i, arr)) {
            return false;
        }
    }
    return true;
};

console.log("find (> 3):", miniArray.find([1, 2, 3, 4, 5], x => x > 3));
console.log("some (> 10):", miniArray.some([1, 2, 3, 4, 5], x => x > 10));
console.log("every (> 0):", miniArray.every([1, 2, 3, 4, 5], x => x > 0));

console.log("\n✓ miniArray library: Hiểu rõ cách hoạt động của array methods!");
