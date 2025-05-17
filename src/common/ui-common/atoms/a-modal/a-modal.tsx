import Modal, { type ModalProps } from 'antd/es/modal';

export type AModalProps = ModalProps;

export const AModal = (props: AModalProps) => (
  <Modal
    {...props}
    title={
      <div
        className={
          'border-b-bgr-500 bg-bgr-500 flex justify-between rounded-t-lg border-b px-4 py-3.5'
        }
      >
        <p>{props.title}</p>
      </div>
    }
    styles={{
      ...props.styles,
      content: { padding: 0, paddingBottom: 12, ...props.styles?.content },
      body: {
        paddingRight: 12,
        paddingLeft: 12,
        borderBottomWidth: 1,
        borderColor: '#E8E8EA',
        paddingBottom: 12,
        ...props.styles?.body,
      },
      footer: { paddingRight: 12, ...props.styles?.footer },
    }}
  />
);
