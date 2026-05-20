let danhSachSinhVien = [];

// Lấy các phần tử từ HTML
const nutThemSinhVien = document.getElementById('nutThemSinhVien');
const nutDong = document.getElementById('nutDong');
const nutHuy = document.getElementById('nutHuy');
const hopThoai = document.getElementById('hopThoai');
const formSinhVien = document.getElementById('formSinhVien');
const bangSinhVien = document.getElementById('danhSachSinhVien');
const thongBao = document.getElementById('thongBao');
const tieuDeHopThoai = document.getElementById('tieuDeHopThoai');
const tongSoSinhVien = document.getElementById('tongSoSinhVien');
const diemTrungBinh = document.getElementById('diemTrungBinh');

// Các ô nhập liệu
const maSV = document.getElementById('maSV');
const hoTen = document.getElementById('hoTen');
const ngaySinh = document.getElementById('ngaySinh');
const lop = document.getElementById('lop');
const diem = document.getElementById('diem');
const email = document.getElementById('email');
const viTriSua = document.getElementById('viTriSua');

// Khi trang web tải xong
document.addEventListener('DOMContentLoaded', function() {
    docDuLieu();
    hienThiBang();
    capNhatThongKe();
    ganSuKien();
});

// Gắn các sự kiện click
function ganSuKien() {
    nutThemSinhVien.addEventListener('click', moHopThoaiThem);
    nutDong.addEventListener('click', dongHopThoai);
    nutHuy.addEventListener('click', dongHopThoai);
    formSinhVien.addEventListener('submit', xuLyLuu);
    
    hopThoai.addEventListener('click', function(e) {
        if (e.target === hopThoai) {
            dongHopThoai();
        }
    });
}

// Đọc dữ liệu từ localStorage
function docDuLieu() {
    const duLieu = localStorage.getItem('sinhvien');
    if (duLieu) {
        danhSachSinhVien = JSON.parse(duLieu);
    } else {
        danhSachSinhVien = [
            {
                maSV: 'SV001',
                hoTen: 'Nguyễn Văn An',
                ngaySinh: '2003-05-15',
                lop: 'CNTT01',
                diem: 8.5,
                email: 'nguyenvanan@email.com'
            },
            {
                maSV: 'SV002',
                hoTen: 'Trần Thị Bình',
                ngaySinh: '2003-08-20',
                lop: 'CNTT01',
                diem: 9.0,
                email: 'tranthibinh@email.com'
            },
            {
                maSV: 'SV003',
                hoTen: 'Lê Hoàng Cường',
                ngaySinh: '2003-03-10',
                lop: 'CNTT02',
                diem: 7.8,
                email: 'lehoangcuong@email.com'
            }
        ];
        luuDuLieu();
    }
}

// Lưu dữ liệu vào localStorage
function luuDuLieu() {
    localStorage.setItem('sinhvien', JSON.stringify(danhSachSinhVien));
}

// Hiển thị bảng sinh viên
function hienThiBang() {
    bangSinhVien.innerHTML = '';
    
    if (danhSachSinhVien.length === 0) {
        bangSinhVien.innerHTML = '<tr><td colspan="8" style="text-align:center">Chưa có sinh viên</td></tr>';
        return;
    }
    
    for (let i = 0; i < danhSachSinhVien.length; i++) {
        const sv = danhSachSinhVien[i];
        const dong = document.createElement('tr');
        
        dong.innerHTML = `
            <td>${i + 1}</td>
            <td>${sv.maSV}</td>
            <td>${sv.hoTen}</td>
            <td>${chuyenNgay(sv.ngaySinh)}</td>
            <td>${sv.lop}</td>
            <td>${sv.diem.toFixed(2)}</td>
            <td>${sv.email}</td>
            <td>
                <div class="nhom-nut">
                    <button class="nut nut-vang" onclick="suaSinhVien(${i})">✏️ Sửa</button>
                    <button class="nut nut-do" onclick="xoaSinhVien(${i})">🗑️ Xóa</button>
                </div>
            </td>
        `;
        
        bangSinhVien.appendChild(dong);
    }
}

// Mở hộp thoại thêm sinh viên
function moHopThoaiThem() {
    viTriSua.value = '-1';
    tieuDeHopThoai.textContent = 'Thêm Sinh Viên';
    formSinhVien.reset();
    hopThoai.classList.add('hien');
}

