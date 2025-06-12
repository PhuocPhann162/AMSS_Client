import { useState, useEffect, useMemo } from 'react';
import { DeleteFileIcon, DownloadIcon } from '@/components/Icon';
import { Breadcrumb } from '@/components/UI';
import { getScrollAnimation, toastNotify } from '@/helper';
import { useImportDataSocialMetricMutation } from '@/api';
import { apiResponse } from '@/interfaces';
import { AButton } from '@/common/ui-common/atoms/a-button/a-button';
import { Card, Upload, Typography, Space, Alert, Row, Col } from 'antd';
import {
  InboxOutlined,
  FileExcelOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export const ImportData: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempDownloadUrl, setTempDownloadUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [importDataSocialMetric] = useImportDataSocialMetricMutation();

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (!allowedTypes.includes(file.type)) {
        toastNotify('Only CSV and Excel files are allowed.', 'error');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setTempDownloadUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toastNotify('Please select a file to upload.', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('File', selectedFile);

    try {
      const response: apiResponse = await importDataSocialMetric(formData);
      if (response.data && response.data?.isSuccess) {
        toastNotify('Import Social Metric Data Successfully');
        if (tempDownloadUrl) {
          URL.revokeObjectURL(tempDownloadUrl);
        }
        setSelectedFile(null);
        setTempDownloadUrl(null);
      }
    } catch (error: any) {
      console.error(Error(error.message));
      toastNotify('Failed to import data. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    if (tempDownloadUrl) {
      URL.revokeObjectURL(tempDownloadUrl);
    }
    setSelectedFile(null);
    setTempDownloadUrl(null);
  };

  useEffect(() => {
    return () => {
      if (tempDownloadUrl) {
        URL.revokeObjectURL(tempDownloadUrl);
      }
    };
  }, [tempDownloadUrl]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv,.xls,.xlsx',
    beforeUpload: (file: RcFile) => {
      handleFileChange({ file: { originFileObj: file } });
      return false;
    },
    showUploadList: false,
  };

  return (
    <div className='w-full p-6'>
      <Breadcrumb pageParent='GPA' pageName='Import Data' />

      <Row gutter={[24, 24]} className='mt-8'>
        <Col span={8}>
          <Card className='h-full'>
            <Space direction='vertical' size='large' className='w-full'>
              <Title level={4}>Import Social Metric Data</Title>

              <Alert
                message='Data Import Guidelines'
                description={
                  <ul className='list-disc pl-4'>
                    <li>Download the template file below</li>
                    <li>Fill in your data following the template format</li>
                    <li>Upload your completed file</li>
                    <li>Review the data before final submission</li>
                  </ul>
                }
                type='info'
                showIcon
                icon={<InfoCircleOutlined />}
              />

              <div className='flex flex-col gap-4'>
                <Text strong>Template Information:</Text>
                <Paragraph>
                  The template includes the following metrics:
                  <ul className='mt-2 list-disc pl-4'>
                    <li>Population statistics</li>
                    <li>Economic indicators</li>
                    <li>Social development metrics</li>
                    <li>Environmental data</li>
                  </ul>
                </Paragraph>
              </div>

              <AButton
                type='primary'
                icon={<FileExcelOutlined />}
                href='/template/SocialMetricData.csv'
                download='SocialMetricDataTemplate.csv'
                className='w-full'
              >
                Download Template
              </AButton>
            </Space>
          </Card>
        </Col>

        <Col span={16}>
          <Card>
            <Space direction='vertical' size='large' className='w-full'>
              <Title level={4}>Upload Your Data</Title>

              <Dragger
                {...uploadProps}
                className='rounded-lg border-2 border-dashed border-gray-300'
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Click or drag file to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for CSV and Excel files only
                </p>
              </Dragger>

              {selectedFile && (
                <Card className='bg-gray-50'>
                  <Space direction='vertical' className='w-full'>
                    <div className='flex items-center justify-between'>
                      <Space>
                        <FileExcelOutlined className='text-2xl text-green-600' />
                        <div>
                          <Text strong>{selectedFile.name}</Text>
                          <br />
                          <Text type='secondary'>
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </Text>
                        </div>
                      </Space>
                      <Space>
                        {tempDownloadUrl && (
                          <AButton
                            icon={<DownloadIcon />}
                            href={tempDownloadUrl}
                            download={selectedFile.name}
                          />
                        )}
                        <AButton
                          danger
                          icon={<DeleteFileIcon />}
                          onClick={handleDelete}
                        />
                      </Space>
                    </div>

                    <AButton
                      type='primary'
                      onClick={handleUpload}
                      loading={uploading}
                      className='w-full'
                    >
                      {uploading ? 'Uploading...' : 'Upload Data'}
                    </AButton>
                  </Space>
                </Card>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
