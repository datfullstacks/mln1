'use client';

export function AboutUs() {
  const teamMembers = [
    { initials: 'PT', name: 'Đào Phương Thảo', id: 'SS170172' },
    { initials: 'KT', name: 'Lê Thị Kiều Tiên', id: 'SS180860' },
    { initials: 'TT', name: 'Trần Lê Thanh Thảo', id: 'SS181084' },
    { initials: 'TĐ', name: 'Hoàng Tiến Đạt', id: 'SE170150' },
  ];

  return (
    <section className="about-hero container section">
      {/* Hero Section */}
      <div className="about-hero-inner">
        <div className="about-badge">Triết học Mác – Lênin</div>
        <h1 className="about-title">Phenomenon</h1>
        <p className="about-lead">
          Website học thuật của nhóm sinh viên môn Triết học Mác – Lênin, khai thác câu hỏi: 
          <strong> Vì sao cùng một quốc gia nhưng phong tục vùng miền lại khác biệt sâu sắc?</strong>
        </p>
        <p className="about-description">
          Từ lý thuyết ý thức xã hội, chúng mình phân tích tính đa dạng và lịch sử – cụ thể của đời sống tinh thần, 
          qua đó lý giải mối quan hệ giữa điều kiện sống, môi trường tự nhiên, lịch sử cư trú và sự hình thành phong tục ở Bắc – Trung – Nam.
        </p>
      </div>

      {/* Vision Section */}
      <div className="about-section">
        <div className="about-section-header">
          <span className="about-section-icon">👁️</span>
          <h2>Vision – Tầm nhìn</h2>
        </div>
        <p className="about-section-content">
          Phenomenon hướng tới trở thành một không gian học thuật <strong>ngắn gọn – dễ hiểu – có chiều sâu</strong>, 
          nơi người đọc có thể nhìn các khác biệt vùng miền ở Việt Nam như một hiện tượng xã hội có điều kiện hình thành, 
          thay vì là định kiến hay "tính cách bẩm sinh".
        </p>
      </div>

      {/* Mission Section */}
      <div className="about-section">
        <div className="about-section-header">
          <span className="about-section-icon">🎯</span>
          <h2>Mission – Sứ mệnh</h2>
        </div>
        <div className="mission-list">
          <div className="mission-item">
            <span className="mission-number">1</span>
            <p>Hệ thống hóa lý thuyết ý thức xã hội trong Triết học Mác – Lênin bằng ngôn ngữ gần gũi, có ví dụ minh họa.</p>
          </div>
          <div className="mission-item">
            <span className="mission-number">2</span>
            <p>Vận dụng lý thuyết để phân tích sự khác biệt phong tục – tập quán Bắc, Trung, Nam trên cơ sở: điều kiện sống, môi trường tự nhiên, lịch sử cư trú và giao lưu văn hóa.</p>
          </div>
          <div className="mission-item">
            <span className="mission-number">3</span>
            <p>Kết nối học thuật với đời sống: giúp người đọc hiểu "vì sao khác nhau", từ đó giao tiếp và hợp tác liên vùng hiệu quả hơn.</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-section">
        <div className="about-section-header">
          <span className="about-section-icon">💎</span>
          <h2>Values – Giá trị cốt lõi</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <h3>📜 Lịch sử – cụ thể</h3>
            <p>Mọi phân tích đều đặt trong bối cảnh thời gian, không gian và điều kiện sống.</p>
          </div>
          <div className="value-card">
            <h3>🤝 Tôn trọng khác biệt</h3>
            <p>Mô tả xu hướng văn hóa không để dán nhãn cá nhân.</p>
          </div>
          <div className="value-card">
            <h3>📋 Rõ ràng – có căn cứ</h3>
            <p>Trình bày mạch lạc, khái niệm đúng trọng tâm, dẫn chứng phù hợp.</p>
          </div>
          <div className="value-card">
            <h3>⚙️ Ứng dụng thực tiễn</h3>
            <p>Không chỉ "học cho biết" mà còn liên hệ giao tiếp, học tập, làm việc.</p>
          </div>
          <div className="value-card">
            <h3>💬 Đối thoại mở</h3>
            <p>Khuyến khích nhiều góc nhìn và phản biện văn minh.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-section">
        <div className="about-section-header">
          <span className="about-section-icon">👥</span>
          <h2>Nhóm thực hiện – Phenomenon Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">{member.initials}</div>
              <h4>{member.name}</h4>
              <span className="team-id">{member.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="about-footer">
        <div className="about-footer-logo">Phenomenon</div>
        <p>Website hướng tới học tập, đối thoại và tôn trọng khác biệt văn hóa.</p>
        <p className="about-copyright">© 2025 Phenomenon Team | Triết học Mác – Lênin</p>
      </div>
    </section>
  );
}
