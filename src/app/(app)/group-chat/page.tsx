// src/app/(app)/group-chat/page.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatGroupItem } from '@/components/group-chat/ChatGroupItem';
import { ChatMessage } from '@/components/group-chat/ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import type { ChatGroup, Message, ChatUser } from '@/types/group-chat';
import { Send, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockUser1: ChatUser = { id: 'user1', name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/40x40.png?text=AW' };
const mockUser2: ChatUser = { id: 'user2', name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png?text=BB' };

const mockGroups: ChatGroup[] = [
  {
    id: 'group1',
    name: 'General Discussion',
    avatarUrl: 'https://placehold.co/40x40.png?text=GD',
    members: [mockUser1, mockUser2],
    messages: [
      { id: 'msg1', sender: mockUser1, content: 'Hello everyone!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: 'msg2', sender: mockUser2, content: 'Hi Alice! How are you?', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
    ],
    lastMessage: 'Hi Alice! How are you?',
    unreadCount: 2,
  },
  {
    id: 'group2',
    name: 'Event Planning Committee',
    avatarUrl: 'https://placehold.co/40x40.png?text=EP',
    members: [mockUser1],
    messages: [
      { id: 'msg3', sender: mockUser1, content: 'Next meeting is on Friday.', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    ],
    lastMessage: 'Next meeting is on Friday.',
    unreadCount: 0,
  },
];

export default function GroupChatPage() {
  const { t } = useLanguage();
  const { user: currentUser } = useAuth();
  const [groups, setGroups] = useState<ChatGroup[]>(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedGroup?.messages]);

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    // Mark messages as read (mock)
    setGroups(prevGroups => 
      prevGroups.map(g => g.id === groupId ? { ...g, unreadCount: 0 } : g)
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup || !currentUser) return;
    const message: Message = {
      id: String(Date.now()),
      sender: { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl || 'https://placehold.co/40x40.png' },
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === selectedGroupId
          ? { ...group, messages: [...group.messages, message], lastMessage: message.content }
          : group
      )
    );
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col"> {/* Adjusted height */}
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">{t('groupChat')}</h1>
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-0"> {/* Added min-h-0 */}
        {/* Groups List */}
        <Card className="md:col-span-1 lg:col-span-1 shadow-lg rounded-xl flex flex-col min-h-0"> {/* Added min-h-0 */}
          <CardHeader className="border-b p-4">
            <CardTitle className="text-lg font-semibold font-headline flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              {t('chatGroups')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex-grow min-h-0"> {/* Added min-h-0 */}
            <ScrollArea className="h-full">
              {groups.length > 0 ? (
                groups.map(group => (
                  <ChatGroupItem
                    key={group.id}
                    group={group}
                    isSelected={selectedGroupId === group.id}
                    onSelectGroup={handleSelectGroup}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">{t('noGroups')}</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 lg:col-span-3 shadow-lg rounded-xl flex flex-col min-h-0"> {/* Added min-h-0 */}
          {selectedGroup ? (
            <>
              <CardHeader className="border-b p-4 flex flex-row items-center space-x-3">
                 <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg font-semibold font-headline">{selectedGroup.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-4 overflow-hidden min-h-0"> {/* Added min-h-0 */}
                <ScrollArea className="h-full pr-2">
                  {selectedGroup.messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} isOwnMessage={msg.sender.id === currentUser?.id} />
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <div className="border-t p-4 flex items-center gap-2 bg-background rounded-b-xl">
                <Input
                  type="text"
                  placeholder={t('typeMessage')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow bg-input"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t('send')}</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground p-8">
              <Users className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">{t('selectChat')}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
