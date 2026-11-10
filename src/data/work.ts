export type WorkCategory = 'ALL' | 'DIGITAL' | 'OUTDOOR' | 'BRANDING' | 'WEB';

export type MediaOrientation = 'portrait' | 'landscape' | 'square';

export interface WorkItem {
  id: string;
  category: Exclude<WorkCategory, 'ALL'>;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  title?: string;
  description?: string;
  featured?: boolean;
  orientation?: MediaOrientation;
  aspectRatio?: string; // e.g., '16/9', '9/16', '1/1', '4/5'
  isSample?: boolean; // Label indicating temporary sample media
  media?: string;
  mediaType?: 'image' | 'video';
}

/**
 * AG ADS Work Collection (Curated Sample Media for Grid Architecture Evaluation)
 * 
 * IMPORTANT: In accordance with Step 15.2 requirements, these are high-quality
 * temporary sample assets designed to thoroughly test the collapsing masonry grid,
 * variable aspect ratios (landscape, portrait, square), mixed video playback, and
 * dynamic category filtering.
 * 
 * To replace with real AG ADS media later:
 * Simply replace the `src` and `poster` URLs with real file paths (e.g., `/work/...`)
 * and set `isSample: false` or update metadata.
 */
export const authenticWorkItems: WorkItem[] = [
  {
    id: 'ag-work-01',
    category: 'DIGITAL',
    type: 'video',
    src: '/assets/work/video1.mp4',
    alt: 'Campaign Creative — Digital Marketing',
    title: 'Featured Campaign',
    description: 'Performance digital advertising creative engineered for conversion and audience engagement.',
    orientation: 'landscape',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-02',
    category: 'BRANDING',
    type: 'image',
    src: '/assets/work/image1.webp',
    alt: 'Brand Communication & Creative Direction',
    title: 'Brand Communication',
    description: 'Strategic visual messaging and creative identity establishing corporate authority.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-03',
    category: 'DIGITAL',
    type: 'video',
    src: '/assets/work/video2.mp4',
    alt: 'Motion Production & Dynamic Visuals',
    title: 'Motion Showcase',
    description: 'High-impact commercial video production crafted for social feeds and multi-channel distribution.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-04',
    category: 'BRANDING',
    type: 'image',
    src: '/assets/work/image2.webp',
    alt: 'Visual Identity & Brand Architecture',
    title: 'Visual Identity',
    description: 'Comprehensive brand typography, color theory, and identity guidelines for enterprise brands.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-05',
    category: 'OUTDOOR',
    type: 'video',
    src: '/assets/work/video3.mp4',
    alt: 'Outdoor Campaign & Billboard Media',
    title: 'Commercial Film',
    description: 'High-visibility regional outdoor advertising placed across commanding physical locations.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-06',
    category: 'WEB',
    type: 'image',
    src: '/assets/work/image3.webp',
    alt: 'Creative Direction & Digital Web Platform',
    title: 'Campaign Visual',
    description: 'End-to-end creative direction and digital web platform execution built for user conversion.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-07',
    category: 'OUTDOOR',
    type: 'video',
    src: '/assets/work/video4.mp4',
    alt: 'Outdoor Media & High-Visibility Display Visual',
    title: 'Brand Storytelling',
    description: 'Dynamic commercial outdoor media designed to capture audience attention in motion.',
    orientation: 'portrait',
    featured: true,
    isSample: false,
  },
  {
    id: 'ag-work-08',
    category: 'DIGITAL',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    alt: 'Meta Advertising & Lead Generation Strategy',
    title: 'Meta Ads Architecture',
    description: 'Targeted demographic campaigns capturing active consumer demand on Instagram and Facebook.',
    orientation: 'landscape',
    featured: false,
    isSample: false,
  },
  {
    id: 'ag-work-09',
    category: 'WEB',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    alt: 'High-Performance Web Architecture & SEO',
    title: 'Digital Platform Development',
    description: 'Fast, search-optimized web applications engineered for seamless lead conversion across devices.',
    orientation: 'portrait',
    featured: false,
    isSample: false,
  },
];

export const workCategories: WorkCategory[] = [
  'ALL',
  'DIGITAL',
  'OUTDOOR',
  'BRANDING',
  'WEB',
];
