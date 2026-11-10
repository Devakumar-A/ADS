export interface WorkItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  ratio: '16/9' | '9/16';
  category: string;
  title: string;
  poster?: string;
}

export const workItems: WorkItem[] = [
  {
    id: 1,
    type: 'video',
    src: '/assets/work/video1.mp4',
    ratio: '16/9',
    category: 'DIGITAL CAMPAIGNS',
    title: 'Featured Campaign',
  },
  {
    id: 2,
    type: 'image',
    src: '/assets/work/image1.webp',
    ratio: '9/16',
    category: 'CREATIVE',
    title: 'Brand Communication',
  },
  {
    id: 3,
    type: 'video',
    src: '/assets/work/video2.mp4',
    ratio: '9/16',
    category: 'VIDEO PRODUCTION',
    title: 'Motion Showcase',
  },
  {
    id: 4,
    type: 'image',
    src: '/assets/work/image2.webp',
    ratio: '9/16',
    category: 'BRANDING',
    title: 'Visual Identity',
  },
  {
    id: 5,
    type: 'video',
    src: '/assets/work/video3.mp4',
    ratio: '9/16',
    category: 'OUTDOOR ADVERTISING',
    title: 'Commercial Film',
  },
  {
    id: 6,
    type: 'image',
    src: '/assets/work/image3.webp',
    ratio: '9/16',
    category: 'CREATIVE',
    title: 'Campaign Visual',
  },
  {
    id: 7,
    type: 'video',
    src: '/assets/work/video4.mp4',
    ratio: '9/16',
    category: 'VIDEO PRODUCTION',
    title: 'Brand Storytelling',
  },
];

