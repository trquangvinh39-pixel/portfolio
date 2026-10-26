# Hướng dẫn Supabase cho Portfolio

Supabase là nơi **lưu lời nhắn** người xem gửi qua form "Liên hệ" và **đếm lượt xem** trang. Anh không cần biết lập trình, chỉ cần bấm theo các bước dưới đây.

Trang Supabase hiện bằng tiếng Anh, nên tên nút trong hướng dẫn được giữ nguyên tiếng Anh và **in đậm** để anh dễ tìm.

---

## Phần A · Việc đã làm và việc còn thiếu

| Việc | Trạng thái |
|---|---|
| Tạo project Supabase | Anh đã làm |
| Chạy file `supabase/portfolio.sql` (thấy dòng `TẤT CẢ KIỂM TRA ĐẠT`) | Anh đã làm |
| Dán địa chỉ và khoá vào `web/config.js` | **Chưa làm** (file vẫn để trống) |

Chưa dán khoá thì form trên trang **chưa gửi vào Supabase** mà chỉ mở ứng dụng email. Làm Phần B trước.

---

## Phần B · Nối trang web với Supabase (làm 1 lần)

1. Mở <https://supabase.com/dashboard> và bấm vào project portfolio của anh.
2. Ở cột menu bên trái, bấm biểu tượng **bánh răng ⚙ (Project Settings)** ở dưới cùng.
3. Bấm **Data API** (có nơi ghi là **API**).
4. Anh cần chép đúng 2 thứ:
   - **Project URL**: luôn là địa chỉ web dạng `https://<mã-project>.supabase.co`. Thường nằm ở trang **Data API**, hoặc bấm nút **Connect** ở đầu dashboard để xem.
   - **Khoá `anon` `public`**: một chuỗi rất dài **bắt đầu bằng `eyJ`**. Ở giao diện Supabase mới, khoá này nằm trong **Project Settings → API Keys → tab "Legacy API keys"**.
   > ⚠️ **Hay nhầm:** giao diện mới còn hiện **Publishable key** dạng `sb_publishable_...`. Khoá này **không** phải Project URL, và trang portfolio **không dùng** nó. Bỏ qua.
   > ⚠️ **Không** chép khoá **`service_role`** hay **`sb_secret_...`** (có chữ *secret*). Đó là chìa khoá quản trị, không được để lên web.
   >
   > **Mẹo:** `<mã-project>` trong Project URL chính là mã trên thanh địa chỉ trình duyệt khi anh đang mở project: `supabase.com/dashboard/project/<mã-project>`.
5. Mở file `web/config.js` trong thư mục Portfolio và dán vào giữa hai dấu nháy `' '`:

   ```js
   window.PF_CONFIG = {
     SUPABASE_URL: 'https://abcdxyz.supabase.co',
     SUPABASE_ANON_KEY: 'eyJhbGciOi...(chuỗi dài)...',
   };
   ```

6. Lưu file. Nếu không muốn tự sửa file, anh có thể dán 2 giá trị này vào khung chat để Claude dán giúp. Khoá `anon` là khoá công khai nên gửi được.

**Thử xem đã nối được chưa:** chạy trang trên máy, gửi thử một lời nhắn ở mục Liên hệ. Nếu hiện dòng chữ xanh *"Đã gửi. Tôi sẽ phản hồi sớm…"* là thành công.

---

## Phần C · Đọc lời nhắn người xem gửi

Mỗi khi có người điền form "Gửi lời nhắn" trên portfolio, lời nhắn được lưu thành **một dòng** trong bảng tên **`pf_messages`**. Bảng này giống một sheet Excel.

### Cách mở

1. Vào <https://supabase.com/dashboard> và bấm vào project portfolio.
2. Cột menu bên trái → bấm biểu tượng **ô lưới (Table Editor)**. Đây thường là biểu tượng thứ 2 từ trên xuống.
3. Ở danh sách bảng bên trái (phía trên ghi `schema: public`), bấm **`pf_messages`**.
4. Bảng hiện ra, mỗi dòng là một lời nhắn.

### Ý nghĩa từng cột

| Cột | Nghĩa |
|---|---|
| `id` | Số thứ tự lời nhắn |
| `created_at` | Thời điểm gửi (giờ quốc tế UTC, **cộng thêm 7 tiếng** ra giờ Việt Nam) |
| `name` | Họ tên người gửi |
| `email` | Email người gửi, dùng để trả lời |
| `company` | Công ty / tổ chức (có thể trống) |
| `topic` | Chủ đề họ chọn: Cơ hội việc làm, Hợp tác, Trao đổi chuyên môn, Khác |
| `body` | Nội dung lời nhắn |
| `lang` | Họ xem trang bằng `vi` (tiếng Việt) hay `en` (tiếng Anh) |
| `handled` | Anh đã xử lý chưa: `false` = chưa, `true` = rồi |

