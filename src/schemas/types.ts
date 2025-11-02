export interface Pagination {
  current_page: number;
  per_page: number;
  total_items: number;
  last_page: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface ReleaseListItem {
  id: number;
  title: string;
  short_description: string;
  image: string;
  views: number;
  published_at: string;
  pdf_url: string;
}

export interface ReleaseDetails extends ReleaseListItem {
  description: string;
}

export interface BlogListItem {
  id: number;
  title: string;
  description: string;
  views: number;
  image: string;
  published_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface BlogDetails extends BlogListItem {
  content: string;
  header_image: string;
  announcement: string;
  user_name: string;
}

export interface EpisodeListItem {
  id: number;
  title: string;
  description: string;
  views: number;
  image: string;
  audio_url: string;
  published_at: string;
  podcast: {
    id: number;
    name: string;
  };
}

export interface EpisodeDetails extends EpisodeListItem {
  description: string;
  video_url: string;
}

export interface VideoListItem {
  id: number;
  title: string;
  description: string;
  views: number;
  image: string;
  published_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface VideoDetails extends VideoListItem {
  id: number;
  title: string;
  short_description: string;
  description: string;
  views: number;
  image: string;
  video_url: string;
  published_at: string;
  category: {
    id: number;
    name: string;
  };
}
