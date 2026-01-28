'use client';

type Props = {
  onPrimary: () => void;
  onSecondary: () => void;
};

export function Hero({ onPrimary, onSecondary }: Props) {
  return (
    <section className="hero container" id="hero">
      <div className="intro card">
        <h1>Vì sao phong tục ba miền khác biệt sâu sắc?</h1>
        <p className="lead">
          Khởi động từ lý thuyết: vì sao cùng một quốc gia nhưng phong tục ba miền khác biệt? Vận dụng ý thức xã hội (Mác - Lênin)
          rồi khám phá thư viện tri thức và game dân gian để kiểm chứng trải nghiệm.
        </p>
        <div className="chips">
          <span className="chip">Ý thức xã hội</span>
          <span className="chip">Phong tục</span>
          <span className="chip">Văn hóa vùng miền</span>
          <span className="chip">Trò chơi dân gian</span>
        </div>
        <div className="cta">
          <button className="btn primary" onClick={onPrimary}>
            Lý thuyết trước
          </button>
          <button className="btn ghost" onClick={onSecondary}>
            Chơi đập niêu
          </button>
        </div>
      </div>
      <div className="hero-card card">
        <h3>Hành trình 3 miền</h3>
        <div className="timeline">
          <div className="timeline-item">
            <span className="pill">Bắc</span>
            <div>
              <strong>Thăng Long & trung du</strong>
              <div>Ca trù, chèo, cốm, lễ hội đền Hùng.</div>
            </div>
          </div>
          <div className="timeline-item">
            <span className="pill pill-amber">Trung</span>
            <div>
              <strong>Miền di sản</strong>
              <div>Nhã nhạc cung đình, miền biển & đầm phá, Huế mộng mơ.</div>
            </div>
          </div>
          <div className="timeline-item">
            <span className="pill pill-pink">Nam</span>
            <div>
              <strong>Miền sông nước</strong>
              <div>Đờn ca tài tử, chợ nổi, hò sông Hậu, trái cây miệt vườn.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