### Mẹo khi đọc

- **Xem lời nhắn mới nhất lên đầu:** bấm vào tiêu đề cột `created_at` → chọn **Sort descending**.
- **Đọc nội dung dài:** bấm đúp vào ô `body` để mở xem đầy đủ.
- **Đánh dấu đã trả lời:** bấm đúp vào ô `handled` của dòng đó, đổi thành `true`, rồi **Save**.
- **Chỉ xem lời nhắn chưa xử lý:** bấm nút **Filter** phía trên bảng → chọn cột `handled` → `equals` → `false`.
- **Không tự có thông báo:** Supabase không báo khi có lời nhắn mới. Anh nên tạo thói quen vào xem 1–2 lần mỗi tuần.

---

## Phần D · Xem lượt xem và lượt thích

Bảng **`pf_counters`** là bảng đếm. Mỗi dòng ứng với một thứ được đếm.

### Cách mở

Làm giống Phần C, nhưng ở bước 3 bấm **`pf_counters`**.

### Ý nghĩa

| Cột | Nghĩa |
|---|---|
| `key` | Đang đếm cái gì (xem bảng bên dưới) |
| `views` | Số lượt xem |
| `likes` | Số lượt bấm ♥ (thích) |
| `updated_at` | Lần cuối có người xem hoặc thích |

| `key` | Là gì |
|---|---|
| `site` | **Toàn bộ trang portfolio** (mỗi người chỉ được tính 1 lần mỗi ngày) |
| `agentic-ai` | Dự án Agentic AI trên Power BI |
| `webapp` | Hệ sinh thái web app phòng Kế hoạch |
| `daily-plan` | Kế hoạch doanh thu ngày |
| `exit-cost` | Mô hình chi phí đóng cửa điểm bán |
| `feasibility` | Thẩm định dự án mở mới & di dời |
| `fnb` | Định giá hợp tác F&B |
| `bi-stack` | Từ Excel sang SQL Server + Power BI |
| `sku-rank` | Xếp hạng SKU R80/R20/R0/RNEW |
| `inventory` | Ứng dụng định mức tồn kho |

**Ví dụ đọc số:** dòng `exit-cost` có `views = 12`, `likes = 3`. Nghĩa là trang chi tiết dự án "Chi phí đóng cửa" đã được mở 12 lần và có 3 người bấm thích.

> Bảng `pf_counters` chỉ xuất hiện dòng sau khi có người xem lần đầu. Bảng còn trống là vì trang chưa lên mạng hoặc chưa nối khoá (Phần B).

Số lượt xem toàn trang cũng hiện ở **chân trang portfolio** (góc dưới bên phải, có hình 👁).

---

## Phần E · Cách nhanh: xem bằng một câu lệnh (không bắt buộc)

Nếu muốn xem gọn trong một bảng, vào **SQL Editor** (biểu tượng `>_` ở menu trái) → **New query** → dán một trong hai câu dưới đây → bấm **Run**.

**Lời nhắn chưa xử lý, mới nhất lên đầu, giờ Việt Nam:**

```sql
select created_at at time zone 'Asia/Ho_Chi_Minh' as gio_vn, name, email, company, topic, body
from pf_messages
where handled = false
order by created_at desc;
```

**Dự án được xem nhiều nhất:**

```sql
select key, views, likes
from pf_counters
order by views desc;
```

---

## Câu hỏi thường gặp

**Tôi không thấy bảng `pf_messages` trong Table Editor?**
Kiểm tra ô chọn phía trên danh sách bảng đang là **`public`**. Nếu vẫn không thấy, file `supabase/portfolio.sql` chưa chạy thành công; chạy lại cũng không sao.

**Người khác có đọc được lời nhắn không?**
Không. Từ trang web, người xem chỉ **gửi** được lời nhắn, không đọc, sửa hay xoá được. Chỉ anh (đăng nhập Supabase) mới xem được.

**Có ai spam được không?**
Mỗi email gửi tối đa 5 lời nhắn mỗi giờ, toàn trang tối đa 200 lời nhắn mỗi ngày. Nếu bị spam, anh xoá dòng đó trong Table Editor: tick ô đầu dòng → **Delete**.

**Project Supabase miễn phí có bị tạm dừng không?**
Có. Gói miễn phí sẽ **tạm dừng nếu 7 ngày liền không có ai dùng**. Khi đó vào dashboard bấm **Restore project** là chạy lại. Khi portfolio có người xem đều đặn thì ít gặp chuyện này.
