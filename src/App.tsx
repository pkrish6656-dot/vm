import { useEffect, useMemo, useState } from 'react';
import { CatalogItem, legalDemoProvider, VideoQuality } from './content';
import { useMemo, useState } from 'react';

type MediaCard = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  cover: string;
};

const featured = {
  title: 'Neon District',
  description:
    'A cyber-thriller series where a detective untangles a citywide conspiracy powered by rogue AI.',
  cta: 'Watch Trailer'
};

const tabs = ['Home', 'Movies', 'Series', 'Watchlist'] as const;
const qualityOptions: Array<VideoQuality | 'All'> = ['All', 'SD', 'HD', 'Full HD', '4K'];
const library: MediaCard[] = [
  { id: 1, title: 'Orbital Dawn', year: 2025, genre: 'Sci-Fi', rating: 8.7, duration: '2h 11m', cover: '🌌' },
  { id: 2, title: 'Last Ember', year: 2024, genre: 'Action', rating: 8.1, duration: '1h 49m', cover: '🔥' },
  { id: 3, title: 'Paper Tigers', year: 2026, genre: 'Drama', rating: 7.9, duration: '2h 03m', cover: '🐅' },
  { id: 4, title: 'Solar Tide', year: 2023, genre: 'Adventure', rating: 8.0, duration: '1h 57m', cover: '🌊' },
  { id: 5, title: 'Ghost Thread', year: 2025, genre: 'Mystery', rating: 8.4, duration: '1h 43m', cover: '🧵' },
  { id: 6, title: 'Atlas Reborn', year: 2024, genre: 'Fantasy', rating: 7.8, duration: '2h 18m', cover: '🗺️' }
];

const tabs = ['Home', 'Movies', 'Series', 'Watchlist'] as const;

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

  const filtered = useMemo(() => {
    return library.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesTab = activeTab === 'Home' || activeTab === 'Watchlist' ? true : item.genre !== 'Documentary';
      return matchesSearch && matchesTab;
    });
  }, [activeTab, query]);

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
          <button className="ghost-btn">View All</button>
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
                <h3>{item.title}</h3>
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
