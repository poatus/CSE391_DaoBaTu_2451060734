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
Câu A3 (5đ) — Accessibility
Dưới đây là lời giải chi tiết cho các câu hỏi về Accessibility, Media và cấu trúc HTML dựa trên kiến thức lập trình web chuẩn:

Câu A3 — Accessibility (Khả năng tiếp cận)
1. Tại sao `<label for="email">` quan trọng cho Screen Reader?
Liên kết logic: Thuộc tính for kết nối trực tiếp nhãn văn bản với ô nhập liệu có id tương ứng. Khi người khiếm thị dùng Screen Reader (trình đọc màn hình) tab vào ô input, thiết bị sẽ đọc to nội dung của nhãn đó (ví dụ: "Email, edit text"). Nếu không có nhãn này, người dùng sẽ chỉ nghe thấy "Edit text", khiến họ không biết phải nhập thông tin gì.

Mở rộng vùng tương tác: Giúp người dùng có cử động tay không chính xác dễ dàng hơn, vì khi click vào văn bản của nhãn, con trỏ sẽ tự động nhảy vào ô input.
2. Khi nào dùng <fieldset> + <legend>?
Khi nào dùng: Dùng để nhóm các phần tử có liên quan chặt chẽ với nhau trong một form dài, giúp tạo ra một bối cảnh chung cho nhóm đó.

Ví dụ: Nhóm các phương thức thanh toán hoặc nhóm thông tin địa chỉ giao hàng.
`<fieldset>`
  `<legend>Phương thức thanh toán</legend>`
 ` <input type="radio" id="visa" name="pay"> <label for="visa">Visa</label>`
  `<input type="radio" id="cod" name="pay"> <label for="cod">Thanh toán khi nhận hàng</label>`
`</fieldset>`
3. aria-label dùng khi nào? Tại sao không dùng khi đã có <label>?
Khi nào dùng: Dùng khi một phần tử tương tác (như nút bấm chỉ có icon) không có văn bản hiển thị trên màn hình nhưng vẫn cần mô tả cho Screen Reader. Ví dụ: Nút "X" để đóng cửa sổ sẽ cần aria-label="Đóng".

Tại sao không dùng chung: Nếu đã có <label>, trình đọc màn hình sẽ ưu tiên đọc aria-label và bỏ qua <label>, hoặc đọc cả hai gây lặp lại dư thừa. <label> là cách chuẩn nhất vì nó hỗ trợ cả người dùng bình thường lẫn người dùng công nghệ hỗ trợ.

Câu A4 — Media
1. Thuộc tính loading="lazy" trên thẻ <img>
Tác dụng: Trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của ảnh đó.

Cải thiện: Tốc độ tải trang ban đầu (Initial Load Time), tiết kiệm băng thông và giảm tải cho bộ nhớ thiết bị.

KHI NÀO KHÔNG DÙNG: Không dùng cho các ảnh nằm ở phần đầu trang (Above the fold) hoặc ảnh banner chính (LCP), vì sẽ làm chậm thời gian hiển thị nội dung quan trọng nhất của trang.
2. Tại sao nên cung cấp nhiều <source> trong <video>?
Lý do: Để đảm bảo tính tương thích trên nhiều trình duyệt khác nhau (mỗi trình duyệt hỗ trợ bộ giải mã/codec khác nhau). Trình duyệt sẽ tự chọn file đầu tiên mà nó hỗ trợ.

3 Format phổ biến:

MP4 (H.264): Phổ biến nhất, hỗ trợ hầu hết mọi trình duyệt.

WebM: Nén tốt, chất lượng cao, thường dùng cho Chrome và Firefox.

Ogg/Ogv: Định dạng mã nguồn mở.
3. Thuộc tính alt và cách viết tốt
Tác dụng: Hiển thị văn bản thay thế nếu ảnh bị lỗi tải và cung cấp mô tả cho Screen Reader/SEO.

Viết alt tốt:

iPhone 16: alt="Điện thoại iPhone 16 màu xanh Teal nhìn từ mặt lưng"

Ảnh trang trí: alt="" (Để trống để Screen Reader bỏ qua, không gây nhiễu người dùng).

Biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột cho thấy doanh thu Q1/2026 tăng trưởng 15% so với quý trước"
Câu A5 — So sánh <figure> vs <img>
Cách dùng
Cách 1 (<img> đơn thuần): Dùng khi hình ảnh chỉ là một phần của nội dung văn bản, mang tính minh họa nhỏ hoặc icon.

Cách 2 (<figure> + <figcaption>): Dùng khi hình ảnh là một thực thể nội dung độc lập, cần có chú thích đi kèm và có thể di chuyển ra vị trí khác (như phụ lục) mà vẫn giữ nguyên ý nghĩa.

Ví dụ thực tế
Với Cách 1:

Logo thương hiệu trên thanh điều hướng (Navbar).

Các icon nhỏ như hình "Giỏ hàng" hoặc "Ngôi sao" đánh giá.

Với Cách 2:

Ảnh chi tiết sản phẩm trong trang đơn hàng kèm theo giá và tên model bên dưới.

Sơ đồ mặt bằng căn hộ trong một trang bất động sản kèm chú thích "Sơ đồ bố trí tầng 1".