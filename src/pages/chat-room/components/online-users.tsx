// components/Chat/OnlineUsers.tsx
import React, { useState } from 'react';
import { List, Avatar, Input, Empty, Typography } from 'antd';
import { User } from '@/interfaces';
import { AButton, AModal, ATooltip } from '@/common/ui-common';
const { Text } = Typography;

interface OnlineUsersProps {
  users: (User & { isOnline: boolean })[];
  onSendPrivateMessage: (recipientId: string, content: string) => void;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({
  users,
  onSendPrivateMessage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setMessage('');
    setModalVisible(true);
  };

  const handleSend = () => {
    if (selectedUser && message.trim()) {
      onSendPrivateMessage(selectedUser.id!, message.trim());
      setModalVisible(false);
      setMessage('');
    }
  };

  return (
    <div className='bg-white p-4'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>
        Users ({users.length})
      </h3>
      <List
        itemLayout='horizontal'
        dataSource={users}
        locale={{ emptyText: <Empty description='No users' /> }}
        className='overflow-x-hidden'
        renderItem={(user) => (
          <List.Item
            actions={[
              <AButton
                key='message'
                type='link'
                onClick={() => handleOpenModal(user)}
                tabIndex={0}
                aria-label={`Message ${user.fullName}`}
              >
                Message
              </AButton>,
            ]}
          >
            <List.Item.Meta
              className='min-w-28'
              avatar={<Avatar src={user.avatar || '/avatar.png'} />}
              title={
                <Text className='min-w-28 font-medium' ellipsis>
                  <ATooltip title={user.fullName}>{user.fullName}</ATooltip>
                </Text>
              }
              description={
                <div className='flex items-center justify-center gap-2'>
                  <div
                    className={`inline-block h-2 w-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                  ></div>
                  {user.isOnline ? 'Online' : 'Offline'}
                </div>
              }
            />
          </List.Item>
        )}
      />
      <AModal
        title={selectedUser ? `Send message to ${selectedUser.fullName}` : ''}
        open={modalVisible}
        onOk={handleSend}
        onCancel={() => setModalVisible(false)}
        okText='Send'
        cancelText='Cancel'
        okButtonProps={{ disabled: !message.trim() }}
      >
        <Input.TextArea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter your message...'
          autoFocus
        />
      </AModal>
    </div>
  );
};

export default OnlineUsers;
