'use client';

import { dongSonDrumMarkup } from './dongSonDrumMarkup';

export function DongSonBackground() {
  const hasMarkup = dongSonDrumMarkup.trim().length > 0;
  if (!hasMarkup) return null;

  return (
    <div className="dongson-bg" aria-hidden="true">
      <div
        className="dongson-bg-svg"
        dangerouslySetInnerHTML={{ __html: dongSonDrumMarkup }}
      />
    </div>
  );
}
