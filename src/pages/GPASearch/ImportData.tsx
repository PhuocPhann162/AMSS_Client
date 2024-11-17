import { useState, useEffect, useMemo } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { DeleteFileIcon, DownloadIcon, FileBackgroundIcon, FileIcon, UploadIcon } from '~/components/Icon';
import { Breadcrumb } from '~/components/UI';
import { motion } from 'framer-motion';
import { getScrollAnimation, toastNotify } from '~/helper';
import { useImportDataSocialMetricMutation } from '~/api/socialMetricApi';
import { apiResponse } from '~/interfaces';

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
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
        const inputFile = document.getElementById('chooseFile') as HTMLInputElement;
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
      <div className='mt-8 py-10 flex justify-center gap-40 w-full bg-white'>
        <ScrollAnimationWrapper>
          <motion.div
            variants={scrollAnimation}
            className='min-w-80 mx-auto relative bg-white border-2 border-dashed border-bodydark rounded-xl h-full flex items-center justify-center'
          >
            <div className='p-4 min-h-[300px] flex items-center justify-center cursor-pointer text-gray-600 '>
              <div className='flex flex-col items-center'>
                <label className='flex flex-col items-center cursor-pointer' htmlFor='chooseFile'>
                  <UploadIcon />

                  <h4 className='text-base font-semibold text-gray-600 mt-5'>Drag & Drop file here</h4>
                  <h4 className='text-base font-semibold text-gray-600 py-6'>OR</h4>
                  <label
                    htmlFor='chooseFile'
                    className='text-white bg-clr-4 px-8 py-2 hover:bg-yellow-600 text-base font-semibold cursor-pointer rounded-md shadow-lg'
                  >
                    Browser
                  </label>
                </label>
                <input type='file' id='chooseFile' className='hidden' onChange={handleFileChange} />
                <a
                  href='/template/SocialMetricData.csv'
                  download='SocialMetricDataTemplate.csv'
                  className='mt-6 text-aqua font-bold underline underline-offset-8 hover:decoration-2'
                >
                  Download Template
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
        <div className='bg-white  min-h-100 flex flex-col items-center'>
          <FileBackgroundIcon />
          {selectedFile && (
            <div className='text-center py-4 flex gap-4 border-b-2 border-brown'>
              <div className='flex justify-center gap-4 text-file'>
                <div className='p-5 shadow-md flex flex-col items-center justify-center rounded-lg gap-2 max-w-40'>
                  <FileIcon />
                  <p className='break-words text-center text-xs w-32'>
                    <b>{selectedFile.name}</b>
                  </p>
                </div>
                {tempDownloadUrl && (
                  <div className='flex flex-col'>
                    <div className='mt-4 shadow-md rounded-md w-8 h-8 px-2 py-2 flex items-center justify-center'>
                      <a href={tempDownloadUrl} download={selectedFile.name}>
                        <DownloadIcon />
                      </a>
                    </div>
                    <button
                      className='mt-1 shadow-md rounded-md w-8 h-8 px-2 py-2 flex items-center justify-center text-danger cursor-pointer'
                      onClick={handleDelete}
                    >
                      <DeleteFileIcon />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleUpload}
                className='mt-4 px-8 py-2 font-semibold text-sm tracking-wide text-white transition-colors duration-200 bg-brown rounded-lg shrink-0 sm:w-auto hover:bg-yellow-800 hover:shadow-brown max-w-40 h-10'
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
