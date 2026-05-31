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
### Câu A4 (5đ) — SCSS Basics

#### 4 tính năng chính của SCSS:

#### 1. **Variables** — Biến lưu giá trị dùng chung

```scss
// Khai báo biến
$primary-color: #3182ce;
$secondary-color: #805ad5;
$font-size-base: 16px;
$spacing-unit: 8px;

// Sử dụng
.button {
    background-color: $primary-color;
    font-size: $font-size-base;
    padding: $spacing-unit * 2; // 16px
}

.header {
    background-color: $primary-color; // Đổi 1 chỗ, tất cả đổi theo
}
```

**Lợi ích:** Đổi màu/font/spacing chỉ cần sửa 1 chỗ, tất cả tự động cập nhật.

---

#### 2. **Nesting** — Viết CSS lồng nhau theo cấu trúc HTML

```scss
// SCSS
.card {
    border: 1px solid #ddd;
    padding: 16px;
    
    .card-header {
        font-size: 20px;
        font-weight: bold;
    }
    
    .card-body {
        margin-top: 12px;
        
        p {
            line-height: 1.6;
        }
    }
    
    &:hover { // & = .card (parent selector)
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    &.featured { // .card.featured
        border-color: #3182ce;
    }
}
```

**Compile thành CSS:**
```css
.card { border: 1px solid #ddd; padding: 16px; }
.card .card-header { font-size: 20px; font-weight: bold; }
.card .card-body { margin-top: 12px; }
.card .card-body p { line-height: 1.6; }
.card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
.card.featured { border-color: #3182ce; }
```

**Lợi ích:** Code gọn gàng, dễ đọc, theo cấu trúc HTML. Tránh lặp lại selector.

---

#### 3. **Mixins** — Hàm CSS có thể tái sử dụng

```scss
// Định nghĩa mixin
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin box-shadow($level: 1) {
    @if $level == 1 {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    } @else if $level == 2 {
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    } @else {
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
}

@mixin respond-to($breakpoint) {
    @if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    } @else if $breakpoint == desktop {
        @media (min-width: 1024px) { @content; }
    }
}

// Sử dụng
.hero {
    @include flex-center;
    height: 100vh;
}

.card {
    @include box-shadow(2);
    
    @include respond-to(tablet) {
        width: 50%;
    }
}
```

**Lợi ích:** Tránh lặp code, dễ maintain, có thể truyền tham số.

---

#### 4. **@extend / Inheritance** — Kế thừa styles

```scss
// Base style
.button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

// Kế thừa và mở rộng
.button-primary {
    @extend .button;
    background-color: #3182ce;
    color: white;
}

.button-danger {
    @extend .button;
    background-color: #e53e3e;
    color: white;
}
```

**Compile thành:**
```css
.button, .button-primary, .button-danger {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button-primary {
    background-color: #3182ce;
    color: white;
}

.button-danger {
    background-color: #e53e3e;
    color: white;
}
```

**Lợi ích:** Tái sử dụng styles, giảm duplicate code.

---

#### Tại sao trình duyệt KHÔNG đọc được file `.scss`?

**Lý do:**
- Trình duyệt chỉ hiểu CSS thuần (`.css`), không hiểu cú pháp SCSS (variables, nesting, mixins...)
- SCSS là ngôn ngữ preprocessor, cần **biên dịch** (compile) thành CSS trước

**Bước cần thiết: SCSS → CSS**

1. **Cài đặt compiler:**
   - VS Code: Extension "Live Sass Compiler"
   - Command line: `npm install -g sass`
   - Build tools: Webpack, Vite, Parcel (tự động)

2. **Compile:**
   ```bash
   # Command line
   sass style.scss style.css
   
   # Watch mode (tự động compile khi save)
   sass --watch style.scss:style.css
   ```

3. **Link file CSS vào HTML:**
   ```html
   <!-- KHÔNG link file .scss -->
   <!-- <link rel="stylesheet" href="style.scss"> ❌ -->
   
   <!-- Link file .css đã compile -->
   <link rel="stylesheet" href="style.css"> ✅
   ```

---
## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực

**Trang web được chọn: Shopee.vn**

#### 1. Screenshots 3 kích thước màn hình:

> 📸 **Xem screenshots trong folder:** `screenshots/shopee_analysis/`
> - `shopee_mobile_375px.png`
> - `shopee_tablet_768px.png`
> - `shopee_desktop_1440px.png`

#### 2. Phân tích chi tiết:

##### **Navigation thay đổi:**

| Kích thước | Navigation |
|------------|------------|
| **Mobile (375px)** | - Hamburger menu ☰ ở góc trái<br>- Logo giữa<br>- Icon giỏ hàng + chat ở phải<br>- Search bar chiếm full width<br>- Bottom navigation bar (5 icons: Home, Categories, Notifications, Account, Cart) |
| **Tablet (768px)** | - Menu ngang xuất hiện<br>- Search bar thu nhỏ<br>- Vẫn giữ hamburger cho categories<br>- Bottom nav bar biến mất |
| **Desktop (1440px)** | - Full menu ngang với dropdown<br>- Search bar ở giữa header<br>- Đầy đủ links: Seller Centre, Download, Follow us<br>- Không có hamburger menu |

