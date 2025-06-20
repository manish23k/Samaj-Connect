// src/components/group-chat/ChatMessage.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Message } from '@/types/group-chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={cn("flex items-end gap-2 mb-4", isOwnMessage ? "justify-end" : "justify-start")}>
      {!isOwnMessage && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint="user avatar" />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-xl shadow",
          isOwnMessage ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"
        )}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold mb-0.5 opacity-80">{message.sender.name}</p>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={cn("text-xs mt-1 opacity-70", isOwnMessage ? "text-right" : "text-left")}>
          {format(new Date(message.timestamp), 'p')}
        </p>
      </div>
      {isOwnMessage && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint="user avatar" />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
