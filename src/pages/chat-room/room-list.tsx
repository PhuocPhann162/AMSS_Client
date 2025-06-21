import { ChatRoom, ChatRoomType } from '@/interfaces/chat/chat-system';
import React, { useEffect, useState } from 'react';
import { useCreateRoomMutation, useSearchUsersQuery } from '@/api/chat-api';
import { GetUsersRequest } from '@/models/request/user/get-users-request';
import { apiResponse, User } from '@/interfaces';
import { formatLocalDateTime } from '@/helper/dayFormat';
import { ListSortDirection } from '@/models';
import { signalRService } from '@/services/signalr-service';
import {
  AAvatar,
  AButton,
  ACheckbox,
  AInput,
  AList,
  AModal,
  ASelect,
  ASpin,
} from '@/common/ui-common';

interface RoomListProps {
  rooms: ChatRoom[];
  currentRoom: string | null;
  onRoomSelect: (roomId: string) => void;
  isConnected: boolean;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  currentRoom,
  onRoomSelect,
  isConnected,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomType, setNewRoomType] = useState<ChatRoomType>(
    ChatRoomType.Group,
  );
  const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
  const [error, setError] = useState<string | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const { data: usersData, isLoading: isUsersLoading } = useSearchUsersQuery({
    orderBy: 'IsOnline',
    orderByDirection: ListSortDirection.Descending,
    currentPage: userPage,
    limit: 20,
    search: '',
  } as GetUsersRequest);

  useEffect(() => {
    if (usersData?.result && usersData.result?.collection) {
      setAllUsers((prev) => {
        const ids = new Set(prev.map((u) => u.id));
        return [
          ...prev,
          ...(usersData.result.collection || []).filter(
            (u: User) => !ids.has(u.id),
          ),
        ];
      });
      setHasMoreUsers(usersData.result.collection.length > 0);
    }
  }, [usersData]);

  useEffect(() => {
    const handleUserOnline = (userId: string) => {
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isOnline: true } : u)),
      );
    };
    const handleUserOffline = (userId: string) => {
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isOnline: false } : u)),
      );
    };
    const handleOnlineUsers = (userIds: string[]) => {
      setAllUsers((prev) =>
        prev.map((u) =>
          userIds.includes(u.id ?? '')
            ? { ...u, isOnline: true }
            : { ...u, isOnline: false },
        ),
      );
    };
    signalRService.on('UserOnline', handleUserOnline);
    signalRService.on('UserOffline', handleUserOffline);
    signalRService.on('OnlineUsers', handleOnlineUsers);
    return () => {
      signalRService.off('UserOnline', handleUserOnline);
      signalRService.off('UserOffline', handleUserOffline);
      signalRService.off('OnlineUsers', handleOnlineUsers);
    };
  }, []);

  const handleUserListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop - clientHeight < 40 &&
      hasMoreUsers &&
      !isUsersLoading
    ) {
      setUserPage((p) => p + 1);
    }
  };

  const handleToggleMember = (userId: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleOpenModal = () => {
    setShowCreateModal(true);
    setNewRoomName('');
    setNewRoomType(ChatRoomType.Group);
    setSelectedMemberIds([]);
    setError(null);
  };
  const handleCloseModal = () => setShowCreateModal(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) {
      setError('Room name is required');
      return;
    }
    try {
      await createRoom({
        name: newRoomName,
        description: 'Chat Room Description',
        type: newRoomType,
        memberIds: selectedMemberIds,
      }).unwrap();
      setShowCreateModal(false);
      setNewRoomName('');
      setNewRoomType(ChatRoomType.Group);
      setSelectedMemberIds([]);
      setError(null);
    } catch (err) {
      setError(
        (err as apiResponse)?.data?.errorMessages?.[0] ||
          'Failed to create room',
      );
    }
  };

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='border-b border-gray-200 p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>Chat Rooms</h1>
          <div
            className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
        </div>
        <p className='text-sm text-gray-500'>
          {isConnected ? 'Connected' : 'Disconnected'}
        </p>
      </div>

      {/* Room List */}
      <div className='flex-1 overflow-y-auto'>
        {rooms.length === 0 ? (
          <div className='p-4 text-center text-gray-500'>
            No chat rooms available
          </div>
        ) : (
          <div className='divide-y divide-gray-200'>
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
                  currentRoom === room.id
                    ? 'border-r-4 border-blue-500 bg-blue-50'
                    : ''
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={'/Hot_Air_Balloon.png'}
                      alt={room.name}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='font-medium text-gray-900'>{room.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {room.type === ChatRoomType.Private
                          ? 'Private'
                          : room.type === ChatRoomType.Group
                            ? 'Group'
                            : 'Channel'}
                      </p>
                    </div>
                  </div>
                  {currentRoom === room.id && (
                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Room Button */}
      <div className='border-t border-gray-200 p-5'>
        <AButton
          variant='solid'
          color='cyan'
          size='large'
          onClick={handleOpenModal}
          className='w-full'
        >
          + New Room
        </AButton>
      </div>

      {/* Create Room Modal */}
      <AModal
        open={showCreateModal}
        onCancel={handleCloseModal}
        title={<h2 className='text-lg font-semibold'>Create New Room</h2>}
        footer={null}
        width={500}
      >
        <form className='w-full' onSubmit={handleCreateRoom}>
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Room Name
            </label>
            <AInput
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              required
              autoFocus
              placeholder='Enter room name'
            />
          </div>
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Room Type
            </label>
            <ASelect
              className='w-full'
              value={newRoomType}
              onChange={(value) => setNewRoomType(value)}
              options={[
                { value: ChatRoomType.Group, label: 'Group' },
                { value: ChatRoomType.Channel, label: 'Channel' },
              ]}
            ></ASelect>
          </div>
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Members
            </label>
            <ASpin spinning={isUsersLoading && allUsers.length === 0}>
              <div
                className='max-h-60 overflow-y-auto rounded border border-gray-200'
                onScroll={handleUserListScroll}
                tabIndex={0}
                aria-label='User list'
              >
                <AList
                  dataSource={allUsers}
                  renderItem={(user: User) => {
                    const isOnline = user.isOnline;
                    return (
                      <AList.Item
                        key={user.id}
                        className='cursor-pointer px-2 transition-colors hover:bg-gray-50'
                        onClick={() => handleToggleMember(user.id ?? '')}
                      >
                        <AList.Item.Meta
                          avatar={
                            <div className='relative'>
                              <AAvatar
                                src={user.avatar || '/avatar.png'}
                                size={40}
                              />
                              <span
                                className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                                title={isOnline ? 'Online' : 'Offline'}
                              />
                            </div>
                          }
                          title={
                            <span className='font-medium'>{user.fullName}</span>
                          }
                          description={
                            <span className='truncate text-xs text-gray-500'>
                              {isOnline
                                ? 'Online'
                                : user.lastSeen
                                  ? `Last seen: ${formatLocalDateTime(user.lastSeen)}`
                                  : 'Offline'}
                            </span>
                          }
                        />
                        <ACheckbox
                          checked={selectedMemberIds.includes(user.id ?? '')}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleMember(user.id ?? '');
                          }}
                        />
                      </AList.Item>
                    );
                  }}
                  locale={{ emptyText: 'No users found' }}
                />
                {isUsersLoading && allUsers.length > 0 && (
                  <div className='py-3 text-center text-sm text-gray-400'>
                    <ASpin size='small' /> Loading more...
                  </div>
                )}
              </div>
            </ASpin>
          </div>
          {error && <div className='mb-3 text-sm text-red-500'>{error}</div>}
          <div className='flex justify-end gap-2'>
            <AButton onClick={handleCloseModal} disabled={isCreating}>
              Cancel
            </AButton>
            <AButton
              type='primary'
              htmlType='submit'
              loading={isCreating}
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create'}
            </AButton>
          </div>
        </form>
      </AModal>
    </div>
  );
};