##### **Lưới content thay đổi:**

| Kích thước | Grid Layout |
|------------|-------------|
| **Mobile** | - Product grid: **2 cột**<br>- Banner: 1 slide full width<br>- Categories: scroll ngang |
| **Tablet** | - Product grid: **3-4 cột**<br>- Banner: vẫn 1 slide nhưng tỷ lệ khác<br>- Categories: 2 hàng |
| **Desktop** | - Product grid: **5-6 cột**<br>- Banner: sidebar + main banner<br>- Categories: grid 10 cột |

##### **Elements bị ẩn trên mobile:**

- Sidebar filters (chuyển thành bottom sheet khi click "Filter")
- Breadcrumb navigation
- "Seller Centre", "Download App" links
- Detailed product descriptions (chỉ hiện title + price)
- Footer links (thu gọn thành accordion)
- Live chat widget (chuyển thành floating button)

##### **Font size thay đổi:**

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Product title | 12px | 13px | 14px |
| Product price | 14px | 15px | 16px |
| Header links | 13px | 14px | 14px |
| Body text | 14px | 15px | 16px |

#### 3. Media Queries từ DevTools:

> 📸 **Screenshots:** `screenshots/shopee_analysis/media_queries.png`

**Ví dụ Media Queries tìm được:**

```css
/* Từ Shopee.vn */
@media (min-width: 768px) {
    .shopee-header__content {
        padding: 0 40px;
    }
    .shopee-searchbar {
        width: 500px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    .home-product-item {
        width: calc(16.66667% - 8px); /* 6 cột */
    }
}

@media (max-width: 767px) {
    .shopee-header__navbar {
        display: none;
    }
    .shopee-bottom-bar {
        display: flex;
    }
}
```

**Breakpoints chính của Shopee:**
- Mobile: < 768px
- Tablet: 768px - 1199px
- Desktop: ≥ 1200px

---
### Câu C2 (10đ) — Thiết kế Responsive Strategy

**Trang: Đặt bàn nhà hàng**

#### Wireframes 3 kích thước:

##### **Mobile (< 768px):**

```
┌─────────────────────┐
│ ☰  LOGO    📞       │ ← Header sticky
├─────────────────────┤
│                     │
│   HERO IMAGE        │ ← Full width, height: 50vh
│   (Món ăn đặc sắc)  │
│                     │
├─────────────────────┤
│  [Đặt bàn ngay] ←───┼─ CTA button nổi bật
├─────────────────────┤
│ ┌─────────────────┐ │
│ │  Món 1          │ │ ← Grid 2 cột
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │  Món 2          │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │  Món 3          │ │
│ └─────────────────┘ │
├─────────────────────┤
│  FORM ĐẶT BÀN       │ ← Full width
│  [Ngày]             │
│  [Giờ]              │
│  [Số người]         │
│  [Ghi chú]          │
│  [Xác nhận]         │
├─────────────────────┤
│  GOOGLE MAPS        │ ← Full width, height: 300px
│  (Nhúng iframe)     │
├─────────────────────┤
│  FOOTER             │ ← Accordion
│  ▼ Về chúng tôi     │
│  ▼ Liên hệ          │
│  ▼ Chính sách       │
└─────────────────────┘
```

**Bị ẩn trên mobile:**
- Breadcrumb
- Sidebar menu
- Detailed descriptions
- Social media links (chỉ giữ icons)

---

##### **Tablet (768px - 1023px):**

```
┌───────────────────────────────────┐
│  LOGO    Menu1  Menu2  Menu3  📞  │ ← Header ngang
├───────────────────────────────────┤
│                                   │
│        HERO IMAGE                 │ ← Height: 60vh
│        + Text overlay             │
│                                   │
├───────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐            │
│  │ M1 │ │ M2 │ │ M3 │            │ ← Grid 3 cột
│  └────┘ └────┘ └────┘            │
│  ┌────┐ ┌────┐ ┌────┐            │
│  │ M4 │ │ M5 │ │ M6 │            │
│  └────┘ └────┘ └────┘            │
├─────────────────┬─────────────────┤
│  FORM ĐẶT BÀN   │  GOOGLE MAPS    │ ← 2 cột (50/50)
│  [Ngày] [Giờ]   │                 │
│  [Số người]     │                 │
│  [Ghi chú]      │                 │
│  [Xác nhận]     │                 │
├─────────────────┴─────────────────┤
│  FOOTER (3 cột)                   │
│  Về CT | Liên hệ | Chính sách     │
└───────────────────────────────────┘
```

