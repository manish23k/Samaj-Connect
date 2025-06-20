// src/components/group-chat/ChatGroupItem.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type ChatGroup } from '@/types/group-chat';
import { cn } from '@/lib/utils';

interface ChatGroupItemProps {
  group: ChatGroup;
  isSelected: boolean;
  onSelectGroup: (groupId: string) => void;
}

export function ChatGroupItem({ group, isSelected, onSelectGroup }: ChatGroupItemProps) {
  return (
    <button
      onClick={() => onSelectGroup(group.id)}
      className={cn(
        "flex items-center w-full p-3 rounded-lg transition-colors duration-150 ease-in-out",
        isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
      )}
      aria-current={isSelected ? "page" : undefined}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={group.avatarUrl || `https://placehold.co/40x40.png?text=${group.name.charAt(0)}`} alt={group.name} data-ai-hint="group avatar" />
        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow text-left">
        <p className="font-semibold text-sm font-body">{group.name}</p>
        {group.lastMessage && (
          <p className={cn("text-xs truncate", isSelected ? "text-primary/80" : "text-muted-foreground")}>
            {group.lastMessage}
          </p>
        )}
      </div>
      {group.unreadCount > 0 && (
        <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
          {group.unreadCount}
        </span>
      )}
    </button>
  );
}
