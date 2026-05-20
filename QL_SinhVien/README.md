# 🎓 HỆ THỐNG QUẢN LÝ SINH VIÊN

Bài tập thực hành DOM và xử lý sự kiện trong JavaScript thuần.

## 📋 Mục Lục
- [Giới thiệu](#giới-thiệu)
- [Chức năng](#chức-năng)
- [Kiến thức áp dụng](#kiến-thức-áp-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Chi tiết kỹ thuật](#chi-tiết-kỹ-thuật)

## 🎯 Giới Thiệu

Đây là bài tập thực hành về **DOM (Document Object Model)** và **Xử lý sự kiện** trong JavaScript. Ứng dụng cho phép quản lý danh sách sinh viên với đầy đủ các chức năng CRUD (Create, Read, Update, Delete).

## ✨ Chức Năng

### Chức năng chính:
- ✅ **Hiển thị danh sách sinh viên** dưới dạng bảng
- ✅ **Thêm sinh viên mới** qua form popup
- ✅ **Sửa thông tin sinh viên** (dữ liệu được đưa lên form)
- ✅ **Xóa sinh viên** (có xác nhận trước khi xóa)
- ✅ **Lưu trữ dữ liệu** với localStorage
- ✅ **Hiển thị thống kê**: Tổng số sinh viên và điểm trung bình lớp
- ✅ **Hiển thị thông báo** sau mỗi thao tác
- ✅ **Validation dữ liệu** đầu vào

### Thông tin sinh viên:
- Mã sinh viên (unique)
- Họ và tên
- Ngày sinh
- Lớp học
- Điểm trung bình (0-10)
- Email

## 📚 Kiến Thức Áp Dụng

### 1. DOM Manipulation
```javascript
// Chọn phần tử
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('selector')

// Thay đổi nội dung
element.innerHTML = 'content'
element.textContent = 'text'
element.value = 'value'

// Thay đổi thuộc tính và class
element.classList.add('class')
element.classList.remove('class')
element.setAttribute('attr', 'value')

// Tạo và thêm phần tử
document.createElement('tag')
parent.appendChild(child)
```

### 2. Event Handling
```javascript
// Sự kiện click
button.addEventListener('click', function)

// Sự kiện submit
form.addEventListener('submit', function)

// Ngăn chặn hành vi mặc định
event.preventDefault()

// Event delegation
parent.addEventListener('click', function(e) {
    if (e.target.matches('.child')) {
        // xử lý
    }
})
```

### 3. LocalStorage
```javascript
// Lưu dữ liệu
localStorage.setItem('key', JSON.stringify(data))

// Đọc dữ liệu
const data = JSON.parse(localStorage.getItem('key'))

// Xóa dữ liệu
localStorage.removeItem('key')
```

### 4. Array Methods
```javascript
// Thêm phần tử
array.push(item)

// Xóa phần tử
array.splice(index, 1)

// Duyệt mảng
array.forEach((item, index) => {})

// Tìm kiếm
array.some(item => condition)

// Tính toán
array.reduce((sum, item) => sum + item.value, 0)
```

## 📁 Cấu Trúc Dự Án

```
student_management/
│
├── index.html          # Cấu trúc HTML
├── style.css           # Giao diện và styling
├── script.js           # Logic xử lý JavaScript
└── README.md           # Tài liệu hướng dẫn
```

## 🚀 Hướng Dẫn Sử Dụng

### Cách 1: Mở trực tiếp
1. Mở file `index.html` bằng trình duyệt web
2. Ứng dụng sẽ tự động tải dữ liệu mẫu (nếu chưa có dữ liệu)

### Cách 2: Sử dụng Live Server (VS Code)
1. Cài đặt extension "Live Server" trong VS Code
2. Click chuột phải vào `index.html`
3. Chọn "Open with Live Server"

### Thao tác với ứng dụng:

#### Thêm sinh viên mới:
1. Click nút **"➕ Thêm Sinh Viên"**
2. Điền đầy đủ thông tin vào form
3. Click **"💾 Lưu"**

#### Sửa thông tin sinh viên:
1. Click nút **"✏️ Sửa"** ở dòng sinh viên cần sửa
2. Thông tin sẽ tự động hiển thị trong form
3. Chỉnh sửa thông tin
4. Click **"💾 Lưu"**

#### Xóa sinh viên:
1. Click nút **"🗑️ Xóa"** ở dòng sinh viên cần xóa
2. Xác nhận trong hộp thoại
3. Sinh viên sẽ bị xóa khỏi danh sách

## 🔧 Chi Tiết Kỹ Thuật

### Luồng xử lý chính:

#### A. Khởi tạo ứng dụng
```javascript
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();    // Đọc dữ liệu
    renderStudentTable();       // Hiển thị bảng
    updateStatistics();         // Cập nhật thống kê
    attachEventListeners();     // Gắn sự kiện
});
```

#### B. Hiển thị danh sách
1. Xóa nội dung cũ của tbody
2. Kiểm tra mảng có dữ liệu không
3. Duyệt mảng và tạo các dòng (tr)
4. Sử dụng `innerHTML` để tạo nội dung
5. Thêm dòng vào tbody bằng `appendChild`

#### C. Thêm sinh viên
1. Click nút thêm → mở modal
2. Nhập dữ liệu vào form
3. Submit form → `event.preventDefault()`
4. Validate dữ liệu
5. Kiểm tra trùng mã sinh viên
6. Thêm vào mảng bằng `push()`
7. Lưu vào localStorage
8. Render lại bảng
9. Cập nhật thống kê
10. Đóng modal và hiển thị thông báo

#### D. Sửa sinh viên
1. Click nút sửa → lấy index
2. Lấy dữ liệu sinh viên từ mảng
3. Đưa dữ liệu lên form (gán vào `value`)
4. Đổi tiêu đề modal
5. Submit form → cập nhật mảng tại index
6. Lưu localStorage và render lại

#### E. Xóa sinh viên
1. Click nút xóa → lấy index
2. Hiển thị `confirm()` để xác nhận
3. Nếu đồng ý → `splice(index, 1)`
4. Lưu localStorage và render lại

### Các phần tử DOM quan trọng:

```javascript
// Buttons
btnAddStudent       // Nút mở form thêm
btnCloseModal       // Nút đóng modal (X)
btnCancel           // Nút hủy trong form

// Containers
studentModal        // Modal/popup container
studentForm         // Form nhập liệu
studentsTableBody   // Tbody của bảng
messageArea         // Khu vực hiển thị thông báo

// Inputs
inputStudentId      // Mã sinh viên
inputFullName       // Họ tên
inputDateOfBirth    // Ngày sinh
inputClassName      // Lớp học
inputGPA            // Điểm trung bình
inputEmail          // Email
inputEditIndex      // Hidden input lưu index đang sửa

// Statistics
totalStudentsElement    // Hiển thị tổng số SV
averageGPAElement       // Hiển thị điểm TB
```

### Validation:

```javascript
function validateStudentData(data) {
    // Kiểm tra trường bắt buộc
    if (!data.studentId || !data.fullName || ...) {
        return false;
    }
    
    // Kiểm tra điểm (0-10)
    if (data.gpa < 0 || data.gpa > 10) {
        return false;
    }
    
    // Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}
```

### LocalStorage Structure:

```json
{
    "students": [
        {
            "studentId": "SV001",
            "fullName": "Nguyễn Văn An",
            "dateOfBirth": "2003-05-15",
            "className": "CNTT01",
            "gpa": 8.5,
            "email": "nguyenvanan@email.com"
        }
    ]
}
```

## 🎨 Giao Diện

- **Responsive Design**: Tự động điều chỉnh theo kích thước màn hình
- **Modern UI**: Sử dụng gradient, shadow, animation
- **User-friendly**: Thông báo rõ ràng, xác nhận trước khi xóa
- **Color Scheme**: Purple gradient theme

## 📝 Ghi Chú

### Điểm mạnh:
- ✅ Code có cấu trúc rõ ràng, dễ đọc
- ✅ Comment chi tiết bằng tiếng Việt
- ✅ Xử lý đầy đủ các trường hợp
- ✅ Validation dữ liệu đầu vào
- ✅ UX/UI thân thiện

### Có thể mở rộng:
- 🔄 Thêm chức năng tìm kiếm/lọc
- 🔄 Sắp xếp theo cột
- 🔄 Phân trang khi có nhiều dữ liệu
- 🔄 Export dữ liệu ra Excel/PDF
- 🔄 Import dữ liệu từ file
- 🔄 Thêm ảnh đại diện cho sinh viên

## 🎓 Mục Đích Học Tập

Bài tập này giúp sinh viên:
1. Nắm vững cách thao tác với DOM
2. Hiểu rõ về xử lý sự kiện trong JavaScript
3. Biết cách làm việc với localStorage
4. Thực hành các thao tác CRUD cơ bản
5. Học cách validate dữ liệu
6. Hiểu về luồng xử lý trong ứng dụng web

## 📞 Hỗ Trợ

Nếu có thắc mắc hoặc gặp lỗi, hãy:
1. Kiểm tra Console trong DevTools (F12)
2. Xem lại code và comment hướng dẫn
3. Tham khảo tài liệu MDN Web Docs

---

**Chúc bạn học tập tốt! 🚀**
