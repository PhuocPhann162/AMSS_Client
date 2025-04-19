import { useState, useEffect, useMemo } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';
import {
  DeleteFileIcon,
  DownloadIcon,
  FileBackgroundIcon,
  FileIcon,
  UploadIcon,
} from '@/components/Icon';
import { Breadcrumb } from '@/components/UI';
import { motion } from 'framer-motion';
import { getScrollAnimation, toastNotify } from '@/helper';
import { useImportDataSocialMetricMutation } from '@/api/app';
import { apiResponse } from '@/interfaces';

export const ImportData: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempDownloadUrl, setTempDownloadUrl] = useState<string | null>(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const [importDataSocialMetric] = useImportDataSocialMetricMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('File', selectedFile);

    // Send request import data
    try {
      const response: apiResponse = await importDataSocialMetric(formData);
      if (response.data && response.data?.isSuccess) {
        toastNotify('Import Social Metric Data Successfully');
        if (tempDownloadUrl) {
          URL.revokeObjectURL(tempDownloadUrl);
        }
        setSelectedFile(null);
        setTempDownloadUrl(null);
        const inputFile = document.getElementById(
          'chooseFile',
        ) as HTMLInputElement;
        if (inputFile) inputFile.value = '';
      }
    } catch (error: any) {
      console.error(Error(error.message));
    }
  };

  const handleDelete = () => {
    if (tempDownloadUrl) {
      URL.revokeObjectURL(tempDownloadUrl);
    }
    setSelectedFile(null);
    setTempDownloadUrl(null);
    const inputFile = document.getElementById('chooseFile') as HTMLInputElement;
    if (inputFile) inputFile.value = '';
  };

  // Hủy URL tạm khi component unmount
  useEffect(() => {
    return () => {
      if (tempDownloadUrl) {
        URL.revokeObjectURL(tempDownloadUrl);
      }
    };
  }, [tempDownloadUrl]);

  return (
    <div className='w-full'>
      <Breadcrumb pageParent='GPA' pageName='Import Data' />
      <div className='mt-8 flex w-full justify-center gap-40 bg-white py-10'>
        <ScrollAnimationWrapper>
          <motion.div
            variants={scrollAnimation}
            className='relative mx-auto flex h-full min-w-80 items-center justify-center rounded-xl border-2 border-dashed border-bodydark bg-white'
          >
            <div className='flex min-h-[300px] cursor-pointer items-center justify-center p-4 text-gray-600'>
              <div className='flex flex-col items-center'>
                <label
                  className='flex cursor-pointer flex-col items-center'
                  htmlFor='chooseFile'
                >
                  <UploadIcon />

                  <h4 className='mt-5 text-base font-semibold text-gray-600'>
                    Drag & Drop file here
                  </h4>
                  <h4 className='py-6 text-base font-semibold text-gray-600'>
                    OR
                  </h4>
                  <label
                    htmlFor='chooseFile'
                    className='cursor-pointer rounded-md bg-clr-4 px-8 py-2 text-base font-semibold text-white shadow-lg hover:bg-yellow-600'
                  >
                    Browser
                  </label>
                </label>
                <input
                  type='file'
                  id='chooseFile'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <a
                  href='/template/SocialMetricData.csv'
                  download='SocialMetricDataTemplate.csv'
                  className='mt-6 font-bold text-aqua underline underline-offset-8 hover:decoration-2'
                >
                  Download Template
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
        <div className='min-h-100 flex flex-col items-center bg-white'>
          <FileBackgroundIcon />
          {selectedFile && (
            <div className='flex gap-4 border-b-2 border-brown py-4 text-center'>
              <div className='flex justify-center gap-4 text-file'>
                <div className='flex max-w-40 flex-col items-center justify-center gap-2 rounded-lg p-5 shadow-md'>
                  <FileIcon />
                  <p className='w-32 break-words text-center text-xs'>
                    <b>{selectedFile.name}</b>
                  </p>
                </div>
                {tempDownloadUrl && (
                  <div className='flex flex-col'>
                    <div className='mt-4 flex h-8 w-8 items-center justify-center rounded-md px-2 py-2 shadow-md'>
                      <a href={tempDownloadUrl} download={selectedFile.name}>
                        <DownloadIcon />
                      </a>
                    </div>
                    <button
                      className='mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md px-2 py-2 text-danger shadow-md'
                      onClick={handleDelete}
                    >
                      <DeleteFileIcon />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleUpload}
                className='mt-4 h-10 max-w-40 shrink-0 rounded-lg bg-brown px-8 py-2 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-yellow-800 hover:shadow-brown sm:w-auto'
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
