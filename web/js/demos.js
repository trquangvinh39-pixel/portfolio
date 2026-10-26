// Demo tương tác cho từng dự án. Mọi số liệu ở đây là MINH HOẠ, không phải dữ liệu thật của công ty.
// Mỗi demo là một hàm nhận phần tử chứa và tự vẽ giao diện; gọi lại khi đổi ngôn ngữ.
window.PF = window.PF || {};

(function () {
  var C = PF.chart, esc = C.esc;
  function t(o) { return PF.t(o); }
  function L(vi, en) { return PF.lang === 'en' ? en : vi; }
  function num(v, d) {
    return Number(v).toLocaleString(PF.lang === 'en' ? 'en-US' : 'vi-VN', { maximumFractionDigits: d == null ? 0 : d, minimumFractionDigits: d || 0 });
  }
  function pct(v, d) { return num(v * 100, d == null ? 0 : d) + '%'; }
  function mil(v) { return num(v) + L(' tr', 'm'); } // triệu đồng / VND million
  function unitM() { return L('triệu đồng', 'VND million'); }

  // Bộ sinh số ngẫu nhiên có hạt giống để demo ra kết quả ổn định
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var x = Math.imul(seed ^ seed >>> 15, 1 | seed);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };
  }
  function normal(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  // Ô nhập dạng thanh trượt. fmt: hàm hiển thị giá trị
  function slider(k, label, min, max, step, val, fmt) {
    return '<label class="field"><span>' + esc(label) + ' <output data-o="' + k + '">' + esc((fmt || num)(val)) + '</output></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  }
  function seg(k, label, opts, val) {
    return '<div class="field"><span>' + esc(label) + '</span><div class="seg" data-seg="' + k + '">' + opts.map(function (o) {
      return '<button type="button" data-v="' + o.v + '"' + (String(o.v) === String(val) ? ' class="on"' : '') + '>' + esc(o.l) + '</button>';
    }).join('') + '</div></div>';
  }
  // Đọc giá trị các ô nhập, cập nhật nhãn, gọi lại hàm vẽ mỗi khi đổi
  function bind(el, fmts, onChange) {
    var st = {};
    function read() {
      el.querySelectorAll('[data-k]').forEach(function (i) {
        st[i.dataset.k] = i.type === 'checkbox' ? i.checked : parseFloat(i.value);
        var o = el.querySelector('[data-o="' + i.dataset.k + '"]');
        if (o) o.textContent = (fmts[i.dataset.k] || num)(st[i.dataset.k]);
      });
      el.querySelectorAll('[data-seg]').forEach(function (g) {
        var on = g.querySelector('.on');
        st[g.dataset.seg] = on ? parseFloat(on.dataset.v) : null;
      });
    }
    el.addEventListener('input', function () { read(); onChange(st); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-seg] button');
      if (!b) return;
      b.parentNode.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      read(); onChange(st);
    });
    read();
    return st;
  }
  function note() {
    return '<p class="demo-note">ⓘ ' + L('Số liệu minh hoạ để thể hiện cách mô hình hoạt động, không phải dữ liệu nội bộ công ty. Kéo các thanh trượt để thử.', 'Illustrative numbers that show how the model works, not internal company data. Drag the sliders to try it.') + '</p>';
  }
  function res(label, value, cls) { return '<div class="res ' + (cls || '') + '"><small>' + esc(label) + '</small><b>' + esc(value) + '</b></div>'; }
  function verdict(cls, head, text) { return '<div class="verdict ' + cls + '"><b>' + esc(head) + '</b><span>' + text + '</span></div>'; }

  var D = {};

  /* 1. Agentic AI trên Power BI */
  D.agent = function (el) {
    var Q = [
      {
        q: L('Doanh thu tuần này của 5 cửa hàng lớn nhất so với kế hoạch thế nào?', 'How are the top 5 stores doing against plan this week?'),
        table: L('Bảng: Doanh thu, Kế hoạch, Cửa hàng · Measure: [Doanh thu], [Kế hoạch]', 'Tables: Sales, Plan, Store · Measures: [Sales], [Plan]'),
        dax: '<span class="k">EVALUATE</span>\n<span class="f">TOPN</span>( 5,\n  <span class="f">SUMMARIZECOLUMNS</span>( \'Store\'[Name],\n    <span class="s">"Sales"</span>, [Sales WTD],\n    <span class="s">"Plan"</span>,  [Plan WTD],\n    <span class="s">"% Plan"</span>, <span class="f">DIVIDE</span>( [Sales WTD], [Plan WTD] ) ),\n  [Sales WTD], <span class="k">DESC</span> )',
        bars: [['A', 104], ['B', 97], ['C', 112], ['D', 88], ['E', 101]],
        fmt: function (v) { return v + '%'; }, ref: 100, refLabel: L('Kế hoạch 100%', 'Plan 100%'),
        a: L('4/5 cửa hàng đạt hoặc vượt kế hoạch tuần. <b>Cửa hàng C</b> dẫn đầu (112%) nhờ ngành hàng Sách. <b>Cửa hàng D</b> chỉ đạt 88%, thiếu khoảng 46 triệu, chủ yếu ở Văn phòng phẩm — đề xuất kiểm tra tồn kho các mã R80 của ngành này.', '4 of 5 stores met or beat the weekly plan. <b>Store C</b> leads (112%) on Books. <b>Store D</b> is at 88%, about 46m short, mostly in Stationery — suggest checking stock of its R80 SKUs.'),
      },
      {
        q: L('Vì sao Văn phòng phẩm tháng này giảm so với cùng kỳ?', 'Why is Stationery down vs last year this month?'),
        table: L('Measure: [Lượt khách], [Tỷ lệ mua], [Giá trị đơn] · so cùng kỳ', 'Measures: [Traffic], [Conversion], [Basket] · vs LY'),
        dax: '<span class="c">-- Tách chênh lệch doanh thu theo 3 động lực</span>\n<span class="k">EVALUATE</span>\n<span class="f">ROW</span>(\n  <span class="s">"Traffic"</span>,    [Δ Sales from Traffic],\n  <span class="s">"Conversion"</span>, [Δ Sales from Conversion],\n  <span class="s">"Basket"</span>,     [Δ Sales from Basket] )\n<span class="c">-- Category = "Stationery", Period = MTD vs LY</span>',
        bars: [[L('Lượt khách', 'Traffic'), -6.2], [L('Tỷ lệ mua', 'Conversion'), -2.9], [L('Giá trị đơn', 'Basket'), 2.1]],
        fmt: function (v) { return (v > 0 ? '+' : '') + num(v, 1) + '%'; }, signed: true,
        a: L('Doanh thu VPP giảm <b>7,0%</b> so với cùng kỳ. Nguyên nhân chính là <b>lượt khách giảm 6,2%</b> (mùa tựu trường đến muộn hơn 1 tuần), tỷ lệ mua giảm 2,9%. Giá trị đơn tăng 2,1% bù một phần. Dự báo khoảng cách sẽ thu hẹp từ tuần sau.', 'Stationery sales are down <b>7.0%</b> vs LY. The main driver is <b>traffic −6.2%</b> (back-to-school started a week later), conversion −2.9%. Basket +2.1% offsets part of it. The gap should narrow from next week.'),
      },
      {
        q: L('Cửa hàng nào có nguy cơ không đạt kế hoạch tháng?', 'Which stores are at risk of missing the monthly plan?'),
        table: L('Measure: [Doanh thu MTD], [Kế hoạch tháng], [Tốc độ bán 7 ngày]', 'Measures: [Sales MTD], [Monthly plan], [7-day run rate]'),
        dax: '<span class="k">EVALUATE</span>\n<span class="f">FILTER</span>(\n  <span class="f">ADDCOLUMNS</span>( <span class="f">VALUES</span>( \'Store\'[Name] ),\n    <span class="s">"Forecast"</span>, [Sales MTD] + [Run rate 7D] * [Days left],\n    <span class="s">"% Plan"</span>,  <span class="f">DIVIDE</span>( [Sales MTD] + [Run rate 7D] * [Days left], [Plan Month] ) ),\n  [% Plan] &lt; 0.95 )',
        bars: [['D', 89], ['F', 92], ['H', 94]],
        fmt: function (v) { return v + '%'; }, ref: 95, refLabel: L('Ngưỡng 95%', '95% threshold'),
        a: L('Theo tốc độ bán 7 ngày gần nhất, <b>3 cửa hàng</b> dự kiến dưới 95% kế hoạch tháng: D (89%), F (92%), H (94%). Cần thêm khoảng <b>210 triệu</b> trong 12 ngày còn lại. Đã gửi cảnh báo cho quản lý vùng.', 'At the last 7-day run rate, <b>3 stores</b> will finish below 95% of plan: D (89%), F (92%), H (94%). They need about <b>210m</b> more in the 12 days left. Alert sent to area managers.'),
      },
      {
        q: L('Tóm tắt KPI hôm qua và gửi cảnh báo nếu có bất thường', 'Summarise yesterday’s KPIs and alert on anomalies'),
        table: L('Lịch chạy: 7:00 mỗi sáng · Kênh: email + chat nhóm', 'Schedule: 7:00 daily · Channels: email + team chat'),
        dax: '<span class="c">-- Agent chạy theo lịch, so mỗi KPI với dải bình thường</span>\n<span class="k">EVALUATE</span>\n<span class="f">ADDCOLUMNS</span>( \'KPI\',\n  <span class="s">"Value"</span>,   [KPI Yesterday],\n  <span class="s">"Z-score"</span>, <span class="f">DIVIDE</span>( [KPI Yesterday] - [KPI Avg 28D], [KPI StDev 28D] ) )',
        bars: [[L('Doanh thu', 'Sales'), 0.4], [L('Lượt khách', 'Traffic'), -0.8], [L('Biên LG', 'GM%'), -2.3], [L('Giá trị đơn', 'Basket'), 1.1]],
        fmt: function (v) { return num(v, 1) + 'σ'; }, signed: true,
        a: L('Hôm qua: doanh thu bình thường, lượt khách hơi thấp. <b>Biên lãi gộp thấp bất thường (−2,3σ)</b> do một chương trình giảm giá chưa cập nhật giá vốn. Đã gửi cảnh báo cho ngành hàng và phòng Kế toán.', 'Yesterday: sales normal, traffic slightly soft. <b>Gross margin abnormally low (−2.3σ)</b> because a promotion was missing its cost update. Alert sent to the category and Accounting teams.'),
      },
    ];
    var steps = [L('Hiểu câu hỏi', 'Understand the question'), L('Chọn bảng & measure', 'Pick tables & measures'), L('Viết DAX', 'Write DAX'), L('Chạy trên mô hình Power BI', 'Run on the Power BI model'), L('Diễn giải & đề xuất', 'Explain & recommend')];
    el.innerHTML = note() + '<div class="agent"><div class="panel"><h4>' + L('Chọn một câu hỏi', 'Pick a question') + '</h4><div class="q-list">' +
      Q.map(function (q, i) { return '<button class="q-btn" type="button" data-q="' + i + '">' + esc(q.q) + '</button>'; }).join('') +
      '</div></div><div class="panel chat" id="aChat"><p class="demo-note" style="margin:auto 0">' + L('← Chọn câu hỏi để xem agent làm việc từng bước.', '← Pick a question to watch the agent work step by step.') + '</p></div></div>';
    var chat = el.querySelector('#aChat'), timer = null;
    function run(i) {
      clearTimeout(timer);
      var q = Q[i];
      el.querySelectorAll('.q-btn').forEach(function (b) { b.classList.toggle('on', +b.dataset.q === i); });
      chat.innerHTML = '<div class="msg user">' + esc(q.q) + '</div><div class="msg bot"><ul class="a-steps">' +
        steps.map(function (s) { return '<li><i></i>' + esc(s) + '</li>'; }).join('') + '</ul></div>';
      var lis = chat.querySelectorAll('.a-steps li'), k = 0;
      var fast = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      (function next() {
        if (k > 0) { lis[k - 1].className = 'done'; lis[k - 1].querySelector('i').textContent = '✓'; }
        if (k === 1) chat.insertAdjacentHTML('beforeend', '<div class="msg bot"><small>' + esc(q.table) + '</small></div>');
        if (k === 3) chat.insertAdjacentHTML('beforeend', '<pre class="code">' + q.dax + '</pre>');
        if (k === lis.length) {
          var data = q.bars.map(function (b) { return { label: b[0], value: Math.abs(b[1]), color: b[1] < 0 ? 'var(--rose)' : 'var(--accent)', title: b[0] + ': ' + q.fmt(b[1]) }; });
          chat.insertAdjacentHTML('beforeend', '<div class="msg bot"><p style="margin:0 0 10px">' + q.a + '</p>' +
            C.bars({ data: data, w: 520, h: 200, fmt: q.signed ? function (v) { return num(v, 1); } : q.fmt, refLine: q.ref, refLabel: q.refLabel, minMax: q.ref ? q.ref * 1.1 : 0, aria: q.q }) +
            (q.signed ? '<div class="legend"><span><i style="background:var(--accent)"></i>' + L('Tác động dương', 'Positive') + '</span><span><i style="background:var(--rose)"></i>' + L('Tác động âm', 'Negative') + '</span></div>' : '') + '</div>');
          return;
        }
        lis[k].className = 'run';
        k++;
        timer = setTimeout(next, fast ? 0 : 650);
      })();
    }
    el.addEventListener('click', function (e) { var b = e.target.closest('.q-btn'); if (b) run(+b.dataset.q); });
  };

  /* 2. Kiến trúc hệ sinh thái web app */
  D.arch = function (el) {
    var nodes = [
      { id: 'user', x: 20, y: 120, t: L('Người dùng', 'Users'), s: L('Trình duyệt · điện thoại', 'Browser · mobile'), d: L('Nhân viên đăng nhập bằng email công ty. Mỗi người chỉ thấy đúng phần việc và dữ liệu được phân quyền.', 'Staff sign in with a company email and only see the work and data they are permitted to.') },
      { id: 'netlify', x: 220, y: 40, t: 'Netlify', s: L('Web tĩnh · CDN', 'Static web · CDN'), d: L('Giao diện HTML/JS tĩnh, tải nhanh từ CDN, tự xuất bản khi có thay đổi trên GitHub. Không cần máy chủ riêng.', 'Static HTML/JS front end served from a CDN and auto-published on every GitHub change. No server to run.') },
      { id: 'edge', x: 220, y: 200, t: 'Edge Function', s: '/api/ai', d: L('Hàm chạy ở biên mạng giữ khoá Claude API trong biến môi trường, giới hạn số câu hỏi mỗi giờ, ghi nhật ký. Trình duyệt không bao giờ thấy khoá.', 'An edge function keeps the Claude API key in environment variables, rate-limits questions per hour and logs usage. The browser never sees the key.') },
      { id: 'supa', x: 430, y: 40, t: 'Supabase', s: 'Postgres · Auth · RLS', d: L('Cơ sở dữ liệu Postgres với Row Level Security: quyền đọc/ghi được kiểm tra ngay trong database theo email người dùng. Có file SQL kiểm thử cho từng giai đoạn.', 'Postgres with Row Level Security: read/write rights are enforced in the database per user email. Each phase ships with SQL tests.') },
      { id: 'claude', x: 430, y: 200, t: 'Claude API', s: L('Trợ lý AI', 'AI assistant'), d: L('Mô hình Claude trả lời câu hỏi nghiệp vụ, tra số liệu qua các truy vấn đã duyệt sẵn, soạn thảo văn bản.', 'Claude answers business questions, looks up data through pre-approved queries and drafts documents.') },
      { id: 'git', x: 220, y: 290, t: 'GitHub', s: L('Mã nguồn · lịch sử', 'Code · history'), d: L('Toàn bộ mã nguồn và lịch sử thay đổi. Không bao giờ chứa dữ liệu thật hay khoá bí mật.', 'All source code and change history. Never contains real data or secrets.') },
    ];
    var flows = [['user', 'netlify'], ['user', 'edge'], ['netlify', 'supa'], ['edge', 'claude'], ['edge', 'supa'], ['git', 'netlify']];
    var mods = [
      [L('Việc Nhóm', 'Team tasks'), L('Giao việc, deadline, nhắc trưởng nhóm', 'Tasks, deadlines, lead alerts')],
      [L('Báo cáo ngày', 'Daily report'), L('Doanh thu ngày theo cửa hàng', 'Daily sales by store')],
      [L('Báo cáo tuần WSR', 'Weekly WSR'), L('Tổng hợp tuần tự động', 'Automated weekly summary')],
      [L('Dashboard P&L', 'P&L dashboard'), L('Lãi lỗ theo cửa hàng', 'Profit & loss by store')],
      [L('Mô hình tài chính', 'Financial model'), L('Kịch bản kế hoạch', 'Plan scenarios')],
      [L('Dự án khả thi', 'Feasibility'), L('Thẩm định mở mới', 'New store appraisal')],
      [L('Site mapping', 'Site mapping'), L('Bản đồ điểm bán, đối thủ', 'Map of stores & competitors')],
      [L('Hợp đồng & lịch hạn', 'Leases & due dates'), L('Nhắc hạn thuê, gia hạn', 'Lease expiry reminders')],
      [L('Danh bạ', 'Directory'), L('Danh bạ nội bộ, đối tác', 'Internal & partner contacts')],
      [L('Email hàng loạt', 'Mail merge'), L('Gửi thư theo danh sách', 'Bulk personalised mail')],
      [L('Soạn thảo', 'Drafting'), L('Văn bản theo mẫu + AI', 'Templates + AI drafting')],
      [L('Đối thủ cạnh tranh', 'Competitors'), L('Theo dõi thị trường', 'Market tracking')],
      [L('Kinh tế vĩ mô', 'Macro'), L('Chỉ số kinh tế, chứng khoán', 'Economic & market data')],
      [L('Trợ lý "Vịt Kota"', '“Vịt Kota” assistant'), L('Hỏi đáp nghiệp vụ bằng AI', 'AI business Q&A')],
      [L('Phân quyền & nhật ký', 'Permissions & audit'), L('Theo email, ghi mọi thao tác', 'Per email, every action logged')],
    ];
    var W = 170, H = 58;
    function c(n) { return [n.x + W / 2, n.y + H / 2]; }
    var by = {}; nodes.forEach(function (n) { by[n.id] = n; });
    var svg = '<svg class="arch-svg" viewBox="0 0 620 360" role="img" aria-label="' + L('Sơ đồ kiến trúc', 'Architecture diagram') + '">';
    flows.forEach(function (f) {
      var a = c(by[f[0]]), b = c(by[f[1]]);
      svg += '<path class="flow" d="M' + a[0] + ' ' + a[1] + ' C ' + ((a[0] + b[0]) / 2) + ' ' + a[1] + ', ' + ((a[0] + b[0]) / 2) + ' ' + b[1] + ', ' + b[0] + ' ' + b[1] + '"/>';
    });
    nodes.forEach(function (n) {
      svg += '<g class="node" data-n="' + n.id + '" tabindex="0" role="button"><rect x="' + n.x + '" y="' + n.y + '" width="' + W + '" height="' + H + '" rx="12"/>' +
        '<text x="' + (n.x + 14) + '" y="' + (n.y + 25) + '">' + esc(n.t) + '</text><text class="s" x="' + (n.x + 14) + '" y="' + (n.y + 43) + '">' + esc(n.s) + '</text></g>';
    });
    svg += '</svg>';
    el.innerHTML = '<div class="arch"><div class="panel">' + svg + '</div><div class="panel" id="archInfo"></div></div>' +
      '<div class="panel"><h4>' + L('Các module đã xây (bấm để xem)', 'Modules built (click to view)') + '</h4><div class="mod-grid">' +
      mods.map(function (m, i) { return '<button type="button" class="mod" data-m="' + i + '">' + esc(m[0]) + '<small>' + esc(m[1]) + '</small></button>'; }).join('') + '</div></div>' +
      '<div class="panel"><h4>' + L('Quy trình làm sản phẩm với Claude', 'Product workflow with Claude') + '</h4><div class="pipe">' +
      [['💬', L('Brainstorm', 'Brainstorm'), L('Yêu cầu, quy trình', 'Needs, workflow')], ['📐', L('Đặc tả', 'Spec'), L('Chia giai đoạn', 'Phased plan')], ['🗄️', 'Supabase', L('Bảng, RLS, test SQL', 'Tables, RLS, SQL tests')], ['🧩', L('Giao diện', 'Front end'), L('Module cắm thêm', 'Pluggable modules')], ['🚀', 'GitHub → Netlify', L('Tự xuất bản', 'Auto deploy')], ['📈', L('Dùng & cải tiến', 'Use & improve'), L('Theo phản hồi', 'From feedback')]].map(function (s, i, a) {
        return '<div class="pipe-step" style="animation-delay:' + i * 80 + 'ms"><span class="em">' + s[0] + '</span><b>' + esc(s[1]) + '</b><small>' + esc(s[2]) + '</small></div>' + (i < a.length - 1 ? '<div class="pipe-arrow">→</div>' : '');
      }).join('') + '</div></div>';
    var info = el.querySelector('#archInfo');
    function show(id) {
      var n = by[id];
      el.querySelectorAll('.node').forEach(function (g) { g.classList.toggle('on', g.dataset.n === id); });
      info.innerHTML = '<h4>' + esc(n.t) + ' <small style="color:var(--muted);font-weight:400">· ' + esc(n.s) + '</small></h4><p style="margin:0;color:var(--fg-2)">' + esc(n.d) + '</p>';
    }
    el.addEventListener('click', function (e) {
      var g = e.target.closest('.node'); if (g) show(g.dataset.n);
      var m = e.target.closest('.mod');
      if (m) {
        el.querySelectorAll('.mod').forEach(function (x) { x.classList.toggle('on', x === m); });
        var mm = mods[+m.dataset.m];
        info.innerHTML = '<h4>' + esc(mm[0]) + '</h4><p style="margin:0;color:var(--fg-2)">' + esc(mm[1]) + '. ' + L('Dữ liệu lưu trên Supabase, phân quyền theo email, giao diện chạy trên Netlify.', 'Data on Supabase, permissions per email, UI on Netlify.') + '</p>';
      }
    });
    el.addEventListener('keydown', function (e) { var g = e.target.closest('.node'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(g.dataset.n); } });
    show('supa');
  };

  /* 3. Kế hoạch doanh thu ngày */
  D.cascade = function (el) {
    var stores = [['A', 30], ['B', 22], ['C', 18], ['D', 16], ['E', 14]];
    var cats = [[L('Sách', 'Books'), 45, '#14C3B5'], [L('Văn phòng phẩm', 'Stationery'), 25, '#4DB3FF'], [L('Đồ chơi', 'Toys'), 12, '#F5B544'], [L('Quà tặng', 'Gifts'), 10, '#9B8CFF'], [L('Khác', 'Other'), 8, '#F2716B']];
    var fm = { target: function (v) { return num(v) + L(' tỷ', 'bn'); }, wk: function (v) { return '×' + num(v, 2); }, ev: function (v) { return v ? L('ngày ', 'day ') + v : L('không', 'none'); } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Giả định', 'Assumptions') + '</h4>' +
      slider('target', L('Chỉ tiêu tháng (5 cửa hàng)', 'Monthly target (5 stores)'), 5, 60, 1, 24, fm.target) +
      seg('month', L('Tháng', 'Month'), [{ v: 10, l: '11/2026' }, { v: 11, l: '12/2026' }, { v: 0, l: '01/2027' }], 10) +
      slider('wk', L('Hệ số cuối tuần (T7, CN)', 'Weekend factor (Sat, Sun)'), 1, 2.2, .05, 1.6, fm.wk) +
      slider('ev', L('Ngày có sự kiện (×1,8)', 'Event day (×1.8)'), 0, 28, 1, 20, fm.ev) +
      '<p class="demo-note">' + L('Bấm vào một dòng cửa hàng trong bảng để xem chỉ tiêu theo ngày.', 'Click a store row to see its daily targets.') + '</p></div>' +
      '<div class="panel"><h4 id="cTitle"></h4><div id="cChart"></div><div class="tbl-wrap" style="margin-top:14px"><table class="tbl" id="cTbl"></table></div></div></div>';
    var sel = 0;
    var st = bind(el, fm, draw);
    function draw() {
      var y = st.month === 0 ? 2027 : 2026, m = st.month, days = new Date(y, m + 1, 0).getDate();
      var w = [], tot = 0;
      for (var d = 1; d <= days; d++) {
        var dow = new Date(y, m, d).getDay(), f = (dow === 0 || dow === 6) ? st.wk : 1;
        if (d === st.ev) f *= 1.8;
        w.push(f); tot += f;
      }
      var T = st.target * 1000; // triệu
      var rows = stores.map(function (s, i) {
        var sv = T * s[1] / 100;
        return '<tr data-s="' + i + '"' + (i === sel ? ' class="sel"' : '') + '><td>' + L('Cửa hàng ', 'Store ') + s[0] + '</td>' + cats.map(function (c) { return '<td>' + num(sv * c[1] / 100) + '</td>'; }).join('') + '<td><b>' + num(sv) + '</b></td><td>' + num(sv / days) + '</td></tr>';
      }).join('');
      el.querySelector('#cTbl').innerHTML = '<thead><tr><th>' + L('Cửa hàng', 'Store') + '</th>' + cats.map(function (c) { return '<th>' + esc(c[0]) + '</th>'; }).join('') + '<th>' + L('Tổng', 'Total') + '</th><th>' + L('BQ/ngày', 'Avg/day') + '</th></tr></thead><tbody>' + rows + '</tbody>' +
        '<tfoot><tr><td>' + L('Tổng', 'Total') + '</td>' + cats.map(function (c) { return '<td>' + num(T * c[1] / 100) + '</td>'; }).join('') + '<td>' + num(T) + '</td><td>' + num(T / days) + '</td></tr></tfoot>';
      var sv = T * stores[sel][1] / 100;
      var data = w.map(function (f, i) {
        var dow = new Date(y, m, i + 1).getDay();
        return { label: String(i + 1), value: sv * f / tot, color: i + 1 === st.ev ? 'var(--amber)' : (dow === 0 || dow === 6) ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 45%, var(--line))' };
      });
      el.querySelector('#cTitle').textContent = L('Chỉ tiêu theo ngày · Cửa hàng ', 'Daily targets · Store ') + stores[sel][0] + ' (' + unitM() + ')';
      el.querySelector('#cChart').innerHTML = C.bars({ data: data, w: 640, h: 220, fmt: function (v) { return num(v); }, maxLabels: 16, aria: 'daily' }) +
        C.legend([{ name: L('Ngày thường', 'Weekday'), color: 'color-mix(in srgb, var(--accent) 45%, var(--line))' }, { name: L('Cuối tuần', 'Weekend'), color: 'var(--accent)' }, { name: L('Sự kiện', 'Event'), color: 'var(--amber)' }]);
    }
    el.addEventListener('click', function (e) { var r = e.target.closest('tr[data-s]'); if (r) { sel = +r.dataset.s; draw(); } });
    draw();
  };

  /* 4. Chi phí đóng cửa điểm bán */
  D.exit = function (el) {
    var fm = { n: function (v) { return v + L(' tháng', ' mo'); }, rent: mil, res: function (v) { return (v > 0 ? '+' : '') + mil(v); }, pen: function (v) { return v + L(' tháng thuê', ' mo rent'); }, dep: function (v) { return v + L(' tháng thuê', ' mo rent'); }, close: mil, fit: mil, cut: function (v) { return v + '%'; } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Thông tin cửa hàng', 'Store inputs') + ' (' + unitM() + ')</h4>' +
      slider('n', L('Thời hạn thuê còn lại', 'Lease term remaining'), 1, 48, 1, 24, fm.n) +
      slider('rent', L('Tiền thuê mỗi tháng', 'Monthly rent'), 20, 400, 5, 120, fm.rent) +
      slider('res', L('Kết quả kinh doanh mỗi tháng (sau thuê)', 'Monthly result (after rent)'), -200, 80, 5, -45, fm.res) +
      slider('pen', L('Phạt chấm dứt sớm', 'Early termination penalty'), 0, 12, 1, 3, fm.pen) +
      slider('dep', L('Tiền cọc bị mất', 'Deposit forfeited'), 0, 6, 1, 3, fm.dep) +
      slider('close', L('Chi phí đóng cửa, bàn giao', 'Closing & handover cost'), 0, 500, 10, 150, fm.close) +
      slider('fit', L('Đầu tư chưa phân bổ (phi tiền mặt)', 'Unamortised fit-out (non-cash)'), 0, 3000, 50, 800, fm.fit) +
      slider('cut', L('Phương án C: giảm giá thuê', 'Option C: rent reduction'), 0, 40, 5, 20, fm.cut) +
      '</div><div class="panel"><h4>' + L('So sánh 3 phương án · chi phí tiền mặt luỹ kế', '3 options · cumulative cash cost') + '</h4><div id="xRes"></div><div id="xChart"></div><div id="xVer"></div></div></div>';
    var st = bind(el, fm, draw);
    function draw() {
      var a = (st.pen + st.dep) * st.rent + st.close;
      var b = -st.res * st.n + st.close;
      var cRes = st.res + st.rent * st.cut / 100;
      var c = -cRes * st.n + st.close;
      var labels = [], A = [], B = [], Cc = [];
      for (var m = 0; m <= st.n; m++) { labels.push('T' + m); A.push(a); B.push(-st.res * m + (m === st.n ? st.close : 0)); Cc.push(-cRes * m + (m === st.n ? st.close : 0)); }
      var be = st.res < 0 ? ((st.pen + st.dep) * st.rent) / -st.res : null;
      var best = Math.min(a, b, c), bestK = best === a ? 'A' : best === b ? 'B' : 'C';
      el.querySelector('#xRes').innerHTML = '<div class="result-grid">' +
        res(L('A · Đóng ngay', 'A · Close now'), mil(a), bestK === 'A' ? 'good' : '') +
        res(L('B · Chạy hết hạn', 'B · Trade to expiry'), mil(b), bestK === 'B' ? 'good' : (b > a ? 'bad' : '')) +
        res(L('C · Đàm phán giảm thuê', 'C · Renegotiate rent'), mil(c), bestK === 'C' ? 'good' : '') +
        res(L('Tháng hoà vốn A = B', 'Break-even month A = B'), be ? num(be, 1) + L(' tháng', ' mo') : '—', 'acc') + '</div>';
      el.querySelector('#xChart').innerHTML = C.lines({
        labels: labels, w: 640, h: 240, fmt: function (v) { return num(v); }, marker: be && be <= st.n ? Math.round(be) : null, markerLabel: L('hoà vốn', 'break-even'),
        series: [{ name: 'A', color: 'var(--accent)', values: A, dash: '6 5' }, { name: 'B', color: 'var(--rose)', values: B, area: true }, { name: 'C', color: 'var(--amber)', values: Cc }],
      }) + C.legend([{ name: L('A · Đóng ngay', 'A · Close now'), color: 'var(--accent)' }, { name: L('B · Chạy hết hạn', 'B · Trade to expiry'), color: 'var(--rose)' }, { name: L('C · Giảm thuê ', 'C · Rent −') + st.cut + '%', color: 'var(--amber)' }]);
      var v;
      if (bestK === 'A') v = verdict('good', L('Đề xuất: đóng sớm.', 'Recommend: close early.'), L('Đóng ngay tiết kiệm <b>' + mil(b - a) + '</b> so với chạy đến hết hạn. Sau tháng thứ ' + num(be, 1) + ', mỗi tháng tiếp tục là lỗ thêm. Khoản ' + mil(st.fit) + ' đầu tư chưa phân bổ là chi phí chìm, ghi nhận một lần, không đổi quyết định.', 'Closing now saves <b>' + mil(b - a) + '</b> vs trading to expiry. After month ' + num(be, 1) + ' every extra month adds losses. The ' + mil(st.fit) + ' unamortised fit-out is sunk and does not change the decision.'));
      else if (bestK === 'C') v = verdict('warn', L('Đề xuất: đàm phán lại.', 'Recommend: renegotiate.'), L('Giảm thuê ' + st.cut + '% giúp phương án C rẻ nhất, thấp hơn đóng ngay <b>' + mil(a - c) + '</b>. Dùng chi phí đóng sớm (' + mil(a) + ') làm đòn bẩy khi thương lượng với chủ nhà.', 'A ' + st.cut + '% rent cut makes option C cheapest, <b>' + mil(a - c) + '</b> below closing now. Use the exit cost (' + mil(a) + ') as leverage with the landlord.'));
      else v = verdict('good', L('Đề xuất: giữ đến hết hạn.', 'Recommend: keep to expiry.'), L('Cửa hàng ' + (st.res >= 0 ? 'vẫn tạo lợi nhuận' : 'lỗ ít') + '; đóng sớm làm mất <b>' + mil(a - b) + '</b> (gồm lợi nhuận mất đi và phí phạt).', 'The store ' + (st.res >= 0 ? 'still makes a profit' : 'loses little') + '; closing early would cost <b>' + mil(a - b) + '</b> more (lost profit plus penalties).'));
      el.querySelector('#xVer').innerHTML = v;
    }
    draw();
  };

  /* 5. Thẩm định mở mới */
  D.feasibility = function (el) {
    var fm = { capex: function (v) { return num(v, 1) + L(' tỷ', 'bn'); }, sales: mil, gm: function (v) { return v + '%'; }, rent: mil, staff: mil, opex: function (v) { return v + '%'; }, yrs: function (v) { return v + L(' năm', ' yrs'); }, r: function (v) { return v + '%'; }, ramp: function (v) { return v + L(' tháng', ' mo'); } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Giả định dự án', 'Project assumptions') + ' (' + unitM() + ')</h4>' +
      slider('capex', L('Vốn đầu tư (thiết kế, thi công, thiết bị)', 'Capex (fit-out, equipment)'), .5, 8, .1, 3.2, fm.capex) +
      slider('sales', L('Doanh thu ổn định mỗi tháng', 'Stable monthly sales'), 200, 3000, 50, 1500, fm.sales) +
      slider('ramp', L('Thời gian tăng tốc (bắt đầu từ 60%)', 'Ramp-up (starting at 60%)'), 0, 12, 1, 6, fm.ramp) +
      slider('gm', L('Biên lãi gộp', 'Gross margin'), 20, 50, 1, 35, fm.gm) +
      slider('rent', L('Tiền thuê mỗi tháng', 'Monthly rent'), 30, 800, 10, 180, fm.rent) +
      slider('staff', L('Nhân sự mỗi tháng', 'Monthly staff cost'), 30, 400, 5, 110, fm.staff) +
      slider('opex', L('Chi phí khác (% doanh thu)', 'Other opex (% of sales)'), 2, 15, .5, 6, fm.opex) +
      slider('yrs', L('Thời hạn thuê', 'Lease term'), 3, 10, 1, 5, fm.yrs) +
      slider('r', L('Lãi suất chiết khấu năm', 'Annual discount rate'), 6, 18, .5, 12, fm.r) +
      '</div><div class="panel"><h4>' + L('Kết quả thẩm định', 'Appraisal result') + '</h4><div id="fRes"></div><div id="fChart"></div><div id="fVer"></div></div></div>';
    var st = bind(el, fm, draw);
    function draw() {
      var cap = st.capex * 1000, gm = st.gm / 100, ox = st.opex / 100, n = st.yrs * 12, r = st.r / 100 / 12;
      var be = (st.rent + st.staff) / (gm - ox);
      var cum = -cap, npv = -cap, pay = null, series = [cum], labels = ['0'];
      for (var m = 1; m <= n; m++) {
        var k = st.ramp && m <= st.ramp ? .6 + .4 * (m - 1) / st.ramp : 1;
        var s = st.sales * k, e = s * (gm - ox) - st.rent - st.staff;
        cum += e; npv += e / Math.pow(1 + r, m);
        if (pay === null && cum >= 0) pay = m;
        series.push(cum); labels.push(m % 12 === 0 ? L('N', 'Y') + (m / 12) : String(m));
      }
      var ebitda = st.sales * (gm - ox) - st.rent - st.staff;
      var occ = st.rent / st.sales;
      el.querySelector('#fRes').innerHTML = '<div class="result-grid">' +
        res(L('Lợi nhuận/tháng (ổn định)', 'Monthly profit (stable)'), mil(ebitda), ebitda > 0 ? 'good' : 'bad') +
        res(L('Doanh thu hoà vốn/tháng', 'Breakeven sales/month'), mil(be), be < st.sales ? 'acc' : 'bad') +
        res(L('Hoàn vốn', 'Payback'), pay ? pay + L(' tháng', ' mo') : L('Không trong hạn', 'Not within term'), pay && pay <= 36 ? 'good' : pay && pay <= 48 ? 'warn' : 'bad') +
        res('NPV', mil(npv), npv > 0 ? 'good' : 'bad') +
        res(L('Chi phí thuê/doanh thu', 'Occupancy cost'), pct(occ, 1), occ <= .15 ? 'good' : occ <= .2 ? 'warn' : 'bad') + '</div>';
      el.querySelector('#fChart').innerHTML = C.lines({ labels: labels, w: 640, h: 230, fmt: function (v) { return num(v / 1000, 1) + L(' tỷ', 'bn'); }, marker: pay, markerLabel: L('hoàn vốn', 'payback'), maxLabels: 10, series: [{ name: L('Dòng tiền luỹ kế', 'Cumulative cash'), color: 'var(--accent)', values: series, area: true }] }) +
        C.legend([{ name: L('Dòng tiền luỹ kế (sau vốn đầu tư)', 'Cumulative cash (after capex)'), color: 'var(--accent)' }]);
      var v = npv > 0 && pay && pay <= 36 ? verdict('good', L('Đạt.', 'Go.'), L('Hoàn vốn trong ' + pay + ' tháng, NPV dương ' + mil(npv) + '. Biên an toàn doanh thu ' + pct(1 - be / st.sales) + ' so với điểm hoà vốn.', 'Pays back in ' + pay + ' months with a positive NPV of ' + mil(npv) + '. Sales safety margin ' + pct(1 - be / st.sales) + ' above breakeven.'))
        : npv > 0 ? verdict('warn', L('Cân nhắc.', 'Consider.'), L('NPV dương nhưng hoàn vốn chậm (' + (pay || '>' + n) + ' tháng). Thử đàm phán giảm thuê hoặc giảm vốn đầu tư.', 'Positive NPV but slow payback (' + (pay || '>' + n) + ' months). Try negotiating rent or reducing capex.'))
          : verdict('bad', L('Không đạt.', 'No go.'), L('Dự án không thu hồi đủ vốn trong thời hạn thuê (NPV ' + mil(npv) + '). Cần doanh thu tối thiểu ' + mil(be) + '/tháng chỉ để hoà vốn hoạt động.', 'The project does not recover its capital within the lease (NPV ' + mil(npv) + '). It needs ' + mil(be) + '/month just to break even operationally.'));
      el.querySelector('#fVer').innerHTML = v;
    }
    draw();
  };

  /* 6. Định giá hợp tác F&B */
  D.fnb = function (el) {
    var fm = { area: function (v) { return v + ' m²'; }, rent: function (v) { return num(v) + L(' nghìn/m²', 'k/m²'); }, rev: mil, share: function (v) { return v + '%'; }, mg: function (v) { return num(v) + L(' nghìn/m²', 'k/m²'); } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Thông số mặt bằng & đối tác', 'Space & partner inputs') + '</h4>' +
      slider('area', L('Diện tích cho F&B', 'Area for F&B'), 20, 250, 5, 80, fm.area) +
      slider('rent', L('Giá thuê nhà sách đang trả', 'Rent we pay'), 200, 1500, 10, 450, fm.rent) +
      slider('rev', L('Doanh thu đối tác dự kiến/tháng', 'Expected partner sales/month'), 50, 1500, 10, 420, fm.rev) +
      slider('share', L('Chia doanh thu', 'Revenue share'), 5, 25, .5, 15, fm.share) +
      slider('mg', L('Thu tối thiểu (MG)', 'Minimum guarantee (MG)'), 200, 2000, 10, 680, fm.mg) +
      '</div><div class="panel"><h4>' + L('Thu từ hợp tác so với giá thuê hiện tại', 'Partnership income vs current rent') + ' (' + unitM() + L('/tháng', '/month') + ')</h4><div id="bRes"></div><div id="bChart"></div><div id="bVer"></div></div></div>';
    var st = bind(el, fm, draw);
    function draw() {
      var cost = st.rent * st.area / 1000, mg = st.mg * st.area / 1000;
      function inc(rev) { return Math.max(mg, rev * st.share / 100); }
      var I = inc(st.rev), up = I / cost - 1, kink = mg / (st.share / 100);
      var labels = [], s1 = [], s2 = [], max = Math.max(1500, st.rev * 1.5), mk = null;
      for (var i = 0; i <= 30; i++) { var rv = max * i / 30; labels.push(num(rv)); s1.push(inc(rv)); s2.push(cost); if (mk === null && rv >= st.rev) mk = i; }
      el.querySelector('#bRes').innerHTML = '<div class="result-grid">' +
        res(L('Chi phí thuê của diện tích', 'Rent cost of the space'), mil(cost)) +
        res(L('Thu từ đối tác', 'Partner income'), mil(I), 'acc') +
        res(L('Chênh lệch so với giá thuê', 'Uplift vs rent'), (up >= 0 ? '+' : '') + pct(up), up >= .5 ? 'good' : up >= 0 ? 'warn' : 'bad') +
        res(L('Doanh thu đối tác để vượt MG', 'Partner sales to exceed MG'), mil(kink)) + '</div>';
      el.querySelector('#bChart').innerHTML = C.lines({ labels: labels, w: 640, h: 230, fmt: function (v) { return num(v); }, marker: mk, markerLabel: L('dự kiến', 'expected'), maxLabels: 6,
        series: [{ name: L('Thu từ đối tác', 'Partner income'), color: 'var(--accent)', values: s1, area: true }, { name: L('Giá thuê hiện tại', 'Current rent'), color: 'var(--rose)', values: s2, dash: '6 5' }, { name: '+50%', color: 'var(--amber)', values: s2.map(function (x) { return x * 1.5; }), dash: '2 4', width: 1.5 }] }) +
        C.legend([{ name: L('Thu từ đối tác = max(MG, % × doanh thu)', 'Partner income = max(MG, % × sales)'), color: 'var(--accent)' }, { name: L('Giá thuê hiện tại', 'Current rent'), color: 'var(--rose)' }, { name: L('Mục tiêu +50%', '+50% target'), color: 'var(--amber)' }]) +
        '<p class="demo-note" style="margin-top:10px">' + L('Trục ngang: doanh thu đối tác/tháng (' + unitM() + ').', 'X axis: partner sales/month (' + unitM() + ').') + '</p>';
      el.querySelector('#bVer').innerHTML = up >= .5 ? verdict('good', L('Đạt mục tiêu.', 'Target met.'), L('Hợp tác thu cao hơn giá thuê <b>' + pct(up) + '</b>. MG đảm bảo sàn ' + mil(mg) + '/tháng kể cả khi đối tác bán chậm.', 'The deal earns <b>' + pct(up) + '</b> above rent. The MG guarantees a floor of ' + mil(mg) + '/month even if the partner sells slowly.'))
        : verdict('warn', L('Chưa đạt +50%.', 'Below +50%.'), L('Nâng MG lên tối thiểu ' + num(st.rent * 1.5) + L(' nghìn/m²', 'k/m²') + ' hoặc tăng % chia doanh thu để đạt mục tiêu.', 'Raise the MG to at least ' + num(st.rent * 1.5) + 'k/m² or the revenue share to hit the target.'));
    }
    draw();
  };

  /* 7. Excel → SQL Server + Power BI */
  D.pipeline = function (el) {
    var before = [['📧', L('Cửa hàng gửi file', 'Stores email files'), L('Mỗi nơi một mẫu', 'Different templates')], ['📁', L('Nhiều file Excel', 'Many Excel files'), L('Dễ sai phiên bản', 'Version mix-ups')], ['🧮', L('Gộp tay, VLOOKUP', 'Manual merge'), L('Hàng giờ mỗi ngày', 'Hours every day')], ['📊', L('Báo cáo tĩnh', 'Static report'), L('Mỗi phòng một số', 'Numbers differ')]];
    var after = [['🛒', L('POS & ERP', 'POS & ERP'), L('Dữ liệu gốc', 'Source data')], ['🗄️', 'SQL Server', L('Kho dữ liệu, lịch làm mới', 'Warehouse, scheduled')], ['🧠', L('Mô hình Power BI', 'Power BI model'), L('Measure DAX dùng chung', 'Shared DAX measures')], ['📈', L('20+ báo cáo', '20+ reports'), L('Phân quyền theo vai trò', 'Role-based access')], ['🤖', 'Agentic AI', L('Hỏi bằng ngôn ngữ tự nhiên', 'Ask in plain language')]];
    var cmp = [
      [L('Nguồn số liệu', 'Source of truth'), L('Mỗi phòng một file', 'One file per team'), L('Một kho dữ liệu chung', 'One shared warehouse')],
      [L('Cập nhật', 'Refresh'), L('Tổng hợp tay', 'Manual consolidation'), L('Tự động theo lịch', 'Automatic, scheduled')],
      [L('Phân quyền', 'Access'), L('Gửi file qua email', 'Files over email'), L('Theo vai trò, có bảo mật', 'Role-based, secured')],
      [L('Số báo cáo quản trị', 'Management reports'), L('Rải rác', 'Scattered'), '20+'],
      [L('P&L cửa hàng', 'Store P&L'), L('Bảng tính cuối kỳ', 'Period-end spreadsheet'), L('Dashboard tương tác cho TGĐ', 'Interactive CEO dashboard')],
      [L('Câu hỏi đột xuất', 'Ad hoc questions'), L('Chờ phòng Kế hoạch', 'Wait for Planning'), L('~70% tự phục vụ (AI)', '~70% self service (AI)')],
    ];
    el.innerHTML = '<div class="panel"><div class="seg" style="max-width:360px;margin-bottom:16px" id="pSeg"><button type="button" data-p="0">' + L('Trước', 'Before') + '</button><button type="button" data-p="1" class="on">' + L('Sau', 'After') + '</button></div><div id="pFlow"></div></div>' +
      '<div class="panel"><h4>' + L('So sánh trước và sau', 'Before vs after') + '</h4><div class="tbl-wrap"><table class="tbl"><thead><tr><th></th><th>' + L('Trước', 'Before') + '</th><th>' + L('Sau', 'After') + '</th></tr></thead><tbody>' +
      cmp.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td style="color:var(--rose);font-family:var(--font)">' + esc(r[1]) + '</td><td style="color:var(--accent);font-family:var(--font)">' + esc(r[2]) + '</td></tr>'; }).join('') + '</tbody></table></div></div>';
    function flow(p) {
      var a = p ? after : before;
      el.querySelectorAll('#pSeg button').forEach(function (b) { b.classList.toggle('on', +b.dataset.p === p); });
      el.querySelector('#pFlow').innerHTML = '<div class="pipe ' + (p ? 'after' : 'before') + '">' + a.map(function (s, i) {
        return '<div class="pipe-step" style="animation-delay:' + i * 90 + 'ms"><span class="em">' + s[0] + '</span><b>' + esc(s[1]) + '</b><small>' + esc(s[2]) + '</small></div>' + (i < a.length - 1 ? '<div class="pipe-arrow">' + (p ? '→' : '⇢') + '</div>' : '');
      }).join('') + '</div>';
    }
    el.addEventListener('click', function (e) { var b = e.target.closest('#pSeg button'); if (b) flow(+b.dataset.p); });
    flow(1);
  };

  /* 8. Xếp hạng SKU */
  D.pareto = function (el) {
    var r = rng(42), skus = [];
    for (var i = 0; i < 60; i++) {
      var isNew = i % 11 === 5, zero = !isNew && i % 9 === 7;
      skus.push({ id: 'SKU' + String(1001 + i), rev: zero ? 0 : Math.round(Math.exp(normal(r) * .85 + 3) * (isNew ? .6 : 1)), isNew: isNew });
    }
    var fm = { th: function (v) { return v + '%'; }, nd: function (v) { return v + L(' ngày', ' days'); } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Quy tắc phân hạng', 'Ranking rules') + '</h4>' +
      slider('th', L('Ngưỡng nhóm đầu (R80)', 'Top group threshold (R80)'), 60, 95, 1, 80, fm.th) +
      '<div id="sTbl"></div></div><div class="panel"><h4>' + L('Biểu đồ Pareto 60 mã (minh hoạ)', 'Pareto chart of 60 SKUs (illustrative)') + '</h4><div id="sChart"></div></div></div>';
    var cls = { R80: ['var(--accent)', L('Giữ tồn, không để đứt hàng', 'Protect stock, no stock-outs')], R20: ['#4DB3FF', L('Theo dõi, tối ưu số lượng', 'Monitor, right-size')], R0: ['var(--rose)', L('Điều chuyển hoặc thanh lý', 'Transfer or clear')], RNEW: ['var(--amber)', L('Theo dõi riêng 60 ngày đầu', 'Track separately for 60 days')] };
    var st = bind(el, fm, draw);
    function draw() {
      var old = skus.filter(function (s) { return !s.isNew; }).sort(function (a, b) { return b.rev - a.rev; });
      var neu = skus.filter(function (s) { return s.isNew; });
      var tot = old.reduce(function (a, s) { return a + s.rev; }, 0), cum = 0;
      old.forEach(function (s) { var before = cum; cum += s.rev; s.cum = cum / tot; s.c = s.rev === 0 ? 'R0' : before / tot < st.th / 100 ? 'R80' : 'R20'; });
      neu.forEach(function (s) { s.c = 'RNEW'; });
      var all = old.concat(neu), allTot = tot + neu.reduce(function (a, s) { return a + s.rev; }, 0);
      var W = 640, H = 250, pl = 40, pr = 40, pt = 12, pb = 26, iw = W - pl - pr, ih = H - pt - pb, bw = iw / all.length, mx = C.niceMax(all[0].rev);
      var svg = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '">';
      [0, .25, .5, .75, 1].forEach(function (g) { var y = pt + ih - g * ih; svg += '<line class="gl" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '"/><text x="' + (W - pr + 6) + '" y="' + (y + 4) + '">' + g * 100 + '%</text>'; });
      var pts = '';
      all.forEach(function (s, i) {
        var h = s.rev / mx * ih, x = pl + i * bw;
        svg += '<rect x="' + (x + 1) + '" y="' + (pt + ih - h) + '" width="' + Math.max(1, bw - 2) + '" height="' + h + '" fill="' + cls[s.c][0] + '" rx="2"><title>' + s.id + ' · ' + s.c + ' · ' + num(s.rev) + '</title></rect>';
        if (s.cum != null) pts += (x + bw / 2) + ',' + (pt + ih - s.cum * ih) + ' ';
      });
      var ty = pt + ih - st.th / 100 * ih;
      svg += '<polyline points="' + pts + '" fill="none" stroke="var(--fg-2)" stroke-width="2"/>';
      svg += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + ty + '" y2="' + ty + '" stroke="var(--amber)" stroke-dasharray="5 4" stroke-width="1.5"/>';
      svg += '<text x="' + (pl + 4) + '" y="' + (ty - 5) + '" style="fill:var(--amber)">' + st.th + '% ' + L('doanh thu', 'of sales') + '</text></svg>';
      el.querySelector('#sChart').innerHTML = svg + C.legend(Object.keys(cls).map(function (k) { return { name: k, color: cls[k][0] }; }).concat([{ name: L('Luỹ kế doanh thu', 'Cumulative sales'), color: 'var(--fg-2)' }]));
      var rows = Object.keys(cls).map(function (k) {
        var g = all.filter(function (s) { return s.c === k; }), rv = g.reduce(function (a, s) { return a + s.rev; }, 0);
        return '<tr><td><span style="color:' + cls[k][0] + '">■</span> ' + k + '</td><td>' + g.length + '</td><td>' + pct(g.length / all.length) + '</td><td>' + pct(rv / allTot) + '</td></tr><tr><td colspan="4" style="font-family:var(--font);color:var(--muted);text-align:left;white-space:normal;font-size:12.5px;padding-top:0">→ ' + esc(cls[k][1]) + '</td></tr>';
      }).join('');
      el.querySelector('#sTbl').innerHTML = '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + L('Hạng', 'Tier') + '</th><th>SKU</th><th>% SKU</th><th>% ' + L('DT', 'sales') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }
    draw();
  };

  /* 9. Định mức tồn kho */
  D.safety = function (el) {
    var Z = { 90: 1.2816, 95: 1.6449, 97.5: 1.96, 99: 2.3263 };
    var fm = { d: function (v) { return num(v) + L(' sp/ngày', '/day'); }, sd: function (v) { return num(v, 1); }, lt: function (v) { return v + L(' ngày', ' days'); }, rp: function (v) { return v + L(' ngày', ' days'); } };
    el.innerHTML = note() + '<div class="demo-grid"><div class="panel"><h4>' + L('Thông số một mã hàng tại một cửa hàng', 'One SKU at one store') + '</h4>' +
      slider('d', L('Nhu cầu bình quân', 'Average demand'), 1, 60, 1, 18, fm.d) +
      slider('sd', L('Độ lệch chuẩn nhu cầu/ngày', 'Daily demand std dev'), 0, 25, .5, 6, fm.sd) +
      slider('lt', L('Thời gian giao hàng', 'Lead time'), 1, 21, 1, 5, fm.lt) +
      slider('rp', L('Chu kỳ đặt hàng', 'Order cycle'), 1, 14, 1, 7, fm.rp) +
      seg('sl', L('Mức phục vụ', 'Service level'), [{ v: 90, l: '90%' }, { v: 95, l: '95%' }, { v: 97.5, l: '97.5%' }, { v: 99, l: '99%' }], 95) +
      '<button class="btn btn-ghost btn-sm" type="button" id="reSim">↻ ' + L('Mô phỏng lại 60 ngày', 'Re-run 60-day simulation') + '</button>' +
      '</div><div class="panel"><h4>' + L('Định mức & mô phỏng tồn kho', 'Norms & inventory simulation') + '</h4><div id="iRes"></div><div id="iChart"></div></div></div>';
    var seed = 7;
    var st = bind(el, fm, draw);
    function draw() {
      var z = Z[st.sl], ss = Math.ceil(z * st.sd * Math.sqrt(st.lt)), rop = Math.ceil(st.d * st.lt + ss), q = Math.max(1, Math.round(st.d * st.rp)), mx = rop + q;
      var r = rng(seed), on = mx, pipe = [], inv = [], labels = [], out = 0, dem = 0, served = 0;
      for (var t = 0; t < 60; t++) {
        pipe = pipe.filter(function (p) { if (p.at === t) { on += p.q; return false; } return true; });
        var dd = Math.max(0, Math.round(st.d + normal(r) * st.sd));
        dem += dd; served += Math.min(on, dd);
        if (dd > on) out++;
        on = Math.max(0, on - dd);
        var pos = on + pipe.reduce(function (a, p) { return a + p.q; }, 0);
        if (pos <= rop) pipe.push({ at: t + st.lt, q: Math.max(q, mx - pos) });
        inv.push(on); labels.push(String(t + 1));
      }
      var avg = inv.reduce(function (a, b) { return a + b; }, 0) / inv.length;
      el.querySelector('#iRes').innerHTML = '<div class="result-grid">' +
        res(L('Tồn an toàn', 'Safety stock'), num(ss), 'acc') + res(L('Điểm đặt hàng', 'Reorder point'), num(rop)) + res(L('Tồn tối đa', 'Max stock'), num(mx)) +
        res(L('Tỷ lệ đáp ứng', 'Fill rate'), pct(dem ? served / dem : 1, 1), served / dem >= st.sl / 100 ? 'good' : 'warn') +
        res(L('Ngày thiếu hàng', 'Stock-out days'), out + '/60', out ? 'bad' : 'good') + res(L('Tồn bình quân', 'Average stock'), num(avg) + ' (' + num(avg / st.d, 1) + L(' ngày', ' days') + ')') + '</div>';
      el.querySelector('#iChart').innerHTML = C.lines({ labels: labels, w: 640, h: 240, fmt: function (v) { return num(v); }, maxLabels: 12,
        series: [{ name: L('Tồn cuối ngày', 'Closing stock'), color: 'var(--accent)', values: inv, area: true }, { name: 'ROP', color: 'var(--amber)', values: inv.map(function () { return rop; }), dash: '6 5', width: 1.5 }, { name: 'SS', color: 'var(--rose)', values: inv.map(function () { return ss; }), dash: '3 4', width: 1.5 }] }) +
        C.legend([{ name: L('Tồn cuối ngày', 'Closing stock'), color: 'var(--accent)' }, { name: L('Điểm đặt hàng', 'Reorder point'), color: 'var(--amber)' }, { name: L('Tồn an toàn', 'Safety stock'), color: 'var(--rose)' }]) +
        '<pre class="code" style="margin-top:12px">SS  = z × σ × √L = ' + num(z, 2) + ' × ' + num(st.sd, 1) + ' × √' + st.lt + ' ≈ ' + ss + '\nROP = d × L + SS = ' + st.d + ' × ' + st.lt + ' + ' + ss + ' = ' + rop + '</pre>';
    }
    el.addEventListener('click', function (e) { if (e.target.closest('#reSim')) { seed++; draw(); } });
    draw();
  };

  PF.demos = D;
})();
