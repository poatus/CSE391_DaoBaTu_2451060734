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