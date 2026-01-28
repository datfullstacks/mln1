'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { libraryEntries, regions } from '@/lib/data';
import type { RegionKey } from '@/lib/data';
import { svgViewerMarkup } from './mapMarkup';

type WrapperId = 'north' | 'center' | 'south';

const regionSegments: Record<RegionKey, { label: string; description: string }> = {
  bac: { label: 'Miền Bắc', description: 'Kinh kỳ & miền sơn cước' },
  trung: { label: 'Miền Trung', description: 'Dải đất di sản' },
  nam: { label: 'Miền Nam', description: 'Miền sông nước phóng khoáng' }
};

const segmentOrder: RegionKey[] = ['bac', 'trung', 'nam'];

const islandLabels = ['Hoàng Sa', 'Trường Sa'];

const selectHighlights = (selected: RegionKey) => libraryEntries.filter(entry => entry.region === selected).slice(0, 3);
const regionGroupMap: Record<RegionKey, WrapperId[]> = {
  bac: ['north'],
  trung: ['center'],
  nam: ['south']
};

const wrapperToRegion: Record<WrapperId, RegionKey> = {
  north: 'bac',
  center: 'trung',
  south: 'nam'
};

export function VietnamMap() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('bac');
  const selectedCard = useMemo(() => regions.find(region => region.key === selectedRegion)!, [selectedRegion]);
  const featured = useMemo(() => selectHighlights(selectedRegion), [selectedRegion]);
  const highlightSummaries = useMemo(
    () =>
      selectedCard.highlights.map(group => {
        const detail = group.points.slice(0, 2).join(', ');
        return detail ? `${group.title}: ${detail}` : group.title;
      }),
    [selectedCard]
  );
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const container = mapRef.current;
    container.querySelectorAll('.hover-group').forEach(el => {
      el.classList.remove('active-region');
    });
    regionGroupMap[selectedRegion].forEach(groupId => {
      const group = container.querySelector(`#${groupId}`);
      group?.classList.add('active-region');
    });
  }, [selectedRegion]);

  useEffect(() => {
    if (!mapRef.current) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const group = target?.closest<SVGGElement>('g.hover-group');
      if (!group) return;
      const wrapperId = group.id as WrapperId | undefined;
      if (wrapperId && wrapperToRegion[wrapperId]) {
        setSelectedRegion(wrapperToRegion[wrapperId]);
      }
    };

    const container = mapRef.current;
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="container section vn-map-section">
      <div className="section-head">
        <div>
          <h2>Bản đồ văn hóa Việt Nam</h2>
          <p className="sub">Ba mảnh ghép miền Bắc, miền Trung và miền Nam kề nhau cùng quần đảo và vùng EEZ.
          </p>
        </div>
        <div className="pill pill-ghost">Khẳng định chủ quyền</div>
      </div>
      <div className="vn-map-grid">
        <div className="vn-map">
          <div className="vn-map-art">
            <div
              ref={mapRef}
              className="vn-map-embed"
              aria-label="Bản đồ Việt Nam"
              dangerouslySetInnerHTML={{ __html: svgViewerMarkup }}
            />
          </div>
          <div className="vn-map-controls">
            {segmentOrder.map(key => {
              const segment = regionSegments[key];
              const isActive = selectedRegion === key;

              return (
                <button
                  key={key}
                  type="button"
                  className={`region-piece region-piece-${key} ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(key)}
                >
                  <span>{segment.label}</span>
                  <small>{segment.description}</small>
                </button>
              );
            })}
          </div>
          <div className="map-isles">
            {islandLabels.map(label => (
              <span key={label} className="island">
                {label}
              </span>
            ))}
            <span className="island eez">Vùng EEZ Biển Đông</span>
          </div>
        </div>
        <div className="map-panel card">
          <h3>{selectedCard.badge2}</h3>
          <p className="lead">{selectedCard.badge}</p>
          <ul className="map-highlights">
            {highlightSummaries.map((item, idx) => (
              <li key={`${selectedCard.key}-highlight-${idx}`}>{item}</li>
            ))}
          </ul>
          <div className="map-samples">
            {featured.map(entry => (
              <article key={entry.title} className="map-sample">
                <strong>{entry.title}</strong>
                <p>{entry.desc}</p>
                <div className="map-tags">
                  {entry.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
