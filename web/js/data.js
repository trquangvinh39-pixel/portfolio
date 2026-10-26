// Toàn bộ nội dung của trang. Sửa ở đây, cả trang đổi theo.
// Mỗi chữ hiển thị có 2 bản: { vi: '...', en: '...' }. Chữ giống nhau ở 2 ngôn ngữ thì để chuỗi thường.

window.PF = window.PF || {};

PF.profile = {
  name: 'Trần Quang Vinh',
  nameEn: 'Tran Quang Vinh',
  email: 'trquangvinh39@gmail.com',
  phone: '0947 730 478',
  phoneRaw: '+84947730478',
  linkedin: 'https://www.linkedin.com/in/tran-quang-vinh-090866193/',
  linkedinShort: 'tran-quang-vinh-090866193',
  location: { vi: 'TP. Hồ Chí Minh, Việt Nam', en: 'Ho Chi Minh City, Vietnam' },
  title: { vi: 'Trưởng bộ phận Kế hoạch', en: 'Head of Planning' },
  roles: {
    vi: ['FP&A ngành bán lẻ', 'Phân tích P&L cửa hàng', 'Phát triển mạng lưới', 'Power BI · SQL Server', 'Agentic AI & web app'],
    en: ['Retail FP&A', 'Store P&L analytics', 'Network expansion', 'Power BI · SQL Server', 'Agentic AI & web apps'],
  },
  tagline: {
    vi: 'Bán lẻ chạy trên biên lợi nhuận mỏng và quyết định nhanh. Tôi giúp ban lãnh đạo ra những quyết định đó một cách tự tin, bằng đúng con số, đúng lúc.',
    en: 'Retail runs on thin margins and fast decisions. I help leadership make those decisions with confidence, with the right numbers at the right time.',
  },
  cv: { vi: 'assets/cv/CV-Tran-Quang-Vinh-VI.pdf', en: 'assets/cv/CV-Tran-Quang-Vinh-EN.pdf' },
};

PF.kpis = [
  { value: 9, suffix: '', label: { vi: 'năm kinh nghiệm hoạch định', en: 'years in planning' }, note: { vi: 'từ 11/2017, 6 năm trong bán lẻ chuỗi', en: 'since 11/2017, 6 in chain retail' }, link: '#hanh-trinh' },
  { value: 50, suffix: '', label: { vi: 'cửa hàng trong phạm vi kế hoạch', en: 'stores in planning scope' }, note: { vi: 'chuỗi nhà sách và bán lẻ toàn quốc', en: 'nationwide bookstore & lifestyle chain' }, link: '#du-an/daily-plan' },
  { value: 20, suffix: '+', label: { vi: 'dự án đầu tư đã thẩm định', en: 'investment projects appraised' }, note: { vi: 'mở mới, di dời, cải tạo, bookcafe, kho', en: 'new stores, relocations, refits, bookcafes, warehouses' }, link: '#du-an/feasibility' },
  { value: 70, suffix: '%', label: { vi: 'yêu cầu dữ liệu chuyển sang tự phục vụ', en: 'data requests now self service' }, note: { vi: 'nhờ Agentic AI, tiết kiệm ~40 giờ/tháng', en: 'via Agentic AI, ~40 hours saved a month' }, link: '#du-an/agentic-ai' },
];

PF.about = {
  intro: {
    vi: 'Tôi phụ trách Bộ phận Kế hoạch tại một chuỗi nhà sách và bán lẻ khoảng 50 cửa hàng trên toàn quốc, báo cáo Tổng Giám đốc và phối hợp chặt với Giám đốc Vận hành, bao gồm cả FP&A, phát triển mạng lưới và mảng dữ liệu, BI.',
    en: 'I lead the Planning Department at a nationwide bookstore and lifestyle retail chain of around 50 stores, reporting to the CEO and working closely with the COO, covering FP&A, network development and the data and BI function.',
  },
  story: {
    vi: 'Sự nghiệp của tôi bắt đầu trong ngành may xuất khẩu, nơi tôi học cách lập kế hoạch sát năng lực và thời hạn thực tế. Sáu năm trong bán lẻ bổ sung góc nhìn tài chính, dữ liệu và công nghệ. Nền tảng Kế toán trưởng cùng SQL, Power BI và Agentic AI giúp tôi biến dữ liệu thành quyết định có cơ sở.',
    en: 'My career started in export garment manufacturing, where I learned to plan against real capacity and real deadlines. Six years in retail added the finance, data and technology side. A Chief Accountant foundation plus SQL, Power BI and Agentic AI let me turn data into well-founded decisions.',
  },
  how: [
    { t: { vi: 'Bắt đầu từ câu hỏi kinh doanh', en: 'Start from the business question' }, d: { vi: 'Không bắt đầu từ dữ liệu. Hỏi trước: quyết định nào cần đưa ra, ai đưa ra, khi nào.', en: 'Not from the data. First ask: which decision, who makes it, and by when.' } },
    { t: { vi: 'Phân tích đủ đơn giản để hành động', en: 'Keep analysis simple enough to act on' }, d: { vi: 'Mô hình gọn, giả định rõ, có kịch bản để ban lãnh đạo thấy được đánh đổi.', en: 'Lean models, explicit assumptions and scenarios so leaders see the trade-offs.' } },
    { t: { vi: 'Kết thúc bằng đề xuất', en: 'End with a recommendation' }, d: { vi: 'Mỗi phân tích đều có kết luận rõ ràng, con số làm cơ sở và rủi ro đi kèm.', en: 'Every piece of work ends with a clear call, the numbers behind it and the risks.' } },
  ],
  focus: [
    { icon: 'plan', t: { vi: 'Hoạch định', en: 'Planning' }, d: { vi: 'Ngân sách năm, kế hoạch tháng, dự báo cuốn chiếu từ công ty đến ngành hàng, cửa hàng và ngày.', en: 'Annual budget, monthly plans, rolling forecasts from company down to category, store and day.' } },
    { icon: 'perf', t: { vi: 'Hiệu quả', en: 'Performance' }, d: { vi: 'P&L cửa hàng, doanh thu/m², biên lãi gộp, vòng quay tồn kho, phân tích chênh lệch.', en: 'Store P&L, sales per m², gross margin, inventory turnover and variance analysis.' } },
    { icon: 'net', t: { vi: 'Mạng lưới', en: 'Network' }, d: { vi: 'Phương án mở mới, di dời, gia hạn thuê, đóng cửa: hoà vốn, hoàn vốn, chi phí rút lui.', en: 'Business cases for openings, relocations, renewals and closures: breakeven, payback, exit cost.' } },
    { icon: 'ai', t: { vi: 'Dữ liệu & AI', en: 'Data & AI' }, d: { vi: 'Kho SQL Server, mô hình Power BI, lớp Agentic AI hỏi bằng ngôn ngữ tự nhiên, web app nội bộ.', en: 'SQL Server warehouse, Power BI model, an Agentic AI layer in plain language, internal web apps.' } },
  ],
  quote: {
    vi: 'Đội tài chính giỏi nhất của thập kỷ tới sẽ dành ít thời gian chuẩn bị số liệu hơn và nhiều thời gian định hình quyết định hơn.',
    en: 'The best finance teams of the next decade will spend less time preparing numbers and more time shaping decisions.',
  },
};

