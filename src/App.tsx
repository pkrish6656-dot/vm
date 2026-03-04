import { useEffect, useMemo, useState } from 'react';
import { CatalogItem, legalDemoProvider, VideoQuality } from './content';

const featured = {
  title: 'Neon District',
  description:
    'A cyber-thriller series where a detective untangles a citywide conspiracy powered by rogue AI.',
  cta: 'Watch Trailer'
};

const tabs = ['Home', 'Movies', 'Series', 'Watchlist'] as const;
const qualityOptions: Array<VideoQuality | 'All'> = ['All', 'SD', 'HD', 'Full HD', '4K'];

export default function App() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Home');
  const [query, setQuery] = useState('');
  const [quality, setQuality] = useState<(typeof qualityOptions)[number]>('All');
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  useEffect(() => {
    legalDemoProvider.getCatalog().then(setCatalog);
  }, []);

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesQuality = quality === 'All' ? true : item.quality === quality;
      const matchesTab = activeTab === 'Home' || activeTab === 'Watchlist' ? true : item.genre !== 'Documentary';
      return matchesSearch && matchesTab && matchesQuality;
    });
  }, [activeTab, catalog, quality, query]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="logo">CinemaBox</div>
        <nav className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === activeTab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search titles..."
          className="search"
        />
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Featured Tonight</p>
          <h1>{featured.title}</h1>
          <p>{featured.description}</p>
          <button className="primary-btn">{featured.cta}</button>
        </div>
        <div className="hero-meta">
          <p className="eyebrow">Content Source</p>
          <p className="source-name">{legalDemoProvider.name}</p>
          <p className="compliance-note">{legalDemoProvider.complianceNote}</p>
        </div>
      </section>

      <main>
        <div className="section-head">
          <h2>{activeTab === 'Home' ? 'Trending Now' : activeTab}</h2>
          <div className="filters">
            <label htmlFor="quality" className="quality-label">
              Quality
            </label>
            <select
              id="quality"
              className="quality"
              value={quality}
              onChange={(event) => setQuality(event.target.value as (typeof qualityOptions)[number])}
            >
              {qualityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button className="ghost-btn">View All</button>
          </div>
        </div>

        <div className="grid">
          {filtered.map((item) => (
            <article key={item.id} className="card">
              <div className="cover" aria-hidden="true">
                {item.cover}
              </div>
              <div className="meta">
                <div className="title-row">
                  <h3>{item.title}</h3>
                  <span className="quality-pill">{item.quality}</span>
                </div>
                <p>
                  {item.year} • {item.genre}
                </p>
                <p>
                  ⭐ {item.rating} • {item.duration}
                </p>
                <p className="source">Source: {item.sourceLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
