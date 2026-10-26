// Chọn giao diện sáng/tối và ngôn ngữ trước khi vẽ trang để không nháy màu
(function () {
  var t = null, l = null;
  try { t = localStorage.getItem('pf-theme'); l = localStorage.getItem('pf-lang'); } catch (e) {}
  if (!t) t = window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  if (location.hash === '#en') l = 'en';
  if (l === 'en') document.documentElement.lang = 'en';
})();
