Phần A--Đọc hiểu
Câu A1 (5đ) — HTTP & Browser
1. 5 bước xảy ra khi truy cập https://shopee.vn
    B1. Trình duyện sẽ đổi địa chỉ shopee.vn thành ip máy chủ shopee
    B2. Trình duyệt gửi một yêu cầu đến địa chỉ ip qua internet(anh shipper) để yêu cầu dữ liệu của 1 trang nào đó
    B3. Máy chủ sẽ nhận yêu cầu và sử lý logic và chuẩn bị phản hồi
    B4. Máy chủ gửi dữ liệu về trình duyệt dưới dạng các file HTML, CSS, JAVASCRIPT kèm theo mã trạng thái (mục 1.1, 1.2)
    B5. Trình duyệt sẽ nhận các file vừa được gửi về từ máy chủ và thực hiện các bước Parse HTML → Parse CSS → Execute JS → Paint & Render để hiển thị trang web hoàn chỉnh lên màn hình (mục 1.3)
Câu A2 (5đ) — Semantic HTML
Trang web bị đánh giá seo thấp vì cấu trúc HTML chủ yếu là các thẻ div google sẽ không hiểu đâu là tiêu đề đầu trang đâu là nội dung chính hay đâu là thông tin bản quyền dấn đến kết quả tìm kiếm sẽ không ưu tiên
 4 Lỗi semantic cần khắc phục
    1. Thiếu thẻ <header>: Google cần thẻ header để xác định khu vực đầu trang
    2. Thiếu thẻ <nav>: Dùng thẻ nav để cho biết vùng này chữa nhiều liên kết quan trọng của website
    3. Thiếu thể <main> và <article>: Cần tách phần nội dung chính bằng main và thông tin sản phẩm bằng article
    4. Thiếu thẻ <footer>: Googel cần thẻ footer để xác định chân trang
    Code sửa lỗi:
    ```html
                    <header>
                <div class="logo">ShopTLU</div>
                <nav>
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/products">Sản phẩm</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <article class="product">
                    <h1>iPhone 16 Pro</h1> <p class="price">25.990.000đ</p>
                    <figure class="image"> <img src="iphone.jpg" alt="iPhone 16 Pro tại ShopTLU">
                    </figure>
                </article>
            </main>
            <footer>
                <p>&copy; 2026 ShopTLU</p>
            </footer>
Câu A3 (5đ) — Block vs Inline
Text art
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
Giải thích chi tiết:
Hộp 1 <div>: Là thẻ block, nó chiếm trọn dòng đầu tiên

Text A & Text B <span>: Vì là thẻ inline, chúng đứng cạnh nhau trên cùng một dòng ngay sau Hộp 1

Hộp 2 <div>: Là thẻ block, nó buộc phải "ngắt dòng" và bắt đầu một hàng mới bên dưới các thẻ inline phía trước

Text C <span> & Text D <strong>: Cả hai đều là thẻ inline, nên chúng nằm cùng dòng với nhau

Hộp 3 <div>: Là thẻ block, nó tiếp tục ngắt dòng và bắt đầu một hàng mới riêng biệt
Câu A4 (5đ) — Table


<thead> (Table Head): Dùng để nhóm các hàng chứa tiêu đề (thường là các ô <th>). Phần này định nghĩa tên của các cột hoặc tiêu đề chung cho bảng.

<tbody> (Table Body): Dùng để nhóm phần nội dung chính của bảng. Đây là nơi chứa hầu hết các hàng dữ liệu (<tr>) và các ô chứa dữ liệu thực tế (<td>).

<tfoot> (Table Foot): Dùng để nhóm các hàng chứa thông tin chân bảng, ví dụ như các hàng tổng hợp, tổng cộng (sum), hoặc ghi chú cuối bảng.
Tại sao KHÔNG NÊN dùng <table> để tạo layout trang web?
1.Gây khó khăn cho SEO và khả năng tiếp cận:Các công cụ tìm kiếm sẽ phải tìm kiếm từ trái qua phải từ trên xuống dưới nếu các bảng lồng nhau thì cấu trúc HTML sẽ rất phức tạp, khiến khó xác định đâu là nội dung quan trọng nhất
2.Khả năng thích ứng rất kém: Việc thay đổi bố cục trang web theo kích thước màn hình thiết bị sẽ gặp khó khăn với những màn hình điện thoại bé có thể dẫn đến vỡ giao diện
3.Mã nguồn khó bảo trì: Việc lồng hàng đống những thẻ <table>, <th>,<td> dẫn đến việc sau này thay đổi thiết kế sẽ gặp khó khăn thay vào đó sử dụng flexbox và CSS Grid sẽ tốt hơn

Câu B3:
Lỗi 1: Dòng 1 — Khai báo DOCTYPE thiếu chuẩn HTML5 — Sửa `<!DOCTYPE>` thành `<!DOCTYPE html>`.
Lỗi 2: Dòng 1 — Thẻ `<html>` thiếu thuộc tính ngôn ngữ `lang` (Lỗi semantic/accessibility) — Sửa `<html>` thành `<html lang="vi">`.
Lỗi 3: Dòng 2 — Thẻ `<title>` chưa được đóng — Thêm `</title>` vào cuối dòng: `<title>Trang web</title>`.
Lỗi 4: Dòng 3 — Giá trị charset không chuẩn xác — Sửa `<meta charset="utf8">` thành `<meta charset="UTF-8">`.
Lỗi 5: Dòng 4 — Thẻ đóng của `<h1>` sai cú pháp (thiếu dấu `/`) — Sửa `<h1>...<h1>` thành `<h1>...</h1>`.
Lỗi 6: Dòng 8 — Thẻ đóng của `<a>` sai cú pháp (thiếu dấu `/`) — Sửa `<a>` ở cuối dòng thành `</a>`.
Lỗi 7: Dòng 15 — Nhảy cóc cấp độ tiêu đề (từ h1 xuống thẳng h3) — Sửa `<h3>Sản phẩm hot</h3>` thành `<h2>Sản phẩm hot</h2>` để đảm bảo cấu trúc phân cấp chuẩn.
Lỗi 8: Dòng 16 — Thiếu ngoặc kép ở giá trị thuộc tính và thiếu thẻ `alt` (Lỗi syntax và semantic) — Sửa `<img src=iphone.jpg>` thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`.
Lỗi 9: Dòng 18 — Lỗi lồng chéo thẻ (overlapping) và lạm dụng thẻ `<b>` thay vì `<strong>` — Sửa `<b>25.990.000đ</p></b>` thành `<strong>25.990.000đ</strong></p>`.
Lỗi 10: Dòng 24-27 — Hàng tiêu đề của bảng dùng thẻ `<td>` thay vì thẻ `<th>` — Sửa các thẻ `<td>` trong hàng đầu tiên thành `<th>` (và nên bọc trong `<thead>`).
Lỗi 11: Dòng 36-38 — Lỗi semantic nghiêm trọng: Có 2 thẻ `<main>` trong cùng một trang và sai ngữ nghĩa cho thanh bên — Trang web chỉ được có một thẻ `<main>`. Nội dung "Sidebar content" nên được đổi thành thẻ `<aside>`.
Lỗi 12: Dòng 41 — Thẻ `<p>` chưa được đóng — Thêm `</p>` vào cuối: `<p>Copyright 2026</p>`.