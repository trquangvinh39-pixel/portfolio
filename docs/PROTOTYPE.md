# Prototype bố cục — Portfolio Trần Quang Vinh

Một trang dài (single page), mỗi dự án có trang case study riêng mở dạng ngăn kéo toàn màn hình, có địa chỉ riêng (`#du-an/<mã>`) để gửi thẳng cho nhà tuyển dụng.

## 1. Sơ đồ trang

```
/ (index.html)
├── Thanh điều hướng cố định: logo VQ · Tổng quan · Hành trình · Dự án · Năng lực · Liên hệ · [⌘K] [VI/EN] [☀/☾] [Tải CV]
├── #tong-quan      Hero: tên, chức danh xoay vòng, khẩu hiệu, 3 nút (Xem dự án / Xem nhanh 30 giây / Tải CV)
│                   nền: mạng lưới 50 điểm = 50 cửa hàng, nối nhau theo chuột
├── #thanh-tuu      4 thẻ số đếm chạy: 9 năm · 50 cửa hàng · 20+ dự án · 70% tự phục vụ (bấm → mở dự án liên quan)
├── #gioi-thieu     Giới thiệu + "Cách tôi làm việc" (3 bước) + "Điều tôi tập trung" (4 mảng)
├── #hanh-trinh     Dòng thời gian 5 vị trí, bấm để mở thành tích; thanh "Sản xuất → Bán lẻ → Dữ liệu & AI"
├── #du-an          Bộ lọc (Tất cả / FP&A / Mạng lưới / Dữ liệu & AI / Web app) + ô tìm kiếm
│                   Lưới 9 thẻ dự án → bấm mở case study
├── #nang-luc       Biểu đồ radar 6 trục + 3 nhóm kỹ năng; bấm kỹ năng → lọc dự án dùng kỹ năng đó
├── #chung-chi      Học vấn + 10 chứng chỉ (lọc theo năm)
└── #lien-he        Form gửi lời nhắn (Supabase) · email (chép 1 chạm) · điện thoại · LinkedIn · lưu danh bạ (.vcf)
```

## 2. Case study (ngăn kéo toàn màn hình)

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại      Dự án 3/9          ‹ Trước   Sau ›   ♥ 12  ✕ │
├──────────────────────────────────────────────────────────────┤
│ [Nhóm] [Năm]                                                 │
│ TÊN DỰ ÁN (to)                                               │
│ Một câu mô tả giá trị                                        │
│ ┌────────┐ ┌────────┐ ┌────────┐   ← chỉ số kết quả          │
├──────────────────────────────────────────────────────────────┤
│ Tab: Tổng quan | Cách làm | Kết quả | ▶ Demo tương tác       │
│                                                              │
│ Tổng quan : Bối cảnh · Bài toán · Vai trò của tôi · Công cụ  │
│ Cách làm  : các bước đánh số (1 → n)                         │
│ Kết quả   : danh sách tác động + bài học                     │
│ Demo      : công cụ chạy được ngay bằng số liệu minh hoạ     │
└──────────────────────────────────────────────────────────────┘
```

| Dự án | Demo tương tác |
|---|---|
| Agentic AI trên Power BI | Chọn câu hỏi → xem agent hiểu câu hỏi, viết DAX, chạy, giải thích |
| Hệ sinh thái web app | Sơ đồ kiến trúc bấm được + danh mục module |
| Kế hoạch doanh thu ngày | Nhập chỉ tiêu tháng → phân bổ xuống cửa hàng, ngành hàng, ngày |
| Chi phí đóng cửa điểm bán | So sánh đóng sớm và chạy hết hạn thuê, điểm hoà vốn theo tháng |
| Thẩm định mở mới | Doanh thu hoà vốn, thời gian hoàn vốn, NPV, kết luận |
| Định giá hợp tác F&B | Thu tối thiểu và chia doanh thu, so với giá thuê hiện tại |
| Excel → SQL Server + Power BI | Bật "Trước / Sau" để thấy luồng dữ liệu đổi |
| Xếp hạng SKU R80/R20/R0/RNEW | Biểu đồ Pareto, kéo ngưỡng để xếp lại |
| Định mức tồn kho | Mức phục vụ → tồn an toàn, điểm đặt hàng, mô phỏng răng cưa |

## 3. Hệ thiết kế

- Màu: nền xanh đen `#07141A` (tối) / `#F6FAF9` (sáng); nhấn ngọc lam `#14C3B5` (giữ màu CV); phụ hổ phách `#F5B544` cho số liệu nổi bật.
- Chữ: Be Vietnam Pro (đọc tốt tiếng Việt) · JetBrains Mono cho số và code.
- Lưới: tối đa 1200px, lề 16px trên điện thoại; thẻ bo 18px, viền mảnh, bóng nhẹ.
- Chuyển động: hiện dần khi cuộn, số đếm chạy; tắt hết khi máy bật "giảm chuyển động".
- Song ngữ VI/EN, sáng/tối, phím tắt `Ctrl+K` tìm nhanh, `Esc` đóng, `←/→` chuyển dự án.

## 4. Dữ liệu và dịch vụ

- Nội dung: `web/js/data.js` (sửa một chỗ, cả trang đổi theo).
- Supabase: bảng `pf_messages` (lời nhắn, chỉ ghi), `pf_counters` (lượt xem, lượt thích qua hàm `pf_bump`). Không có Supabase trang vẫn chạy, form chuyển sang mở email.
- Netlify: xuất bản thư mục `web/`, không cần bước build.
- Số liệu trong demo là minh hoạ, không phải dữ liệu nội bộ công ty.