// Mở hộp thoại sửa sinh viên
function moHopThoaiSua(viTri) {
    viTriSua.value = viTri;
    tieuDeHopThoai.textContent = 'Sửa Sinh Viên';
    
    const sv = danhSachSinhVien[viTri];
    maSV.value = sv.maSV;
    hoTen.value = sv.hoTen;
    ngaySinh.value = sv.ngaySinh;
    lop.value = sv.lop;
    diem.value = sv.diem;
    email.value = sv.email;
    
    hopThoai.classList.add('hien');
}

// Đóng hộp thoại
function dongHopThoai() {
    hopThoai.classList.remove('hien');
    formSinhVien.reset();
    viTriSua.value = '-1';
}

// Xử lý khi nhấn nút Lưu
function xuLyLuu(e) {
    e.preventDefault();
    
    const sinhVienMoi = {
        maSV: maSV.value.trim(),
        hoTen: hoTen.value.trim(),
        ngaySinh: ngaySinh.value,
        lop: lop.value.trim(),
        diem: parseFloat(diem.value),
        email: email.value.trim()
    };
    
    if (!kiemTra(sinhVienMoi)) {
        return;
    }
    
    const viTri = parseInt(viTriSua.value);
    
    if (viTri === -1) {
        // Thêm mới
        if (kiemTraMaTrung(sinhVienMoi.maSV)) {
            hienThongBao('Mã sinh viên đã tồn tại!', 'loi');
            return;
        }
        danhSachSinhVien.push(sinhVienMoi);
        hienThongBao('Thêm sinh viên thành công!', 'thanh-cong');
    } else {
        // Sửa
        if (kiemTraMaTrung(sinhVienMoi.maSV, viTri)) {
            hienThongBao('Mã sinh viên đã tồn tại!', 'loi');
            return;
        }
        danhSachSinhVien[viTri] = sinhVienMoi;
        hienThongBao('Cập nhật sinh viên thành công!', 'thanh-cong');
    }
    
    luuDuLieu();
    hienThiBang();
    capNhatThongKe();
    dongHopThoai();
}

// Sửa sinh viên
function suaSinhVien(viTri) {
    moHopThoaiSua(viTri);
}

// Xóa sinh viên
function xoaSinhVien(viTri) {
    const sv = danhSachSinhVien[viTri];
    const xacNhan = confirm(`Bạn có chắc muốn xóa sinh viên ${sv.hoTen}?`);
    
    if (xacNhan) {
        danhSachSinhVien.splice(viTri, 1);
        luuDuLieu();
        hienThiBang();
        capNhatThongKe();
        hienThongBao('Xóa sinh viên thành công!', 'thanh-cong');
    }
}

// Cập nhật thống kê
function capNhatThongKe() {
    tongSoSinhVien.textContent = danhSachSinhVien.length;
    
    if (danhSachSinhVien.length === 0) {
        diemTrungBinh.textContent = '0.00';
    } else {
        let tong = 0;
        for (let i = 0; i < danhSachSinhVien.length; i++) {
            tong += danhSachSinhVien[i].diem;
        }
        const trungBinh = tong / danhSachSinhVien.length;
        diemTrungBinh.textContent = trungBinh.toFixed(2);
    }
}

// Hiển thị thông báo
function hienThongBao(noiDung, loai) {
    const div = document.createElement('div');
    div.className = `thong-bao-${loai}`;
    div.textContent = noiDung;
    
    thongBao.innerHTML = '';
    thongBao.appendChild(div);
    
    setTimeout(function() {
        div.remove();
    }, 3000);
}

// Kiểm tra mã sinh viên trùng
function kiemTraMaTrung(ma, boQuaViTri = -1) {
    for (let i = 0; i < danhSachSinhVien.length; i++) {
        if (i !== boQuaViTri && danhSachSinhVien[i].maSV === ma) {
            return true;
        }
    }
    return false;
}

// Kiểm tra dữ liệu
function kiemTra(sv) {
    if (!sv.maSV || !sv.hoTen || !sv.ngaySinh || !sv.lop || !sv.email) {
        hienThongBao('Vui lòng điền đầy đủ thông tin!', 'loi');
        return false;
    }
    
    if (sv.diem < 0 || sv.diem > 10) {
        hienThongBao('Điểm phải từ 0 đến 10!', 'loi');
        return false;
    }
    
    return true;
}

// Chuyển đổi ngày từ YYYY-MM-DD sang DD/MM/YYYY
function chuyenNgay(ngay) {
    const parts = ngay.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
