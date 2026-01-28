'use client';

type ToolSection = {
  heading: string;
  body?: string;
  links?: { label: string; url: string }[];
  highlight?: boolean;
};

type ToolCard = {
  id: string;
  badge: string;
  icon: string;
  name: string;
  sections: ToolSection[];
};

const toolCards: ToolCard[] = [
  {
    id: 'notebooklm',
    badge: 'a)',
    icon: '📚',
    name: 'NotebookLM',
    sections: [
      {
        heading: 'Mục đích',
        body: 'Trích dẫn và đối chiếu nội dung lý thuyết từ giáo trình Lý luận chính trị (đặc biệt là giáo trình Triết học Mác – Lênin) để làm nền tảng lập luận.'
      },
      {
        heading: 'Link prompt/log',
        links: [
          {
            label: 'Prompt/Log',
            url: 'https://notebooklm.google.com/notebook/00396724-e674-479e-813f-803cec4d0329'
          }
        ]
      },
      {
        heading: 'Kết quả',
        body: 'Đoạn trích và ý chính phục vụ lập luận và trích dẫn.'
      },
      {
        heading: 'Chỉnh sửa của sinh viên',
        body: 'Đối chiếu lại với bản giáo trình gốc, ghi rõ chương–trang; nội dung không xác minh được sẽ bị loại bỏ hoặc viết lại theo nguồn chuẩn.',
        highlight: true
      }
    ]
  },
  {
    id: 'chatgpt',
    badge: 'b)',
    icon: '💬',
    name: 'ChatGPT',
    sections: [
      {
        heading: 'Mục đích',
        body: 'Soạn nội dung cho phần thuyết trình (dàn ý, lời dẫn, ghi chú cho người trình bày).'
      },
      {
        heading: 'Link prompt/log',
        links: [
          {
            label: 'Prompt/Log 1',
            url: 'https://chatgpt.com/share/e/6932ac02-fa44-8000-87db-41306d8f476a'
          },
          {
            label: 'Prompt/Log 2',
            url: 'https://chatgpt.com/share/e/6932d355-b2bc-800b-8fd6-386fd4c52fd2'
          },
          {
            label: 'Prompt/Log 3',
            url: 'https://chatgpt.com/share/e/6933ef02-76f8-800e-83d6-4db8f8924643'
          }
        ]
      },
      {
        heading: 'Kết quả',
        body: 'Bản nháp dàn ý, lời thuyết trình và gợi ý cấu trúc nội dung.'
      },
      {
        heading: 'Chỉnh sửa của sinh viên',
        body: 'Rút gọn, chỉnh văn phong, thay hoặc loại các khẳng định chưa có nguồn; bổ sung trích dẫn từ NotebookLM và văn bản chính thống, ghi rõ phần đã biên soạn lại trước khi đăng.',
        highlight: true
      }
    ]
  },
  {
    id: 'deepseek',
    badge: 'c)',
    icon: '🔎',
    name: 'Deepseek',
    sections: [
      {
        heading: 'Mục đích',
        body: 'Tra cứu thông tin để định hướng tìm nguồn và kiểm chứng sơ bộ.'
      },
      {
        heading: 'Link prompt/log',
        links: [
          {
            label: 'Prompt/Log',
            url: 'https://chat.deepseek.com/share/f10p0qzrbxwu2tny2o'
          }
        ]
      },
      {
        heading: 'Kết quả',
        body: 'Gợi ý thông tin và hướng tìm kiếm.'
      },
      {
        heading: 'Chỉnh sửa của sinh viên',
        body: 'Chỉ giữ nội dung đối chiếu được với giáo trình, nghị quyết và văn bản chính thống; mọi thông tin không truy vết được nguồn đều bị loại.',
        highlight: true
      }
    ]
  },
  {
    id: 'lovable',
    badge: 'd)',
    icon: '🧩',
    name: 'Lovable',
    sections: [
      {
        heading: 'Mục đích',
        body: 'Dàn trang nội dung dự án lên website, bảo đảm bố cục trực quan và tương thích đa thiết bị.'
      },
      {
        heading: 'Kết quả',
        body: 'Khung bố cục trang web và cách trình bày các phần nội dung.'
      },
      {
        heading: 'Chỉnh sửa của sinh viên',
        body: 'Điều chỉnh bố cục, kiểu chữ và nội dung hiển thị; toàn bộ dữ liệu học thuật được kiểm chứng trước khi đăng, mọi đầu ra tự động đều được biên tập lại.',
        highlight: true
      }
    ]
  },
  {
    id: 'pinterest',
    badge: 'e)',
    icon: '🖼️',
    name: 'Pinterest',
    sections: [
      {
        heading: 'Mục đích',
        body: 'Tham khảo ý tưởng hình minh họa và sơ đồ trình bày.'
      },
      {
        heading: 'Kết quả',
        body: 'Danh sách ý tưởng thị giác hỗ trợ việc lựa chọn hình ảnh.'
      },
      {
        heading: 'Chỉnh sửa của sinh viên',
        body: 'Chỉ sử dụng hình ảnh hợp lệ (có phép, nguồn rõ ràng hoặc tự tạo) và ghi nguồn dưới mỗi hình sử dụng.',
        highlight: true
      }
    ]
  }
];

