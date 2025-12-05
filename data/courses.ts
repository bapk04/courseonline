// data/courses.ts
export interface Course {
  id: string;
  title: string;
  description: string; // short 2 lines
  image: string;       // high-quality Unsplash/Bing URL
  category: string;    // e.g. 'Development', 'Design', 'Marketing'
  rating: number;      // e.g. 4.8
  price: string;       // e.g. '$19.99'
  videoUrl: string;    // embed Youtube URL (for iframe)
}

export const courses: Course[] = [
  {
    id: 'course-nextjs-001',
    title: 'Next.js 16 — From Zero to Production',
    description: 'Learn App Router, server components, and deployment.\nBuild real-world apps with best practices.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    category: 'Development',
    rating: 4.9,
    price: '$29.99',
    videoUrl: 'https://www.youtube.com/embed/6xj7C2F3z3c'
  },
  {
    id: 'course-react-002',
    title: 'React 19 Deep Dive',
    description: 'Understand reactivity, new APIs and concurrent rendering.\nHands-on examples and performance tips.',
    image: 'https://images.unsplash.com/photo-1526378727705-7f9b1e3f6a20?auto=format&fit=crop&w=1600&q=80',
    category: 'Development',
    rating: 4.8,
    price: '$24.99',
    videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA'
  },
  {
    id: 'course-ux-003',
    title: 'UI/UX Design Essentials',
    description: 'Design systems, wireframes, and user testing.\nCreate interfaces people love to use.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    category: 'Design',
    rating: 4.7,
    price: '$19.99',
    videoUrl: 'https://www.youtube.com/embed/9cZ0bq0I2kA'
  },
  {
    id: 'course-figma-004',
    title: 'Figma for Product Designers',
    description: 'Master prototyping, components and collaborative workflows.\nCreate polished UI prototypes quickly.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=1600&q=80',
    category: 'Design',
    rating: 4.6,
    price: '$17.99',
    videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8'
  },
  {
    id: 'course-marketing-005',
    title: 'Digital Marketing Fundamentals',
    description: 'SEO, SEM, content marketing and analytics.\nGrow traffic and measure results effectively.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80',
    category: 'Marketing',
    rating: 4.5,
    price: '$14.99',
    videoUrl: 'https://www.youtube.com/embed/3eM6g0I0ZZs'
  },
  {
    id: 'course-python-006',
    title: 'Python for Web & Automation',
    description: 'From basics to web scraping and automation scripts.\nPractical projects to build your portfolio.',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80',
    category: 'Development',
    rating: 4.8,
    price: '$22.99',
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc'
  }
];
