import { AButton } from '@/common/ui-common';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const MessageChatIcon = () => {
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.auth.user);

  const handleNavigateToChat = () => {
    if (userState?.id) {
      navigate('/chat-room');
    } else {
      navigate('/login');
    }
  };
  return (
    <AButton variant='link' color='default' onClick={handleNavigateToChat}>
      <MessageOutlined className='text-xl' />
    </AButton>
  );
};
