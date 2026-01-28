'use client';

type Block = {
  label: string;
  title: string;
  body: string[];
};

const blocks: Block[] = [
  {
    label: 'Mở bài',
    title: 'Câu hỏi trung tâm',
    body: [
      'Cùng một quốc gia, vì sao phong tục Bắc - Trung - Nam khác biệt? (Bắc lễ nghi, Trung cần cù tiết kiệm, Nam phóng khoáng giao thương).',
      'Khung trả lời: ý thức xã hội phản ánh điều kiện sống (tồn tại xã hội) và có thể tác động ngược lại.'
    ]
  },
  {
    label: 'Lý thuyết cốt lõi',
    title: 'Ý thức xã hội trong duy vật lịch sử',
    body: [
      'Ý thức xã hội = đời sống tinh thần chung (đạo đức, lễ nghi, luật, tín ngưỡng, nghệ thuật).',
      'Tồn tại xã hội → ý thức xã hội; phản ánh không máy móc (có độ trễ, có dự phóng).',
      'Độc lập tương đối: có thể lạc hậu hoặc vượt trước và kéo hiện thực thay đổi.',
      'Các hình thái phát triển lệch pha: đạo đức, pháp luật, tín ngưỡng, nghệ thuật, khoa học.',
      'Tính lịch sử - cụ thể, đa dạng & kế thừa; mang dấu ấn lợi ích của các nhóm xã hội.'
    ]
  },
  {
    label: 'Vận dụng ba miền',
    title: 'Địa - kinh tế → phong tục',
    body: [
      'Miền Bắc: đồng bằng, bốn mùa rõ → lúa nước, làng xã chặt → lễ nghi cộng đồng cao, quan họ/ca trù, bữa cơm mùa đông ấm.',
      'Miền Trung: dải đất hẹp, gió Lào - bão biển → cần cù, tiết kiệm, gắn kết làng biển; nhã nhạc, bài chòi; ẩm thực mộc mà đậm.',
      'Miền Nam: sông nước, phù sa dồi dào → phóng khoáng, trọng giao thương; chợ nổi, đờn ca tài tử, cá kho tộ, bánh xèo.',
      'Hiện đại: di cư, du lịch, truyền thông pha trộn, sinh “đặc sản” mới (ẩm thực lai, lễ hội đương đại).'
    ]
  },
  {
    label: 'Bối cảnh hiện tại',
    title: 'Bài luận ngắn',
    body: [
      'Việt Nam đô thị hóa nhanh, kinh tế số và du lịch trải nghiệm định hình nhịp sống mới. Phong tục hòa trộn: cà phê sữa đá Hà Nội, mì Quảng Sài Gòn, lẩu mắm Đà Lạt.',
      'Ý thức xã hội chuyển từ “đậm làng” sang “đa trung tâm” với cộng đồng di cư và cộng đồng số.',
      'Rủi ro: thương mại hóa lễ hội, mất tính thiêng; đứt gãy tri thức dân gian. Cơ hội: du lịch văn hóa chất lượng, giáo dục trải nghiệm, kinh tế sáng tạo (ẩm thực, âm nhạc, thủ công).',
      'Gợi ý: tôn trọng cộng đồng chủ thể, chuẩn hóa thông tin, tạo sân chơi cho nghệ nhân trẻ, kết nối liên vùng.'
    ]
  }
];

export function Theory() {
  return (
    <section id="theory" className="container section">
      <div className="section-head">
        <div>
          <h2>Lý thuyết: Chủ nghĩa duy vật lịch sử - IV. Ý thức xã hội</h2>
          <p className="sub">
            Tập trung vào bối cảnh Việt Nam hiện tại: khung lý thuyết → vận dụng ba miền → luận ngắn về chuyển động phong tục, tránh
            lan man.
          </p>
        </div>
        <div className="pill pill-ghost">Bố cục súc tích</div>
      </div>

      <div className="theory">
        {blocks.map(block => (
          <div key={block.label}>
            <div className="break-label">{block.label}</div>
            <div className="theory-card card">
              <h3>{block.title}</h3>
              <ul>
                {block.body.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="break-label">Nghe/nhìn</div>
        <div className="theory-card card">
          <div className="media-embed">
            <iframe
              src="https://www.youtube.com/embed/bDNWCAKuLFk"
              title="Video minh họa"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="hint">
            Nếu video lỗi, dán URL YouTube khác (quan họ, nhã nhạc cung đình, lễ hội cầu ngư, đờn ca tài tử). Video chỉ là phần minh
            họa, không phải trọng tâm lý thuyết.
          </p>
        </div>

        <div className="break-label">Kết nối trải nghiệm</div>
        <div className="theory-card card">
          <h3>Đi tiếp ở đâu?</h3>
          <ul>
            <li>Thư viện tri thức: giai thoại, ẩm thực, lễ hội từng miền.</li>
            <li>Presentation: dàn ý thuyết trình, câu hỏi gợi mở.</li>
            <li>Game dân gian: chơi đập niêu để thử yếu tố văn hóa tương tác.</li>
            <li>Thảo luận: “Nếu bạn di cư, bạn mang phong tục gì theo? Cái gì sẽ thay đổi?”</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
