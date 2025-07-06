import { Modal, Input, type ModalProps, Form } from 'antd';
import { MyDatePicker } from '@/components/date-picker/date-picker';
import { SimpleFormItem } from '@/components/form/simple-form-item';
import type { CreateCareLogRequest } from '@/models/request/care-log/create-care-log-request';
import { useCreateCareLogMutation } from '@/api/care-log-api';
import { useAntMessage } from '@/contexts/ant-message/use-ant-message';
import { FieldByCropSelect } from '@/features/care-log/components/field-by-crop-select';
import { CropSelect } from '@/features/care-log/components/crop-select';
import { TypeSelect } from '@/features/care-log/components/type-select';

interface CreateCareLogModalProps extends Omit<ModalProps, 'onOk'> {
  onSuccess?: () => void;
}

export const CreateCareLogModal = ({
  onSuccess,
  ...props
}: CreateCareLogModalProps) => {
  const antMessage = useAntMessage();

  const [form] = Form.useForm<CreateCareLogRequest>();

  const [createCareLog, createCareLogResult] = useCreateCareLogMutation();

  return (
    <>
      <Modal
        title='Create Care log'
        destroyOnHidden
        afterClose={() => {
          form.resetFields();
        }}
        okButtonProps={{
          loading: createCareLogResult.isLoading,
        }}
        onOk={async () => {
          try {
            const values = await form.validateFields();

            try {
              await createCareLog(values).unwrap();
              antMessage.api.success('Created care log');
              onSuccess?.();
            } catch (error) {
              antMessage.api.error('Failed to create care log');
              console.error(error);
            }
          } catch (error) {
            console.error(error);
          }
        }}
        {...props}
      >
        <Form form={form} layout='vertical'>
          <div className='flex flex-col gap-6'>
            <SimpleFormItem<CreateCareLogRequest>
              name={'cropId'}
              label='Crop'
              rules={[{ required: true }]}
            >
              <CropSelect />
            </SimpleFormItem>
            <SimpleFormItem<CreateCareLogRequest>
              noStyle
              shouldUpdate={(prev, curr) => {
                return prev.cropId !== curr.cropId;
              }}
            >
              {() => {
                const cropId = form.getFieldValue('cropId') as
                  | CreateCareLogRequest['cropId']
                  | undefined;

                return (
                  <SimpleFormItem<CreateCareLogRequest>
                    name={'fieldId'}
                    label='Field'
                    rules={[{ required: true }]}
                    extra='You should select the crop first to choose the field.'
                  >
                    <FieldByCropSelect cropId={cropId ?? ''} />
                  </SimpleFormItem>
                );
              }}
            </SimpleFormItem>
            <SimpleFormItem<CreateCareLogRequest>
              name={'type'}
              label='Type'
              rules={[{ required: true }]}
            >
              <TypeSelect />
            </SimpleFormItem>
            <SimpleFormItem
              name='description'
              label='Description'
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} placeholder='Enter Description' />
            </SimpleFormItem>
            <SimpleFormItem
              name='date'
              label='Date'
              rules={[{ required: true }]}
            >
              <MyDatePicker showTime maxDate={new Date()} />
            </SimpleFormItem>
          </div>
        </Form>
      </Modal>
    </>
  );
};
