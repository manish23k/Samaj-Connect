// src/types/news-feed.ts
export interface PostAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  timestamp: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
}
