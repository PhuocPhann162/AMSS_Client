import { AModal } from '@/common/ui-common';
import { SYSTEM } from '@/constants/system';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type PopupConfirmationProps = {
  isOpen: boolean;
  isShowEmailSupport?: boolean;
  content?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const PopupConfirmation = (props: PopupConfirmationProps) => {
  const { isOpen, isShowEmailSupport, content, onCancel, onConfirm } = props;
  return (
    <AModal
      title={
        <div className='flex items-center gap-2'>
          <ExclamationCircleOutlined
            style={{ fontSize: '1.25rem', color: '#FAAD14' }}
          />
          <p>Important Confirmation</p>
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      onOk={onConfirm}
      okText={'Confirm'}
    >
      <p className='text-sm italic leading-relaxed tracking-wide text-gray-600'>
        {content}.
      </p>
      {isShowEmailSupport && (
        <p className='pt-2 text-sm'>
          If you need assistance, please contact our customer service at{' '}
          <a
            href={`mailto:${SYSTEM.novaris_mail_support}`}
            className='text-blue-500 hover:text-blue-800'
          >
            {SYSTEM.novaris_mail_support}
          </a>
          .
        </p>
      )}
      <p className='pt-2 text-sm font-semibold'>
        Are you sure you want to proceed?
      </p>
    </AModal>
  );
};
