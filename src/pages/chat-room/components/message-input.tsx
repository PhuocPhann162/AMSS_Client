// components/Chat/MessageInput.tsx
import { AButton } from '@/common/ui-common';
import React, { useState, useRef, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTyping,
  onStopTyping,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      onStopTyping();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key !== 'Enter') {
      onTyping();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value.length === 0) {
      onStopTyping();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border-t border-gray-200 p-4'>
      <div className='flex space-x-2'>
        <input
          ref={inputRef}
          type='text'
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onBlur={onStopTyping}
          placeholder={disabled ? 'Connecting...' : 'Type a message...'}
          disabled={disabled}
          className='flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
        />
        <AButton
          type='primary'
          htmlType='submit'
          disabled={!message.trim() || disabled}
        >
          Send
        </AButton>
      </div>
    </form>
  );
};
