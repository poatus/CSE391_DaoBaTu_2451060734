Câu A1 (5đ) — Input Types
1.type="text" → Ô nhập liệu dòng đơn, không ràng buộc định dạng → Dùng cho nhập Họ tên khách hàng hoặc Địa chỉ nhận hàng.

2.type="email" → Ô nhập text, tự động kiểm tra định dạng cấu trúc @ và tên miền → Dùng cho form Đăng ký tài khoản hoặc nhận bản tin.

3.type="password" → Ô nhập liệu ẩn ký tự (hiện dấu chấm/sao) để bảo mật → Dùng cho ô Mật khẩu khi đăng nhập hoặc thanh toán.

4.type="number" → Ô chỉ cho nhập số, có nút tăng/giảm và kiểm tra min/max → Dùng để điều chỉnh Số lượng sản phẩm trong giỏ hàng.

5.type="date" → Hiển thị bảng chọn lịch (date picker) để chọn ngày/tháng/năm → Dùng để chọn Ngày sinh nhật khách hàng hoặc Ngày hẹn giao hàng.

6.type="tel" → Ô nhập số điện thoại, tự động mở bàn phím số trên di động → Dùng để nhập Số điện thoại liên lạc người mua hàng.

7.type="checkbox" → Ô vuông nhỏ cho phép tích chọn hoặc bỏ chọn nhiều lựa chọn → Dùng cho Bộ lọc sản phẩm (chọn cùng lúc nhiều thương hiệu, kích cỡ).

8.type="radio" → Nút tròn nhỏ, chỉ được chọn duy nhất một mục trong một nhóm → Dùng để chọn Phương thức thanh toán hoặc Đơn vị vận chuyển.

9.type="file" → Nút bấm để mở trình duyệt tệp tin của hệ thống và tải tệp lên → Dùng để khách hàng gửi Ảnh đánh giá sản phẩm hoặc ảnh hóa đơn.

10.type="color" → Ô hiển thị màu, nhấp vào sẽ mở bảng chọn màu sắc (Color Picker) → Dùng cho tính năng Tùy biến sản phẩm (chọn màu in áo, màu vỏ máy).
Câu A2 (5đ) — Validation Attributes
1. Trường hợp 1: `<input type="text" required value="">` (User để trống)

Kết quả: Trình duyệt ngăn chặn việc Submit và hiển thị thông báo lỗi (thông thường là "Please fill out this field").

Giải thích: Thuộc tính required bắt buộc trường này không được để trống. Do value="" (rỗng), điều kiện của required không được thỏa mãn.

2. Trường hợp 2: `<input type="email" value="abc">` (User gõ "abc")

Kết quả: Trình duyệt ngăn chặn việc Submit và thông báo lỗi định dạng email (ví dụ: "Please include an '@' in the email address...").

Giải thích: type="email" yêu cầu nội dung phải tuân theo định dạng địa chỉ email hợp lệ. Chuỗi "abc" thiếu ký tự @ và tên miền nên bị coi là không hợp lệ.

3. Trường hợp 3: `<input type="number" min="1" max="10" value="15">` (User gõ 15)

Kết quả: Trình duyệt ngăn chặn việc Submit và báo lỗi giá trị quá lớn (ví dụ: "Value must be less than or equal to 10").

Giải thích: Thuộc tính max="10" giới hạn giá trị tối đa là 10. Giá trị 15 vượt quá giới hạn này nên vi phạm validation.

4. Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc1233">` (User gõ "abc123")

Kết quả: Trình duyệt ngăn chặn việc Submit và báo lỗi không khớp định dạng yêu cầu (ví dụ: "Please match the requested format").

Giải thích: Thuộc tính pattern="[0-9]{10}" yêu cầu dữ liệu nhập vào phải là đúng 10 chữ số. Chuỗi "abc123" chứa ký tự chữ và không đủ độ dài nên bị từ chối.

5. Trường hợp 5: `<input type="password" minlength="8" value="123">` (User gõ "123")

Kết quả: Trình duyệt ngăn chặn việc Submit và báo lỗi độ dài tối thiểu (ví dụ: "Please lengthen this text to 8 characters or more...").

Giải thích: Thuộc tính minlength="8" yêu cầu mật khẩu phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự nên không đạt yêu cầu.