**Grid ảnh:** 3 cột  
**Bản đồ:** Bên phải form (50% width)

---

##### **Desktop (≥ 1024px):**

```
┌─────────────────────────────────────────────────┐
│  LOGO    Menu1  Menu2  Menu3  Menu4    📞 Đặt bàn│ ← Header + CTA
├──────────┬──────────────────────────┬───────────┤
│ SIDEBAR  │                          │           │
│ ┌──────┐ │     HERO IMAGE           │  FORM     │ ← 3 cột
│ │Menu  │ │     (Larger)             │  ĐẶT BÀN  │   20% | 50% | 30%
│ │      │ │                          │           │
│ │Giới  │ │                          │  [Ngày]   │
│ │thiệu │ │                          │  [Giờ]    │
│ │      │ │                          │  [Người]  │
│ │Thực  │ ├──────────────────────────┤  [Note]   │
│ │đơn   │ │  ┌───┐┌───┐┌───┐┌───┐   │  [Submit] │
│ │      │ │  │ 1 ││ 2 ││ 3 ││ 4 │   │           │
│ │Đánh  │ │  └───┘└───┘└───┘└───┘   │           │
│ │giá   │ │  ┌───┐┌───┐┌───┐┌───┐   │           │
│ │      │ │  │ 5 ││ 6 ││ 7 ││ 8 │   │           │
│ └──────┘ │  └───┘└───┘└───┘└───┘   │           │
├──────────┴──────────────────────────┴───────────┤
│              GOOGLE MAPS (Full width)            │
│              Height: 400px                       │
├──────────────────────────────────────────────────┤
│  FOOTER (4 cột)                                  │
│  Về chúng tôi | Liên hệ | Chính sách | Social    │
└──────────────────────────────────────────────────┘
```

**Layout:** 3 cột (Sidebar 20% | Content 50% | Form 30%)  
**Grid ảnh:** 4 cột  
**Bản đồ:** Full width dưới content

---

#### CSS Skeleton (Mobile-First):

```css
/* ===== VARIABLES ===== */
:root {
    --primary-color: #d4af37;
    --text-dark: #2d3748;
    --spacing: 16px;
}

/* ===== BASE (Mobile) ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
}

/* ===== HEADER ===== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing);
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-menu {
    display: none; /* Ẩn trên mobile */
}

.hamburger {
    display: block;
}

/* ===== HERO ===== */
.hero {
    height: 50vh;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ===== FOOD GRID ===== */
.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 cột mobile */
    gap: var(--spacing);
    padding: var(--spacing);
}

.food-item img {
    width: 100%;
    height: auto;
}

/* ===== FORM & MAP ===== */
.booking-section {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột mobile */
    gap: var(--spacing);
    padding: var(--spacing);
}

.booking-form,
.map-container {
    width: 100%;
}

.map-container iframe {
    width: 100%;
    height: 300px;
    border: none;
}

/* ===== SIDEBAR ===== */
.sidebar {
    display: none; /* Ẩn trên mobile */
}

/* ===== FOOTER ===== */
.footer {
    padding: var(--spacing);
    background: #1a202c;
    color: white;
}

.footer-links {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột mobile */
    gap: var(--spacing);
}

/* ===== TABLET (≥ 768px) ===== */
@media (min-width: 768px) {
    .header {
        padding: var(--spacing) calc(var(--spacing) * 2);
    }
    
    .nav-menu {
        display: flex; /* Hiện menu ngang */
        gap: 24px;
    }
    
    .hamburger {
        display: none;
    }
    
    .hero {
        height: 60vh;
    }
    
    .food-grid {
        grid-template-columns: repeat(3, 1fr); /* 3 cột tablet */
        padding: calc(var(--spacing) * 2);
    }
    
    .booking-section {
        grid-template-columns: 1fr 1fr; /* 2 cột: form | map */
    }
    
    .map-container iframe {
        height: 100%;
        min-height: 400px;
    }
    
    .footer-links {
        grid-template-columns: repeat(3, 1fr); /* 3 cột */
    }
}

/* ===== DESKTOP (≥ 1024px) ===== */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .hero {
        height: 70vh;
    }
    
    .main-content {
        display: grid;
        grid-template-columns: 200px 1fr 350px; /* sidebar | content | form */
        gap: calc(var(--spacing) * 2);
        padding: calc(var(--spacing) * 2);
    }
    
    .sidebar {
        display: block; /* Hiện sidebar */
    }
    
    .food-grid {
        grid-template-columns: repeat(4, 1fr); /* 4 cột desktop */
    }
    
    .booking-section {
        grid-template-columns: 1fr; /* Form ở sidebar phải */
    }
    
    .map-container {
        grid-column: 1 / -1; /* Full width */
    }
    
    .map-container iframe {
        height: 400px;
    }
    
    .footer-links {
        grid-template-columns: repeat(4, 1fr); /* 4 cột */
    }
}
```
