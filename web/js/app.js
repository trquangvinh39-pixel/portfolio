// Điều khiển toàn trang: ngôn ngữ, giao diện, vẽ nội dung từ data.js, case study, tìm nhanh, form liên hệ, đếm lượt xem.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = PF.chart.esc;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  PF.lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
  PF.t = function (o) { return o == null ? '' : typeof o === 'string' ? o : (o[PF.lang] != null ? o[PF.lang] : o.vi); };
  var t = PF.t;

  var UI = {
    skip: ['Bỏ qua tới nội dung', 'Skip to content'], brandSub: ['FP&A · Dữ liệu · AI', 'FP&A · Data · AI'],
    navAbout: ['Giới thiệu', 'About'], navJourney: ['Hành trình', 'Journey'], navProjects: ['Dự án', 'Projects'], navSkills: ['Năng lực', 'Skills'], navContact: ['Liên hệ', 'Contact'],
    cv: ['Tải CV', 'CV'], cvFull: ['Tải CV (PDF)', 'Download CV (PDF)'],
    openTo: ['Kế hoạch · FP&A · Dữ liệu & AI cho doanh nghiệp bán lẻ', 'Planning · FP&A · Data & AI for retail businesses'],
    ctaProjects: ['Xem 9 dự án', 'See 9 projects'], ctaQuick: ['Xem nhanh 30 giây', '30-second summary'],
    heroCo: ['Chuỗi bán lẻ ~50 cửa hàng', 'Retail chain, ~50 stores'], b1: ['Ngân sách · Dự báo', 'Budget · Forecast'], b3: ['Hỏi bằng tiếng Việt', 'Ask in plain language'],
    aboutH: ['Tài chính, dữ liệu và AI vận hành như một hệ thống', 'Finance, data and AI working as one system'], howH: ['Cách tôi làm việc', 'How I work'],
    journeyH: ['Từ chuyền may đến phòng họp Ban lãnh đạo', 'From the factory floor to the boardroom'], journeySub: ['Bấm vào từng vị trí để xem chi tiết công việc và dự án liên quan.', 'Click a role to see the details and related projects.'],
    projectsH: ['Dự án tiêu biểu, mỗi dự án có demo chạy được', 'Selected projects, each with a working demo'], projectsSub: ['Bấm vào thẻ để xem bối cảnh, cách làm, kết quả và thử công cụ tương tác.', 'Open a card for the context, approach, results and an interactive tool.'],
    searchPh: ['Tìm dự án, công cụ…', 'Search projects, tools…'], noProj: ['Không có dự án phù hợp.', 'No matching projects.'],
    skillsH: ['Năng lực cốt lõi', 'Core capabilities'], skillsSub: ['Bấm vào một kỹ năng để xem dự án đã dùng kỹ năng đó.', 'Click a skill to see the projects that used it.'],
    softH: ['Kỹ năng mềm', 'Soft skills'], langH: ['Ngoại ngữ', 'Languages'], interestH: ['Lĩnh vực quan tâm', 'Interests'],
    certNav: ['Học vấn & chứng chỉ', 'Education & certifications'], certH: ['Học liên tục, áp dụng ngay vào việc', 'Always learning, applied at work'],
    contactH: ['Cùng trao đổi về bán lẻ, FP&A hay AI trong doanh nghiệp', 'Let’s talk retail, FP&A or AI in business'], contactSub: ['Tôi luôn sẵn lòng kết nối với những người làm bán lẻ, FP&A, BI hoặc AI ứng dụng.', 'Always happy to connect with people in retail, FP&A, BI or practical AI.'],
    copy: ['Chép', 'Copy'], phone: ['Điện thoại', 'Phone'], call: ['Gọi', 'Call'], open: ['Mở', 'Open'], vcardS: ['Danh bạ', 'Contacts'], vcard: ['Lưu danh thiếp (.vcf)', 'Save contact (.vcf)'],
    formH: ['Gửi lời nhắn', 'Send a message'], fName: ['Họ tên', 'Name'], fCompany: ['Công ty / tổ chức', 'Company / organisation'], fTopic: ['Chủ đề', 'Topic'], fMsg: ['Nội dung', 'Message'], send: ['Gửi lời nhắn', 'Send message'],
    footNote: ['Số liệu trong demo là minh hoạ, không bao gồm dữ liệu nội bộ công ty.', 'Demo figures are illustrative and exclude internal company data.'],
    back: ['Quay lại', 'Back'], cmdPh: ['Gõ để tìm mục, dự án, kỹ năng…', 'Type to find sections, projects, skills…'],
  };
  var MSG = {
    copied: ['Đã chép email', 'Email copied'], linkCopied: ['Đã chép link dự án', 'Project link copied'], liked: ['Cảm ơn bạn đã thích dự án này!', 'Thanks for liking this project!'],
    sending: ['Đang gửi…', 'Sending…'], sent: ['Đã gửi. Tôi sẽ phản hồi sớm qua email của bạn.', 'Sent. I will reply to your email soon.'],
    sendErr: ['Chưa gửi được. Mở ứng dụng email để gửi trực tiếp…', 'Could not send. Opening your email app instead…'],
    mailFallback: ['Mở ứng dụng email để gửi…', 'Opening your email app…'], invalid: ['Vui lòng điền họ tên, email hợp lệ và nội dung.', 'Please fill in your name, a valid email and a message.'],
    views: ['lượt xem trang', 'page views'], topics: [['Cơ hội việc làm', 'Job opportunity'], ['Hợp tác / tư vấn', 'Collaboration / advisory'], ['Trao đổi chuyên môn', 'Professional exchange'], ['Khác', 'Other']],
    overview: ['Tổng quan', 'Overview'], approach: ['Cách làm', 'Approach'], results: ['Kết quả', 'Results'], demo: ['Demo tương tác', 'Interactive demo'],
    context: ['Bối cảnh', 'Context'], problem: ['Bài toán', 'Problem'], role: ['Vai trò của tôi', 'My role'], tools: ['Công cụ', 'Tools'],
    related: ['Dự án liên quan', 'Related projects'], openCase: ['Xem case study', 'View case study'], hasDemo: ['Có demo', 'Live demo'],
    filterBy: ['Đang lọc theo kỹ năng', 'Filtering by skill'], clear: ['Bỏ lọc', 'Clear'], projOf: ['Dự án', 'Project'],
    secs: ['Mục', 'Sections'], projs: ['Dự án', 'Projects'], acts: ['Thao tác', 'Actions'], skillG: ['Kỹ năng', 'Skills'],
    actTheme: ['Đổi giao diện sáng/tối', 'Toggle light/dark'], actLang: ['Switch to English', 'Chuyển sang tiếng Việt'], actCv: ['Tải CV (PDF)', 'Download CV (PDF)'], actMail: ['Chép email', 'Copy email'], actQuick: ['Xem nhanh 30 giây', '30-second summary'],
    qWhy: ['Vì sao nên trò chuyện với tôi', 'Why talk to me'], qWins: ['Kết quả nổi bật', 'Highlights'],
    qWhyList: [['Gần 9 năm hoạch định, 6 năm trong bán lẻ chuỗi ~50 cửa hàng', 'Kết hợp hiếm: Kế toán trưởng + FP&A + SQL/Power BI + Agentic AI', 'Tự xây sản phẩm dữ liệu và web app, không chỉ dùng', 'Mọi phân tích kết thúc bằng đề xuất và con số làm cơ sở'], ['Nearly 9 years in planning, 6 in a ~50-store retail chain', 'A rare mix: Chief Accountant + FP&A + SQL/Power BI + Agentic AI', 'Builds data products and web apps, not just uses them', 'Every analysis ends with a recommendation and the numbers behind it']],
    qWinList: [['~70% yêu cầu dữ liệu tự phục vụ nhờ AI, tiết kiệm ~40 giờ/tháng', 'Xây lại chỉ tiêu toàn bộ ngành hàng trong 5 ngày sau tái cấu trúc', 'Hợp tác F&B cao hơn giá thuê hiện tại từ 50%', 'Hơn 20 dự án mở mới, di dời được thẩm định', 'Excel thủ công → SQL Server + Power BI với 20+ báo cáo', 'Hơn 10 web app & công cụ AI nội bộ, 15+ module'], ['~70% of data requests self served via AI, ~40 hours saved a month', 'Rebuilt all category targets in 5 days after restructuring', 'F&B partnerships priced 50%+ above current rent', '20+ new store and relocation projects appraised', 'Manual Excel → SQL Server + Power BI with 20+ reports', '10+ AI-powered internal web apps & tools, 15+ modules']],
  };
  function m(k) { var v = MSG[k]; return Array.isArray(v[0]) ? v[PF.lang === 'en' ? 1 : 0] : v[PF.lang === 'en' ? 1 : 0]; }

  var ICONS = {
    plan: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>', perf: '<path d="M12 20V10M18 20V4M6 20v-4"/>', net: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-6 6M12 11l6 6"/>',
    ai: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>', app: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>',
    exit: '<path d="M10 17l5-5-5-5M15 12H3M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>', store: '<path d="M3 9l1.5-5h15L21 9M4 9v11h16V9M9 20v-6h6v6M3 9h18"/>',
    cup: '<path d="M17 8h1a3 3 0 0 1 0 6h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M7 2v3M11 2v3"/>', db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    rank: '<path d="M4 20h4V10H4zM10 20h4V4h-4zM16 20h4v-7h-4z"/>', box: '<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/>', grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>', chev: '<path d="M6 9l6 6 6-6"/>',
  };
  function icon(k) { return '<svg viewBox="0 0 24 24">' + (ICONS[k] || ICONS.plan) + '</svg>'; }

  /* ---------- Song ngữ ---------- */
  function applyStatic() {
    document.documentElement.lang = PF.lang;
    $$('[data-i18n]').forEach(function (n) { var v = UI[n.dataset.i18n]; if (v) n.textContent = v[PF.lang === 'en' ? 1 : 0]; });
    $$('[data-i18n-ph]').forEach(function (n) { var v = UI[n.dataset.i18nPh]; if (v) n.placeholder = v[PF.lang === 'en' ? 1 : 0]; });
    $('.lang-label').textContent = PF.lang === 'en' ? 'VI' : 'EN';
    $$('.cv-link').forEach(function (a) { a.href = PF.profile.cv[PF.lang]; });
    $('#heroTitle').textContent = t(PF.profile.title);
    $('#heroTag').textContent = t(PF.profile.tagline);
    $('#heroLoc').textContent = t(PF.profile.location);
    $('.hero-name').textContent = PF.lang === 'en' ? PF.profile.nameEn : PF.profile.name;
    $('#fTopic').innerHTML = MSG.topics.map(function (x) { return '<option>' + esc(x[PF.lang === 'en' ? 1 : 0]) + '</option>'; }).join('');
  }
  function renderAll() {
    applyStatic();
    renderKpis(); renderAbout(); renderJourney(); renderFilters(); renderProjects(); renderSkills(); renderCerts();
    observeReveal();
    if (current) openProject(current, true);
  }
  function setLang(l) {
    PF.lang = l; store('pf-lang', l);
    renderAll();
    rotIdx = 0;
  }

  /* ---------- Giao diện sáng / tối ---------- */
  function toggleTheme() {
    var n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    store('pf-theme', n);
    $('meta[name="theme-color"]').content = n === 'dark' ? '#07141A' : '#F6FAF9';
  }

  /* ---------- Hero: chức danh xoay vòng ---------- */
  var rotIdx = 0;
  function rotator() {
    var el = $('#rotator');
    if (reduced) { el.textContent = PF.profile.roles[PF.lang][0]; return; }
    var word = '', pos = 0, del = false;
    (function tick() {
      var list = PF.profile.roles[PF.lang]; word = list[rotIdx % list.length];
      if (!del) { pos++; if (pos > word.length) { del = true; return setTimeout(tick, 1600); } }
      else { pos--; if (pos === 0) { del = false; rotIdx++; } }
      el.textContent = word.slice(0, pos) || ' ';
      setTimeout(tick, del ? 35 : 70);
    })();
  }

  /* ---------- Hero: mạng lưới 50 điểm = 50 cửa hàng ---------- */
  function heroNet() {
    var cv = $('#heroNet'), ctx = cv.getContext('2d'), pts = [], mouse = { x: -999, y: -999 }, W, H, dpr, raf;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    for (var i = 0; i < 50; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1.5 + Math.random() * 2 });
    function color(a) { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(47,217,200,' + a + ')' : 'rgba(11,140,137,' + a + ')'; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!reduced) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 150) { ctx.strokeStyle = color((1 - d / 150) * .28); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 180) { ctx.strokeStyle = color((1 - dm / 180) * .55); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        ctx.fillStyle = color(dm < 180 ? .95 : .6); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', function () { size(); if (reduced) draw(); });
    $('.hero').addEventListener('pointermove', function (e) { var b = cv.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
    $('.hero').addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
    // Dừng vẽ khi hero khuất để đỡ tốn pin
    if ('IntersectionObserver' in window && !reduced) new IntersectionObserver(function (es) {
      es.forEach(function (e) { cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(draw); });
    }).observe(cv);
  }

  /* ---------- KPI ---------- */
  function renderKpis() {
    $('#kpiGrid').innerHTML = PF.kpis.map(function (k) {
      return '<a class="kpi reveal" href="' + k.link + '"><span class="kpi-go">' + icon('arrow') + '</span><div class="kpi-v"><span data-count="' + k.value + '">' + (reduced ? k.value : 0) + '</span><em>' + k.suffix + '</em></div><div class="kpi-l">' + esc(t(k.label)) + '</div><div class="kpi-n">' + esc(t(k.note)) + '</div></a>';
    }).join('');
  }
  function countUp(el) {
    var end = +el.dataset.count, t0 = null;
    if (reduced) { el.textContent = end; return; }
    (function step(ts) { t0 = t0 || ts; var p = Math.min(1, (ts - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(performance.now());
  }

  /* ---------- Giới thiệu ---------- */
  function renderAbout() {
    $('#aboutIntro').textContent = t(PF.about.intro);
    $('#aboutStory').textContent = t(PF.about.story);
    $('#aboutQuote').textContent = '“' + t(PF.about.quote) + '”';
    $('#howList').innerHTML = PF.about.how.map(function (h) { return '<li><div><b>' + esc(t(h.t)) + '</b><span>' + esc(t(h.d)) + '</span></div></li>'; }).join('');
    $('#focusGrid').innerHTML = PF.about.focus.map(function (f) { return '<div class="focus reveal"><div class="ic">' + icon(f.icon) + '</div><h3>' + esc(t(f.t)) + '</h3><p>' + esc(t(f.d)) + '</p></div>'; }).join('');
  }

  /* ---------- Hành trình ---------- */
  var PHASE_C = { mfg: '#F5B544', retail: '#4DB3FF', lead: '#14C3B5' };
  var phaseOn = null;
  function renderJourney() {
    $('#phaseBar').innerHTML = PF.phases.map(function (p) {
      return '<button class="phase' + (phaseOn === p.id ? ' on' : '') + '" type="button" data-ph="' + p.id + '" style="--w:' + Math.max(2.6, p.to - p.from) + ';--c:' + PHASE_C[p.id] + '"><small>' + p.from + ' – ' + (p.id === 'lead' ? (PF.lang === 'en' ? 'now' : 'nay') : p.to) + '</small><b>' + esc(t(p.label)) + '</b><span>' + esc(t(p.d)) + '</span></button>';
    }).join('');
    $('#timeline').innerHTML = PF.jobs.map(function (j, i) {
      var links = j.projects.map(function (id) { var p = byId(id); return p ? '<a class="chip" href="#du-an/' + id + '">' + esc(t(p.title)) + '</a>' : ''; }).join('');
      return '<li class="tl-item reveal' + (j.current ? ' current' : '') + (i === 0 ? ' open' : '') + (phaseOn && phaseOn !== j.phase ? ' dim' : '') + '" style="--c:' + PHASE_C[j.phase] + '" data-ph="' + j.phase + '">' +
        '<div class="tl-card"><button class="tl-head" type="button" aria-expanded="' + (i === 0) + '"><div><div class="tl-role">' + esc(t(j.role)) + (j.current ? '<span class="tl-now">' + (PF.lang === 'en' ? 'Current' : 'Hiện tại') + '</span>' : '') + '</div>' +
        '<div class="tl-org">' + esc(t(j.org)) + ' <small>· ' + esc(t(j.orgNote)) + '</small></div></div><div><div class="tl-period">' + esc(t(j.period)) + '</div><div class="tl-chev">' + icon('chev') + '</div></div></button>' +
        '<div class="tl-body"><div><div class="tl-inner"><p>' + esc(t(j.summary)) + '</p><ul>' + j.points[PF.lang].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' + (links ? '<div class="tl-links">' + links + '</div>' : '') + '</div></div></div></div></li>';
    }).join('');
  }

  /* ---------- Dự án ---------- */
  var catOn = 'all', skillFilter = null, query = '';
  function byId(id) { for (var i = 0; i < PF.projects.length; i++) if (PF.projects[i].id === id) return PF.projects[i]; return null; }
  function renderFilters() {
    $('#catFilter').innerHTML = PF.categories.map(function (c) {
      var n = c.id === 'all' ? PF.projects.length : PF.projects.filter(function (p) { return p.cat.indexOf(c.id) >= 0; }).length;
      return '<button class="chip" role="tab" type="button" data-cat="' + c.id + '" aria-selected="' + (catOn === c.id) + '">' + esc(t(c.label)) + ' <span class="n">' + n + '</span></button>';
    }).join('');
  }
  // Hoạ tiết bìa thẻ dự án, khác nhau theo mã dự án
  function coverArt(p) {
    var r = 0, s = '';
    for (var i = 0; i < p.id.length; i++) r = (r * 31 + p.id.charCodeAt(i)) >>> 0;
    function rnd() { r = (r * 1664525 + 1013904223) >>> 0; return r / 4294967296; }
    var pts = [];
    for (var k = 0; k <= 12; k++) pts.push([k * 34, 110 - (rnd() * 40 + k * 4)]);
    s += '<polyline points="' + pts.map(function (q) { return q.join(','); }).join(' ') + '" stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none"/>';
    for (var b = 0; b < 9; b++) { var h = 20 + rnd() * 60; s += '<rect x="' + (240 + b * 18) + '" y="' + (150 - h) + '" width="10" height="' + h + '" rx="2" fill="rgba(255,255,255,' + (.12 + rnd() * .2) + ')"/>'; }
    for (var c = 0; c < 6; c++) s += '<circle cx="' + rnd() * 400 + '" cy="' + rnd() * 120 + '" r="' + (1.5 + rnd() * 2.5) + '" fill="rgba(255,255,255,.5)"/>';
    return '<svg class="art" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice">' + s + '</svg>';
  }
  function matches(p) {
    if (catOn !== 'all' && p.cat.indexOf(catOn) < 0) return false;
    if (skillFilter && skillFilter.p.indexOf(p.id) < 0) return false;
    if (query) {
      var hay = [t(p.title), t(p.tagline), p.tools.join(' '), t(p.context)].join(' ').toLowerCase();
      if (norm(hay).indexOf(norm(query)) < 0) return false;
    }
    return true;
  }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function renderProjects() {
    var list = PF.projects.filter(matches);
    $('#projGrid').innerHTML = list.map(function (p) {
      var st = stats[p.id] || {};
      return '<button class="proj reveal' + (p.featured ? ' featured' : '') + '" type="button" data-p="' + p.id + '" style="--h:' + p.hue + '">' +
        '<div class="proj-cover">' + coverArt(p) + '<span class="proj-demo"><i></i>' + esc(m('hasDemo')) + '</span><span class="proj-yr">' + esc(p.year) + '</span><span class="proj-ic">' + icon(p.icon) + '</span></div>' +
        '<div class="proj-body"><h3>' + esc(t(p.title)) + '</h3><p>' + esc(t(p.tagline)) + '</p>' +
        '<div class="proj-metrics">' + p.metrics.slice(0, 2).map(function (x) { return '<div><b>' + esc(x.v) + '</b><small>' + esc(t(x.l)) + '</small></div>'; }).join('') + '</div>' +
        '<div class="proj-foot"><div class="tags">' + p.tools.slice(0, 3).map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('') + '</div>' +
        '<span class="proj-more">' + (st.views ? '<span class="proj-stat">👁 ' + st.views + (st.likes ? ' · ♥ ' + st.likes : '') + '</span>' : '') + icon('arrow') + '</span></div></div></button>';
    }).join('');
    $('#projEmpty').hidden = list.length > 0;
    var fn = $('#filterNote');
    fn.hidden = !skillFilter;
    if (skillFilter) fn.innerHTML = esc(m('filterBy')) + ': <b>' + esc(t(skillFilter.n)) + '</b> · <button type="button" id="clearSkill">' + esc(m('clear')) + ' ✕</button>';
    observeReveal();
  }

  /* ---------- Case study ---------- */
  var current = null, curTab = 'overview', lastFocus = null;
  function openProject(id, keepTab) {
    var p = byId(id);
    if (!p) return;
    if (!keepTab || current !== id) curTab = 'overview';
    if (!current) lastFocus = document.activeElement;
    current = id;
    var list = PF.projects, idx = list.indexOf(p);
    $('#dCount').textContent = m('projOf') + ' ' + (idx + 1) + '/' + list.length;
    var tabs = [['overview', m('overview')], ['approach', m('approach')], ['results', m('results')], ['demo', m('demo')]];
    $('#dBody').innerHTML = '<header class="d-hero" style="--h:' + p.hue + '"><div class="d-tags">' + p.cat.map(function (c) { return '<span class="tag">' + esc(t(PF.categories.filter(function (x) { return x.id === c; })[0].label)) + '</span>'; }).join('') + '<span class="tag">' + esc(p.year) + '</span></div>' +
      '<h2 id="dTitle">' + esc(t(p.title)) + '</h2><p>' + esc(t(p.tagline)) + '</p><div class="d-metrics">' + p.metrics.map(function (x) { return '<div class="d-metric"><b>' + esc(x.v) + '</b><small>' + esc(t(x.l)) + '</small></div>'; }).join('') + '</div></header>' +
      '<nav class="tabs" role="tablist">' + tabs.map(function (x) { return '<button class="tab" role="tab" type="button" data-tab="' + x[0] + '" aria-selected="' + (x[0] === curTab) + '">' + (x[0] === 'demo' ? '<span class="live"></span>' : '') + esc(x[1]) + '</button>'; }).join('') + '</nav>' +
      '<div class="tab-panel" id="tabPanel"></div>';
    renderTab(p);
    var st = stats[id] || {};
    $('#dLikeN').textContent = st.likes ? st.likes : '';
    $('#dLike').classList.toggle('on', !!liked[id]);
    var dr = $('#drawer');
    if (dr.hidden) {
      dr.hidden = false; document.body.style.overflow = 'hidden';
      $('#drawerPanel').focus();
    }
    $('#dBody').scrollTop = 0;
    if (location.hash !== '#du-an/' + id) history.replaceState(null, '', '#du-an/' + id);
    if (!seen[id]) { seen[id] = 1; bump(id, 'view'); }
  }
  function renderTab(p) {
    var el = $('#tabPanel');
    $$('.tab').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.tab === curTab); });
    if (curTab === 'overview') {
      el.innerHTML = '<div class="ov-grid"><div class="ov"><h4>' + esc(m('context')) + '</h4><p>' + esc(t(p.context)) + '</p></div><div class="ov"><h4>' + esc(m('problem')) + '</h4><p>' + esc(t(p.problem)) + '</p></div>' +
        '<div class="ov"><h4>' + esc(m('role')) + '</h4><p>' + esc(t(p.role)) + '</p></div><div class="ov"><h4>' + esc(m('tools')) + '</h4><div class="tags">' + p.tools.map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('') + '</div></div>' +
        '<div class="ov full" style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap"><p>' + (PF.lang === 'en' ? 'Try the working tool for this project.' : 'Thử công cụ chạy được của dự án này.') + '</p><button class="btn btn-primary btn-sm" type="button" data-tab="demo">▶ ' + esc(m('demo')) + '</button></div></div>' + related(p);
    } else if (curTab === 'approach') {
      el.innerHTML = '<ol class="steps">' + p.approach[PF.lang].map(function (s) { return '<li><p>' + esc(s) + '</p></li>'; }).join('') + '</ol>' + related(p);
    } else if (curTab === 'results') {
      el.innerHTML = '<ul class="impact">' + p.impact[PF.lang].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' + related(p);
    } else {
      el.innerHTML = '';
      var box = document.createElement('div');
      box.className = 'demo';
      el.appendChild(box);
      PF.demos[p.demo](box);
    }
  }
  function related(p) {
    var rel = PF.projects.filter(function (q) { return q.id !== p.id && q.cat.some(function (c) { return p.cat.indexOf(c) >= 0; }); }).slice(0, 3);
    return '<div class="d-related"><h4>' + esc(m('related')) + '</h4><div class="rel-grid">' + rel.map(function (q) { return '<button class="rel" type="button" data-p="' + q.id + '"><b>' + esc(t(q.title)) + '</b><small>' + esc(q.tools.slice(0, 3).join(' · ')) + '</small></button>'; }).join('') + '</div></div>';
  }
  function closeProject() {
    if ($('#drawer').hidden) return;
    $('#drawer').hidden = true; document.body.style.overflow = '';
    current = null;
    history.replaceState(null, '', '#du-an');
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    if (!current) return;
    var i = PF.projects.indexOf(byId(current)), n = PF.projects.length;
    openProject(PF.projects[(i + dir + n) % n].id);
  }

  /* ---------- Năng lực ---------- */
  function renderSkills() {
    var R = PF.skills.radar, cx = 210, cy = 185, rad = 130, n = R.length, s = '';
    function pt(i, v) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * rad * v, cy + Math.sin(a) * rad * v]; }
    [.25, .5, .75, 1].forEach(function (g) { s += '<polygon class="grid" points="' + R.map(function (_, i) { return pt(i, g).join(','); }).join(' ') + '"/>'; });
    R.forEach(function (_, i) { var p = pt(i, 1); s += '<line class="grid" x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '"/>'; });
    s += '<polygon class="area" points="' + R.map(function (r, i) { return pt(i, r.v / 100).join(','); }).join(' ') + '"/>';
    R.forEach(function (r, i) {
      var p = pt(i, r.v / 100), l = pt(i, 1.2), anchor = Math.abs(l[0] - cx) < 10 ? 'middle' : l[0] > cx ? 'start' : 'end';
      s += '<circle class="pt" r="6" cx="' + p[0] + '" cy="' + p[1] + '"><title>' + esc(t(r.l)) + ': ' + r.v + '</title></circle>';
      s += '<text x="' + l[0] + '" y="' + (l[1] + 4) + '" text-anchor="' + anchor + '">' + esc(t(r.l)) + '</text>';
    });
    $('#radar').innerHTML = s;
    $('#skillGroups').innerHTML = PF.skills.groups.map(function (g, gi) {
      return '<div class="sg"><h3>' + esc(t(g.t)) + '</h3><div class="chips-row">' + g.items.map(function (it, ii) {
        return '<button class="chip" type="button" data-sk="' + gi + '-' + ii + '"' + (it.p.length ? '' : ' disabled') + '>' + esc(t(it.n)) + (it.p.length ? ' <span class="n">' + it.p.length + '</span>' : '') + '</button>';
      }).join('') + '</div></div>';
    }).join('');
    $('#softList').innerHTML = PF.skills.soft[PF.lang].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    $('#langList').innerHTML = PF.skills.languages.map(function (x) { return '<div class="lang-row"><div><span>' + esc(t(x.n)) + '</span><small>' + esc(t(x.l)) + '</small></div><div class="bar"><i style="--w:' + x.v + '%"></i></div></div>'; }).join('');
    $('#langList').parentNode.classList.add('reveal');
    $('#interestList').innerHTML = PF.interests[PF.lang].map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('');
  }

  /* ---------- Chứng chỉ ---------- */
  var certOn = 'all';
  function renderCerts() {
    $('#eduCard').innerHTML = '<div class="edu-ic">' + icon('grad') + '</div><div><h3>' + esc(t(PF.education.degree)) + '</h3><p>' + esc(t(PF.education.school)) + '</p></div><span class="edu-yr">' + PF.education.period + '</span>';
    var groups = [['all', PF.lang === 'en' ? 'All' : 'Tất cả'], ['fin', PF.lang === 'en' ? 'Finance' : 'Tài chính'], ['data', PF.lang === 'en' ? 'Data & BI' : 'Dữ liệu & BI'], ['ai', 'AI']];
    $('#certFilter').innerHTML = groups.map(function (g) { return '<button class="chip" type="button" data-cg="' + g[0] + '" aria-selected="' + (certOn === g[0]) + '">' + esc(g[1]) + '</button>'; }).join('');
    $('#certGrid').innerHTML = PF.certs.filter(function (c) { return certOn === 'all' || c.g === certOn; }).map(function (c) {
      return '<div class="cert reveal"><span class="cert-yr">' + c.y + '</span><div><b>' + esc(t(c.n)) + '</b><small>' + esc(t(c.by)) + '</small></div></div>';
    }).join('');
    observeReveal();
  }

  /* ---------- Hiện dần khi cuộn ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' }) : null;
  function observeReveal() {
    $$('.reveal:not(.in)').forEach(function (n) { if (io && !reduced) io.observe(n); else { n.classList.add('in'); $$('[data-count]', n).forEach(countUp); } });
  }

  /* ---------- Thanh điều hướng ---------- */
  function navScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    $('#nav').classList.toggle('scrolled', y > 20);
    $('#progress').style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    var cur = null;
    ['gioi-thieu', 'hanh-trinh', 'du-an', 'nang-luc', 'chung-chi', 'lien-he'].forEach(function (id) { var s = document.getElementById(id); if (s && s.getBoundingClientRect().top < 140) cur = id; });
    if (cur === 'chung-chi') cur = 'nang-luc';
    $$('#navLinks a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  }

  /* ---------- Xem nhanh 30 giây ---------- */
  function openQuick() {
    var q = $('#quick'), L = PF.lang === 'en';
    $('#quickPanel').innerHTML = '<div class="q-head"><img src="assets/avatar.jpg" alt=""><div><h2 id="qTitle">' + esc(L ? PF.profile.nameEn : PF.profile.name) + '</h2><p>' + esc(t(PF.profile.title)) + ' · FP&A · Data · AI</p></div><button class="icon-btn q-close" type="button" data-close aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<div class="q-body"><div class="q-timer"><i></i></div><p style="margin:0;font-size:17px">' + esc(t(PF.profile.tagline)) + '</p>' +
      '<div class="q-kpis">' + PF.kpis.map(function (k) { return '<div><b>' + k.value + k.suffix + '</b><small>' + esc(t(k.label)) + '</small></div>'; }).join('') + '</div>' +
      '<div class="q-cols"><div><h3>' + esc(m('qWhy')) + '</h3><ul>' + m('qWhyList').map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div><div><h3>' + esc(m('qWins')) + '</h3><ul>' + m('qWinList').map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></div>' +
      '<div class="q-actions"><a class="btn btn-primary" href="' + PF.profile.cv[PF.lang] + '" download>' + esc(UI.cvFull[L ? 1 : 0]) + '</a><a class="btn btn-ghost" href="#du-an" data-close>' + esc(UI.ctaProjects[L ? 1 : 0]) + '</a><a class="btn btn-ghost" href="#lien-he" data-close>' + esc(UI.navContact[L ? 1 : 0]) + '</a></div></div>';
    lastFocus = document.activeElement;
    q.hidden = false; document.body.style.overflow = 'hidden'; $('#quickPanel').focus();
  }
  function closeModal(id) { var q = $(id); if (q.hidden) return; q.hidden = true; if ($('#drawer').hidden) document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }

  /* ---------- Tìm nhanh (Ctrl+K) ---------- */
  var cmdItems = [], cmdSel = 0;
  function buildCmd() {
    var L = PF.lang === 'en' ? 1 : 0, items = [];
    [['#tong-quan', ['Tổng quan', 'Home']], ['#thanh-tuu', ['Thành tựu', 'Highlights']], ['#gioi-thieu', UI.navAbout], ['#hanh-trinh', UI.navJourney], ['#du-an', UI.navProjects], ['#nang-luc', UI.navSkills], ['#chung-chi', UI.certNav], ['#lien-he', UI.navContact]]
      .forEach(function (s) { items.push({ g: m('secs'), l: s[1][L], k: '↵', run: function () { location.hash = s[0]; } }); });
    PF.projects.forEach(function (p) { items.push({ g: m('projs'), l: t(p.title), k: p.tools.slice(0, 2).join(' · '), run: function () { openProject(p.id); } }); });
    PF.skills.groups.forEach(function (g) { g.items.forEach(function (it) { if (it.p.length) items.push({ g: m('skillG'), l: t(it.n), k: it.p.length + ' ' + (L ? 'projects' : 'dự án'), run: function () { setSkill(it); } }); }); });
    items.push({ g: m('acts'), l: m('actQuick'), k: '', run: openQuick });
    items.push({ g: m('acts'), l: m('actTheme'), k: '', run: toggleTheme });
    items.push({ g: m('acts'), l: m('actLang'), k: '', run: function () { setLang(PF.lang === 'en' ? 'vi' : 'en'); } });
    items.push({ g: m('acts'), l: m('actCv'), k: 'PDF', run: function () { var a = document.createElement('a'); a.href = PF.profile.cv[PF.lang]; a.download = ''; a.click(); } });
    items.push({ g: m('acts'), l: m('actMail'), k: PF.profile.email, run: copyEmail });
    return items;
  }
  function renderCmd() {
    var q = norm($('#cmdInput').value.trim());
    cmdItems = buildCmd().filter(function (x) { return !q || norm(x.l + ' ' + x.k + ' ' + x.g).indexOf(q) >= 0; });
    cmdSel = Math.min(cmdSel, Math.max(0, cmdItems.length - 1));
    var g = null, html = '';
    cmdItems.forEach(function (x, i) {
      if (x.g !== g) { g = x.g; html += '<li class="grp" role="presentation">' + esc(g) + '</li>'; }
      html += '<li role="option" data-i="' + i + '"' + (i === cmdSel ? ' class="on" aria-selected="true"' : '') + '>' + esc(x.l) + '<small>' + esc(x.k) + '</small></li>';
    });
    $('#cmdList').innerHTML = html || '<li class="grp">' + esc(UI.noProj[PF.lang === 'en' ? 1 : 0]) + '</li>';
    var on = $('#cmdList .on'); if (on) on.scrollIntoView({ block: 'nearest' });
  }
  function openCmd() { lastFocus = document.activeElement; $('#cmd').hidden = false; $('#cmdInput').value = ''; cmdSel = 0; renderCmd(); $('#cmdInput').focus(); }
  function runCmd(i) { var x = cmdItems[i]; if (!x) return; closeModal('#cmd'); x.run(); }

  /* ---------- Lọc dự án theo kỹ năng ---------- */
  function setSkill(it) {
    skillFilter = it; catOn = 'all'; renderFilters(); renderProjects();
    document.getElementById('du-an').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }

  /* ---------- Liên hệ ---------- */
  function toast(msg) { var el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('show'); }, 2600); }
  function copyEmail() {
    var done = function () { toast(m('copied')); };
    if (navigator.clipboard) navigator.clipboard.writeText(PF.profile.email).then(done, function () { location.href = 'mailto:' + PF.profile.email; });
    else location.href = 'mailto:' + PF.profile.email;
  }
  function vcard() {
    var p = PF.profile;
    var v = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Tran;Quang Vinh;;;', 'FN:' + p.name, 'TITLE:' + t(p.title), 'EMAIL;TYPE=INTERNET:' + p.email, 'TEL;TYPE=CELL:' + p.phoneRaw, 'URL:' + p.linkedin, 'URL:' + location.origin + location.pathname, 'ADR;TYPE=WORK:;;;Ho Chi Minh City;;;Vietnam', 'END:VCARD'].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' }));
    a.download = 'Tran-Quang-Vinh.vcf'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function mailto(d) {
    var subj = '[Portfolio] ' + d.topic + ' · ' + d.name;
    var body = d.body + '\n\n— ' + d.name + (d.company ? ', ' + d.company : '') + '\n' + d.email;
    location.href = 'mailto:' + PF.profile.email + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  }
  function submitForm(e) {
    e.preventDefault();
    var f = e.target, msg = $('#formMsg');
    var d = { name: f.name.value.trim(), email: f.email.value.trim(), company: f.company.value.trim(), topic: f.topic.value, body: f.body.value.trim() };
    if (f.website.value) return; // bẫy bot
    var bad = false;
    [['name', d.name.length >= 2], ['email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)], ['body', d.body.length >= 5]].forEach(function (x) { f[x[0]].classList.toggle('invalid', !x[1]); if (!x[1]) bad = true; });
    if (bad) { msg.className = 'form-msg err'; msg.textContent = m('invalid'); return; }
    var sb = db();
    if (!sb) { msg.className = 'form-msg'; msg.textContent = m('mailFallback'); mailto(d); return; }
    $('#sendBtn').disabled = true; msg.className = 'form-msg'; msg.textContent = m('sending');
    sb.from('pf_messages').insert({ name: d.name, email: d.email, company: d.company || null, topic: d.topic, body: d.body, lang: PF.lang }).then(function (r) {
      $('#sendBtn').disabled = false;
      if (r.error) { msg.className = 'form-msg err'; msg.textContent = m('sendErr'); setTimeout(function () { mailto(d); }, 900); return; }
      f.reset(); msg.className = 'form-msg ok'; msg.textContent = m('sent');
    });
  }

  /* ---------- Supabase: lượt xem, lượt thích, lời nhắn ---------- */
  var stats = {}, seen = {}, liked = {}, client = null;
  try { liked = JSON.parse(store('pf-liked') || '{}') || {}; } catch (e) { liked = {}; }
  function db() {
    if (client) return client;
    var c = window.PF_CONFIG || {};
    if (!c.SUPABASE_URL || !c.SUPABASE_ANON_KEY || !window.supabase) return null;
    client = window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY, { auth: { persistSession: false } });
    return client;
  }
  function bump(key, kind, onOk) {
    var sb = db(); if (!sb) return;
    sb.rpc('pf_bump', { p_key: key, p_kind: kind }).then(function (r) {
      if (r.error || !r.data) return;
      var row = Array.isArray(r.data) ? r.data[0] : r.data;
      if (!row) return;
      if (onOk) onOk();
      stats[key] = { views: row.views, likes: row.likes };
      if (key === 'site') showFoot();
      if (key === current) $('#dLikeN').textContent = row.likes || '';
    });
  }
  function loadStats() {
    var sb = db(); if (!sb) return;
    sb.rpc('pf_stats').then(function (r) {
      if (r.error || !r.data) return;
      r.data.forEach(function (x) { stats[x.key] = { views: x.views, likes: x.likes }; });
      renderProjects(); showFoot();
    });
    var k = 'pf-visit-' + new Date().toISOString().slice(0, 10);
    if (!store(k)) bump('site', 'view', function () { store(k, '1'); });
  }
  function showFoot() { var s = stats.site; $('#footStats').textContent = s && s.views ? '👁 ' + Number(s.views).toLocaleString(PF.lang === 'en' ? 'en-US' : 'vi-VN') + ' ' + m('views') : ''; }

  /* ---------- Định tuyến theo địa chỉ (#du-an/<mã>) ---------- */
  function route() {
    var h = decodeURIComponent(location.hash);
    if (h === '#en') { history.replaceState(null, '', location.pathname); return; }
    var mm = h.match(/^#du-an\/([\w-]+)/);
    if (mm && byId(mm[1])) openProject(mm[1]);
    else if (current) closeProject();
  }

  /* ---------- Sự kiện ---------- */
  function events() {
    $('#langBtn').addEventListener('click', function () { setLang(PF.lang === 'en' ? 'vi' : 'en'); });
    $('#themeBtn').addEventListener('click', toggleTheme);
    $('#cmdBtn').addEventListener('click', openCmd);
    $('#quickBtn').addEventListener('click', openQuick);
    $('#menuBtn').addEventListener('click', function () { var o = $('#navLinks').classList.toggle('open'); this.setAttribute('aria-expanded', o); });
    $('#navLinks').addEventListener('click', function () { $('#navLinks').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); });
    window.addEventListener('scroll', navScroll, { passive: true });
    window.addEventListener('hashchange', route);

    $('#phaseBar').addEventListener('click', function (e) {
      var b = e.target.closest('.phase'); if (!b) return;
      phaseOn = phaseOn === b.dataset.ph ? null : b.dataset.ph;
      $$('.phase').forEach(function (x) { x.classList.toggle('on', x.dataset.ph === phaseOn); });
      $$('.tl-item').forEach(function (li) {
        var on = !phaseOn || li.dataset.ph === phaseOn;
        li.classList.toggle('dim', !on);
        if (phaseOn) { li.classList.toggle('open', on); li.querySelector('.tl-head').setAttribute('aria-expanded', on); }
      });
    });
    $('#timeline').addEventListener('click', function (e) {
      var h = e.target.closest('.tl-head'); if (!h) return;
      var li = h.closest('.tl-item'), o = li.classList.toggle('open');
      h.setAttribute('aria-expanded', o);
    });
    $('#catFilter').addEventListener('click', function (e) { var b = e.target.closest('[data-cat]'); if (!b) return; catOn = b.dataset.cat; renderFilters(); renderProjects(); });
    $('#projSearch').addEventListener('input', function () { query = this.value.trim(); renderProjects(); });
    $('#filterNote').addEventListener('click', function (e) { if (e.target.closest('#clearSkill')) { skillFilter = null; renderProjects(); } });
    document.addEventListener('click', function (e) {
      var p = e.target.closest('[data-p]');
      if (p) { openProject(p.dataset.p); return; }
      var tb = e.target.closest('[data-tab]');
      if (tb && current) { curTab = tb.dataset.tab; renderTab(byId(current)); if (tb.classList.contains('btn')) $('.tabs').scrollIntoView({ block: 'start' }); return; }
      if (e.target.closest('#drawer [data-close]')) { closeProject(); return; }
      if (e.target.closest('#quick [data-close]')) { closeModal('#quick'); return; }
      if (e.target.closest('#cmd [data-close]')) { closeModal('#cmd'); return; }
      var sk = e.target.closest('[data-sk]');
      if (sk && !sk.disabled) { var ij = sk.dataset.sk.split('-'); setSkill(PF.skills.groups[+ij[0]].items[+ij[1]]); return; }
      var cg = e.target.closest('[data-cg]');
      if (cg) { certOn = cg.dataset.cg; renderCerts(); }
    });
    $('#dPrev').addEventListener('click', function () { step(-1); });
    $('#dNext').addEventListener('click', function () { step(1); });
    $('#dShare').addEventListener('click', function () {
      var url = location.origin + location.pathname + '#du-an/' + current;
      if (navigator.share && matchMedia('(pointer: coarse)').matches) navigator.share({ title: t(byId(current).title), url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast(m('linkCopied')); });
    });
    $('#dLike').addEventListener('click', function () {
      if (!current || liked[current]) return;
      liked[current] = 1; store('pf-liked', JSON.stringify(liked));
      this.classList.add('on'); toast(m('liked'));
      var st = stats[current] = stats[current] || { views: 0, likes: 0 };
      st.likes = (st.likes || 0) + 1; $('#dLikeN').textContent = st.likes;
      bump(current, 'like');
    });
    $('#copyEmail').addEventListener('click', copyEmail);
    $('#vcardBtn').addEventListener('click', vcard);
    $('#contactForm').addEventListener('submit', submitForm);
    $('#cmdInput').addEventListener('input', function () { cmdSel = 0; renderCmd(); });
    $('#cmdList').addEventListener('click', function (e) { var li = e.target.closest('[data-i]'); if (li) runCmd(+li.dataset.i); });
    $('#cmdList').addEventListener('mousemove', function (e) { var li = e.target.closest('[data-i]'); if (li && +li.dataset.i !== cmdSel) { cmdSel = +li.dataset.i; $$('#cmdList [data-i]').forEach(function (x) { x.classList.toggle('on', +x.dataset.i === cmdSel); }); } });

    document.addEventListener('keydown', function (e) {
      var k = e.key;
      if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === 'k') { e.preventDefault(); $('#cmd').hidden ? openCmd() : closeModal('#cmd'); return; }
      if (!$('#cmd').hidden) {
        if (k === 'ArrowDown') { e.preventDefault(); cmdSel = Math.min(cmdItems.length - 1, cmdSel + 1); renderCmd(); }
        else if (k === 'ArrowUp') { e.preventDefault(); cmdSel = Math.max(0, cmdSel - 1); renderCmd(); }
        else if (k === 'Enter') { e.preventDefault(); runCmd(cmdSel); }
        else if (k === 'Escape') closeModal('#cmd');
        return;
      }
      if (k === 'Escape') { if (!$('#quick').hidden) closeModal('#quick'); else closeProject(); return; }
      var typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName);
      if (!typing && current && !$('#drawer').hidden) {
        if (k === 'ArrowRight') step(1);
        if (k === 'ArrowLeft') step(-1);
      }
      // Giữ phím Tab trong hộp thoại đang mở
      if (k === 'Tab') {
        var open = !$('#drawer').hidden ? $('#drawerPanel') : !$('#quick').hidden ? $('#quickPanel') : null;
        if (!open) return;
        var f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]', open).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- Khởi động ---------- */
  $('#year').textContent = new Date().getFullYear();
  var savedLang = store('pf-lang');
  if (savedLang === 'en' || location.hash === '#en') PF.lang = 'en';
  renderAll();
  events();
  rotator();
  heroNet();
  navScroll();
  route();
  // supabase-js tải kiểu defer, chờ trang tải xong mới đọc thống kê
  window.addEventListener('load', loadStats);
})();
