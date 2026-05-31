# PHIẾU BÀI TẬP 06 - ANSWERS
# **BOOTSTRAP 5 - TRACK A**

---

## PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — Grid System

**HTML được cho:**
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

**Bảng phân tích layout:**

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|------------|------------------|------------------------|-------------------|
| **Số cột** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Box 1<br>Box 2<br>Box 3<br>Box 4 | Box 1 \| Box 2<br>Box 3 \| Box 4 | Box 1 \| Box 2 \| Box 3 \| Box 4 |
| **Width mỗi box** | 100% (12/12) | 50% (6/12) | 25% (3/12) |

**Giải thích chi tiết:**

1. **Mobile (< 768px):**
   - `col-12` áp dụng → mỗi box chiếm 12/12 cột = 100% width
   - 4 boxes xếp chồng dọc (1 cột)

2. **Tablet (768px - 991px):**
   - `col-md-6` áp dụng → mỗi box chiếm 6/12 cột = 50% width
   - 2 boxes trên 1 hàng (2 cột)
   - Box 1 + Box 2 trên hàng 1
   - Box 3 + Box 4 trên hàng 2

3. **Desktop (≥ 992px):**
   - `col-lg-3` áp dụng → mỗi box chiếm 3/12 cột = 25% width
   - 4 boxes trên 1 hàng (4 cột)

**Câu hỏi thêm:**

**Q1: `col-md-6` nghĩa là gì?**

**Trả lời:** `col-md-6` có nghĩa là:
- **col**: Column (cột)
- **md**: Medium breakpoint (≥ 768px - tablet trở lên)
- **6**: Chiếm 6/12 cột = 50% width

Class này áp dụng cho màn hình **≥ 768px trở lên** (md, lg, xl, xxl). Dưới 768px, nếu không có class khác (như `col-12`), cột sẽ tự động full width.

**Q2: Tại sao không cần viết `col-sm-12`?**

**Trả lời:** Không cần viết `col-sm-12` vì:

1. **Bootstrap là Mobile-First:** Mặc định, khi không có class breakpoint nào được chỉ định, cột sẽ tự động chiếm 100% width trên mobile.

2. **`col-12` đã đủ:** Class `col-12` áp dụng cho **tất cả breakpoints** (xs, sm, md, lg, xl, xxl) cho đến khi có class breakpoint lớn hơn override nó.

3. **Quy tắc cascade:** 
   - `col-12` → Áp dụng cho tất cả (xs, sm)
   - `col-md-6` → Override từ md trở lên
   - `col-lg-3` → Override từ lg trở lên

4. **Viết `col-sm-12` là thừa** vì `col-12` đã cover sm rồi.

---

### Câu A2 (10đ) — Utilities & Components

#### 1. Giải thích class `d-none d-md-block`

**Trả lời:**

- **`d-none`**: `display: none` - Ẩn element trên **tất cả breakpoints** (mặc định)
- **`d-md-block`**: `display: block` - Hiển thị element dạng block từ **md trở lên** (≥ 768px)

**Kết luận:**
- **Ẩn khi:** < 768px (mobile, small mobile)
- **Hiện khi:** ≥ 768px (tablet, desktop, large desktop)

**Use case:** Ẩn sidebar, ads, hoặc nội dung phụ trên mobile để tiết kiệm không gian.

**Ví dụ:**
```html
<div class="d-none d-md-block">
  <!-- Sidebar chỉ hiện trên tablet+ -->
  <aside>Sidebar content</aside>
</div>
```

---

#### 2. Liệt kê 5 spacing utilities

**Trả lời:**

| Class | Ý nghĩa | CSS tương đương | Giá trị |
|-------|---------|-----------------|---------|
| **`mt-3`** | Margin Top 3 | `margin-top: 1rem;` | 16px |
| **`px-4`** | Padding X (left + right) 4 | `padding-left: 1.5rem;`<br>`padding-right: 1.5rem;` | 24px mỗi bên |
| **`mb-auto`** | Margin Bottom auto | `margin-bottom: auto;` | auto |
| **`py-2`** | Padding Y (top + bottom) 2 | `padding-top: 0.5rem;`<br>`padding-bottom: 0.5rem;` | 8px mỗi bên |
| **`m-0`** | Margin all sides 0 | `margin: 0;` | 0 |