const verificationSteps = [
  {
    number: '1',
    title: 'Đánh dấu nội dung',
    description: 'Ghi nhận mọi thông tin do AI gợi ý (nhận định, số liệu, trích dẫn).'
  },
  {
    number: '2',
    title: 'Đối chiếu nguồn chính thống',
    description: 'Kiểm chứng bằng giáo trình Lý luận chính trị, nghị quyết, văn bản chính thức và ghi rõ chương/trang.'
  },
  {
    number: '3',
    title: 'Kết luận kiểm chứng',
    description: 'Phân loại Hợp lệ / Chưa đủ căn cứ / Sai, tránh sử dụng thông tin chưa rõ nguồn gốc.'
  },
  {
    number: '4',
    title: 'Chỉnh sửa & chịu trách nhiệm',
    description: 'Chỉ giữ nội dung đã xác minh; nhóm chịu trách nhiệm về bản cuối cùng.'
  }
];

const assistHighlights = [
  {
    icon: '📚',
    title: 'NotebookLM',
    description: 'Hỗ trợ trích dẫn nhanh và đối chiếu giáo trình Lý luận chính trị.'
  },
  {
    icon: '💬',
    title: 'ChatGPT',
    description: 'Gợi ý dàn ý, lời dẫn giúp cấu trúc phần thuyết trình mạch lạc.'
  },
  {
    icon: '🧩',
    title: 'Lovable',
    description: 'Đề xuất bố cục trang web, giúp trình bày nội dung dễ đọc.'
  }
];

const references = [
  {
    label: '[1]',
    text: 'Phạm Văn Đức (Chủ biên). (2019). Giáo trình Triết học Mác – Lênin. Hà Nội.',
    url: 'https://drive.google.com/file/d/1hmjl7cBm5P3rmKAeTFAdKyQnygWtnRYC/view?pli=1'
  },
  {
    label: '[2]',
    text: 'Marxists Internet Archive. (n.d.). Cross-Language Section.',
    url: 'https://www.marxists.org/xlang/index.htm'
  },
  {
    label: '[3]',
    text: 'VOVworld. (2013, April 8). Wet rice cultivation of the Viet people.',
    url: 'https://vovworld.vn/en-US/colorful-vietnam-vietnams-54-ethnic-groups/wet-rice-cultivation-of-the-viet-people-146920.vov'
  },
  {
    label: '[4]',
    text: 'Viện Hán-Nôm & Văn hóa (VASS). (n.d.). Địa lý văn hóa.',
    url: 'https://ihs.vass.gov.vn/Contents/tintucsukien/Lists/DiaLyVanHoa/DispForm.aspx?ID=2&ContentTypeId=0x01005D0CD111C0019D44BE40A8F47C65FD8F0400994DE620434316409BE5D3692D1D80B3'
  },
  {
    label: '[5]',
    text: 'Rever (blog). (n.d.). Các tỉnh miền Nam Việt Nam – Đặc điểm chi tiết từng tỉnh.',
    url: 'https://blog.rever.vn/cac-tinh-mien-nam-viet-nam-dac-diem-chi-tiet-tung-tinh-cap-nhat'
  },
  {
    label: '[6]',
    text: 'Mentoring. (2022, March 26). Tính cách của con người ở 3 miền Bắc, Trung, Nam.',
    url: 'https://mentoring.edu.vn/tinh-cach-con-nguoi-3-mien-1648313556'
  },
  {
    label: '[7]',
    text: 'Báo Dân Tộc Miền Núi. (n.d.). Bắc Bộ — Vài nét tổng quan.',
    url: 'https://dantocmiennui.baotintuc.vn/bac-bo-vai-net-tong-quan-post130641.html'
  },
  {
    label: '[8]',
    text: 'Pháp Luật TP.HCM. (n.d.). Sài Gòn: Vùng đất thoát nhỏ ngay từ đầu.',
    url: 'https://plo.vn/sai-gon-vung-dat-thoat-nho-ngay-tu-dau-post442671.html'
  },
  {
    label: '[9]',
    text: 'Pháp Luật TP.HCM. (n.d.). Nam Bộ — "Tỉnh đất, tỉnh người".',
    url: 'https://plo.vn/nam-bo-tinh-dat-tinh-nguoi-post423250.html'
  }
];

