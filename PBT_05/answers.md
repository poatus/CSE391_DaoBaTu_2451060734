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