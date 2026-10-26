// Kết nối Supabase cho portfolio (form liên hệ, lượt xem, lượt thích).
// Lấy ở Supabase → Project Settings → API: "Project URL" và khoá "anon public".
// Khoá anon là khoá công khai, để ở trình duyệt là bình thường: dữ liệu được bảo vệ bằng Row Level Security.
// TUYỆT ĐỐI không dán khoá "service_role" vào đây.
// Để trống thì trang vẫn chạy đầy đủ; form liên hệ chuyển sang mở ứng dụng email.
window.PF_CONFIG = {
  SUPABASE_URL: 'https://uiwknnfwuoxxxhvdzxde.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpd2tubmZ3dW94eHhodmR6eGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5Nzc5NzYsImV4cCI6MjEwODU1Mzk3Nn0.KkqasL6T0pjZN5wPB3IevQGqdfjExt3k8oow5nojviA',
};
