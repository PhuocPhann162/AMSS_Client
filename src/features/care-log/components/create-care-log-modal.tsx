import { useState } from 'react';
import { Button, Card, Modal, Input, type ModalProps, Form } from 'antd';
import { SelectCropModal } from '@/features/care-log/components/select-crop-modal';
import { SelectFieldModal } from '@/features/care-log/components/select-field-modal';
import { SelectTypeModal } from '@/features/care-log/components/select-type-modal';
import { MyDatePicker } from '@/components/date-picker/date-picker';
import { SimpleFormItem } from '@/components/form/simple-form-item';
import type { CreateCareLogRequest } from '@/models/request/care-log/create-care-log-request';
import { useCreateCareLogMutation } from '@/api/care-log-api';
import { useAntMessage } from '@/contexts/ant-message/use-ant-message';
import { TypeTag } from '@/features/care-log/components/type-tag';

interface CreateCareLogModalProps extends Omit<ModalProps, 'onOk'> {
  onSuccess?: () => void;
}

export const CreateCareLogModal = ({
  onSuccess,
  ...props
}: CreateCareLogModalProps) => {
  const antMessage = useAntMessage();

  const [openSelectCropModal, setOpenSelectCropModal] = useState(false);
  const [openSelectFieldModal, setOpenSelectFieldModal] = useState(false);
  const [openSelectTypeModal, setOpenSelectTypeModal] = useState(false);

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

            await createCareLog(values);
            antMessage.api.success('Created care log');
            onSuccess?.();
          } catch (error) {
            console.error(error);
          }
        }}
        {...props}
      >
        <Form form={form} layout='vertical'>
          <div className='flex flex-col gap-6'>
            <SimpleFormItem<CreateCareLogRequest> noStyle shouldUpdate>
              {(form) => {
                const cropIdError = form.getFieldError(['cropId']);

                return (
                  <SimpleFormItem
                    name='cropId'
                    rules={[{ required: true, message: 'Please select Crop' }]}
                  >
                    <Card
                      title={'Select Crop'}
                      className={cropIdError.length > 0 ? 'border-red-500' : ''}
                      extra={
                        <Button
                          onClick={() => {
                            setOpenSelectCropModal(true);
                          }}
                        >
                          Click to select
                        </Button>
                      }
                    ></Card>
                  </SimpleFormItem>
                );
              }}
            </SimpleFormItem>
            <SimpleFormItem<CreateCareLogRequest> noStyle shouldUpdate>
              {(form) => {
                const fieldIdError = form.getFieldError(['fieldId']);

                return (
                  <SimpleFormItem<CreateCareLogRequest>
                    name='fieldId'
                    rules={[{ required: true, message: 'Please select Field' }]}
                  >
                    <Card
                      title={'Select Field'}
                      extra={
                        <Button
                          onClick={() => {
                            setOpenSelectFieldModal(true);
                          }}
                        >
                          Click to select
                        </Button>
                      }
                      className={
                        fieldIdError.length > 0 ? 'border-red-500' : ''
                      }
                    ></Card>
                  </SimpleFormItem>
                );
              }}
            </SimpleFormItem>
            <SimpleFormItem<CreateCareLogRequest> noStyle shouldUpdate>
              {(form) => {
                const type = form.getFieldValue('type') as
                  | CreateCareLogRequest['type']
                  | undefined;
                const typeError = form.getFieldError(['type']);

                return (
                  <SimpleFormItem<CreateCareLogRequest>
                    name='type'
                    rules={[{ required: true, message: 'Please select Type' }]}
                  >
                    <Card
                      title={'Select Type'}
                      extra={
                        <Button
                          onClick={() => {
                            setOpenSelectTypeModal(true);
                          }}
                        >
                          Click to select
                        </Button>
                      }
                      className={typeError.length > 0 ? 'border-red-500' : ''}
                    >
                      {typeof type === 'number' && <TypeTag type={type} />}
                    </Card>
                  </SimpleFormItem>
                );
              }}
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
          <SimpleFormItem noStyle shouldUpdate>
            {(form) => {
              const type = form.getFieldValue('type') as
                | CreateCareLogRequest['type']
                | undefined;

              return (
                <SelectTypeModal
                  defaultValue={type}
                  open={openSelectTypeModal}
                  onCancel={() => {
                    setOpenSelectTypeModal(false);
                  }}
                  onOk={(type) => {
                    setOpenSelectTypeModal(false);
                    form.setFieldsValue({
                      type,
                    });
                  }}
                />
              );
            }}
          </SimpleFormItem>
          <SimpleFormItem noStyle shouldUpdate>
            {() => {
              const cropId = form.getFieldValue('cropId') as
                | CreateCareLogRequest['cropId']
                | undefined;

              return (
                <SelectCropModal
                  defaultValue={cropId}
                  open={openSelectCropModal}
                  onCancel={() => setOpenSelectCropModal(false)}
                  onOk={(crop) => {
                    setOpenSelectCropModal(false);
                    form.setFieldsValue({
                      cropId: crop.id,
                    });
                  }}
                />
              );
            }}
          </SimpleFormItem>
          <SimpleFormItem noStyle shouldUpdate>
            {() => {
              const fieldId = form.getFieldValue('fieldId') as
                | CreateCareLogRequest['fieldId']
                | undefined;

              return (
                <SelectFieldModal
                  defaultValue={fieldId}
                  open={openSelectFieldModal}
                  onCancel={() => setOpenSelectFieldModal(false)}
                  onOk={(field) => {
                    setOpenSelectFieldModal(false);
                    form.setFieldsValue({
                      fieldId: field.id,
                    });
                  }}
                />
              );
            }}
          </SimpleFormItem>
        </Form>
      </Modal>
    </>
  );
};
