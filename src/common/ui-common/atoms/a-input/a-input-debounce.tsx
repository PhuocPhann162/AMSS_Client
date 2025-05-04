import {
  AInput,
  type AInputProps,
  type AInputRef,
} from '@/common/ui-common/atoms/a-input/a-input';
import { forwardRef, useEffect, useRef } from 'react';

interface AInputDebounceProps extends Omit<AInputProps, 'value'> {
  debounce?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AInputDebounceRef extends AInputRef {}

export const AInputDebounce = forwardRef<
  AInputDebounceRef,
  AInputDebounceProps
>(({ debounce = 300, onChange, ...props }, ref) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleChange: AInputDebounceProps['onChange'] = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange?.(e);
    }, debounce);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <AInput ref={ref} onChange={handleChange} {...props} />;
});
AInputDebounce.displayName = 'AInputDebounce';
