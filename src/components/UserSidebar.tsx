import React from 'react';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { useSearchUsersQuery } from '@/api/chat-api';
import OnlineUsers from '@/pages/chat-room/components/online-users';
import { signalRService } from '@/services/signalr-service';

const UserSidebar: React.FC = () => {
  const chat = useAppSelector((state) => state.chatStore);
  const { data: usersData } = useSearchUsersQuery({
    orderBy: 'IsOnline',
    orderByDirection: 1,
    currentPage: 1,
    limit: 1000,
    search: '',
  });
  const allUsers = (usersData?.result?.collection || [])
    .filter((u) => typeof u.id === 'string')
    .map((u) => ({
      ...u,
      id: String(u.id),
      isOnline: chat.onlineUsers.includes(String(u.id)),
    }));
  allUsers.sort((a, b) => Number(b.isOnline) - Number(a.isOnline));

  const handleSendPrivateMessage = (recipientId: string, content: string) => {
    signalRService.sendPrivateMessage(recipientId, content);
  };

  return (
    <div className='h-full w-72 overflow-y-auto border-l border-gray-200 bg-white shadow-lg'>
      <OnlineUsers
        users={allUsers}
        onSendPrivateMessage={handleSendPrivateMessage}
      />
    </div>
  );
};

export default UserSidebar;
