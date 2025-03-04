import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Tạo FormData để upload file
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Gửi request upload (giả định API endpoint là "/upload")
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(() => {
        setSelectedFile(null); // Reset lại sau khi upload thành công
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className='font-[sans-serif]'>
      <div className='bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white min-h-[220px] flex items-center justify-center text-center'>
        <h4 className='text-3xl font-semibold -mt-8'>Upload file here</h4>
      </div>

      <div className='max-w-lg mx-auto relative bg-white border-2 border-gray-300 border-dashed rounded-md -top-24'>
        <div className='p-4 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer'>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-10 mb-4 fill-gray-600 inline-block' viewBox='0 0 32 32'>
            <path d='M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z' />
            <path d='M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z' />
          </svg>

          <h4 className='text-base font-semibold text-gray-600'>
            Drag & Drop file here <br /> or
          </h4>
          <label htmlFor='chooseFile' className='text-blue-600 text-base font-semibold cursor-pointer underline'>
            Choose file
          </label>
          <input type='file' id='chooseFile' className='hidden' onChange={handleFileChange} />

          {selectedFile && (
            <div className='mt-2 text-gray-600'>
              <p>Selected file: {selectedFile.name}</p>
              <button
                onClick={handleUpload}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
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

export default FileUpload;
