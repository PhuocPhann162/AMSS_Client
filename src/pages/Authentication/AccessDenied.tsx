import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AButton } from '@/common/ui-common';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Result
      status='403'
      title='Forbidden'
      subTitle='Sorry, you are not authorized to access this page.'
      className='h-screen'
      extra={
        <AButton
          type='default'
          onClick={() => navigate('/', { replace: true })}
        >
          Back Home
        </AButton>
      }
    />
  );
};

export default AccessDenied;
