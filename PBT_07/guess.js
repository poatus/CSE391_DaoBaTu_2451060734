// B3: Guess Number Game

function startGame() {
    const answer = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    let attempts = 0;
    const guessed = [];
    
    alert("Chào mừng đến game Đoán Số!\nTôi đã nghĩ ra 1 số từ 1-100.\nBạn có 7 lần đoán!");
    
    while (attempts < maxAttempts) {
        const input = prompt(`Lần ${attempts + 1}/${maxAttempts}: Nhập số (1-100):`);
        
        // Cancel
        if (input === null) {
            alert("Bạn đã hủy game!");
            return;
        }
        
        const guess = parseInt(input);
        
        // Validate
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số từ 1-100!");
            continue;
        }
        
        // Check duplicate
        if (guessed.includes(guess)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }
        
        guessed.push(guess);
        attempts++;
        
        // Check answer
        if (guess === answer) {
            alert(`🎉 Chúc mừng! Bạn đoán đúng sau ${attempts} lần!\nĐáp án: ${answer}`);
            return;
        } else if (guess < answer) {
            alert("📈 Cao hơn!");
        } else {
            alert("📉 Thấp hơn!");
        }
    }
    
    // Lost
    alert(`😢 Bạn đã hết lượt!\nĐáp án là: ${answer}`);
}

// Auto start when page loads
// startGame();
