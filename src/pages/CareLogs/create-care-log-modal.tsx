import { useState } from 'react';
import { Steps, Button, Card, Form, Modal } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { SelectCropModal } from '@/pages/CareLogs/select-crop-modal';
import { SelectFieldModal } from '@/pages/CareLogs/select-field-modal';
import { SelectTypeModal } from '@/pages/CareLogs/select-type-modal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
}

interface CreateCareLogModalProps {
  open?: boolean;
  onCancel?: () => void;
}

export const CreateCareLogModal = ({
  open,
  onCancel,
}: CreateCareLogModalProps) => {
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
  });

  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Crop',
      icon: <UserOutlined />,
    },
    {
      title: 'Field',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Type',
      icon: <SmileOutlined />,
    },
    {
      title: 'Details',
      icon: <SmileOutlined />,
    },
    {
      title: 'Confirm',
      icon: <SmileOutlined />,
    },
  ];

  const [openSelectCropModal, setOpenSelectCropModal] = useState(false);
  const [openSelectFieldModal, setOpenSelectFieldModal] = useState(false);
  const [openSelectTypeModal, setOpenSelectTypeModal] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values: FormData) => {
    console.log(values);
    setFormData({ ...formData, ...values });
  };

  const restart = () => {
    setCurrent(0);
    setFormData({ name: '', email: '', phone: '', service: '' });
    form.resetFields();
  };

  const renderContent = () => {
    switch (current) {
      case 0:
        return (
          <Card title='Select Crop'>
            <Button
              onClick={() => {
                setOpenSelectCropModal(true);
              }}
            >
              Click to select
            </Button>
          </Card>
        );

      case 1:
        return (
          <Card title='Select Field'>
            <Button
              onClick={() => {
                setOpenSelectFieldModal(true);
              }}
            >
              Click to select
            </Button>
          </Card>
        );

      case 2:
        return (
          <Card title='Select Type'>
            <Button
              onClick={() => {
                setOpenSelectTypeModal(true);
              }}
            >
              Click to select
            </Button>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        open={open}
        width={'100%'}
        destroyOnClose
        onCancel={onCancel}
        footer={null}
      >
        <div className='flex flex-col gap-8'>
          <h1 className='text-center text-2xl font-bold'>Create Care log</h1>

          {/* Steps Component */}
          <Steps
            current={current}
            items={steps.map((item, index) => ({
              key: index,
              title: item.title,
              icon:
                loading && current === index ? <LoadingOutlined /> : item.icon,
            }))}
          />

          {/* Content */}
          <div>{renderContent()}</div>

          {/* Action buttons */}
          <div className='flex justify-between'>
            <div>
              {current > 0 && current < steps.length - 1 && (
                <Button onClick={prev}>Back</Button>
              )}
            </div>

            <div>
              {current < steps.length - 1 && (
                <Button type='primary' onClick={next} loading={loading}>
                  {current === steps.length - 2 ? 'Finish' : 'Next'}
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type='primary' onClick={restart}>
                  New
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <SelectCropModal
        open={openSelectCropModal}
        onCancel={() => setOpenSelectCropModal(false)}
        onOk={() => {
          setOpenSelectCropModal(false);
        }}
      />
      <SelectFieldModal
        open={openSelectFieldModal}
        onCancel={() => setOpenSelectFieldModal(false)}
        onOk={() => {
          setOpenSelectFieldModal(false);
        }}
      />
      <SelectTypeModal
        open={openSelectTypeModal}
        onCancel={() => {
          setOpenSelectTypeModal(false);
        }}
        onOk={() => {
          setOpenSelectTypeModal(false);
        }}
      />
    </>
  );
};