PF.phases = [
  { id: 'mfg', from: 2017, to: 2020, label: { vi: 'Sản xuất may mặc', en: 'Garment manufacturing' }, d: { vi: 'Lập kế hoạch sát năng lực chuyền và hạn giao', en: 'Planning against line capacity and deadlines' } },
  { id: 'retail', from: 2020, to: 2026, label: { vi: 'Kế hoạch & đầu tư bán lẻ', en: 'Retail planning & investment' }, d: { vi: 'FP&A, mặt bằng, thẩm định dự án', en: 'FP&A, real estate, project appraisal' } },
  { id: 'lead', from: 2026, to: 2027, label: { vi: 'Dẫn dắt Kế hoạch · Dữ liệu & AI', en: 'Leading Planning · Data & AI' }, d: { vi: 'Tài chính, dữ liệu và AI như một hệ thống', en: 'Finance, data and AI as one system' } },
];

PF.jobs = [
  {
    id: 'head', phase: 'lead', current: true,
    role: { vi: 'Trưởng bộ phận Kế hoạch', en: 'Head of Planning' },
    org: { vi: 'Công ty TNHH Bán lẻ Phương Nam (thuộc PNC)', en: 'Phuong Nam Retail (PNC)' },
    orgNote: { vi: 'Chuỗi nhà sách và bán lẻ, ~50 cửa hàng', en: 'Bookstore & lifestyle chain, ~50 stores' },
    period: { vi: '03/2026 – nay', en: 'Mar 2026 – present' },
    summary: { vi: 'Phụ trách Bộ phận Kế hoạch, báo cáo Tổng Giám đốc; quản lý FP&A, phát triển mạng lưới và mảng dữ liệu, BI.', en: 'Lead the Planning Department, reporting to the CEO; own FP&A, network development and the data & BI function.' },
    points: {
      vi: [
        'Chủ trì ngân sách năm, kế hoạch kinh doanh tháng và dự báo cuốn chiếu theo ngành hàng, khu vực, cửa hàng',
        'Xây dựng mô hình kế hoạch doanh thu ngày từ dưới lên, tự phân bổ chỉ tiêu đến từng cửa hàng, ngành hàng và ngày',
        'Xây lại chỉ tiêu các tháng còn lại cho toàn bộ ngành hàng trong 5 ngày làm việc sau tái cấu trúc mạng lưới',
        'Mô hình hoá chi phí ngưng sớm (phạt thuê, cọc, chi phí chưa phân bổ, lợi nhuận mất đi) làm cơ sở quyết định đóng cửa',
        'Định giá hợp tác F&B tại các nhà sách lớn cao hơn giá thuê hiện tại từ 50% trở lên',
        'Kết nối dữ liệu doanh thu điểm bán sân bay với hệ thống đơn vị cho thuê, mở lại điểm bán đúng tiến độ',
        'Triển khai Agentic AI trên Power BI: ~70% yêu cầu dữ liệu đột xuất chuyển sang tự phục vụ, tiết kiệm ~40 giờ/tháng',
        'Xây dựng hệ sinh thái web app nội bộ: quản lý công việc, báo cáo, tra cứu dữ liệu và chatbot AI',
      ],
      en: [
        'Lead the annual budget, monthly business plan and rolling forecast by category, region and store',
        'Built a bottom-up daily revenue plan cascading monthly targets to every store, category and day',
        'Rebuilt remaining-year targets for all categories within 5 working days after a network restructuring',
        'Modelled early exit costs (rent penalty, deposit, unamortised fit-out, lost profit) to guide closure decisions',
        'Priced F&B partnerships in flagship stores at 50%+ above current rent',
        'Connected airport outlet sales to the landlord’s revenue system and relaunched the outlet on schedule',
        'Built Agentic AI on Power BI: ~70% of ad hoc data requests became self service, saving ~40 hours a month',
        'Built an internal web app ecosystem: task tracking, reporting, data lookup and an AI chatbot',
      ],
    },
    projects: ['agentic-ai', 'webapp', 'daily-plan', 'exit-cost', 'fnb'],
  },
  {
    id: 'invest', phase: 'retail',
    role: { vi: 'Chuyên viên Kế hoạch Đầu tư', en: 'Investment Planning Specialist' },
    org: { vi: 'Công ty TNHH Bán lẻ Phương Nam (thuộc PNC)', en: 'Phuong Nam Retail (PNC)' },
    orgNote: { vi: 'Phòng Kế hoạch Đầu tư', en: 'Planning & Investment Department' },
    period: { vi: '05/2021 – 02/2026', en: 'May 2021 – Feb 2026' },
    summary: { vi: 'Kế hoạch kinh doanh, quản trị dữ liệu, đầu tư và mặt bằng.', en: 'Business planning, data management, investment and real estate.' },
    points: {
      vi: [
        'Xây dựng và quản lý kế hoạch kinh doanh toàn công ty: quy trình, biểu mẫu, giao chỉ tiêu, điều chỉnh trong năm',
        'Chuyển hệ thống báo cáo từ Excel thủ công sang SQL Server và Power BI với hơn 20 báo cáo quản trị',
        'Chuẩn hoá báo cáo P&L cấp cửa hàng với dashboard tương tác cho Tổng Giám đốc',
        'Quản trị cơ sở dữ liệu kinh doanh, phân quyền truy cập, bảo mật, cung cấp dữ liệu cho các phòng ban',
        'Thẩm định hơn 20 dự án mở mới, di dời, cải tạo cửa hàng, bookcafe, kho bãi và theo dõi sau khai trương',
        'Quản lý danh mục hợp đồng thuê mặt bằng: ký mới, tái ký, cho thuê lại, thương lượng, bàn giao',
        'Triển khai báo cáo xếp hạng SKU R80, R20, R0, RNEW được các ngành hàng dùng hằng tuần',
        'Phân tích tồn kho, số ngày tồn, cảnh báo thiếu hàng và tồn dư, đề xuất điều chuyển và thanh lý',
        'Báo cáo định kỳ và đột xuất cho Sở ban ngành, Ban Quản lý Đường sách và Cảng hàng không',
      ],
      en: [
        'Built and ran the company business plan: process, templates, target setting and in-year revisions',
        'Moved reporting from manual Excel consolidation to SQL Server and Power BI with 20+ management reports',
        'Standardised the store-level P&L report with an interactive dashboard for the CEO',
        'Managed the business database, access rights and data security; supplied data to all departments',
        'Appraised 20+ new store, relocation, refit, bookcafe and warehouse projects and tracked post-opening',
        'Managed the lease portfolio: new leases, renewals, subleases, landlord negotiations, handovers',
        'Introduced R80, R20, R0 and RNEW SKU ranking reports used weekly by category teams',
        'Ran inventory analysis: stock days, out-of-stock and overstock alerts, transfer and clearance proposals',
        'Prepared regulatory reports for city departments, the Book Street board and airport authorities',
      ],
    },
    projects: ['bi-stack', 'feasibility', 'sku-rank', 'inventory'],
  },
  {
    id: 'general', phase: 'retail',
    role: { vi: 'Nhân viên Kế hoạch tổng hợp', en: 'General Planning Officer' },
    org: { vi: 'Công ty TNHH Bán lẻ Phương Nam (thuộc PNC)', en: 'Phuong Nam Retail (PNC)' },
    orgNote: { vi: 'Hệ thống nhà sách Phương Nam', en: 'Phuong Nam bookstore network' },
    period: { vi: '10/2020 – 04/2021', en: 'Oct 2020 – Apr 2021' },
    summary: { vi: 'Kế hoạch kinh doanh và báo cáo cho hệ thống bán lẻ.', en: 'Business planning and reporting for the retail network.' },
    points: {
      vi: [
        'Tham gia xây dựng kế hoạch kinh doanh năm, tháng cho hệ thống bán lẻ',
        'Theo dõi, báo cáo kết quả ngày, tuần, tháng theo cửa hàng và ngành hàng; phân tích đột xuất',
        'Tự động hoá báo cáo bằng Excel, VBA, SQL, Power BI, giảm tổng hợp thủ công',
        'Lên kế hoạch chương trình bán hàng, sự kiện tại cửa hàng và đo lường hiệu quả',
      ],
      en: [
        'Took part in building annual and monthly business plans for the retail network',
        'Tracked and reported daily, weekly and monthly results by store and category; ad hoc analysis',
        'Automated reports with Excel, VBA, SQL and Power BI, cutting manual consolidation',
        'Planned sales programmes and in-store events and measured their impact',
      ],
    },
    projects: ['bi-stack'],
  },
  {
    id: 'hoaphat', phase: 'mfg',
    role: { vi: 'Quản lý sản xuất', en: 'Production Manager' },
    org: { vi: 'Công ty May Hoà Phát', en: 'Hoa Phat Garment' },
    orgNote: { vi: 'Sản xuất may mặc', en: 'Garment manufacturing' },
    period: { vi: '04/2020 – 09/2020', en: 'Apr 2020 – Sep 2020' },
    summary: { vi: 'Đưa mọi đơn hàng từ lúc xác nhận đến khi giao đúng hạn.', en: 'Took every order from confirmation to on-time delivery.' },
    points: {
      vi: [
        'Lập kế hoạch sản xuất toàn công ty ngay khi xác nhận đơn hàng',
        'Chuyển đơn hàng thành nhu cầu nguyên liệu và lịch sản xuất theo chuyền, mã hàng, ngày giao',
        'Cân đối năng lực chuyền với sản lượng và thời hạn; điều phối kinh doanh, mua hàng, cắt, may, QC, kho',
        'Lập biểu mẫu kế hoạch và báo cáo tiến độ cho Ban lãnh đạo theo dõi toàn bộ đơn hàng',
      ],
      en: [
        'Built company-wide production plans as soon as orders were confirmed',
        'Converted orders into material requirements and schedules by line, style and delivery date',
        'Balanced line capacity against volume and deadlines; coordinated merchandising, purchasing, cutting, sewing, QC, warehouse',
        'Set up planning templates and progress reports giving management one view of all open orders',
      ],
    },
    projects: [],
  },
  {
    id: 'viettien', phase: 'mfg',
    role: { vi: 'Nhân viên Kế hoạch sản xuất', en: 'Production Planning Officer' },
    org: { vi: 'Tổng Công ty May Việt Tiến', en: 'Viet Tien Garment Corporation' },
    orgNote: { vi: 'Sản xuất may mặc xuất khẩu', en: 'Export garment manufacturing' },
    period: { vi: '11/2017 – 03/2020', en: 'Nov 2017 – Mar 2020' },
    summary: { vi: 'Kế hoạch đơn hàng xuất khẩu trọn vòng tại một trong những doanh nghiệp may lớn nhất Việt Nam.', en: 'End-to-end export order planning at one of Vietnam’s largest garment makers.' },
    points: {
      vi: [
        'Lập kế hoạch đơn hàng xuất khẩu trọn vòng: nguyên phụ liệu, mua hàng, hợp đồng, lịch sản xuất, hải quan, xuất hàng',
        'Tính nhu cầu nguyên liệu theo mã hàng và theo dõi vải, phụ liệu về so với kế hoạch',
        'Giám sát tiến độ tại xí nghiệp; phối hợp xây dựng thông số, tiêu chuẩn kỹ thuật sản phẩm mới',
        'Phối hợp kinh doanh, kỹ thuật, QA xử lý vướng mắc để giao hàng đúng tiến độ',
      ],
      en: [
        'Planned export orders end to end: materials, purchasing, contracts, scheduling, customs and shipment',
        'Calculated material requirements by style and tracked fabric and trim arrivals against plan',
        'Monitored factory execution; helped set technical parameters and standards for new products',
        'Worked with merchandising, technical and QA teams to keep deliveries on schedule',
      ],
    },
    projects: [],
  },
];

