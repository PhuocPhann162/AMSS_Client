// components/ChatApp.tsx
import { useEffect } from 'react';
import { RoomList } from './room-list';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { RootState } from '@/storage/redux/store';
import { ChatRoom } from './chat-room';
import { setCurrentRoom, setRooms } from '@/storage/redux/chatSlice';
import { useGetChatRoomsQuery } from '@/api/chat-api';
import UserSidebar from '@/components/UserSidebar';

export const ChatApp = () => {
  const dispatch = useAppDispatch();
  const { rooms, currentRoom, isConnected, error } = useAppSelector(
    (state: RootState) => state.chatStore,
  );

  const getChatRooms = useGetChatRoomsQuery();
  const getChatRoomsData =
    getChatRooms.data?.result && !getChatRooms.isError
      ? getChatRooms.data.result
      : undefined;
  useEffect(() => {
    // Load user's chat rooms
    if (getChatRoomsData) {
      dispatch(setRooms(getChatRoomsData));
    }
  }, [dispatch, getChatRoomsData]);

  const handleRoomSelect = (roomId: string) => {
    dispatch(setCurrentRoom(roomId));
  };

  return (
    <div className='flex h-screen'>
      {/* Room List Sidebar */}
      <div className='w-80 rounded-lg border-r border-gray-200 bg-white shadow-neutral-500'>
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onRoomSelect={handleRoomSelect}
          isConnected={isConnected}
        />
      </div>

      {/* Chat Area */}
      <div className='flex-1'>
        {currentRoom ? (
          <ChatRoom roomId={currentRoom} />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <div className='text-center text-gray-500'>
              <h2 className='mb-2 text-2xl font-semibold'>Welcome to Chat</h2>
              <p>Select a room to start chatting</p>
            </div>
          </div>
        )}
      </div>
      <UserSidebar />

      {/* Error Toast */}
      {error && (
        <div className='fixed right-4 top-4 rounded-lg bg-red-500 px-4 py-2 text-white shadow-lg'>
          {error}
        </div>
      )}
    </div>
  );
};