**Quy tắc spacing:**
- **Prefix:** `m` (margin), `p` (padding)
- **Direction:** `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (horizontal), `y` (vertical), hoặc không có (all sides)
- **Size:** `0` (0), `1` (0.25rem/4px), `2` (0.5rem/8px), `3` (1rem/16px), `4` (1.5rem/24px), `5` (3rem/48px), `auto`

---

#### 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

**Trả lời:**

| Class | Max-width | Behavior | Khi nào dùng |
|-------|-----------|----------|--------------|
| **`.container`** | Responsive (540px → 1320px) | Fixed width, tự động căn giữa, thay đổi theo breakpoint | **Khuyên dùng** cho nội dung chính, layout chuẩn |
| **`.container-fluid`** | 100% | Luôn full width, không có max-width | Hero section, footer full width, background images |
| **`.container-md`** | 100% cho đến md, sau đó fixed | Full width trên mobile/sm, fixed từ md trở lên | Khi muốn full width trên mobile nhưng fixed trên tablet+ |

**Chi tiết `.container` max-width:**
- **< 576px:** 100% (full width)
- **≥ 576px (sm):** 540px
- **≥ 768px (md):** 720px
- **≥ 992px (lg):** 960px
- **≥ 1200px (xl):** 1140px
- **≥ 1400px (xxl):** 1320px

**Ví dụ sử dụng:**
```html
<!-- Nội dung chính -->
<div class="container">
  <h1>Main Content</h1>
</div>

<!-- Hero section full width -->
<div class="container-fluid bg-primary text-white">
  <h1>Hero Banner</h1>
</div>

<!-- Full width mobile, fixed tablet+ -->
<div class="container-md">
  <h1>Responsive Container</h1>
</div>
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Tùy biến Bootstrap

#### 1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`

**Quy trình:**

**Bước 1: Cài đặt công cụ cần thiết**
```bash
npm install bootstrap sass
```

**Bước 2: Tạo file SCSS custom**

Tạo file `custom.scss`:
```scss
// 1. Import functions và variables của Bootstrap
@import "node_modules/bootstrap/scss/functions";

// 2. Override biến TRƯỚC KHI import Bootstrap
$primary: #E63946;  // Đổi màu primary
$secondary: #457B9D;
$success: #2A9D8F;

// 3. Import toàn bộ Bootstrap
@import "node_modules/bootstrap/scss/bootstrap";

// 4. Custom CSS của bạn (nếu cần)
.my-custom-class {
  color: $primary;
}
```

**Bước 3: Compile SCSS → CSS**
```bash
sass custom.scss custom.css
```

**Bước 4: Link file CSS đã compile**
```html
<link rel="stylesheet" href="custom.css">
```

**Công cụ cần:**
- **Node.js & npm** - Để cài packages
- **Sass compiler** - Để compile SCSS → CSS
- **Text editor** - VS Code với extension "Live Sass Compiler"

---

#### 2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }`?

**Trả lời:**

**❌ Cách SAI (Override trực tiếp):**
```css
.btn-primary {
  background: red !important;
}
```

**Vấn đề:**

1. **Không nhất quán:** Chỉ đổi background, nhưng:
   - Hover state vẫn màu cũ
   - Active state vẫn màu cũ
   - Border color vẫn màu cũ
   - Focus ring vẫn màu cũ
   - Disabled state vẫn màu cũ

2. **Cần `!important`:** Phải dùng `!important` để override, làm CSS khó maintain

3. **Không tái sử dụng:** Màu mới không áp dụng cho:
   - `.bg-primary`
   - `.text-primary`
   - `.border-primary`
   - `.alert-primary`
   - `.badge-primary`

4. **Khó maintain:** Khi muốn đổi màu, phải tìm và sửa nhiều chỗ

**✅ Cách ĐÚNG (Dùng SASS variables):**
```scss
$primary: #E63946;
@import "bootstrap";
```

**Lợi ích:**

1. **Nhất quán toàn bộ:** Tất cả states (hover, active, focus, disabled) tự động tính toán màu phù hợp

2. **Tái sử dụng:** Màu mới áp dụng cho TẤT CẢ components dùng primary:
   - Buttons: `.btn-primary`
   - Backgrounds: `.bg-primary`
   - Text: `.text-primary`
   - Borders: `.border-primary`
   - Alerts: `.alert-primary`
   - Badges: `.badge-primary`

3. **Không cần `!important`:** Bootstrap tự động generate CSS đúng thứ tự

4. **Dễ maintain:** Chỉ cần đổi 1 biến, toàn bộ theme thay đổi

5. **Professional:** Đây là cách Bootstrap được thiết kế để customize

---

### Câu C2 (10đ) — So sánh

#### Viết CSS thuần vs Bootstrap

