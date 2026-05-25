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
