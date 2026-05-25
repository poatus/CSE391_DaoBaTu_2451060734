## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — 3 Cách nhúng CSS

#### 1. Inline CSS
**Ví dụ:**
```html
<p style="color: blue; font-size: 16px;">Đây là inline CSS</p>
```

**Ưu điểm:**
- Ưu tiên cao nhất (ngoại trừ !important)
- Áp dụng trực tiếp, nhanh chóng cho 1 element
- Không cần file CSS riêng

**Nhược điểm:**
- Khó bảo trì khi có nhiều elements
- Không tái sử dụng được
- Trộn lẫn HTML và CSS, vi phạm nguyên tắc separation of concerns
- Làm HTML dài dòng, khó đọc

**Khi nào nên dùng:**
- Test nhanh, debug
- Override style cụ thể trong trường hợp đặc biệt
- Email HTML (nhiều email client không hỗ trợ external CSS)

#### 2. Internal CSS (Embedded)
**Ví dụ:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
        .highlight {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <p class="highlight">Đây là internal CSS</p>
</body>
</html>
```

**Ưu điểm:**
- Tất cả CSS trong 1 file HTML, dễ chia sẻ
- Không cần HTTP request riêng cho CSS
- Có thể dùng selectors, tái sử dụng styles

**Nhược điểm:**
- Không tái sử dụng được cho nhiều trang
- File HTML trở nên dài
- Browser không cache được CSS

**Khi nào nên dùng:**
- Trang đơn (single page)
- Landing page nhỏ
- Email template
- Demo, prototype nhanh

#### 3. External CSS
**Ví dụ:**
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p class="highlight">Đây là external CSS</p>
</body>
</html>
```

```css
/* style.css */
p {
    color: blue;
    font-size: 16px;
}
.highlight {
    background-color: yellow;
}
```

**Ưu điểm:**
- Tách biệt hoàn toàn HTML và CSS
- Tái sử dụng cho nhiều trang
- Browser cache được, tăng performance
- Dễ bảo trì, quản lý
- Nhiều người có thể làm việc song song

**Nhược điểm:**
- Cần HTTP request riêng (có thể chậm hơn nếu file nhỏ)
- Phải quản lý nhiều files

**Khi nào nên dùng:**
- Dự án thực tế, website nhiều trang
- Khi cần bảo trì lâu dài
- Team làm việc chung
- **Đây là cách được khuyến nghị nhất**

#### Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời, cách nào "thắng"?

**Trả lời:** Inline CSS sẽ "thắng" (có độ ưu tiên cao nhất).

**Giải thích:**
Thứ tự ưu tiên (từ cao đến thấp):
1. **Inline style** (specificity = 1,0,0,0)
2. **ID selector** trong internal/external (specificity = 0,1,0,0)
3. **Class/attribute/pseudo-class** (specificity = 0,0,1,0)
4. **Element selector** (specificity = 0,0,0,1)

**Ví dụ:**
```html
<style>
    p { color: blue; }           /* Internal CSS */
    #demo { color: green; }      /* Internal CSS với ID */
</style>
<link rel="stylesheet" href="style.css"> <!-- p { color: red; } -->

<p id="demo" style="color: orange;">Text này sẽ có màu ORANGE</p>
```

Inline style có specificity cao nhất nên sẽ thắng, trừ khi có `!important` trong internal/external CSS.

**Lưu ý đặc biệt:** `!important` có thể override cả inline style:
```css
p { color: purple !important; } /* Sẽ thắng cả inline style */
```

---
### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

**Trả lời:**

```css
1. h1                           → Chọn: "ShopTLU"
2. .price                       → Chọn: "25.990.000đ" và "45.990.000đ" (2 elements)
3. #app header                  → Chọn: <header> element (chứa "ShopTLU" và navigation)
4. nav a:first-child            → Chọn: "Home" (link đầu tiên trong nav)
5. .product.featured h2         → Chọn: "MacBook Pro"
6. article > p                  → Chọn: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..." (4 elements - tất cả <p> là con trực tiếp của article)
7. a[href="/"]                  → Chọn: "Home"
8. .top-bar.dark h1             → Chọn: "ShopTLU"
```

**Giải thích chi tiết:**

1. `h1` - Element selector, chọn tất cả thẻ h1 → chỉ có 1 thẻ h1 chứa "ShopTLU"
2. `.price` - Class selector, chọn tất cả elements có class="price" → 2 thẻ p
3. `#app header` - Descendant selector, chọn header bên trong #app
4. `nav a:first-child` - Pseudo-class selector, chọn thẻ a đầu tiên trong nav
5. `.product.featured h2` - Multiple class + descendant, chọn h2 trong element có cả 2 class
6. `article > p` - Child selector (>), chỉ chọn p là con TRỰC TIẾP của article
7. `a[href="/"]` - Attribute selector, chọn link có href chính xác là "/"
8. `.top-bar.dark h1` - Multiple class + descendant, chọn h1 trong element có cả 2 class

---### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

**Trả lời:**

```css
1. h1                           → Chọn: "ShopTLU"
2. .price                       → Chọn: "25.990.000đ" và "45.990.000đ" (2 elements)
3. #app header                  → Chọn: <header> element (chứa "ShopTLU" và navigation)
4. nav a:first-child            → Chọn: "Home" (link đầu tiên trong nav)
5. .product.featured h2         → Chọn: "MacBook Pro"
6. article > p                  → Chọn: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..." (4 elements - tất cả <p> là con trực tiếp của article)
7. a[href="/"]                  → Chọn: "Home"
8. .top-bar.dark h1             → Chọn: "ShopTLU"
```

**Giải thích chi tiết:**

1. `h1` - Element selector, chọn tất cả thẻ h1 → chỉ có 1 thẻ h1 chứa "ShopTLU"
2. `.price` - Class selector, chọn tất cả elements có class="price" → 2 thẻ p
3. `#app header` - Descendant selector, chọn header bên trong #app
4. `nav a:first-child` - Pseudo-class selector, chọn thẻ a đầu tiên trong nav
5. `.product.featured h2` - Multiple class + descendant, chọn h2 trong element có cả 2 class
6. `article > p` - Child selector (>), chỉ chọn p là con TRỰC TIẾP của article
7. `a[href="/"]` - Attribute selector, chọn link có href chính xác là "/"
8. `.top-bar.dark h1` - Multiple class + descendant, chọn h1 trong element có cả 2 class

---
### Câu A3 (7đ) — Box Model — Tính toán kích thước

#### Trường hợp 1: content-box (mặc định)
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

**Tính toán:**
- Content width: 400px
- Padding: 20px × 2 = 40px
- Border: 5px × 2 = 10px
- Margin: 10px × 2 = 20px

→ **Chiều rộng hiển thị** = 400 + 40 + 10 = **450px**
→ **Không gian chiếm trên trang** = 450 + 20 = **470px** (bao gồm margin)

**Giải thích:** Với `content-box`, `width` chỉ áp dụng cho content. Padding và border được CỘNG THÊM vào ngoài.

#### Trường hợp 2: border-box
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

**Tính toán:**
- Total width (bao gồm padding + border): 400px
- Padding: 20px × 2 = 40px
- Border: 5px × 2 = 10px
- Content width: 400 - 40 - 10 = 350px

→ **Chiều rộng hiển thị** = **400px** (đúng như khai báo)
→ **Kích thước content thực tế** = **350px**
→ **Không gian chiếm trên trang** = 400 + 20 = **420px** (bao gồm margin)

**Giải thích:** Với `border-box`, `width` bao gồm content + padding + border. Browser tự động tính content width = 400 - padding - border.

#### Trường hợp 3: Margin collapse
```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

→ **Khoảng cách giữa box-a và box-b** = **40px**

**Giải thích tại sao KHÔNG PHẢI 65px:**

Đây là hiện tượng **Margin Collapse** (gộp margin). Khi 2 margins dọc (vertical) gặp nhau:
- Chúng KHÔNG cộng lại
- Chỉ lấy giá trị LỚN HƠN
- 25px và 40px → chọn 40px

**Quy tắc Margin Collapse:**
1. Chỉ xảy ra với **vertical margins** (top/bottom)
2. Horizontal margins (left/right) KHÔNG collapse
3. Lấy giá trị **lớn nhất** trong các margins
4. Không xảy ra nếu có border, padding, hoặc content ngăn cách
5. Không xảy ra với flexbox hoặc grid items

#### Câu hỏi nâng cao: Margin âm
```css
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```

→ **Khoảng cách** = 40 + (-10) = **30px**

**Giải thích:**
- Khi có margin âm, công thức: margin dương + margin âm
- 40px + (-10px) = 30px
- Margin âm "kéo" element lại gần hơn
- Nếu cả 2 đều âm: lấy giá trị âm nhiều nhất (ví dụ: -10px và -20px → -20px)

---
### Câu A4 (5đ) — Specificity (Độ ưu tiên)

```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

#### 1. Tính specificity score (a, b, c) cho mỗi rule

**Công thức tính specificity: (inline, id, class, element)**

- **Rule A:** `p` → **(0, 0, 0, 1)** = 1
  - 0 inline, 0 id, 0 class, 1 element
  
- **Rule B:** `.price` → **(0, 0, 1, 0)** = 10
  - 0 inline, 0 id, 1 class, 0 element
  
- **Rule C:** `#main-price` → **(0, 1, 0, 0)** = 100
  - 0 inline, 1 id, 0 class, 0 element
  
- **Rule D:** `p.price` → **(0, 0, 1, 1)** = 11
  - 0 inline, 0 id, 1 class, 1 element

**Thứ tự từ thấp đến cao:** A (1) < B (10) < D (11) < C (100)

#### 2. Element sẽ có màu gì? Giải thích

**Trả lời:** Element sẽ có màu **RED** (đỏ).

**Giải thích:**
- Rule C có specificity cao nhất (100)
- ID selector luôn thắng class và element selector
- Không quan trọng thứ tự khai báo trong CSS, chỉ quan trọng specificity

#### 3. Nếu thêm inline style: `<p class="price" id="main-price" style="color: orange;">`

**Trả lời:** Element sẽ có màu **ORANGE** (cam).

**Giải thích:**
- Inline style có specificity = **(1, 0, 0, 0)** = 1000
- Cao hơn tất cả các rules trong stylesheet
- Inline style luôn thắng (trừ khi có !important trong CSS)

#### 4. Nếu Rule A thêm `!important`: `p { color: black !important; }`

**Trả lời:** Element sẽ có màu **BLACK** (đen).

**Giải thích:**
- `!important` override TẤT CẢ các rules khác, kể cả inline style
- Thứ tự ưu tiên cuối cùng:
  1. CSS với `!important` (cao nhất)
  2. Inline style
  3. ID selector
  4. Class selector
  5. Element selector
  
**Lưu ý:** Nếu nhiều rules đều có `!important`, thì so sánh specificity giữa chúng. Nếu specificity bằng nhau, rule khai báo SAU sẽ thắng.

**Best practice:** Tránh dùng `!important` trừ khi thực sự cần thiết (override third-party CSS, utility classes). Nó làm CSS khó maintain.

---
## PHẦN C — DEBUG & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug CSS Layout

#### 1. Tính chiều rộng thực tế của sidebar và content

**Sidebar:**
- width: 300px
- padding: 20px × 2 = 40px
- border: 1px × 2 = 2px
- **Chiều rộng thực tế** = 300 + 40 + 2 = **342px**

**Content:**
- width: 660px
- padding: 30px × 2 = 60px
- border: 1px × 2 = 2px
- **Chiều rộng thực tế** = 660 + 60 + 2 = **722px**

**Tổng:** 342 + 722 = **1064px**

#### 2. Giải thích tại sao layout bị vỡ

Container chỉ rộng **960px**, nhưng tổng chiều rộng thực tế của sidebar + content = **1064px** (vượt quá 104px).

**Nguyên nhân:**
- Mặc định `box-sizing: content-box`
- `width` chỉ tính content, padding và border được cộng thêm
- 1064px > 960px → không đủ chỗ nằm cạnh nhau
- Content bị đẩy xuống dòng mới (float wrap)

#### 3. Đưa ra 2 cách sửa

**Cách 1: Dùng border-box (Khuyến nghị)**
```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    box-sizing: border-box; /* Thêm dòng này */
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    box-sizing: border-box; /* Thêm dòng này */
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

**Giải thích:**
- `border-box` làm cho `width` bao gồm padding + border
- Sidebar thực tế = 300px (đúng như khai báo)
- Content thực tế = 660px (đúng như khai báo)
- Tổng = 300 + 660 = 960px ✓

**Cách 2: Không dùng border-box - Tính toán lại width**
```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 258px; /* 300 - 40 - 2 = 258px */
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 598px; /* 660 - 60 - 2 = 598px */
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

**Giải thích:**
- Tính ngược: width = chiều rộng mong muốn - padding - border
- Sidebar: 300 - 40 - 2 = 258px
- Content: 660 - 60 - 2 = 598px
- Chiều rộng thực tế: (258+40+2) + (598+60+2) = 300 + 660 = 960px ✓

**Nhược điểm cách 2:**
- Khó tính toán, dễ sai
- Khó maintain khi thay đổi padding/border
- Không trực quan

**Kết luận:** Nên dùng `box-sizing: border-box` cho mọi dự án. Thêm vào đầu CSS:
```css
* {
    box-sizing: border-box;
}
```

---
