export type ItemStatus = 'published' | 'draft' | 'scheduled';
export type Role = 'admin' | 'viewer';

export interface User {
  name: string;
  role: Role;
  email: string;
  avatar: string;
}

export interface Podcast {
  id: number;
  slug: string;
  title: string;
  description: string;
  language: 'ar' | 'en';
  website_url: string | null;
  cover_image: string | null;
  rss_url: string | null;
  episodes: Episode[];
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: number;
  podcast_id: number;
  season_id: number | null;
  transcript_id: number | null;
  episode_number: number;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  duration_seconds: number;
  explicit: boolean;
  status: ItemStatus;
  published_at: string;
  cover_image: string;
  audio_url: string | null;
  video_url: string;
  file_size: number | null;
  mime_type: number | null;
  created_at: string;
  updated_at: string;
  podcast: Podcast | null;
  season: Season | null;
  views_count: number;
}

export interface Blog {
  id: number;
  user_id: number;
  title: string;
  content: string;
  category: {
    id: number | string;
    name: string;
  };
  category_id: string | number;
  status: ItemStatus;
  publish_date: string;
  views: number;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: Role;
    avatar_url: null;
    created_at: string;
    updated_at: string;
  };
  header_image: string;
  description: string;
  announcement: string;
}
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  blogs_count: number;
  created_at: string;
  updated_at: string;
}

export interface Release {
  id: number;
  title: string;
  description: string;
  images: string[];
  file_url: string;
  excel_url: string;
  powerbi_url: string;
  created_at: string;
}

export interface Season {
  id: number;
  podcast_id: number;
  number: number;
  title: string;
  description: string;
  release_date: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  views_count: number;
  image_path: string;
  video_path: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number | string;
    name: string;
  };
}
