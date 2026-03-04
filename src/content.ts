export type VideoQuality = 'SD' | 'HD' | 'Full HD' | '4K';

export type CatalogItem = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  cover: string;
  quality: VideoQuality;
  sourceLabel: string;
  sourceType: 'public-domain' | 'licensed-demo';
};

export type ContentProvider = {
  name: string;
  complianceNote: string;
  getCatalog: () => Promise<CatalogItem[]>;
};

const demoCatalog: CatalogItem[] = [
  {
    id: 1,
    title: 'Orbital Dawn',
    year: 2025,
    genre: 'Sci-Fi',
    rating: 8.7,
    duration: '2h 11m',
    cover: '🌌',
    quality: '4K',
    sourceLabel: 'Studio Demo Reel',
    sourceType: 'licensed-demo'
  },
  {
    id: 2,
    title: 'Last Ember',
    year: 2024,
    genre: 'Action',
    rating: 8.1,
    duration: '1h 49m',
    cover: '🔥',
    quality: 'Full HD',
    sourceLabel: 'Creative Commons Showcase',
    sourceType: 'public-domain'
  },
  {
    id: 3,
    title: 'Paper Tigers',
    year: 2026,
    genre: 'Drama',
    rating: 7.9,
    duration: '2h 03m',
    cover: '🐅',
    quality: '4K',
    sourceLabel: 'Festival Screener (Licensed)',
    sourceType: 'licensed-demo'
  },
  {
    id: 4,
    title: 'Solar Tide',
    year: 2023,
    genre: 'Adventure',
    rating: 8,
    duration: '1h 57m',
    cover: '🌊',
    quality: 'HD',
    sourceLabel: 'Public Domain Archive',
    sourceType: 'public-domain'
  },
  {
    id: 5,
    title: 'Ghost Thread',
    year: 2025,
    genre: 'Mystery',
    rating: 8.4,
    duration: '1h 43m',
    cover: '🧵',
    quality: 'Full HD',
    sourceLabel: 'Studio Demo Reel',
    sourceType: 'licensed-demo'
  },
  {
    id: 6,
    title: 'Atlas Reborn',
    year: 2024,
    genre: 'Fantasy',
    rating: 7.8,
    duration: '2h 18m',
    cover: '🗺️',
    quality: '4K',
    sourceLabel: 'Creative Commons Showcase',
    sourceType: 'public-domain'
  }
];

export const legalDemoProvider: ContentProvider = {
  name: 'Legal Demo Provider',
  complianceNote: 'Catalog is restricted to licensed demo clips and public-domain media.',
  async getCatalog() {
    return Promise.resolve(demoCatalog);
  }
};
