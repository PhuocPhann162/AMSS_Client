import { useState } from 'react';
import { AModal } from '@/common/ui-common';
import { Button } from 'antd';
import { toastNotify } from '@/helper';
import TextArea from 'antd/es/input/TextArea';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal = ({ isOpen, onClose }: ExperienceModalProps) => {
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!experience.trim()) {
      toastNotify('Please enter your experience', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Add API call to save experience
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toastNotify('Thank you for sharing your experience!', 'success');
      onClose();
    } catch (error) {
      toastNotify('Failed to submit experience', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AModal
      title='Share Your Experience'
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <div className='flex flex-col gap-6'>
        <div className='text-gray-600'>
          <p>
            We value your feedback! Please share your experience with our
            service.
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>
            Your Experience
          </label>
          <TextArea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder='Tell us about your experience...'
            rows={6}
            className='w-full resize-none'
            maxLength={1000}
            showCount
          />
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <Button
            onClick={onClose}
            className='px-4 py-2 text-gray-600 hover:text-gray-800'
          >
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={handleSubmit}
            loading={isSubmitting}
            className='bg-brown hover:bg-brown/90'
          >
            Submit
          </Button>
        </div>
      </div>
    </AModal>
  );
};
