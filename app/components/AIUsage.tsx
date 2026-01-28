'use client';

type ToolCard = {
  id: string;
  icon: string;
  name: string;
  purpose: string;
  promptLinks?: { label: string; url: string }[];
  result: string;
  studentEdit: string;
};

const toolCards: ToolCard[] = [
  {
    id: 'notebooklm',
    icon: '📚',
    name: 'NotebookLM',
    purpose: 'Sử dụng để trích dẫn và đối chiếu nội dung lý thuyết từ tập sách Tư tưởng Hồ Chí Minh nhằm làm nền tảng lập luận và kiểm chứng thông tin.',
    promptLinks: [
      { label: 'Notebook 1', url: 'https://notebooklm.google.com/notebook/cbe61f0c-3f89-4191-80d6-68369e4fc207' },
      { label: 'Notebook 2', url: 'https://notebooklm.google.com/notebook/e3f517d8-bca0-4b19-a2f5-8e9bc837e283' },
    ],
    result: 'Đoạn trích và ý chính phục vụ lập luận và trích dẫn.',
    studentEdit: 'Đối chiếu lại với bản giáo trình gốc, ghi rõ chương–trang; nội dung không xác minh được sẽ bị loại bỏ hoặc viết lại theo nguồn chuẩn.',
  },
  {
    id: 'chatgpt',
    icon: '💬',
    name: 'ChatGPT',
    purpose: 'Soạn nội dung cho phần thuyết trình (dàn ý, lời dẫn, ghi chú cho người thuyết trình).',
    promptLinks: [
      { label: 'Chat 1', url: 'https://chatgpt.com/share/e/6974d329-5888-8010-b8bd-351369131f38' },
      { label: 'Chat 2', url: 'https://chatgpt.com/share/e/6974d605-7bb0-8005-bce3-4061e000e0d9' },
      { label: 'Chat 3', url: 'https://chatgpt.com/c/696601f0-e0dc-8321-ad99-602405491b27' },
    ],
    result: 'Bản nháp dàn ý và nội dung thuyết trình giúp trình bày vấn đề rõ ràng, dễ hiểu hơn.',
    studentEdit: 'Rút gọn văn phong, chỉnh sửa các phần thuật ngữ chưa rõ nghĩa; bổ sung trích dẫn chính xác, ghi rõ nguồn và số trang trích dẫn từ văn bản chính thống.',
  },
  {
    id: 'lovable',
    icon: '🧩',
    name: 'Lovable',
    purpose: 'Hỗ trợ trình bày nội dung dự án lên website trực quan, dễ đọc.',
    result: 'Khung bố cục trang web và cấu trúc trình bày các nội dung.',
    studentEdit: 'Điều chỉnh bố cục, kiểu chữ và nội dung hiển thị; toàn bộ dữ liệu học thuật được kiểm chứng trước khi đăng.',
  },
];

const verificationSteps = [
  {
    number: '1',
    title: 'Đánh dấu nội dung AI',
    description: 'Mọi nội dung do công cụ trí tuệ nhân tạo đề xuất (nhận định, trích dẫn, số liệu) được đánh dấu.',
  },
  {
    number: '2',
    title: 'Đối chiếu nguồn chính thống',
    description: 'Đối chiếu với Giáo trình Tư tưởng Hồ Chí Minh, nghị quyết và các văn bản chính thức.',
  },
  {
    number: '3',
    title: 'Kết luận kiểm chứng',
    description: 'Phân loại nội dung: Hợp lệ / Chưa đủ căn cứ / Sai.',
  },
  {
    number: '4',
    title: 'Chỉnh sửa và chịu trách nhiệm',
    description: 'Chỉ giữ lại nội dung đã xác minh, nhóm chịu trách nhiệm về bản cuối cùng.',
  },
];

const assistHighlights = [
  {
    icon: '📚',
    title: 'NotebookLM',
    description: 'Hỗ trợ trích dẫn và đối chiếu với giáo trình.',
  },
  {
    icon: '💬',
    title: 'ChatGPT',
    description: 'Hỗ trợ soạn nháp dàn ý và nội dung thuyết trình.',
  },
  {
    icon: '🧩',
    title: 'Lovable',
    description: 'Hỗ trợ trình bày website trực quan, dễ đọc.',
  },
];