PF.categories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All' } },
  { id: 'fpa', label: { vi: 'FP&A', en: 'FP&A' } },
  { id: 'network', label: { vi: 'Mạng lưới & mặt bằng', en: 'Network & real estate' } },
  { id: 'data', label: { vi: 'Dữ liệu & AI', en: 'Data & AI' } },
  { id: 'app', label: { vi: 'Web app', en: 'Web apps' } },
];

PF.projects = [
  {
    id: 'agentic-ai', cat: ['data'], year: '2026', icon: 'ai', hue: 172, featured: true,
    title: { vi: 'Agentic AI trên Power BI', en: 'Agentic AI on Power BI' },
    tagline: { vi: 'Quản lý hỏi bằng tiếng Việt, AI agent tự viết DAX, truy vấn, giải thích chênh lệch và gửi cảnh báo KPI theo lịch.', en: 'Managers ask in plain language; AI agents write DAX, query the model, explain variances and push scheduled KPI alerts.' },
    metrics: [
      { v: '~70%', l: { vi: 'yêu cầu đột xuất tự phục vụ', en: 'ad hoc requests self served' } },
      { v: '~40h', l: { vi: 'tiết kiệm mỗi tháng', en: 'saved every month' } },
      { v: '24/7', l: { vi: 'trả lời không chờ phòng KH', en: 'answers without waiting' } },
    ],
    context: { vi: 'Phòng Kế hoạch nhận rất nhiều yêu cầu số liệu đột xuất từ ban lãnh đạo và các ngành hàng: doanh thu cửa hàng X tuần này, vì sao ngành hàng Y giảm… Mỗi yêu cầu nhỏ nhưng cộng lại chiếm phần lớn thời gian của đội.', en: 'The Planning team received a constant stream of ad hoc data questions from leadership and category teams: store X sales this week, why category Y dropped… Each one small, together they ate most of the team’s time.' },
    problem: { vi: 'Làm sao để người hỏi tự có câu trả lời đúng, nhất quán với số liệu chính thức, mà không cần biết DAX hay mở Power BI?', en: 'How can people get correct answers, consistent with official numbers, without knowing DAX or opening Power BI?' },
    role: { vi: 'Thiết kế giải pháp, chuẩn hoá mô hình ngữ nghĩa, viết bộ hướng dẫn cho agent, kiểm thử độ chính xác và triển khai.', en: 'Designed the solution, cleaned the semantic model, wrote the agent instructions, tested accuracy and rolled it out.' },
    approach: {
      vi: ['Chuẩn hoá mô hình ngữ nghĩa Power BI trên kho SQL Server: tên bảng, measure, mô tả rõ nghĩa kinh doanh', 'Viết bộ câu hỏi mẫu và đáp án chuẩn để chấm điểm agent', 'Agent nhận câu hỏi → chọn measure → tự viết DAX → chạy → diễn giải kết quả bằng lời', 'Thêm lớp giải thích chênh lệch (so kế hoạch, cùng kỳ) và cảnh báo KPI gửi theo lịch', 'Đo tỷ lệ câu hỏi được tự phục vụ và thời gian tiết kiệm'],
      en: ['Cleaned the Power BI semantic model on SQL Server: clear table, measure and business descriptions', 'Wrote a benchmark set of questions with reference answers to score the agent', 'Agent takes a question → picks measures → writes DAX → runs it → explains the result in words', 'Added variance explanation (vs plan, vs last year) and scheduled KPI alerts', 'Tracked self-service rate and hours saved'],
    },
    impact: {
      vi: ['Khoảng 70% yêu cầu dữ liệu đột xuất chuyển sang tự phục vụ', 'Tiết kiệm khoảng 40 giờ làm việc mỗi tháng cho phòng Kế hoạch', 'Câu trả lời dùng chung một mô hình số liệu nên nhất quán với báo cáo chính thức', 'Đội Kế hoạch dành thời gian cho phân tích và đề xuất thay vì trích số'],
      en: ['About 70% of ad hoc data requests became self service', 'Around 40 working hours saved per month for the Planning team', 'Answers come from one semantic model, consistent with official reports', 'The team spends time on analysis and recommendations instead of pulling numbers'],
    },
    tools: ['Power BI', 'DAX', 'SQL Server', 'LLM / Claude', 'Prompt design'],
    demo: 'agent',
  },
  {
    id: 'webapp', cat: ['app', 'data'], year: '2026', icon: 'app', hue: 200, featured: true,
    title: { vi: 'Hệ sinh thái web app phòng Kế hoạch', en: 'Planning web app ecosystem' },
    tagline: { vi: '3 web app dùng chung một hệ tài khoản: quản lý việc, báo cáo ngày, báo cáo tuần, tra cứu dữ liệu và trợ lý AI, xây bằng phát triển có AI hỗ trợ.', en: 'Three web apps on one account system: task tracking, daily and weekly reports, data lookup and an AI assistant, built with AI-assisted development.' },
    metrics: [
      { v: '3', l: { vi: 'web app trên một nền', en: 'apps on one platform' } },
      { v: '15+', l: { vi: 'module nghiệp vụ', en: 'business modules' } },
      { v: '1', l: { vi: 'hệ tài khoản & phân quyền chung', en: 'shared login & permissions' } },
    ],
    context: { vi: 'Công việc của phòng nằm rải rác ở Excel, email và chat: giao việc khó theo dõi, báo cáo ngày làm tay, danh bạ và hợp đồng mỗi người giữ một bản.', en: 'The team’s work was scattered across Excel, email and chat: tasks hard to track, daily reports built by hand, contacts and leases in personal copies.' },
    problem: { vi: 'Cần một hệ thống nội bộ gọn, an toàn, rẻ, do chính phòng Kế hoạch làm chủ và mở rộng nhanh theo nhu cầu.', en: 'We needed a lean, secure, low-cost internal system the Planning team owns and can extend quickly.' },
    role: { vi: 'Làm sản phẩm từ đầu đến cuối: brainstorm yêu cầu với Claude, thiết kế dữ liệu và phân quyền, xây giao diện, kiểm thử, triển khai và hướng dẫn người dùng.', en: 'End-to-end product owner and builder: brainstormed requirements with Claude, designed data and permissions, built the UI, tested, deployed and trained users.' },
    approach: {
      vi: ['Brainstorm yêu cầu và quy trình với Claude, chốt thành đặc tả từng giai đoạn', 'Supabase (Postgres + Auth + Row Level Security) làm nền dữ liệu và phân quyền theo email', 'Giao diện web tĩnh triển khai trên Netlify, GitHub làm kho mã và lịch sử thay đổi', 'Trợ lý AI chạy ở edge function, khoá API giữ trong biến môi trường, không lộ ra trình duyệt', 'Mỗi giai đoạn có file SQL kiểm thử tự động trước khi đưa lên'],
      en: ['Brainstormed requirements and workflows with Claude, then fixed them into phase specs', 'Supabase (Postgres + Auth + Row Level Security) for data and per-email permissions', 'Static web front end on Netlify, GitHub for code and change history', 'AI assistant on an edge function; API keys stay in environment variables, never in the browser', 'Every phase ships with automated SQL tests before release'],
    },
    impact: {
      vi: ['Việc Nhóm: giao việc, deadline, nhắc trưởng nhóm, danh bạ, hợp đồng & lịch hạn, soạn thảo văn bản', 'Báo cáo bán hàng ngày và báo cáo tuần (WSR) tự động', 'Dashboard P&L, mô hình tài chính, dự án khả thi, bản đồ điểm bán (site mapping), đối thủ cạnh tranh', 'Trợ lý AI "Vịt Kota" trả lời câu hỏi nghiệp vụ ngay trong app'],
      en: ['Team workspace: task assignment, deadlines, lead alerts, contacts, leases & due dates, document drafting', 'Automated daily sales and weekly (WSR) reports', 'P&L dashboard, financial model, project feasibility, store site mapping, competitor tracking', '“Vịt Kota” AI assistant answering business questions inside the app'],
    },
    tools: ['JavaScript', 'Supabase', 'PostgreSQL', 'Netlify', 'GitHub', 'Claude'],
    demo: 'arch',
  },
  {
    id: 'daily-plan', cat: ['fpa'], year: '2026', icon: 'plan', hue: 150, featured: true,
    title: { vi: 'Kế hoạch doanh thu ngày từ dưới lên', en: 'Bottom-up daily revenue plan' },
    tagline: { vi: 'Mô hình tự phân bổ chỉ tiêu tháng xuống từng cửa hàng, ngành hàng và ngày, theo dõi thực hiện hằng tuần.', en: 'A model that cascades monthly targets to every store, category and day, tracked weekly against actuals.' },
    metrics: [
      { v: '50 × n', l: { vi: 'cửa hàng × ngành hàng × ngày', en: 'stores × categories × days' } },
      { v: '5', l: { vi: 'ngày làm việc để xây lại chỉ tiêu', en: 'working days to rebuild targets' } },
    ],
    context: { vi: 'Chỉ tiêu tháng giao ở cấp cửa hàng không cho cửa hàng biết mỗi ngày cần bán bao nhiêu; cuối tuần, ngày lễ, mùa tựu trường có sức mua rất khác ngày thường.', en: 'Monthly store targets did not tell a store what to sell each day; weekends, holidays and back-to-school behave very differently from weekdays.' },
    problem: { vi: 'Phân bổ chỉ tiêu sao cho sát hành vi bán thực tế, và đủ linh hoạt để xây lại nhanh khi mạng lưới thay đổi.', en: 'Allocate targets in line with real selling patterns, flexible enough to rebuild quickly when the network changes.' },
    role: { vi: 'Thiết kế logic phân bổ, xây mô hình, thống nhất cách giao với Vận hành và các ngành hàng.', en: 'Designed the allocation logic, built the model and agreed the rollout with Operations and category teams.' },
    approach: {
      vi: ['Tách chỉ tiêu tháng theo tỷ trọng cửa hàng (lịch sử, diện tích, xu hướng)', 'Tách tiếp theo cơ cấu ngành hàng của từng cửa hàng', 'Phân xuống ngày theo hệ số thứ trong tuần, ngày lễ, sự kiện', 'Đối chiếu thực hiện hằng tuần, tự cân lại phần còn lại của tháng'],
      en: ['Split the monthly target by store weight (history, space, trend)', 'Split again by each store’s category mix', 'Push down to days with weekday, holiday and event factors', 'Compare weekly actuals and re-balance the rest of the month'],
    },
    impact: {
      vi: ['Mỗi cửa hàng, mỗi ngành hàng có chỉ tiêu theo ngày', 'Sau tái cấu trúc mạng lưới, xây lại chỉ tiêu các tháng còn lại cho toàn bộ ngành hàng chỉ trong 5 ngày làm việc', 'Lập dự báo cả năm làm nền cho kế hoạch năm sau'],
      en: ['Every store and category has a daily target', 'After a network restructuring, remaining-year targets for all categories were rebuilt in 5 working days', 'Full-year forecast that sets the baseline for next year’s plan'],
    },
    tools: ['Excel', 'Power Query', 'SQL Server', 'Power BI'],
    demo: 'cascade',
  },
  {
    id: 'exit-cost', cat: ['network', 'fpa'], year: '2026', icon: 'exit', hue: 15,
    title: { vi: 'Mô hình chi phí đóng cửa điểm bán', en: 'Store exit cost model' },
    tagline: { vi: 'So sánh ngưng sớm với kinh doanh đến hết hạn thuê để chọn phương án ít tốn kém nhất cho cửa hàng kém hiệu quả.', en: 'Compares closing early with trading to lease expiry to find the cheapest path for underperforming stores.' },
    metrics: [
      { v: '4', l: { vi: 'khoản chi phí được lượng hoá', en: 'cost components quantified' } },
      { v: 'A / B', l: { vi: 'phương án so sánh song song', en: 'side-by-side options' } },
    ],
    context: { vi: 'Một số cửa hàng lỗ kéo dài nhưng hợp đồng thuê còn hạn. Đóng ngay thì mất cọc, bị phạt; chạy tiếp thì lỗ cộng dồn.', en: 'Some stores lost money for long periods while their leases still ran. Closing now means penalties and lost deposits; staying means mounting losses.' },
    problem: { vi: 'Đâu là điểm mà đóng sớm rẻ hơn chạy tiếp, và nên đàm phán lại với chủ nhà ở mức nào?', en: 'At what point is closing cheaper than staying, and what should we renegotiate with the landlord?' },
    role: { vi: 'Xây mô hình, thu thập điều khoản hợp đồng, trình bày đề xuất cho Tổng Giám đốc.', en: 'Built the model, gathered lease terms and presented recommendations to the CEO.' },
    approach: {
      vi: ['Lượng hoá 4 khoản: phạt thuê, tiền cọc, chi phí đầu tư chưa phân bổ, lợi nhuận mất đi', 'Dựng phương án A (đóng sớm) và B (chạy đến hết hạn) theo dòng tiền', 'Tìm tháng hoà vốn giữa hai phương án và độ nhạy theo mức lỗ', 'Đề xuất: đóng, giữ, hay đàm phán giảm giá thuê / diện tích'],
      en: ['Quantified 4 components: rent penalty, deposit, unamortised fit-out, lost profit', 'Built option A (close early) and B (trade to expiry) on a cash basis', 'Found the break-even month between options and sensitivity to losses', 'Recommendation: close, keep, or renegotiate rent / space'],
    },
    impact: {
      vi: ['Ban lãnh đạo có góc nhìn rõ ràng, bằng số, về cửa hàng nào nên đóng hay đàm phán lại', 'Làm cơ sở cho đợt tái cấu trúc mạng lưới', 'Hỗ trợ đàm phán giá thuê và diện tích với trung tâm thương mại, chủ nhà'],
      en: ['Leadership got a clear, numbers-based view of which stores to close or renegotiate', 'Basis for the network restructuring', 'Supported rent and space negotiations with malls and landlords'],
    },
    tools: ['Excel', 'Financial modelling', 'Scenario analysis'],
    demo: 'exit',
  },
  {
    id: 'feasibility', cat: ['network'], year: '2021–2026', icon: 'store', hue: 40,
    title: { vi: 'Thẩm định dự án mở mới & di dời', en: 'New store & relocation appraisal' },
    tagline: { vi: 'Hơn 20 dự án mở mới, di dời, cải tạo cửa hàng, bookcafe và kho bãi được thẩm định và theo dõi sau khai trương.', en: '20+ new store, relocation, refit, bookcafe and warehouse projects appraised and tracked after opening.' },
    metrics: [
      { v: '20+', l: { vi: 'dự án thẩm định', en: 'projects appraised' } },
      { v: '3', l: { vi: 'chỉ tiêu: hoà vốn, hoàn vốn, NPV', en: 'tests: breakeven, payback, NPV' } },
    ],
    context: { vi: 'Mỗi mặt bằng mới là cam kết tiền thuê nhiều năm và vốn đầu tư lớn. Quyết định cần dựa trên cùng một khung đánh giá.', en: 'Every new site commits years of rent and significant capex. Decisions need one consistent appraisal framework.' },
    problem: { vi: 'Doanh thu phải đạt bao nhiêu để hoà vốn, bao lâu thu hồi vốn, và dự án có tạo giá trị trong thời hạn thuê không?', en: 'What sales are needed to break even, how long to pay back, and does the project create value over the lease?' },
    role: { vi: 'Khảo sát, dự phóng doanh thu, lập mô hình đầu tư, trình hội đồng và theo dõi thực tế sau khai trương.', en: 'Site survey, sales projection, investment model, committee presentation and post-opening tracking.' },
    approach: {
      vi: ['Dự phóng doanh thu theo vị trí, lưu lượng khách, cửa hàng tương đồng', 'Lập P&L dự kiến: biên lãi gộp, thuê, nhân sự, chi phí khác', 'Tính doanh thu hoà vốn, thời gian hoàn vốn, NPV theo thời hạn thuê', 'So thực tế với phương án sau khai trương để hiệu chỉnh mô hình'],
      en: ['Projected sales from location, footfall and comparable stores', 'Built a projected P&L: gross margin, rent, staff, other costs', 'Calculated breakeven sales, payback and NPV over the lease term', 'Compared actuals with the case after opening to calibrate the model'],
    },
    impact: {
      vi: ['Khung thẩm định thống nhất cho mọi dự án mạng lưới', 'Theo dõi hiệu quả sau khai trương, học từ chênh lệch dự phóng', 'Quản lý danh mục hợp đồng thuê: ký mới, tái ký, cho thuê lại, bàn giao'],
      en: ['One appraisal framework for every network project', 'Post-opening tracking to learn from forecast gaps', 'Lease portfolio management: new leases, renewals, subleases, handovers'],
    },
    tools: ['Excel', 'NPV / IRR', 'Power BI'],
    demo: 'feasibility',
  },
  {
    id: 'fnb', cat: ['network'], year: '2026', icon: 'cup', hue: 28,
    title: { vi: 'Định giá hợp tác F&B trong nhà sách', en: 'F&B partnership pricing' },
    tagline: { vi: 'Biến diện tích dư trong các nhà sách lớn thành nguồn thu mới, với giá hợp tác cao hơn giá thuê hiện tại từ 50%.', en: 'Turned surplus space in flagship bookstores into new income, priced 50%+ above current rent.' },
    metrics: [
      { v: '+50%', l: { vi: 'so với giá thuê hiện tại', en: 'above current rent' } },
      { v: 'MG + %', l: { vi: 'thu tối thiểu + chia doanh thu', en: 'minimum guarantee + revenue share' } },
    ],
    context: { vi: 'Một số nhà sách lớn có diện tích chưa khai thác hết, trong khi các thương hiệu F&B muốn vị trí có sẵn lưu lượng khách.', en: 'Some flagship bookstores had under-used space while F&B brands wanted locations with built-in footfall.' },
    problem: { vi: 'Định giá thế nào để vừa hấp dẫn đối tác, vừa đảm bảo nguồn thu cao hơn chi phí thuê của chính diện tích đó?', en: 'How to price so it attracts partners and still earns well above the rent we pay for that space?' },
    role: { vi: 'Phân tích chi phí chiếm dụng, xây cấu trúc giá, hỗ trợ đàm phán.', en: 'Occupancy cost analysis, price structure design, negotiation support.' },
    approach: {
      vi: ['Tính chi phí chiếm dụng thực tế của từng m²', 'Ước doanh thu của đối tác F&B theo lưu lượng khách nhà sách', 'Thiết kế cấu trúc thu tối thiểu (MG) cộng chia % doanh thu', 'Chạy độ nhạy theo doanh thu đối tác để chọn mức MG và % hợp lý'],
      en: ['Calculated the true occupancy cost per m²', 'Estimated partner revenue from bookstore footfall', 'Designed a minimum guarantee (MG) plus revenue share structure', 'Ran sensitivity on partner revenue to set MG and share'],
    },
    impact: {
      vi: ['Giá hợp tác cao hơn giá thuê hiện tại từ 50% trở lên', 'Tạo nguồn thu mới từ diện tích dư', 'Tăng trải nghiệm và thời gian khách ở lại nhà sách'],
      en: ['Partnership pricing 50%+ above current rent', 'New income from surplus space', 'Better customer experience and dwell time in stores'],
    },
    tools: ['Excel', 'Pricing', 'Negotiation'],
    demo: 'fnb',
  },
  {
    id: 'bi-stack', cat: ['data'], year: '2021–2025', icon: 'db', hue: 220,
    title: { vi: 'Từ Excel thủ công sang SQL Server + Power BI', en: 'From manual Excel to SQL Server + Power BI' },
    tagline: { vi: 'Xây lại toàn bộ hệ thống báo cáo quản trị trên kho dữ liệu SQL Server và Power BI với hơn 20 báo cáo, có dashboard P&L cửa hàng cho Tổng Giám đốc.', en: 'Rebuilt management reporting on a SQL Server warehouse and Power BI with 20+ reports, including a store P&L dashboard for the CEO.' },
    metrics: [
      { v: '20+', l: { vi: 'báo cáo quản trị', en: 'management reports' } },
      { v: '1', l: { vi: 'nguồn số liệu duy nhất', en: 'single source of truth' } },
    ],
    context: { vi: 'Báo cáo được tổng hợp bằng tay từ nhiều file Excel, mất nhiều giờ, dễ sai và mỗi phòng một con số.', en: 'Reports were consolidated by hand from many Excel files: slow, error-prone, and every department had its own number.' },
    problem: { vi: 'Một nguồn số liệu duy nhất, tự cập nhật, phân quyền rõ, đủ nhanh cho cả báo cáo ngày.', en: 'One automatically refreshed source of truth with clear access rights, fast enough for daily reporting.' },
    role: { vi: 'Thiết kế kho dữ liệu, viết SQL, dựng mô hình Power BI, quản trị phân quyền và bảo mật.', en: 'Designed the warehouse, wrote SQL, built the Power BI model, managed access and security.' },
    approach: {
      vi: ['Gom dữ liệu bán hàng, tồn kho, chi phí về SQL Server', 'Chuẩn hoá danh mục cửa hàng, ngành hàng, SKU', 'Dựng mô hình ngữ nghĩa Power BI và bộ measure DAX dùng chung', 'Phát hành hơn 20 báo cáo, phân quyền theo vai trò'],
      en: ['Brought sales, inventory and cost data into SQL Server', 'Standardised store, category and SKU masters', 'Built a Power BI semantic model with shared DAX measures', 'Published 20+ reports with role-based access'],
    },
    impact: {
      vi: ['Hơn 20 báo cáo quản trị chạy tự động', 'Dashboard P&L cửa hàng tương tác cho Tổng Giám đốc', 'Nền móng cho Agentic AI sau này'],
      en: ['20+ automated management reports', 'Interactive store P&L dashboard for the CEO', 'Foundation for the later Agentic AI layer'],
    },
    tools: ['SQL Server', 'Power BI', 'DAX', 'Power Query', 'VBA'],
    demo: 'pipeline',
  },
  {
    id: 'sku-rank', cat: ['data'], year: '2022', icon: 'rank', hue: 265,
    title: { vi: 'Xếp hạng SKU R80 · R20 · R0 · RNEW', en: 'SKU ranking R80 · R20 · R0 · RNEW' },
    tagline: { vi: 'Báo cáo phân hạng mặt hàng được các ngành hàng dùng hằng tuần để mua hàng, phân bổ, điều chuyển và thanh lý.', en: 'A weekly SKU ranking used by category teams for buying, allocation, transfers and clearance.' },
    metrics: [
      { v: '4', l: { vi: 'hạng hành động', en: 'action tiers' } },
      { v: 'Hằng tuần', l: { vi: 'ngành hàng sử dụng', en: 'used by category teams' } },
    ],
    context: { vi: 'Nhà sách có danh mục hàng chục nghìn mã. Ngành hàng cần biết nhanh mã nào giữ, mã nào đẩy, mã nào xả.', en: 'A bookstore carries tens of thousands of SKUs. Category teams need to know quickly what to keep, push or clear.' },
    problem: { vi: 'Phân hạng đơn giản, dễ hiểu, gắn trực tiếp với hành động mua hàng.', en: 'A simple, intuitive ranking tied directly to buying actions.' },
    role: { vi: 'Thiết kế quy tắc phân hạng, xây báo cáo, hướng dẫn ngành hàng sử dụng.', en: 'Designed the ranking rules, built the report and trained category teams.' },
    approach: {
      vi: ['R80: nhóm mã tạo 80% doanh thu → ưu tiên tồn, không để đứt hàng', 'R20: phần còn lại có bán → theo dõi, tối ưu số lượng', 'R0: không phát sinh bán trong kỳ → điều chuyển, thanh lý', 'RNEW: hàng mới → theo dõi riêng, không xếp chung để tránh xả nhầm'],
      en: ['R80: SKUs making 80% of sales → protect stock, avoid stock-outs', 'R20: the rest that sells → monitor and right-size', 'R0: no sales in the period → transfer or clear', 'RNEW: new arrivals → tracked separately so they are not cleared too early'],
    },
    impact: {
      vi: ['Các ngành hàng dùng hằng tuần cho mua hàng và phân bổ', 'Kết hợp cảnh báo thiếu hàng, tồn dư, số ngày tồn', 'Đề xuất điều chuyển và thanh lý có cơ sở'],
      en: ['Used weekly by category teams for buying and allocation', 'Combined with out-of-stock, overstock and stock-day alerts', 'Evidence-based transfer and clearance proposals'],
    },
    tools: ['SQL Server', 'Power BI', 'Pareto analysis'],
    demo: 'pareto',
  },
  {
    id: 'inventory', cat: ['app', 'fpa'], year: '2025', icon: 'box', hue: 95,
    title: { vi: 'Ứng dụng định mức tồn kho', en: 'Inventory norm app' },
    tagline: { vi: 'Tính tồn kho an toàn theo mức phục vụ cho từng cửa hàng và ngành hàng, có biểu đồ chi tiết.', en: 'Calculates safety stock by service level for every store and category, with drilldown charts.' },
    metrics: [
      { v: 'z·σ·√L', l: { vi: 'công thức tồn an toàn', en: 'safety stock formula' } },
      { v: '90–99%', l: { vi: 'mức phục vụ lựa chọn', en: 'service levels' } },
    ],
    context: { vi: 'Cửa hàng hoặc thiếu hàng bán chạy, hoặc ôm hàng chậm. Định mức tồn kho trước đây theo kinh nghiệm.', en: 'Stores were either out of best-sellers or overloaded with slow movers. Stock norms were set by gut feel.' },
    problem: { vi: 'Định mức tồn theo thống kê nhu cầu thực tế và thời gian bổ sung hàng, với mức phục vụ chọn được.', en: 'Stock norms based on real demand statistics and replenishment lead time, at a chosen service level.' },
    role: { vi: 'Xây logic thống kê và ứng dụng tính toán.', en: 'Built the statistical logic and the calculator app.' },
    approach: {
      vi: ['Tính nhu cầu bình quân và độ lệch chuẩn theo ngày', 'Chọn mức phục vụ → hệ số z', 'Tồn an toàn = z × σ × √(thời gian giao hàng)', 'Điểm đặt hàng = nhu cầu trong thời gian giao + tồn an toàn'],
      en: ['Computed daily mean demand and standard deviation', 'Pick a service level → z factor', 'Safety stock = z × σ × √(lead time)', 'Reorder point = demand over lead time + safety stock'],
    },
    impact: {
      vi: ['Định mức theo dữ liệu thay cho cảm tính', 'Xem chi tiết theo cửa hàng và ngành hàng', 'Hỗ trợ cảnh báo thiếu hàng và tồn dư'],
      en: ['Data-driven norms instead of gut feel', 'Drilldowns by store and category', 'Supports out-of-stock and overstock alerts'],
    },
    tools: ['React', 'Statistics', 'Excel'],
    demo: 'safety',
  },
];

