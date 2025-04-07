import Modal, { type ModalProps } from 'antd/es/modal';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AModalProps extends ModalProps {}

export const AModal: FC<AModalProps> = ({
  title,
  styles = {
    content: { padding: 0, paddingBottom: 12 },
    body: {
      paddingRight: 12,
      paddingLeft: 12,
      borderBottomWidth: 1,
      borderColor: '#E8E8EA',
      paddingBottom: 12,
    },
    footer: { paddingRight: 12 },
  },
  okButtonProps = { size: 'middle' },
  cancelButtonProps = { size: 'middle' },
  ...props
}) => (
  <Modal
    title={
      <div
        className={
          'border-b-bgr-500 bg-bgr-500 flex justify-between rounded-t-lg border-b px-4 py-3.5'
        }
      >
        <div>{title}</div>
      </div>
    }
    styles={styles}
    okButtonProps={okButtonProps}
    cancelButtonProps={cancelButtonProps}
    {...props}
  />
);
