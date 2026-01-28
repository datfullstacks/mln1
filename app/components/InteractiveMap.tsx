'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { regions, type RegionKey } from '@/lib/data';
import { svgViewerMarkup } from './mapMarkup';

type WrapperId = 'north' | 'center' | 'south';

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

const regionLabels: Record<RegionKey, string> = {
  bac: 'Miền Bắc',
  trung: 'Miền Trung',
  nam: 'Miền Nam'
};

type ContextItem = {
  label?: string;
  text: string;
  emphasis?: boolean;
};

const regionContextMap: Record<RegionKey, { title: string; items: ContextItem[] } | null> = {
  bac: {
    title: 'Vì sao miền Bắc“trang trọng – lễ nghi – chỉn chu”?',
    items: [
      {
        label: 'Điều kiện sống:',
        text: 'Lịch sử định cư lâu đời, cộng đồng làng xã – họ hàng gắn bó tạo mật độ quan hệ dày.'
      },
      {
        label: 'Quan hệ xã hội:',
        text: 'Môi trường đông người với nhiều ràng buộc đòi hỏi quy tắc điều hòa ứng xử.'
      },
      {
        label: 'Tâm lý xã hội:',
        text: 'Trọng “đúng phép”, chú ý vai vế, thể diện, khuôn phép trong mọi dịp.'
      },
      {
        label: 'Phong tục - tập quán:',
        text: 'Xưng hô phân vai (cô/chú/bác/anh/chị…) với “dạ/thưa”; cưới hỏi, giỗ chạp coi trọng nghi thức và giờ giấc.'
      },
      {
        text: 'Đó là biểu hiện của tâm lý xã hội (ý thức thông thường) nảy sinh từ cộng đồng chặt chẽ và quan hệ xã hội dày đặc.',
        emphasis: true
      }
    ]
  },
  trung: {
    title: 'Vì sao miền Trung “cần cù – tiết kiệm – sáng tạo”?',
    items: [
      {
        label: 'Môi trường tự nhiên – điều kiện sống:',
        text: 'Dải đất hẹp, nhiều thiên tai (bão, lũ, hạn), rủi ro cao; nhiều nơi phải đa nghề để sinh tồn.'
      },
      {
        label: 'Tâm lý xã hội hình thành:',
        text: 'Lo xa, tiết kiệm, bền bỉ, làm chắc; linh hoạt vì phải xoay xở.'
      },
      {
        label: 'Phong tục – tập quán:',
        text: 'Nếp sống giản dị, coi trọng tích lũy, chi tiêu chặt chẽ.'
      },
      {
        text: 'Thói quen chuẩn bị trước mùa bão lũ (tích trữ, gia cố), tinh thần chịu khó.'
      },
      {
        text: 'Minh họa rõ nguyên lý: môi trường khắc nghiệt → tâm lý xã hội cần kiệm và bền bỉ (tính lịch sử – cụ thể).',
        emphasis: true
      }
    ]
  },
  nam: {
    title: 'Vì sao miền Nam “hào sảng – phóng khoáng – thoải mái”?',
    items: [
      {
        label: 'Môi trường tự nhiên & lịch sử dân cư:',
        text: 'Nhiều nơi đất đai trù phú, khí hậu ổn định hơn; lịch sử khai phá muộn, di dân và cộng cư đa dạng; giao thương sông nước phát triển.'
      },
      {
        label: 'Tâm lý xã hội hình thành:',
        text: 'Quan hệ xã hội “mở” → cởi mở, dễ hòa nhập; trọng cái tình, thực tế, linh hoạt.'
      },
      {
        label: 'Phong tục - tập quán:',
        text: 'Giao tiếp thân thiện, dễ bắt chuyện, ít câu nệ hình thức.'
      },
      {
        text: 'Sẵn sàng giúp đỡ nhanh; sinh hoạt cộng đồng thoải mái.'
      },
      {
        text: 'Đây là kết quả của điều kiện sống tương đối thuận lợi + cộng cư đa dạng tạo nên tâm lý xã hội phóng khoáng.',
        emphasis: true
      }
    ]
  }
};

