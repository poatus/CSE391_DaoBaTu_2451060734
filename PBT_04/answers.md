# PHIẾU BÀI TẬP 04 - ĐÁP ÁN
# CSS LAYOUT — Positioning, Flexbox & Grid

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | ✅ Có | Không dùng top/left/right/bottom | ✅ Có | Mặc định, element bình thường |
| `relative` | ✅ Có (chiếm vị trí cũ) | Chính vị trí gốc của nó | ✅ Có | Dịch chuyển nhẹ, làm mốc cho absolute |
| `absolute` | ❌ Không | Cha có position gần nhất (hoặc body) | ✅ Có (theo parent) | Badge, dropdown, tooltip |
| `fixed` | ❌ Không | Viewport (cửa sổ trình duyệt) | ❌ Không | Chat button, modal overlay, fixed header |
| `sticky` | ✅ Có → ❌ Không (khi dính) | Viewport (khi dính) | Một phần | Sticky header, sidebar |

**Câu hỏi thêm:** 

**Khi nào `absolute` tham chiếu `body`?**
- Khi không có parent nào có `position: relative`, `absolute`, `fixed`, hoặc `sticky`
- Element sẽ "bay" lên tận `<body>` để tìm mốc tọa độ

**Khi nào tham chiếu parent?**
- Khi parent (hoặc ông, cụ...) có `position: relative/absolute/fixed/sticky`
- Element sẽ tham chiếu theo "nearest positioned ancestor" gần nhất

**Khái niệm "nearest positioned ancestor":**
- Là phần tử cha (hoặc tổ tiên) GẦN NHẤT có `position` khác `static`
- Nếu không tìm thấy → tham chiếu `<body>`
- Ví dụ:
```html
<div class="grandparent">           <!-- static -->
  <div class="parent" style="position: relative;">  <!-- ✅ Mốc tọa độ -->
    <div class="child" style="position: absolute; top: 0; right: 0;">
      <!-- Child sẽ nằm góc trên phải của parent, không phải grandparent -->
    </div>
  </div>
</div>
```

---
### Câu A2 (10đ) — Flexbox vs Grid

**Trường hợp 1:**
```css
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */
```
**Dự đoán:**
```
┌────────┬────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │ Item 4 │
└────────┴────────┴────────┴────────┘
```
- 4 items nằm ngang, mỗi item chiếm 25% width (flex: 1 = chia đều)

---

**Trường hợp 2:**
```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? */
```
**Dự đoán:**
```
┌──────────┐  ┌──────────┐
│  Item 1  │  │  Item 2  │
└──────────┘  └──────────┘

┌──────────┐  ┌──────────┐
│  Item 3  │  │  Item 4  │
└──────────┘  └──────────┘

┌──────────┐  ┌──────────┐
│  Item 5  │  │  Item 6  │
└──────────┘  └──────────┘
```
- 3 hàng, mỗi hàng 2 cột (45% + 2.5% margin × 2 = 50% mỗi item)

---

**Trường hợp 3:**
```css
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */
```
**Dự đoán:**
```
┌─────┐          ┌─────┐          ┌─────┐
│  1  │          │  2  │          │  3  │
└─────┘          └─────┘          └─────┘
```
- 3 items nằm ngang, cách đều 2 bên (space-between)
- Căn giữa theo chiều dọc (align-items: center)

---

**Trường hợp 4:**
```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */
```
**Dự đoán:**
```
┌────────┬──────────────────────┬────────┐
│ 200px  │      Phần còn lại    │ 200px  │
│ Item 1 │       Item 2         │ Item 3 │
└────────┴──────────────────────┴────────┘
```
- 3 cột: cột 1 = 200px, cột 2 = linh hoạt (1fr), cột 3 = 200px
- Gap 20px giữa các cột

---

**Trường hợp 5:**
```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? */
```
**Dự đoán:**
```
┌──────┬──────┬──────┐
│  1   │  2   │  3   │
├──────┼──────┼──────┤
│  4   │  5   │  6   │
├──────┼──────┼──────┤
│  7   │      │      │
└──────┴──────┴──────┘
```
- 3 hàng: hàng 1 đủ 3 items, hàng 2 đủ 3 items, hàng 3 chỉ có 1 item (item 7 nằm bên trái)

---
## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

**1. Navigation bar ngang (logo + menu + buttons)**
- **Dùng: Flexbox**
- **Lý do:** Layout 1 chiều (ngang), cần phân bố items linh hoạt (logo trái, menu giữa, buttons phải). `justify-content: space-between` hoàn hảo cho trường hợp này.

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
- **Dùng: Grid**
- **Lý do:** Layout 2 chiều (hàng + cột), cần cột đều nhau. `grid-template-columns: repeat(3, 1fr)` tự động wrap xuống hàng mới. Flexbox cũng được nhưng Grid sạch hơn.

**3. Layout blog: main content + sidebar**
- **Dùng: Grid**
- **Lý do:** Layout 2 chiều với tỷ lệ cố định. `grid-template-columns: 1fr 300px` (main + sidebar). Grid giữ cột sidebar cố định tốt hơn Flexbox.

**4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)**
- **Dùng: Flexbox hoặc Grid**
- **Lý do:** Cả 2 đều OK. Flexbox nếu muốn linh hoạt (flex: 1). Grid nếu muốn kiểm soát chặt chẽ (repeat(4, 1fr)). Tôi chọn **Flexbox** vì đơn giản hơn cho layout 1 hàng.

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
- **Dùng: Flexbox**
- **Lý do:** Layout 1 chiều (dọc), cần nút dính đáy. `flex-direction: column` + `margin-top: auto` trên button = hoàn hảo. Grid không có trick này.

---

