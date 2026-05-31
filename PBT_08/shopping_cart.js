// PHIẾU BÀI TẬP 08 - BÀI B2: GIỎ HÀNG (SHOPPING CART)

function createCart() {
    // Private data - closure
    let items = [];
    let discountRate = 0;
    let discountAmount = 0;
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        // Tính tổng tiền
        getTotal() {
            const subtotal = items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
            return subtotal - (subtotal * discountRate) - discountAmount;
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            switch(code) {
                case "SALE10":
                    discountRate = 0.10;
                    discountAmount = 0;
                    console.log("✓ Áp dụng mã SALE10: Giảm 10%");
                    break;
                case "SALE20":
                    discountRate = 0.20;
                    discountAmount = 0;
                    console.log("✓ Áp dụng mã SALE20: Giảm 20%");
                    break;
                case "FREESHIP":
                    discountRate = 0;
                    discountAmount = 30000;
                    console.log("✓ Áp dụng mã FREESHIP: Giảm 30.000đ");
                    break;
                default:
                    console.log("✗ Mã giảm giá không hợp lệ");
            }
        },
        
        // In giỏ hàng dạng bảng
        printCart() {
            console.log("\n┌────────────────────────────────────────────────────────────────┐");
            console.log("│  #  │ Sản phẩm           │  SL │ Đơn giá        │ Tổng           │");
            console.log("├────────────────────────────────────────────────────────────────┤");
            
            items.forEach((item, index) => {
                const name = item.name.padEnd(18);
                const quantity = item.quantity.toString().padStart(3);
                const price = item.price.toLocaleString('vi-VN').padStart(14);
                const total = (item.price * item.quantity).toLocaleString('vi-VN').padStart(14);
                console.log(`│  ${index + 1}  │ ${name} │ ${quantity} │ ${price}  │ ${total}  │`);
            });
            
            const subtotal = items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
            
            console.log("├────────────────────────────────────────────────────────────────┤");
            
            if (discountRate > 0) {
                const discount = subtotal * discountRate;
                console.log(`│ Tạm tính:                                   ${subtotal.toLocaleString('vi-VN').padStart(14)}đ │`);
                console.log(`│ Giảm giá (${(discountRate * 100).toFixed(0)}%):                              -${discount.toLocaleString('vi-VN').padStart(13)}đ │`);
            } else if (discountAmount > 0) {
                console.log(`│ Tạm tính:                                   ${subtotal.toLocaleString('vi-VN').padStart(14)}đ │`);
                console.log(`│ Giảm giá (FREESHIP):                        -${discountAmount.toLocaleString('vi-VN').padStart(13)}đ │`);
            }
            
            console.log(`│ Tổng cộng:                                  ${this.getTotal().toLocaleString('vi-VN').padStart(14)}đ │`);
            console.log("└────────────────────────────────────────────────────────────────┘\n");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountRate = 0;
            discountAmount = 0;
            console.log("✓ Đã xóa toàn bộ giỏ hàng");
        }
    };
}

// === TEST ===
console.log("=== DEMO SHOPPING CART ===\n");

const cart = createCart();

console.log("1. Thêm sản phẩm vào giỏ:");
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

console.log("2. Áp dụng mã giảm giá SALE10:");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("3. Kiểm tra số lượng sản phẩm:");
console.log("Số SP:", cart.getItemCount()); // → 4

console.log("\n4. Xóa AirPods Pro:");
cart.removeItem(3);
cart.printCart();
console.log("Sau xóa:", cart.getItemCount()); // → 2

console.log("5. Thêm sản phẩm mới và áp dụng SALE20:");
cart.addItem({ id: 2, name: "MacBook Pro", price: 45990000 }, 1);
cart.applyDiscount("SALE20");
cart.printCart();

console.log("6. Cập nhật số lượng iPhone 16 thành 3:");
cart.updateQuantity(1, 3);
cart.printCart();

console.log("7. Áp dụng mã FREESHIP:");
cart.applyDiscount("FREESHIP");
cart.printCart();

console.log("8. Test mã không hợp lệ:");
cart.applyDiscount("INVALID");

console.log("\n9. Xóa toàn bộ giỏ hàng:");
cart.clearCart();
cart.printCart();
