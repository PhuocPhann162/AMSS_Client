import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
}

interface UseCopyToClipboardProps {
  resetInterval?: number;
}

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (...args: Parameters<typeof copy>) => void;
}

export const useCopyToClipboard = ({
  resetInterval = 2000,
}: UseCopyToClipboardProps = {}): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const clearTimerRef = (timer?: NodeJS.Timeout) => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    return () => {
      clearTimerRef(timerRef.current);
    };
  }, []);

  const copyToClipboard = useCallback(
    (text: string, options?: Options) => {
      clearTimerRef(timerRef.current);

      try {
        const success = copy(text, options);

        if (success) {
          setIsCopied(true);
          timerRef.current = setTimeout(() => {
            setIsCopied(false);
          }, resetInterval);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [resetInterval],
  );

  return {
    isCopied,
    copyToClipboard,
  };
};
