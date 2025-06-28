import { Spin } from 'antd';
import React, { useState, useCallback } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface GooeyInitialResponse {
  run_id: string;
  web_url: string;
  created_at: string;
  status_url: string;
}

interface GooeyStatusResponse {
  status: 'running' | 'completed' | 'failed';
  output?: {
    output_text?: string;
    messages?: Array<{
      role: string;
      content: string;
    }>;
  };
  error?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface GooeyAiChatProps {
  isFullscreen?: boolean;
}

const SUGGESTION_OPTIONS = [
  'Tell me about sustainable farming practices',
  'What are the best crops for my region?',
  'How to prevent common plant diseases?',
  'Explain modern irrigation techniques',
  'What are the benefits of organic farming?',
];

export const GooeyAiChat: React.FC<GooeyAiChatProps> = ({
  isFullscreen = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = (import.meta.env.VITE_GOOEY_API_KEY as string) || '';

  // API initial request
  const callGooeyApi = async (
    prompt: string,
  ): Promise<GooeyInitialResponse> => {
    const response = await fetch('https://api.gooey.ai/v3/video-bots/async/', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_prompt: prompt,
        messages: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as GooeyInitialResponse;
    return data;
  };

  // Function to poll for results
  const pollForResult = async (statusUrl: string): Promise<string> => {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(statusUrl, {
        headers: {
          Authorization: `bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const statusData = (await response.json()) as GooeyStatusResponse;

      if (statusData.status === 'completed') {
        return statusData.output?.output_text || 'Không có phản hồi từ API';
      } else if (statusData.status === 'failed') {
        throw new Error(statusData.error || 'API processing failed');
      }

      // wait 10 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 10000));
      attempts++;
    }

    throw new Error('Timeout: API took too long to respond');
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputPrompt.trim()) {
      alert('Vui lòng nhập câu hỏi');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: inputPrompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // call API to create request
      const initialResponse = await callGooeyApi(inputPrompt);

      // Polling to get result
      const result = await pollForResult(initialResponse.status_url);

      // Add message response to chat
      const assistantMessage: Message = {
        role: 'assistant',
        content: result,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content: `Lỗi: ${error instanceof Error ? error.message : 'Có lỗi xảy ra'}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPrompt, apiKey]);

  const handleSuggestionClick = (suggestion: string) => {
    setInputPrompt(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      }}
      className={`flex flex-col bg-neutral-900 ${isFullscreen ? 'h-full' : 'h-[480px] w-[370px]'}`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3'
      >
        <span className='text-lg font-semibold text-white'>
          How can I help you today?
        </span>
      </motion.div>
      {/* Chat Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex-1 space-y-3 overflow-y-hidden p-4'
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='mt-8 text-center text-neutral-500'
          >
            <span className='text-base'>
              🌿 Ask anything about agriculture...
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 ${isFullscreen ? 'grid grid-cols-2 gap-4 px-4' : 'flex flex-col gap-2 px-2'}`}
            >
              {SUGGESTION_OPTIONS.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`rounded-lg bg-neutral-800 p-3 text-left text-sm text-white transition-colors hover:bg-neutral-700 ${
                    !isFullscreen ? 'w-full' : ''
                  }`}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`max-w-[80%] break-words rounded-xl px-4 py-2 text-sm ${
                    message.role === 'user'
                      ? 'rounded-br-none bg-neutral-800 text-white'
                      : 'rounded-bl-none bg-neutral-700 text-white'
                  }`}
                >
                  <p
                    className='whitespace-pre-wrap'
                    style={{
                      fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
                    }}
                  >
                    {message.content}
                  </p>
                  <p className='mt-1 text-right text-xs opacity-50'>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex justify-start'
          >
            <div className='max-w-[80%] rounded-xl bg-neutral-700 px-4 py-2 text-sm text-white'>
              <div className='flex items-center gap-2'>
                <Spin className='h-4 w-4 animate-spin' />
                <span>Processing...</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='border-t border-neutral-800 bg-neutral-900 px-4 py-3'
      >
        <div className='flex items-center gap-2'>
          <input
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder='Ask anything'
            className='flex-1 rounded-full border-none bg-neutral-800 px-4 py-2 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary'
            disabled={isLoading}
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isLoading || !inputPrompt.trim()}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-white transition-colors hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50'
            aria-label='Send message'
          >
            {isLoading ? (
              <Spin className='h-4 w-4 animate-spin' />
            ) : (
              <FaRegPaperPlane className='h-5 w-5' />
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
