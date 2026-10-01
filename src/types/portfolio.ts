export type ProjectCategory = 'all' | 'web-systems' | 'creative-tech' | 'cybernetics' | 'tools';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web-systems' | 'creative-tech' | 'cybernetics' | 'tools';
  categoryLabel: string;
  image: string;
  year: string;
  client: string;
  readTime?: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  stats: ProjectStat[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface BlogComment {
  id: string;
  author: string;
  handle: string;
  avatarSeed: string;
  timestamp: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      codeSnippet?: {
        language: string;
        code: string;
      };
      quote?: string;
    }[];
    conclusion: string;
  };
}

export interface SkillCategory {
  title: string;
  categoryCode: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    spec: string;
  }[];
}
