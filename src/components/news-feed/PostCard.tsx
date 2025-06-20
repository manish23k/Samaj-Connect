// src/components/news-feed/PostCard.tsx
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { type Post } from '@/types/news-feed';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import { enUS, gu } from 'date-fns/locale'; // For Gujarati date formatting if needed

export function PostCard({ post }: { post: Post }) {
  const { t, language } = useLanguage();
  const dateLocale = language === 'gu' ? gu : enUS;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="profile photo" />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <CardTitle className="text-base font-semibold font-body">{post.author.name}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: dateLocale })}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden aspect-video relative">
            <Image 
              src={post.imageUrl} 
              alt="Post image" 
              layout="fill" 
              objectFit="cover" 
              className="transition-transform duration-300 hover:scale-105"
              data-ai-hint={post.imageHint || "social post"}
            />
          </div>
        )}
        {post.videoUrl && (
           <div className="mt-3 rounded-lg overflow-hidden aspect-video relative bg-black">
            <video controls src={post.videoUrl} className="w-full h-full object-contain" data-ai-hint="community video">
                Your browser does not support the video tag.
            </video>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <ThumbsUp className="mr-1.5 h-4 w-4" /> {post.likes} {t('likes')}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <MessageCircle className="mr-1.5 h-4 w-4" /> {post.comments} {t('comments')}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Share2 className="mr-1.5 h-4 w-4" /> {t('send')}
        </Button>
      </CardFooter>
    </Card>
  );
}