export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('bac');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const selectedCard = useMemo(() => regions.find(region => region.key === selectedRegion)!, [selectedRegion]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const container = mapRef.current;

    const activeColors: Record<WrapperId, { fill: string; stroke: string }> = {
      north: { fill: 'rgba(200, 60, 60, 0.8)', stroke: 'rgba(209, 69, 58, 0.9)' },
      center: { fill: '#FEB602', stroke: '#FFD700' },
      south: { fill: '#5FB4F0', stroke: 'rgba(33, 85, 156, 0.9)' }
    };

    container.querySelectorAll('.hover-group').forEach(el => {
      el.classList.remove('active-region');
      el.querySelectorAll('path').forEach(path => {
        path.classList.remove('active-path');
        path.style.fill = '';
        path.style.stroke = '';
        path.style.strokeWidth = '';
      });
    });

    regionGroupMap[selectedRegion].forEach(groupId => {
      const group = container.querySelector(`#${groupId}`) as SVGGElement | null;
      if (!group) return;
      group.classList.add('active-region');
      const colorScheme = activeColors[groupId];
      group.querySelectorAll('path').forEach(path => {
        path.style.fill = colorScheme.fill;
        path.style.stroke = colorScheme.stroke;
        path.style.strokeWidth = '2px';
        path.classList.add('active-path');
      });
    });
  }, [selectedRegion]);

  const handleMapClick = (event: React.MouseEvent) => {
    const target = event.target as Element | null;
    const group = target?.closest<SVGGElement>('g.hover-group');
    if (!group) return;
    const wrapperId = group.id as WrapperId | undefined;
    if (wrapperId && wrapperToRegion[wrapperId]) {
      const newRegion = wrapperToRegion[wrapperId];
      if (newRegion !== selectedRegion) {
        setSelectedRegion(newRegion);
      }
    }
  };

  const handleCardClick = (regionKey: RegionKey) => {
    if (regionKey !== selectedRegion) {
      setIsTransitioning(true);
      setSelectedRegion(regionKey);
      setTimeout(() => setIsTransitioning(false), 120);
    }
  };

  return (
    <div className="interactive-map-container">
      <div className="interactive-map-grid">
        <div className="interactive-map-svg">
          <div
            ref={mapRef}
            className="vn-map-embed"
            aria-label="Bản đồ Việt Nam - chọn vùng miền"
            dangerouslySetInnerHTML={{ __html: svgViewerMarkup }}
            onClick={handleMapClick}
          />
        </div>

        <div className="carousel-3d-section">
          <div className="carousel-3d-wrapper">
            {regions.map(region => {
              const selectedIndex = regions.findIndex(r => r.key === selectedRegion);
              const position =
                region.key === selectedRegion
                  ? 'center'
                  : regions.indexOf(region) < selectedIndex
                  ? 'left'
                  : 'right';
              const highlightSummaries = region.highlights
                .map(group => {
                  const detail = group.points.slice(0, 2).join(', ');
                  return detail ? `${group.title}: ${detail}` : group.title;
                })
                .slice(0, 4);
              const regionContext = regionContextMap[region.key];

              return (
                <div
                  key={region.key}
                  className={`interactive-map-info carousel-card ${position} ${isTransitioning ? 'transitioning' : ''}`}
                  style={{ zIndex: position === 'center' ? 3 : position === 'left' ? 2 : 1 }}
                  onClick={() => (position === 'center' ? null : handleCardClick(region.key))}
                >
                  <h3 className="region-title">{regionLabels[region.key]}</h3>
                  <div className="region-badges">
                    <img 
                      src={region.badgeImage} 
                      alt={region.name}
                      className="badge-image"
                    />
                  </div>
                  <div className="region-scroll">
                    {/* <ul className="region-highlights">
                      {highlightSummaries.map((summary, idx) => (
                        <li key={idx}>{summary}</li>
                      ))}
                    </ul> */}

                    {regionContext && (
                      <div className="region-context">
                        <h4>{regionContext.title}</h4>
                        <ul>
                          {regionContext.items.map((item, idx) => (
                            <li key={idx}>
                              {item.label ? <strong>{item.label}</strong> : null}
                              {item.label ? ' ' : ''}
                              {item.emphasis ? <em>{item.text}</em> : item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="carousel-dots">
            {regions.map(region => (
              <button
                key={region.key}
                className={`carousel-dot ${region.key === selectedRegion ? 'active' : ''}`}
                onClick={() => handleCardClick(region.key)}
                aria-label={`Chuyển đến ${regionLabels[region.key]}`}
              >
                <span className="dot-label">{regionLabels[region.key]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