const references = [
  { label: '[1]', text: 'Arttimes. (n.d.). Tầm vóc văn hoá Hồ Chí Minh dưới góc nhìn UNESCO.', url: 'https://arttimes.vn/goc-nhin/tam-voc-van-hoa-ho-chi-minh-duoi-goc-nhin-uneco-c50a29594.html' },
  { label: '[2]', text: 'Bảo tàng Lịch sử Quốc gia. (n.d.). Nền giáo dục của nước Việt Nam độc lập từ tháng 9/1945 đến tháng 12/1946 (Kỳ 1): Kích hoạt những tiềm năng giáo dục vốn có.', url: 'https://baotanglichsu.vn/vi/Articles/3096/73445' },
  { label: '[3]', text: 'Bộ Giáo dục và Đào tạo. (2021). Giáo trình Tư tưởng Hồ Chí Minh (Dành cho bậc đại học hệ không chuyên lý luận chính trị). Nhà xuất bản Chính trị Quốc gia Sự thật.', url: '#' },
  { label: '[4]', text: 'Báo Quân đội Nhân dân. (n.d.). Ổn định chính trị – vốn quý để phát triển đất nước.', url: 'https://www.qdnd.vn/phong-chong-tu-dien-bien-tu-chuyen-hoa/on-dinh-chinh-tri-von-quy-de-phat-trien-dat-nuoc-775172' },
  { label: '[5]', text: 'Báo Thanh Niên. (2024). Bao giờ mới hết cảnh rác ngập làng nghề, dân khốn khổ vì ô nhiễm.', url: 'https://thanhnien.vn/bao-gio-moi-het-canh-rac-ngap-lang-nghe-dan-khon-kho-vi-o-nhiem-185240519210750422.htm' },
  { label: '[6]', text: 'Hồ Chí Minh. (n.d.). Hồ Chí Minh toàn tập (Tập 3). Nhà xuất bản Chính trị Quốc gia Sự thật.', url: 'https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/book/ho-chi-minh/tac-pham/ho-chi-minh-toan-tap-tap-3-270' },
  { label: '[7]', text: 'Hồ Chí Minh. (n.d.). Hồ Chí Minh toàn tập (Tập 9). Nhà xuất bản Chính trị Quốc gia Sự thật.', url: 'https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/book/ho-chi-minh/tac-pham/ho-chi-minh-toan-tap-tap-9-276' },
  { label: '[8]', text: 'Học viện Chính trị Quốc gia Hồ Chí Minh. (n.d.). Ho Chi Minh\'s viewpoints on the building and development of Vietnamese culture.', url: 'https://politicaltheory.hcma.vn/ho-chi-minh-s-viewpoints-on-the-building-and-development-of-vietnamese-culture-5848.html' },
  { label: '[9]', text: 'Kinh tế & Môi trường. (n.d.). Môi trường tan hoang vì những dự án mang danh du lịch nghỉ dưỡng.', url: 'https://kinhtemoitruong.vn/moi-truong-tan-hoang-vi-nhung-du-an-mang-danh-du-lich-nghi-duong-17980.html' },
  { label: '[10]', text: 'Lai Châu Online. (n.d.). Tư tưởng Hồ Chí Minh – chỉ dẫn để xây dựng và phát triển nền văn hoá Việt Nam.', url: 'https://laichau.gov.vn/tin-tuc-su-kien/chuyen-de/tin-trong-nuoc/tu-tuong-ho-chi-minh-chi-dan-de-xay-dung-va-phat-trien-nen-v.html' },
  { label: '[11]', text: 'National Library of Vietnam. (n.d.). Hồ Chí Minh – Anh hùng giải phóng dân tộc, nhà văn hoá kiệt xuất.', url: 'https://nlv.gov.vn/phan-1-hcm-anh-hung-giai-phong-dan-toc/ho-chi-minh-anh-hung-giai-phong-dan-toc-nha-van-hoa-kiet-xuat.html' },
  { label: '[12]', text: 'Tạp chí Cộng sản. (n.d.). Ensuring the people\'s cultural welfare in the process of international integration and sustainable development of Vietnam.', url: 'https://www.tapchicongsan.org.vn/web/english/mega-story/-/asset_publisher/lc29uIxCb05g/content/ensuring-the-people-s-cultural-welfare-in-the-process-of-international-integration-and-sustainable-development-of-vietnam' },
  { label: '[13]', text: 'Thịnh Vượng Việt Nam. (n.d.). Tầm vóc và giá trị lịch sử – chính trị của Cách mạng Tháng Tám năm 1945.', url: 'https://thinhvuongvietnam.com/Content/tam-voc-va-gia-tri-lich-su---chinh-tri-cua-cach-mang-thang-tam-nam-1945-25212' },
];

