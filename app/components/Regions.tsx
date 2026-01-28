'use client';

import { regions } from '@/lib/data';
import { VietnamMap } from './VietnamMap';
import { SvgViewer } from './SvgViewer';

export function Regions() {
  return (
    <>
      <VietnamMap />
      {/* <SvgViewer /> */}
      <section id="regions" className="container section">
        <div className="section-head">
          <div>
            <h2>Vùng miền & điểm nhấn</h2>
            <p className="sub">Chất liệu văn hóa đặc trưng và gợi ý trải nghiệm cho từng miền.</p>
          </div>
        </div>

        {/* Region Cards Section */}
        <div className="regions">
          {regions.map(region => (
            <div key={region.key} className="region-card card">
              <div className="region-meta">
                <div className="tag">{region.name}</div>
                <div className="tag">{region.badge}</div>
                <div className="tag ghost">{region.badge2}</div>
              </div>
              <h3>{region.badge2}</h3>
              <ul className="region-highlight-list">
                {region.highlights.map(group => (
                  <li key={group.title} className="region-highlight-item">
                    <strong>{group.title}</strong>
                    {group.points.length > 0 && (
                      <ul className="region-sublist">
                        {group.points.map(point => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
