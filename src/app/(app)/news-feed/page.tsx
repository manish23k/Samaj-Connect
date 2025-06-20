// src/app/(app)/news-feed/page.tsx
"use client";

import { PostCard } from '@/components/news-feed/PostCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Post } from '@/types/news-feed';
import { Image as ImageIcon, Video as VideoIcon, Send } from 'lucide-react';
import { useState } from 'react';

const mockPosts: Post[] = [
  {
    id: '1',
    author: { id: 'user1', name: 'Arya Stark', avatarUrl: 'https://placehold.co/40x40.png?text=AS' },
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    content: "Just attended a wonderful community gathering! So many inspiring people. #SamajConnect #CommunitySpirit",
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'community gathering',
    likes: 152,
    comments: 18,
  },
  {
    id: '2',
    author: { id: 'user2', name: 'Jon Snow', avatarUrl: 'https://placehold.co/40x40.png?text=JS' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    content: "Exciting news! The new community center plans have been finalized. Check out the video walkthrough.",
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    likes: 230,
    comments: 45,
  },
  {
    id: '3',
    author: { id: 'user3', name: 'Daenerys Targaryen', avatarUrl: 'https://placehold.co/40x40.png?text=DT' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    content: "Reminder: আগামীকালের বার্ষিক সাধারণ সভা দুপুর ২টায় অনুষ্ঠিত হবে। আপনার উপস্থিতি একান্ত কাম্য। (Reminder: Tomorrow's annual general meeting will be held at 2 PM. Your presence is highly requested.)",
    likes: 98,
    comments: 7,
  },
];


export default function NewsFeedPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !user) return;
    const newPost: Post = {
      id: String(Date.now()),
      author: { id: user.id, name: user.name, avatarUrl: user.avatarUrl || 'https://placehold.co/40x40.png' },
      timestamp: new Date().toISOString(),
      content: newPostContent,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('newsFeed')}</h1>
      
      {/* Create Post Section */}
      <div className="bg-card p-4 sm:p-6 rounded-xl shadow-lg">
        <Textarea
          placeholder={t('postPlaceholder')}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="mb-3 min-h-[80px] bg-input"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ImageIcon className="h-5 w-5" />
              <span className="sr-only">Add Image</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <VideoIcon className="h-5 w-5" />
              <span className="sr-only">Add Video</span>
            </Button>
          </div>
          <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
            <Send className="mr-2 h-4 w-4" /> {t('createPost')}
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">{t('noPosts')}</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
