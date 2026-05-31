// PHẦN C - CÂU C1: Refactor Code

console.log("=== CODE GỐC (UGLY) ===\n");

// TRƯỚC (ugly code):
function processOrders_OLD(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Sort by finalTotal descending
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}

console.log("=== CODE MỚI (REFACTORED) ===\n");

// SAU (clean code - ≤ 10 dòng):
function processOrders(orders) {
    return orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}

// === TEST ===
const testOrders = [
    { id: 1, customer: "Nguyễn Văn A", status: "completed", total: 500000 },
    { id: 2, customer: "Trần Thị B", status: "pending", total: 300000 },
    { id: 3, customer: "Lê Văn C", status: "completed", total: 150000 },
    { id: 4, customer: "Phạm Thị D", status: "completed", total: 80000 },
    { id: 5, customer: "Hoàng Văn E", status: "completed", total: 200000 },
    { id: 6, customer: "Vũ Thị F", status: "cancelled", total: 400000 },
    { id: 7, customer: "Đỗ Văn G", status: "completed", total: 350000 }
];

console.log("Test với code cũ:");
console.log(processOrders_OLD(testOrders));

console.log("\nTest với code mới:");
console.log(processOrders(testOrders));

console.log("\n=== SO SÁNH ===\n");

console.log(`
CODE CŨ (Ugly):
❌ Dài dòng: 24 dòng
❌ Nested if: Khó đọc
❌ Dùng var: Function scope, dễ lỗi
❌ Bubble sort: O(n²), chậm
❌ Mutate object: Tạo object rồi gán từng property
❌ Khó maintain: Logic rải rác

CODE MỚI (Clean):
✓ Ngắn gọn: 9 dòng
✓ Declarative: Nói "cái gì" thay vì "làm thế nào"
✓ Functional: filter → map → sort
✓ Immutable: Không thay đổi mảng gốc
✓ Dễ đọc: Mỗi bước rõ ràng
✓ Dễ test: Mỗi method có thể test riêng
✓ Performance: Built-in sort tối ưu hơn

GIẢI THÍCH TỪNG BƯỚC:

1. filter(order => order.status === "completed" && order.total > 100000)
   → Lọc đơn hàng: completed VÀ total > 100k

2. map(({ id, customer, total }) => ({ ... }))
   → Destructure để lấy id, customer, total
   → Tạo object mới với discount và finalTotal

3. sort((a, b) => b.finalTotal - a.finalTotal)
   → Sắp xếp giảm dần theo finalTotal
   → b - a = descending, a - b = ascending
`);

console.log("\n=== THÊM VÍ DỤ REFACTOR ===\n");

// Ví dụ 1: Tính tổng giá trị đơn hàng completed
console.log("1. Tổng giá trị đơn completed:");

// Cũ
function getTotalOld(orders) {
    var total = 0;
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            total += orders[i].total;
        }
    }
    return total;
}

// Mới
const getTotal = orders => 
    orders
        .filter(o => o.status === "completed")
        .reduce((sum, o) => sum + o.total, 0);

console.log("  Cũ:", getTotalOld(testOrders));
console.log("  Mới:", getTotal(testOrders));

// Ví dụ 2: Lấy danh sách tên khách hàng unique
console.log("\n2. Danh sách khách hàng unique:");

// Cũ
function getCustomersOld(orders) {
    var customers = [];
    for (var i = 0; i < orders.length; i++) {
        var found = false;
        for (var j = 0; j < customers.length; j++) {
            if (customers[j] === orders[i].customer) {
                found = true;
                break;
            }
        }
        if (!found) {
            customers.push(orders[i].customer);
        }
    }
    return customers;
}

// Mới
const getCustomers = orders => 
    [...new Set(orders.map(o => o.customer))];

console.log("  Cũ:", getCustomersOld(testOrders));
console.log("  Mới:", getCustomers(testOrders));

// Ví dụ 3: Nhóm đơn hàng theo status
console.log("\n3. Nhóm theo status:");

// Cũ
function groupByStatusOld(orders) {
    var result = {};
    for (var i = 0; i < orders.length; i++) {
        var status = orders[i].status;
        if (!result[status]) {
            result[status] = [];
        }
        result[status].push(orders[i]);
    }
    return result;
}

// Mới
const groupByStatus = orders =>
    orders.reduce((acc, order) => {
        (acc[order.status] = acc[order.status] || []).push(order);
        return acc;
    }, {});

console.log("  Cũ:", groupByStatusOld(testOrders));
console.log("  Mới:", groupByStatus(testOrders));

console.log("\n✓ Refactoring: Code ngắn gọn, dễ đọc, dễ maintain!");
