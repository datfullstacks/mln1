'use client';

import { dongSonDrumMarkup } from './dongSonDrumMarkup';

type DongSonDrumProps = {
  title?: string;
  description?: string;
};

export function DongSonDrum({
  title = 'Trống đồng Đông Sơn',
  description = 'Dán toàn bộ mã SVG (Layer 1) vào dongSonDrumMarkup.ts để hiển thị.',
}: DongSonDrumProps) {
  const hasMarkup = dongSonDrumMarkup.trim().length > 0;

  return (
    <section className="dongson-block">
      <header className="dongson-head">
        <div>
          <p className="eyebrow">Hiển thị SVG</p>
          <h2>{title}</h2>
          <p className="dongson-subtitle">{description}</p>
        </div>
        <div className="dongson-hint">
          <span className="dot" />
          <span>Phủ CSS cho #layer1 và các phần tử con.</span>
        </div>
      </header>

      <div className="dongson-frame">
        {hasMarkup ? (
          <div
            className="dongson-svg"
            aria-label="Trống đồng Đông Sơn - SVG"
            dangerouslySetInnerHTML={{ __html: dongSonDrumMarkup }}
          />
        ) : (
          <div className="dongson-placeholder">
            <p>Chưa có SVG.</p>
            <p>Thêm mã SVG vào <code>dongSonDrumMarkup.ts</code> (giữ nguyên group <code>id="layer1"</code>).</p>
          </div>
        )}
      </div>
    </section>
  );
}
