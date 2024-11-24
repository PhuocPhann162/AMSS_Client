import { Modal, ModalProps } from 'antd';

type AModalProps = ModalProps;
const AModal = (props: AModalProps) => (
  <Modal
    {...props}
    title={
      <div className={'flex justify-between rounded-t-lg border-b border-b-bgr-500 bg-bgr-500 px-4 py-3.5'}>
        <div>{props?.title}</div>
      </div>
    }
    styles={{
      content: { padding: 0, paddingBottom: 12 },
      body: {
        paddingRight: 12,
        paddingLeft: 12,
        borderBottomWidth: 1,
        borderColor: '#E8E8EA',
        paddingBottom: 12
      },
      footer: { paddingRight: 12 }
    }}
    okButtonProps={{ ...props.okButtonProps, size: 'middle' }}
    cancelButtonProps={{ ...props.cancelButtonProps, size: 'middle' }}
  />
);

export { AModal };
