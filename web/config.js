// Kết nối Supabase cho portfolio (form liên hệ, lượt xem, lượt thích).
// Lấy ở Supabase → Project Settings → API: "Project URL" và khoá "anon public".
// Khoá anon là khoá công khai, để ở trình duyệt là bình thường: dữ liệu được bảo vệ bằng Row Level Security.
// TUYỆT ĐỐI không dán khoá "service_role" vào đây.
// Để trống thì trang vẫn chạy đầy đủ; form liên hệ chuyển sang mở ứng dụng email.
window.PF_CONFIG = {
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',
};
