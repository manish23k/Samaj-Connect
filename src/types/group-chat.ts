// src/types/group-chat.ts
export interface ChatUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Message {
  id: string;
  sender: ChatUser;
  content: string;
  timestamp: string; // ISO date string
}

export interface ChatGroup {
  id: string;
  name: string;
  avatarUrl?: string;
  members: ChatUser[];
  messages: Message[];
  lastMessage?: string;
  unreadCount: number;
}
