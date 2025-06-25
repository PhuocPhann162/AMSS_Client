import React, { useState, useRef } from 'react';
import { Image, message } from 'antd';
import { AButton } from '@/common/ui-common/atoms/a-button/a-button';
import { UploadOutlined, SwapOutlined } from '@ant-design/icons';

import { plantIdentificationService } from '@/api';
import { PlantIdentificationResponse } from '@/interfaces';

const PlantIdentificationViewer: React.FC = () => {
  const [apiResponse, setApiResponse] =
    useState<PlantIdentificationResponse | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setUploadedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      message.error('Please upload an image first');
      return;
    }

    setLoading(true);
    try {
      const response = await plantIdentificationService.identifyPlant({
        project: 'all',
        images: [uploadedFile],
        organs: ['auto'],
        nbResults: 5,
        lang: 'en',
        type: 'kt',
      });
      setApiResponse(response || null);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : 'Failed to analyze image',
      );
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score: number) => (score * 100).toFixed(2) + '%';

  return (
    <div className='mx-auto max-w-6xl bg-gray-50 p-6'>
      <div className='mb-6 rounded-lg bg-white p-6 shadow-lg'>
        <h1 className='mb-4 text-3xl font-bold text-green-700'>
          🌱 What Plant is This? – Detection Results from Photo
        </h1>

        <div className='mb-4 space-y-4'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept='image/*'
            className='hidden'
          />

          {!uploadedImage ? (
            <AButton
              type='primary'
              icon={<UploadOutlined />}
              onClick={handleUploadClick}
              size='large'
            >
              Upload Plant Image
            </AButton>
          ) : (
            <div className='space-y-4'>
              <div className='relative max-w-md overflow-hidden rounded-lg border border-gray-200'>
                <Image
                  src={uploadedImage}
                  alt='Uploaded plant'
                  className='h-auto w-full object-cover'
                  preview={false}
                />
              </div>
              <div className='flex space-x-4'>
                <AButton
                  icon={<SwapOutlined />}
                  onClick={handleUploadClick}
                  size='large'
                >
                  Change Image
                </AButton>
                <AButton
                  type='primary'
                  onClick={handleAnalyze}
                  loading={loading}
                  size='large'
                >
                  Analyze Image
                </AButton>
              </div>
            </div>
          )}
        </div>

        {!apiResponse && !uploadedImage && (
          <div className='py-8 text-center text-gray-500'>
            <p>Upload a plant image to begin identification</p>
          </div>
        )}
      </div>

      {apiResponse && (
        <div className='space-y-6'>
          {/* Best Match */}
          <div className='rounded border-l-4 border-green-500 bg-green-50 p-4'>
            <h2 className='mb-2 text-xl font-semibold text-green-800'>
              🏆 Best Match
            </h2>
            <p className='text-lg font-medium text-green-700'>
              {apiResponse?.bestMatch}
            </p>
          </div>

          {/* Query Information */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              📋 Query Information
            </h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <span className='font-medium text-gray-600'>Project:</span>
                <span className='ml-2 text-gray-800'>
                  {apiResponse.query.project}
                </span>
              </div>
              <div>
                <span className='font-medium text-gray-600'>Language:</span>
                <span className='ml-2 text-gray-800'>
                  {apiResponse.language}
                </span>
              </div>
              <div>
                <span className='font-medium text-gray-600'>Version:</span>
                <span className='ml-2 text-gray-800'>
                  {apiResponse.version}
                </span>
              </div>
            </div>
          </div>

          {/* Predicted Organs */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              🔍 Predicted Organs
            </h2>
            {apiResponse.predictedOrgans?.map((organ, index) => (
              <div
                key={index}
                className='mb-4 rounded border border-gray-200 p-4'
              >
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                  <div>
                    <span className='font-medium text-gray-600'>Filename:</span>
                    <span className='ml-2 text-gray-800'>{organ.filename}</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-600'>Organ:</span>
                    <span className='ml-2 capitalize text-gray-800'>
                      {organ.organ}
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-600'>
                      Confidence:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {formatScore(organ.score)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              🌿 Identification Results
            </h2>
            {apiResponse.results.map((result, index) => (
              <div
                key={index}
                className='mb-6 rounded-lg border border-gray-200 p-6'
              >
                <div className='mb-4 flex items-start justify-between'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    Result #{index + 1}
                  </h3>
                  <div className='text-right'>
                    <div className='text-sm text-gray-600'>
                      Confidence Score
                    </div>
                    <div className='text-xl font-bold text-green-600'>
                      {formatScore(result.score)}
                    </div>
                  </div>
                </div>

                {/* Species Information */}
                <div className='mb-4'>
                  <h4 className='mb-2 font-semibold text-gray-700'>
                    Species Information
                  </h4>
                  <div className='rounded bg-gray-50 p-4'>
                    <div className='mb-2'>
                      <span className='font-medium text-gray-600'>
                        Scientific Name:
                      </span>
                      <span className='ml-2 italic text-gray-800'>
                        {result.species?.scientificName}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span className='font-medium text-gray-600'>
                        Common Names:
                      </span>
                      <span className='ml-2 text-gray-800'>
                        {result.species?.commonNames?.join(', ')}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span className='font-medium text-gray-600'>Family:</span>
                      <span className='ml-2 text-gray-800'>
                        {result.species.family?.scientificName}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium text-gray-600'>Genus:</span>
                      <span className='ml-2 text-gray-800'>
                        {result.species.genus?.scientificName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* External References */}
                <div>
                  <h4 className='mb-2 font-semibold text-gray-700'>
                    External References
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {result.gbif && (
                      <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
                        GBIF: {result.gbif?.id}
                      </span>
                    )}
                    {result.powo && (
                      <span className='rounded-full bg-green-100 px-3 py-1 text-sm text-green-800'>
                        POWO: {result.powo?.id}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantIdentificationViewer;