export function AIUsage() {
  return (
    <section className="ai-usage-page">
      {/* Hero Header */}
      <header className="ai-hero-header">
        <span className="ai-hero-badge">⚙️ AI Usage Declaration</span>
        <h1 className="ai-hero-title">
          Mục tiêu sử dụng <span className="text-accent">Trí tuệ</span>
          <br />
          <span className="text-accent">Nhân tạo</span>
        </h1>
        <p className="ai-hero-desc">
          Nhóm sử dụng trí tuệ nhân tạo với vai trò hỗ trợ trong quá trình thực hiện bài tập. Trí tuệ nhân tạo không được sử dụng để thay thế hoàn toàn việc nghiên cứu, phân tích và viết nội dung học thuật.
        </p>
      </header>

      <div className="ai-main-content">
        {/* Vai trò AI */}
        <section className="ai-role-section">
          <div className="ai-role-icon">⚙️</div>
          <div className="ai-role-content">
            <h3>Vai trò của AI trong dự án</h3>
            <ul className="ai-role-list">
              <li>✓ Trích dẫn nội dung lý thuyết và tra cứu tài liệu</li>
              <li>✓ Soạn nháp nội dung thuyết trình</li>
              <li>✓ Hỗ trợ dàn trang website</li>
            </ul>
            <p className="ai-role-note">Nhóm chịu trách nhiệm đối với toàn bộ nội dung cuối cùng được công bố.</p>
          </div>
        </section>

        {/* Công cụ đã sử dụng */}
        <section className="ai-tools-section">
          <h2 className="ai-section-title">✦ Công cụ đã sử dụng</h2>
          <p className="ai-section-desc">Chi tiết về từng công cụ AI được sử dụng trong dự án và cách thức kiểm soát nội dung.</p>

          <div className="ai-tools-grid-new">
            {toolCards.map((tool) => (
              <article key={tool.id} className="ai-tool-card-new">
                <header className="ai-tool-header-new">
                  <span className="ai-tool-icon-new">{tool.icon}</span>
                  <h4 className="ai-tool-name-new">{tool.name}</h4>
                </header>

                <div className="ai-tool-body-new">
                  <div className="ai-tool-field">
                    <span className="ai-field-label">Mục đích</span>
                    <p>{tool.purpose}</p>
                  </div>

                  {tool.promptLinks && (
                    <div className="ai-tool-field">
                      <span className="ai-field-label">Link prompt/log</span>
                      <div className="ai-prompt-links">
                        {tool.promptLinks.map((link, idx) => (
                          <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="ai-prompt-link">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="ai-tool-field">
                    <span className="ai-field-label">Kết quả</span>
                    <p>{tool.result}</p>
                  </div>

                  <div className="ai-tool-field ai-field-highlight">
                    <span className="ai-field-label">Chỉnh sửa của sinh viên</span>
                    <p>{tool.studentEdit}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quy trình kiểm chứng */}
        <section className="ai-verify-section">
          <h2 className="ai-section-title">◎ Quy trình kiểm chứng thông tin</h2>
          <p className="ai-section-desc">Nhóm sử dụng quy trình kiểm chứng 4 bước để đảm bảo tính chính xác của thông tin.</p>

          <div className="ai-verify-grid">
            {verificationSteps.map((step) => (
              <div key={step.number} className="ai-verify-card">
                <span className="ai-verify-number">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ứng dụng sáng tạo */}
        <section className="ai-creative-section">
          <h2 className="ai-section-title">✦ Ứng dụng sáng tạo</h2>
          <p className="ai-section-desc">Trí tuệ nhân tạo được sử dụng để hỗ trợ quá trình học tập và trình bày.</p>

          <div className="ai-creative-grid">
            {assistHighlights.map((item) => (
              <div key={item.title} className="ai-creative-card">
                <span className="ai-creative-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="ai-creative-note">
            Trí tuệ nhân tạo chỉ đóng vai trò hỗ trợ việc nghiên cứu, sự phân tích và sự chịu trách nhiệm học thuật của nhóm.
          </div>
        </section>

        {/* Cam kết liêm chính */}
        <section className="ai-commitment-section">
          <h2 className="ai-section-title">◎ Cam kết liêm chính học thuật</h2>

          <div className="ai-commitment-box">
            <div className="ai-commitment-icon">📋</div>
            <div className="ai-commitment-content">
              <p>
                Nhóm cam kết không để trí tuệ nhân tạo làm thay hoàn toàn quá trình nghiên cứu và viết bài. Mọi nội dung học thuật và kết luận được công bố đều đã được kiểm chứng dựa trên Giáo trình Tư tưởng Hồ Chí Minh, các nghị quyết và văn bản chính thống.
              </p>
              <a href="#" className="ai-commitment-link">
                Xem nhật ký kiểm chứng, chỉnh sửa và nguồn gốc của các sản phẩm cuối cùng →
              </a>
            </div>
          </div>
        </section>

        {/* Tài liệu tham khảo */}
        <section className="ai-references-section">
          <h2 className="ai-section-title">📚 Tài liệu tham khảo</h2>
          <p className="ai-section-desc">Danh sách các nguồn tài liệu được sử dụng trong dự án.</p>

          <ul className="ai-references-list">
            {references.map((ref) => (
              <li key={ref.label} className="ai-reference-item">
                <span className="ai-ref-label">{ref.label}</span>
                <span className="ai-ref-text">{ref.text}</span>
                {ref.url && ref.url !== '#' && (
                  <a href={ref.url} target="_blank" rel="noreferrer" className="ai-ref-link">↗</a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="ai-footer">
        <p>© 2025 – Dự án Tư tưởng Hồ Chí Minh</p>
        <p className="ai-footer-note">Tài liệu này thể hiện cam kết minh bạch trong việc sử dụng trí tuệ nhân tạo cho mục đích học thuật.</p>
        <span className="ai-footer-badge">Built with ❤ Lovable</span>
      </footer>
    </section>
  );
}
