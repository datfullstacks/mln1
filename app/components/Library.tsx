'use client';

import { useMemo, useState } from 'react';
import { libraryEntries, type LibraryEntry } from '@/lib/data';

type RegionFilter = 'all' | LibraryEntry['region'];

export function Library() {
  const [region, setRegion] = useState<RegionFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return libraryEntries.filter(entry => {
      const matchRegion = region === 'all' || entry.region === region;
      const matchQuery =
        !query ||
        entry.title.toLowerCase().includes(query) ||
        entry.desc.toLowerCase().includes(query) ||
        entry.tags.some(t => t.toLowerCase().includes(query));
      return matchRegion && matchQuery;
    });
  }, [region, search]);

  return (
    <section id="library" className="container section">
      <div className="section-head">
        <div>
          <h2>Thư viện tri thức ba miền</h2>
          <p className="sub">Lọc nhanh theo miền, tìm kiếm từ khóa để khám phá di sản, ẩm thực, lễ hội.</p>
        </div>
        <div className="pill pill-ghost">Bắc - Trung - Nam</div>
      </div>
      <div className="library">
        <div className="library-filter card">
          <label htmlFor="search">Tìm kiếm</label>
          <input
            id="search"
            type="text"
            value={search}
            placeholder="Ví dụ: quan họ, chợ nổi, nhã nhạc"
            onChange={e => setSearch(e.target.value)}
          />
          <label>Chọn miền</label>
          <div className="filter-buttons">
            {(['all', 'bac', 'trung', 'nam'] as RegionFilter[]).map(item => (
              <button
                key={item}
                className={`filter-btn ${region === item ? 'active' : ''}`}
                onClick={() => setRegion(item)}
              >
                {item === 'all' ? 'Tất cả' : item === 'bac' ? 'Bắc' : item === 'trung' ? 'Trung' : 'Nam'}
              </button>
            ))}
          </div>
        </div>
        <div className="library-list">
          {filtered.length === 0 && <div className="library-card card">Không tìm thấy chủ đề phù hợp.</div>}
          {filtered.map(entry => (
            <div key={entry.title} className="library-card card">
              <strong>{entry.title}</strong>
              <div className="meta">
                <span>{entry.region === 'bac' ? 'Miền Bắc' : entry.region === 'trung' ? 'Miền Trung' : 'Miền Nam'}</span>
                {entry.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{entry.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
