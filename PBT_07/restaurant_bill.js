// C2: Restaurant Bill Calculator

function calculateBill(items, dayOfWeek = 0, includeTip = true) {
    // Calculate subtotal
    let subtotal = 0;
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG           ║");
    console.log("╠══════════════════════════════════════╣");
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const total = item.price * item.quantity;
        subtotal += total;
        const priceK = (item.price / 1000) + "k";
        const totalK = (total / 1000) + "k";
        console.log(`║ ${(i+1)}. ${item.name.padEnd(12)} x${item.quantity}    @${priceK.padEnd(5)} = ${totalK.padEnd(6)} ║`);
    }
    
    console.log("╠══════════════════════════════════════╣");
    
    // Calculate discount
    let discountPercent = 0;
    if (subtotal > 1000000) discountPercent = 15;
    else if (subtotal > 500000) discountPercent = 10;
    
    // Wednesday bonus
    if (dayOfWeek === 3) discountPercent += 5;
    
    const discount = subtotal * discountPercent / 100;
    const afterDiscount = subtotal - discount;
    
    // VAT & Tip
    const vat = afterDiscount * 0.08;
    const tip = includeTip ? afterDiscount * 0.05 : 0;
    const total = afterDiscount + vat + tip;
    
    // Print
    console.log(`║ Tổng cộng:              ${subtotal.toLocaleString().padStart(12)}đ    ║`);
    console.log(`║ Giảm giá (${discountPercent}%):           ${discount.toLocaleString().padStart(12)}đ    ║`);
    console.log(`║ VAT (8%):                ${vat.toLocaleString().padStart(12)}đ    ║`);
    console.log(`║ Tip (5%):                ${tip.toLocaleString().padStart(12)}đ    ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:              ${total.toLocaleString().padStart(12)}đ    ║`);
    console.log("╚══════════════════════════════════════╝");
}

// Test
const order = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

calculateBill(order, 0, true);
