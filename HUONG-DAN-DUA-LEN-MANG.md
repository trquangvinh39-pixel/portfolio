# Hướng dẫn đưa Portfolio lên mạng

Sau khi làm xong, anh có một địa chỉ dạng **`https://tranquangvinh.netlify.app`** để gửi nhà tuyển dụng, gắn vào LinkedIn và CV.

Đường đi của trang web:

```
Máy anh (thư mục Portfolio)  →  GitHub (kho lưu mã)  →  Netlify (đưa thành trang web)
                                                         ↘ Supabase (lời nhắn, lượt xem) — đã xong
```

Trang Supabase, GitHub và Netlify đều bằng tiếng Anh, nên tên nút trong hướng dẫn được giữ nguyên và **in đậm**.
Thời gian: khoảng 15 phút.

---

## ✅ Đã xong

- [x] Supabase: đã nối. Tôi đã kiểm tra: lượt xem đếm đúng, form gửi lời nhắn thành công.
  > Trong bảng `pf_messages` có 1 lời nhắn thử tên **"Claude (tin thử - xoá được)"**. Anh xoá đi cho sạch: tick ô đầu dòng → **Delete**.

---

## Bước 1 · Tạo kho trên GitHub (2 phút)

GitHub là nơi cất mã nguồn. Netlify sẽ lấy mã từ đây để đưa lên mạng.

1. Mở <https://github.com/new> (đăng nhập tài khoản **trquangvinh39-pixel**, tài khoản anh đang dùng cho WORKSPACE).
2. Điền:
   - **Repository name**: `portfolio`
   - **Description** (không bắt buộc): `Portfolio Trần Quang Vinh`
   - Chọn **Public**. Nên để Public vì đây là trang công khai, và nhà tuyển dụng xem được mã còn là điểm cộng.
   - **KHÔNG** tick *Add a README file*, **không** chọn .gitignore hay license. Kho phải trống hoàn toàn.
3. Bấm nút xanh **Create repository**.
4. GitHub hiện một trang hướng dẫn đầy lệnh. **Bỏ qua trang đó**, chuyển sang Bước 2.

---

## Bước 2 · Đẩy mã từ máy lên GitHub (1 phút)

**Cách dễ nhất:** nhắn vào khung chat với Claude câu: **"Tôi đã tạo kho portfolio, push lên đi"**. Claude sẽ chạy lệnh giúp anh.

**Hoặc tự làm:** mở Terminal ngay trong thư mục Portfolio, chạy lần lượt 2 lệnh:

```bash
git remote add origin https://github.com/trquangvinh39-pixel/portfolio.git
```

```bash
git push -u origin main
```

- Nếu hiện cửa sổ đăng nhập GitHub, anh bấm **Sign in with your browser** rồi **Authorize**.
- **Kiểm tra:** tải lại trang `github.com/trquangvinh39-pixel/portfolio`. Thấy các thư mục `web`, `supabase`, `docs` và file `README.md` là thành công.

---

## Bước 3 · Đưa lên Netlify (5 phút)

Netlify biến mã trên GitHub thành trang web có địa chỉ. Anh đã có tài khoản Netlify từ lúc làm WORKSPACE.

1. Mở <https://app.netlify.com> và đăng nhập.
2. Bấm **Add new project** (giao diện cũ ghi **Add new site**) → **Import an existing project**.
3. Bấm **GitHub**.
   - Nếu Netlify hỏi quyền truy cập GitHub, bấm **Authorize Netlify**.
   - Nếu danh sách **không có** kho `portfolio`: bấm dòng nhỏ **Configure the Netlify app on GitHub** → mục *Repository access* → thêm `portfolio` → **Save**, rồi quay lại Netlify.
4. Bấm chọn kho **portfolio**.
5. Màn hình cấu hình: **để nguyên mọi ô**, vì Netlify tự đọc file `netlify.toml` có sẵn. Anh chỉ cần kiểm tra:
   - **Branch to deploy**: `main`
   - **Publish directory**: `web`
   - **Build command**: để trống
6. Bấm **Deploy portfolio** (hoặc **Deploy site**).
7. Chờ khoảng 30 giây, đến khi dòng trạng thái chuyển sang màu xanh **Published**.
   > Nếu thấy **Canceled** hoặc dừng ở **Auto publishing locked** như lần làm WORKSPACE: vào tab **Deploys** → bấm **Trigger deploy** → **Deploy site**.
8. Netlify cấp một địa chỉ ngẫu nhiên kiểu `https://jolly-cat-123abc.netlify.app`. Bấm vào để xem trang đã chạy.

---

## Bước 4 · Đặt địa chỉ đẹp (1 phút)

