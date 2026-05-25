## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

#### 1. Thẻ `<meta viewport>` chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích từng thuộc tính:**

- `name="viewport"`: Xác định đây là thẻ meta điều khiển viewport (vùng hiển thị)
- `width=device-width`: Đặt chiều rộng viewport bằng chiều rộng thiết bị (không cố định pixel)
- `initial-scale=1.0`: Đặt mức zoom ban đầu là 100% (1:1), không thu nhỏ hay phóng to

#### 2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị như thế nào?

Khi thiếu thẻ `<meta viewport>`, iPhone sẽ:
- Coi trang web là trang desktop với viewport mặc định ~980px
- Thu nhỏ toàn bộ trang để vừa màn hình (~375px thực tế)
- Chữ và hình ảnh sẽ rất nhỏ, khó đọc
- Người dùng phải zoom in/out và scroll ngang liên tục
- Trang web không responsive, mất trải nghiệm mobile

#### 3. Mobile-First vs Desktop-First:

**Mobile-First (Khuyên dùng):**
```css
/* Mặc định: Mobile */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet trở lên (≥ 768px) */
@media (min-width: 768px) {
    .container {
        width: 750px;
        padding: 20px;
    }
}
```

**Desktop-First (Cách cũ):**
```css
/* Mặc định: Desktop */
.container {
    width: 1200px;
    padding: 20px;
}

/* Tablet trở xuống (≤ 768px) */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 10px;
    }
}
```

**Tại sao Mobile-First được khuyên dùng?**

1. **Performance tốt hơn:** Mobile tải ít CSS hơn (chỉ base styles), desktop mới tải thêm → nhanh hơn trên thiết bị yếu
2. **Progressive Enhancement:** Xây dựng từ đơn giản → phức tạp, thêm tính năng cho màn hình lớn
3. **Xu hướng hiện tại:** 60%+ traffic từ mobile, ưu tiên mobile trước
4. **Google Mobile-First Indexing:** Google ưu tiên phiên bản mobile khi đánh giá SEO

---
### Câu A2 (5đ) — Breakpoints

**Breakpoints chuẩn (theo Bootstrap 5):**

| Tên | Kích thước | Thiết bị đại diện | Lưới sản phẩm (số cột) |
|-----|-----------|-------------------|------------------------|
| **xs** (Extra Small) | < 576px | iPhone SE, iPhone 12/13 Mini (dọc) | 1 cột |
| **sm** (Small) | ≥ 576px | iPhone 12/13 Pro (ngang), Android phone | 2 cột |
| **md** (Medium) | ≥ 768px | iPad Mini, Tablet 7-10 inch | 2-3 cột |
| **lg** (Large) | ≥ 992px | iPad Pro, Laptop nhỏ (13 inch) | 3-4 cột |
| **xl** (Extra Large) | ≥ 1200px | Desktop, Laptop 15 inch+ | 4-5 cột |
| **xxl** (Extra Extra Large) | ≥ 1400px | Desktop lớn, màn hình 4K | 5-6 cột |

**Ví dụ lưới sản phẩm responsive:**

```css
/* xs: 1 cột (mặc định mobile) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* sm: 2 cột */
@media (min-width: 576px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}

/* md: 2 cột (giữ nguyên cho tablet dọc) */
@media (min-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}

/* lg: 3 cột */
@media (min-width: 992px) {
    .product-grid { grid-template-columns: repeat(3, 1fr); }
}

/* xl: 4 cột */
@media (min-width: 1200px) {
    .product-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---
### Câu A3 (5đ) — Media Queries

**Phân tích CSS:**

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

**Bảng kết quả:**

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|-------------------|------------|
| 375px (iPhone SE) | **100%** | Không đạt breakpoint nào, dùng style mặc định |
| 600px | **540px** | Đạt breakpoint 576px, chưa đạt 768px |
| 800px | **720px** | Đạt breakpoint 768px, chưa đạt 992px |
| 1000px | **960px** | Đạt breakpoint 992px, chưa đạt 1200px |
| 1400px | **1140px** | Đạt breakpoint 1200px (cao nhất) |

**Nguyên tắc:** Media query với `min-width` áp dụng khi màn hình **≥** giá trị đó. Nếu nhiều query đều đúng, query sau sẽ ghi đè query trước (cascading).

---