PF.skills = {
  radar: [
    { k: 'fpa', l: { vi: 'FP&A', en: 'FP&A' }, v: 95 },
    { k: 'pl', l: { vi: 'P&L cửa hàng', en: 'Store P&L' }, v: 92 },
    { k: 'invest', l: { vi: 'Thẩm định đầu tư', en: 'Investment appraisal' }, v: 88 },
    { k: 'bi', l: { vi: 'Power BI · DAX', en: 'Power BI · DAX' }, v: 90 },
    { k: 'sql', l: { vi: 'SQL Server', en: 'SQL Server' }, v: 85 },
    { k: 'ai', l: { vi: 'Agentic AI · web app', en: 'Agentic AI · web apps' }, v: 86 },
  ],
  groups: [
    { t: { vi: 'Tài chính & kế hoạch', en: 'Finance & planning' }, items: [
      { n: { vi: 'Ngân sách & kế hoạch', en: 'Budgeting & planning' }, p: ['daily-plan'] },
      { n: { vi: 'Dự báo cuốn chiếu', en: 'Rolling forecast' }, p: ['daily-plan'] },
      { n: { vi: 'Phân tích chênh lệch', en: 'Variance analysis' }, p: ['agentic-ai', 'daily-plan'] },
      { n: { vi: 'P&L cửa hàng', en: 'Store P&L' }, p: ['bi-stack', 'exit-cost'] },
      { n: { vi: 'Mô hình tài chính', en: 'Financial modelling' }, p: ['exit-cost', 'feasibility', 'fnb'] },
      { n: { vi: 'Kế toán trưởng', en: 'Chief accountant' }, p: [] },
    ] },
    { t: { vi: 'Mạng lưới & mặt bằng', en: 'Network & real estate' }, items: [
      { n: { vi: 'Thẩm định mở mới', en: 'Site feasibility' }, p: ['feasibility'] },
      { n: { vi: 'Hoà vốn · hoàn vốn · NPV', en: 'Breakeven · payback · NPV' }, p: ['feasibility'] },
      { n: { vi: 'Chi phí rút lui', en: 'Exit cost' }, p: ['exit-cost'] },
      { n: { vi: 'Đàm phán thuê', en: 'Lease negotiation' }, p: ['exit-cost', 'fnb'] },
      { n: { vi: 'Định giá hợp tác', en: 'Partnership pricing' }, p: ['fnb'] },
      { n: { vi: 'Tồn kho & SKU', en: 'Inventory & SKU' }, p: ['sku-rank', 'inventory'] },
    ] },
    { t: { vi: 'Dữ liệu & AI', en: 'Data & AI' }, items: [
      { n: 'SQL Server', p: ['bi-stack', 'sku-rank', 'agentic-ai'] },
      { n: 'Power BI · DAX', p: ['bi-stack', 'agentic-ai', 'sku-rank'] },
      { n: 'Excel · VBA · Power Query', p: ['daily-plan', 'exit-cost', 'feasibility', 'fnb'] },
      { n: 'Agentic AI · LLM', p: ['agentic-ai', 'webapp'] },
      { n: 'Supabase · Netlify', p: ['webapp'] },
      { n: 'JavaScript · React', p: ['webapp', 'inventory'] },
      { n: 'Azure ML', p: [] },
    ] },
  ],
  soft: {
    vi: ['Tư duy phân tích và giải quyết vấn đề', 'Trình bày, báo cáo cho Ban lãnh đạo', 'Đàm phán với đối tác, chủ nhà', 'Phối hợp liên phòng ban', 'Kèm cặp và phát triển nhân sự'],
    en: ['Analytical thinking and problem solving', 'Presenting to leadership', 'Negotiating with partners and landlords', 'Cross-functional collaboration', 'Coaching and developing people'],
  },
  languages: [
    { n: { vi: 'Tiếng Việt', en: 'Vietnamese' }, l: { vi: 'Bản ngữ', en: 'Native' }, v: 100 },
    { n: { vi: 'Tiếng Anh', en: 'English' }, l: { vi: 'Giao tiếp công việc', en: 'Professional working' }, v: 70 },
    { n: { vi: 'Tiếng Nhật', en: 'Japanese' }, l: { vi: 'Cơ bản', en: 'Elementary' }, v: 25 },
  ],
};

