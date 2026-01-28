'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { svgViewerMarkup } from './mapMarkup';

type WrapperId = 'north' | 'center' | 'south';

const wrapperLabels: Record<WrapperId, { label: string; description: string }> = {
  north: { label: 'MIỀN BẮC', description: 'Núi rừng & đồng bằng sông Hồng' },
  center: { label: 'MIỀN TRUNG', description: 'Giữa đất nước và đại dương' },
  south: { label: 'MIỀN NAM', description: 'Đồng bằng sông Cửu Long & Sài Gòn' }
};

const wrapperOrder: WrapperId[] = ['north', 'center', 'south'];

export function SvgViewer() {
  const [activeWrapper, setActiveWrapper] = useState<WrapperId>('south');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.querySelectorAll<SVGGElement>('g.hover-group').forEach(group => {
      group.classList.toggle('active-wrapper', group.id === activeWrapper);
    });
  }, [activeWrapper]);

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    const group = target?.closest<SVGGElement>('g.hover-group');
    if (!group) return;
    const wrapperId = group.id as WrapperId | undefined;
    if (wrapperId) setActiveWrapper(wrapperId);
  };

  return (
    <section className="svg-viewer">
      <div className="svg-viewer-embed">
        <div
          ref={containerRef}
          className="svg-viewer-frame"
          aria-label="Bản đồ đính kèm từ svgviewer"
          dangerouslySetInnerHTML={{ __html: svgViewerMarkup }}
          onClick={handleContainerClick}
        />
      </div>
      <div className="svg-viewer-controls">
        {wrapperOrder.map(key => (
          <button
            key={key}
            type="button"
            className={`svg-viewer-btn ${activeWrapper === key ? 'is-active' : ''}`}
            onClick={() => setActiveWrapper(key)}
          >
            <strong>{wrapperLabels[key].label}</strong>
            <span>{wrapperLabels[key].description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}