1. Trong project trên Netlify → **Project configuration** (hoặc **Site configuration**) → **General** → **Project details** → **Change project name** (hoặc **Change site name**).
2. Gõ `tranquangvinh` → **Save**.
   - Nếu báo tên đã có người dùng, thử `tran-quang-vinh` hoặc `vinhtq-portfolio`.
3. Địa chỉ mới của anh: **`https://tranquangvinh.netlify.app`**

---

## Bước 5 · Cho ảnh xem trước hiện đúng khi gửi link (2 phút)

Khi dán link vào LinkedIn hay Zalo, sẽ hiện một ảnh xem trước có ảnh đại diện và các con số của anh. Ảnh này cần địa chỉ đầy đủ mới hiện được.

**Cách dễ nhất:** nhắn Claude: **"Địa chỉ portfolio là https://tranquangvinh.netlify.app, cập nhật ảnh xem trước và push"**.

**Hoặc tự làm:**
1. Mở file `web/index.html`, tìm dòng:
   ```html
   <meta property="og:image" content="assets/og.png">
   ```
   sửa thành (thay đúng địa chỉ của anh):
   ```html
   <meta property="og:image" content="https://tranquangvinh.netlify.app/assets/og.png">
   ```
2. Lưu file rồi chạy:
   ```bash
   git commit -am "Ảnh xem trước dùng địa chỉ đầy đủ"
   ```
   ```bash
   git push
   ```
3. Netlify tự xuất bản lại sau khoảng 30 giây. **Từ nay, mỗi lần push lên GitHub là trang tự cập nhật.**

**Kiểm tra ảnh xem trước:** dán địa chỉ vào <https://www.linkedin.com/post-inspector/> → **Inspect**.

---

## Bước 6 · Kiểm tra trang thật (3 phút)

Mở địa chỉ portfolio trên **máy tính** và **điện thoại**, thử lần lượt:

- [ ] Trang hiện ảnh đại diện, tên, 4 con số chạy.
- [ ] Bấm nút **EN**: chữ đổi sang tiếng Anh. Bấm nút ☀/☾: đổi sáng/tối.
- [ ] Mở 1–2 dự án, bấm tab **Demo tương tác**, kéo thanh trượt.
- [ ] Bấm **Tải CV**: tải về đúng file PDF.
- [ ] Gửi 1 lời nhắn thử ở mục Liên hệ, rồi vào Supabase → **Table Editor → pf_messages** xem đã có dòng mới chưa (cách xem: [HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md), Phần C).
- [ ] Chân trang hiện "👁 … lượt xem trang".

---

## Bước 7 · Gắn portfolio vào LinkedIn và CV

**LinkedIn:**
1. Vào trang cá nhân → **Add profile section** → **Recommended** → **Add featured** → dấu **+** → **Add a link** → dán địa chỉ portfolio → **Add** → **Save**.
2. **Contact info** (dưới tên của anh) → biểu tượng ✏️ → **Website** → dán địa chỉ, loại **Portfolio** → **Save**.
3. Có thể đăng một bài giới thiệu: dán link, ảnh xem trước sẽ tự hiện.

**CV:**
- Mã QR và link trên CV hiện trỏ tới trang claude.ai **chỉ anh xem được**. Anh thay bằng địa chỉ Netlify mới.
- Sau khi có CV mới, chép đè 2 file trong `web/assets/cv/` (giữ nguyên tên file), rồi `git commit -am "Cập nhật CV"` và `git push`.

---

## Khi muốn sửa nội dung về sau

| Muốn sửa | Sửa ở đâu |
|---|---|
| Chữ, số liệu, thêm/bớt dự án | `web/js/data.js` |
| Ảnh đại diện | Chép đè `web/assets/avatar.jpg` |
| CV PDF | Chép đè file trong `web/assets/cv/` |

Sửa xong thì chạy `git commit -am "mô tả ngắn"` rồi `git push`. Hoặc nhắn Claude: *"sửa … trong portfolio rồi push"*.

---

## Gặp lỗi?

| Hiện tượng | Cách xử lý |
|---|---|
| `git push` báo **repository not found** | Kiểm tra lại tên kho ở Bước 1 đúng là `portfolio`, và đúng tài khoản `trquangvinh39-pixel` |
| `git push` báo **rejected / fetch first** | Kho trên GitHub không trống (lỡ tick README). Xoá kho, tạo lại theo Bước 1 |
| Netlify **Page not found** | Kiểm tra **Publish directory** là `web` (Bước 3, mục 5), rồi **Trigger deploy** |
| Form gửi xong báo lỗi, mở email | Supabase project bị tạm dừng (gói miễn phí dừng sau 7 ngày không ai dùng). Vào Supabase bấm **Restore project** |
| Sửa rồi mà trang không đổi | Chờ 1 phút rồi nhấn `Ctrl + F5` để tải lại hẳn trang |