**Yêu cầu:** Tạo 1 navbar responsive + 1 product card

---

**1. CSS THUẦN (Vanilla CSS)**

**HTML:**
```html
<nav class="navbar">
  <div class="navbar-brand">Logo</div>
  <button class="navbar-toggle">☰</button>
  <ul class="navbar-menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<div class="product-card">
  <img src="product.jpg" alt="Product">
  <h3>Product Name</h3>
  <p>$99.99</p>
  <button>Add to Cart</button>
</div>
```

**CSS (≈ 150 dòng):**
```css
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: block;
  }
  .navbar-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #333;
    padding: 1rem;
  }
  .navbar-menu.active {
    display: flex;
  }
}

/* Product Card */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}

.product-card h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1.25rem;
}

.product-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e63946;
  margin: 0.5rem 0;
}

.product-card button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.product-card button:hover {
  background: #0056b3;
}
```

**JavaScript (cần thêm cho navbar toggle):**
```javascript
document.querySelector('.navbar-toggle').addEventListener('click', function() {
  document.querySelector('.navbar-menu').classList.toggle('active');
});
```

**Tổng kết CSS thuần:**
- **Số dòng CSS:** ≈ 150 dòng
- **Số dòng JS:** ≈ 5 dòng
- **Thời gian:** 2-3 giờ

---

**2. BOOTSTRAP VERSION**

**HTML:**
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Products</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="card" style="width: 18rem;">
  <img src="product.jpg" class="card-img-top" alt="Product">
  <div class="card-body">
    <h5 class="card-title">Product Name</h5>
    <p class="card-text text-danger fs-4 fw-bold">$99.99</p>
    <button class="btn btn-primary w-100">Add to Cart</button>
  </div>
</div>
```

**CSS:** 0 dòng (chỉ cần link Bootstrap CSS)

**JavaScript:** 0 dòng (Bootstrap JS tự động xử lý)

**Tổng kết Bootstrap:**
- **Số dòng CSS:** 0 dòng
- **Số dòng JS:** 0 dòng
- **Thời gian:** 15-30 phút

---

#### So sánh chi tiết

| Tiêu chí | CSS Thuần | Bootstrap |
|----------|-----------|-----------|
| **Số dòng CSS** | ≈ 150 dòng | 0 dòng |
| **Số dòng JS** | ≈ 5 dòng | 0 dòng |
| **Thời gian phát triển** | 2-3 giờ | 15-30 phút |
| **Khả năng tùy biến** | ⭐⭐⭐⭐⭐ Hoàn toàn tự do | ⭐⭐⭐ Giới hạn bởi Bootstrap classes |
| **File size** | Nhỏ (chỉ CSS cần thiết) | Lớn (toàn bộ Bootstrap ≈ 150KB) |
| **Learning curve** | Dễ (CSS cơ bản) | Trung bình (phải học Bootstrap classes) |
| **Maintainability** | Khó (phải tự maintain) | Dễ (Bootstrap đã tested) |
| **Consistency** | Phụ thuộc developer | Nhất quán (Bootstrap design system) |
| **Browser compatibility** | Phải tự test | Bootstrap đã handle |
| **Responsive** | Phải tự code | Có sẵn |

---

#### Khi nào NÊN dùng Bootstrap?

**✅ NÊN dùng khi:**

1. **Dự án cần nhanh:** Deadline gấp, cần prototype nhanh
2. **Team lớn:** Nhiều developer, cần consistency
3. **Không có designer:** Cần UI đẹp mà không có design system riêng
4. **Admin dashboard:** CRUD apps, internal tools
5. **MVP/Startup:** Cần launch nhanh, chưa có brand identity rõ ràng
6. **Học tập:** Học responsive design, best practices

**Ví dụ:** Admin panel, CMS, internal tools, landing page đơn giản

---

#### Khi nào KHÔNG NÊN dùng Bootstrap?

**❌ KHÔNG NÊN dùng khi:**

1. **Brand identity mạnh:** Thiết kế unique, không muốn giống Bootstrap
2. **Performance critical:** Website cần tối ưu file size (Bootstrap ≈ 150KB)
3. **Custom design phức tạp:** Thiết kế không theo grid 12 cột
4. **Mobile-first app:** Cần tối ưu mobile, Bootstrap có nhiều thứ thừa
5. **Đã có design system:** Company đã có design system riêng (Material, Ant Design)

**Ví dụ:** E-commerce lớn (Shopee, Lazada), portfolio nghệ thuật, landing page marketing với animation phức tạp

---