import { AButton } from '@/common/ui-common';
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const MessageChatIcon = () => {
  const navigate = useNavigate();
  const handleNavigateToChat = () => {
    navigate('/chat-room');
  };
  return (
    <AButton variant='link' color='default' onClick={handleNavigateToChat}>
      <MessageOutlined className='text-xl' />
    </AButton>
  );
};