PF.education = {
  degree: { vi: 'Cử nhân Quản trị Kinh doanh', en: 'Bachelor of Business Administration' },
  school: { vi: 'Trường Đại học Kinh tế TP. Hồ Chí Minh (UEH)', en: 'University of Economics Ho Chi Minh City (UEH)' },
  period: '2013 – 2017',
};

PF.certs = [
  { n: 'AI Workflow Automation', by: 'SkillsBridge', y: 2026, g: 'ai' },
  { n: 'Claude Productivity', by: 'SkillsBridge', y: 2026, g: 'ai' },
  { n: { vi: 'Kế toán trưởng chuyên nghiệp', en: 'Professional Chief Accountant' }, by: 'Clever CFO', y: 2023, g: 'fin' },
  { n: { vi: 'Máy học với Azure ML', en: 'Machine Learning with Azure ML' }, by: { vi: 'ĐH Khoa học Tự nhiên', en: 'University of Science' }, y: 2023, g: 'ai' },
  { n: 'Business Intelligence Program', by: 'Mastering Data Analytics', y: 2022, g: 'data' },
  { n: { vi: 'Power BI báo cáo tài chính', en: 'Power BI for financial reporting' }, by: 'Gitiho', y: 2022, g: 'data' },
  { n: { vi: 'Phân tích khách hàng RFM bằng Power BI', en: 'Customer RFM analysis in Power BI' }, by: 'Gitiho', y: 2022, g: 'data' },
  { n: { vi: 'Phân tích BCTC và mô hình tài chính', en: 'Financial statement analysis & modelling' }, by: 'Gitiho', y: 2021, g: 'fin' },
  { n: { vi: 'Hệ thống báo cáo quản trị bằng Excel', en: 'Management reporting system in Excel' }, by: 'Gitiho', y: 2021, g: 'fin' },
  { n: { vi: 'Truy vấn dữ liệu SQL', en: 'Query data with SQL' }, by: 'Gitiho', y: 2021, g: 'data' },
];

PF.interests = {
  vi: ['Tài chính và FP&A', 'Business Intelligence', 'Quản trị bán lẻ', 'AI ứng dụng trong doanh nghiệp', 'Chuyển đổi số', 'Đọc sách và học tập liên tục'],
  en: ['Finance and FP&A', 'Business Intelligence', 'Retail management', 'Practical AI in business', 'Digital transformation', 'Reading and lifelong learning'],
};