export function AIUsage() {
  return (
    <section className="container section ai-usage">
      <header className="card ai-usage-hero">
        <h2>AI Usage Documentation</h2>
      </header>

      <div className="card ai-usage-goal">
        <h3>Mục tiêu sử dụng trí tuệ nhân tạo</h3>
        <p>
          Nhóm dùng AI như <strong>trợ lý</strong> hỗ trợ từng bước làm bài (tìm trích dẫn, tra cứu, soạn nháp, thiết kế trình bày).
          AI không thay thế nghiên cứu học thuật hay tiếng nói chuyên môn; nhóm chịu trách nhiệm toàn bộ cho sản phẩm cuối cùng.
        </p>
      </div>

      <div className="ai-tools-grid">
        {toolCards.map((tool) => (
          <article key={tool.id} className="card ai-tool-card">
            <header className="ai-tool-header">
              <div className="ai-tool-icon" aria-hidden>{tool.icon}</div>
              <div>
                <span className="ai-tool-badge">{tool.badge}</span>
                <h4>{tool.name}</h4>
              </div>
            </header>

            <div className="ai-tool-sections">
              {tool.sections.map((section) => (
                <div
                  key={`${tool.id}-${section.heading}`}
                  className={`ai-tool-section${section.highlight ? ' highlight' : ''}`}
                >
                  <p className="ai-tool-heading">{section.heading}</p>
                  {section.body && <p className="ai-tool-body">{section.body}</p>}
                  {section.links && (
                    <div className="ai-tool-links">
                      {section.links.map((link) => (
                        <a key={link.url} className="source-link" href={link.url} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="card ai-usage-steps">
        <h3>Quy trình 4 bước kiểm chứng</h3>
        <div className="ai-steps-grid">
          {verificationSteps.map((step) => (
            <div key={step.number} className="ai-step-card">
              <span className="ai-step-number">{step.number}</span>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card ai-support">
        <h3>AI hỗ trợ quy trình</h3>
        <div className="ai-highlight-grid">
          {assistHighlights.map((item) => (
            <div key={item.title} className="ai-highlight-card">
              <div className="ai-highlight-icon" aria-hidden>
                {item.icon}
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ai-warning">
          <strong>Lưu ý:</strong> Trí tuệ nhân tạo chỉ đóng vai trò hỗ trợ. Các kết luận học thuật và nội dung trình bày đều do nhóm
          kiểm chứng và chịu trách nhiệm.
        </div>
      </section>

      <section className="card ai-commitment-card">
        <h3>Cam kết liêm chính học thuật</h3>
        <p>
          Nhóm cam kết không để AI làm thay hoàn toàn. Mọi thông tin đăng tải đều được đối chiếu với giáo trình Lý luận chính trị,
          nghị quyết và văn bản chính thống; nội dung chưa xác thực sẽ không được sử dụng.
        </p>
        <ul>
          <li>Đánh dấu rõ phần do AI gợi ý và ghi chú quá trình kiểm chứng.</li>
          <li>Ưu tiên nguồn chính thống; thông tin không truy vết được sẽ loại bỏ.</li>
          <li>Cập nhật minh bạch nhật ký sử dụng AI và trích dẫn kèm liên kết.</li>
        </ul>
      </section>

      <section className="card ai-references">
        <h3>Tài liệu tham khảo</h3>
        <ul className="ai-reference-list">
          {references.map((ref) => (
            <li key={ref.label}>
              <span className="ai-reference-label">{ref.label}</span>
              <span className="ai-reference-text">{ref.text}</span>
              <a className="source-link" href={ref.url} target="_blank" rel="noreferrer">
                Link
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
