# Portfolio · Trần Quang Vinh

**Địa chỉ: <https://tranquangvinh-portfolio.netlify.app>** · bản tiếng Anh: <https://tranquangvinh-portfolio.netlify.app/#en>

Trang portfolio cá nhân song ngữ (VI/EN): Trưởng bộ phận Kế hoạch · FP&A · Dữ liệu · Agentic AI.
Web tĩnh (HTML/CSS/JS thuần, không cần build) → **GitHub** → **Netlify**; form liên hệ và bộ đếm lượt xem dùng **Supabase**.

Bố cục và hệ thiết kế: [docs/PROTOTYPE.md](docs/PROTOTYPE.md).

## Có gì trong trang

- Hero có mạng lưới 50 điểm (= 50 cửa hàng) chạy theo chuột, chức danh xoay vòng, nút **Xem nhanh 30 giây** cho nhà tuyển dụng.
- 4 chỉ số chính (đếm chạy, bấm vào mở dự án liên quan).
- Hành trình 5 vị trí, lọc theo giai đoạn Sản xuất → Bán lẻ → Dẫn dắt.
- **9 case study**, mỗi cái có 4 tab (Tổng quan · Cách làm · Kết quả · Demo) và **một demo chạy được**: agent AI viết DAX, kiến trúc web app, phân bổ chỉ tiêu ngày, chi phí đóng cửa, thẩm định mở mới, định giá F&B, Excel → Power BI, Pareto SKU, tồn kho an toàn.
- Mỗi dự án có link riêng `…/#du-an/<mã>` để gửi thẳng, có nút thích và đếm lượt xem.
- Năng lực dạng radar; bấm kỹ năng để lọc dự án dùng kỹ năng đó.
- `Ctrl + K` tìm nhanh mọi thứ, sáng/tối, VI/EN (link `…/#en` mở thẳng tiếng Anh), tải CV PDF đúng ngôn ngữ, lưu danh thiếp `.vcf`.

## Cấu trúc

```
web/                 ← thư mục được xuất bản
  index.html
  config.js          ← dán Supabase URL + anon key vào đây
  css/style.css
  js/data.js         ← TOÀN BỘ nội dung (sửa chữ, thêm dự án ở đây)
  js/app.js          ← điều khiển trang
  js/demos.js        ← 9 demo tương tác
  js/charts.js       ← biểu đồ SVG
  assets/            ← ảnh đại diện, og.png, CV PDF
supabase/portfolio.sql
docs/PROTOTYPE.md
tools/og.html        ← mẫu ảnh chia sẻ link
netlify.toml
```

## Chạy trên máy

```bash
python -m http.server 5180 --directory web
```

Mở <http://localhost:5180>. Chưa dán khoá Supabase thì trang vẫn chạy đủ; form liên hệ sẽ mở ứng dụng email.

## Đưa lên mạng (làm một lần)

> Hướng dẫn từng cú bấm, dễ hiểu: **[HUONG-DAN-DUA-LEN-MANG.md](HUONG-DAN-DUA-LEN-MANG.md)**

### Bước 1 · Supabase (form liên hệ + lượt xem)

> Hướng dẫn chi tiết từng cú bấm (nối khoá, đọc lời nhắn, xem lượt xem): **[HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md)**

1. Vào <https://supabase.com/dashboard> → **New project** (nên tạo project riêng cho portfolio, tách khỏi project công ty). Đặt tên `portfolio`, vùng Singapore.
2. **SQL Editor** → dán toàn bộ `supabase/portfolio.sql` → **Run**. Thấy dòng `TẤT CẢ KIỂM TRA ĐẠT` là xong.
3. **Project Settings → API**: chép **Project URL** và khoá **anon public** dán vào `web/config.js`. Tuyệt đối không dùng khoá `service_role`.
4. Đọc lời nhắn và xem lượt xem: xem Phần C, D trong [HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md).

### Bước 2 · GitHub

1. Tạo kho mới (gợi ý tên `portfolio`, để **Public** hoặc Private đều được) tại <https://github.com/new>, không tick tạo README.
2. Trong thư mục này:

```bash
git remote add origin https://github.com/trquangvinh39-pixel/portfolio.git
```

```bash
git push -u origin main
```

### Bước 3 · Netlify

1. <https://app.netlify.com> → **Add new site → Import an existing project → GitHub** → chọn kho `portfolio`.
2. Netlify tự đọc `netlify.toml` (xuất bản thư mục `web`, không cần lệnh build) → **Deploy**.
3. **Site configuration → Change site name**: ví dụ `tranquangvinh` → địa chỉ `https://tranquangvinh.netlify.app`.
4. Sau khi có địa chỉ, sửa 1 dòng trong `web/index.html` cho ảnh chia sẻ hiện đúng trên LinkedIn/Zalo:
   `<meta property="og:image" content="https://tranquangvinh.netlify.app/assets/og.png">`, rồi commit + push.
5. Mỗi lần push lên GitHub, Netlify tự xuất bản bản mới.

### Bước 4 · Cập nhật CV và LinkedIn

- Thay link/QR portfolio trong CV (hiện trỏ tới trang claude.ai riêng tư) bằng địa chỉ Netlify mới.
- LinkedIn → **Add profile section → Featured → Add a link** → dán địa chỉ portfolio; thêm vào mục **Contact info → Website**.

## Sửa nội dung

- Chữ, số liệu, dự án: `web/js/data.js` (mỗi chữ có `vi` và `en`).
- Thêm dự án mới: thêm một mục vào `PF.projects`, chọn `demo` là một trong 9 demo có sẵn hoặc viết demo mới trong `demos.js`; thêm mã dự án vào `pf_valid_key` trong `supabase/portfolio.sql` rồi chạy lại file SQL.
- Thay CV: chép đè 2 file trong `web/assets/cv/`.
- Tạo lại ảnh chia sẻ sau khi sửa `tools/og.html`:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=4000 --screenshot="web/assets/og.png" "tools/og.html"
```

## Lưu ý

- Số liệu trong 9 demo là **minh hoạ**, không phải dữ liệu nội bộ công ty (trang có ghi chú rõ).
- CV PDF trong `web/assets/cv/` công khai ngày sinh và số điện thoại. Muốn ẩn thì xuất bản CV bản rút gọn.
