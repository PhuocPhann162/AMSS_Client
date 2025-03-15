import { useState, useCallback } from 'react';

interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export function useCookie<T>(key: string, initialValue?: T) {
  const readCookie = useCallback((): T | undefined => {
    if (typeof window === 'undefined') return initialValue;

    const match = document.cookie.match(
      new RegExp(`(^|;\\s*)(${key})=([^;]*)`),
    );
    if (!match) return initialValue;

    const cookieValue = match[3];

    if (!cookieValue) return initialValue;

    try {
      return JSON.parse(cookieValue) as T;
    } catch {
      return cookieValue as T;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState<T | undefined>(() => readCookie());

  const setCookie = useCallback(
    (newValue: T, options: CookieOptions = {}) => {
      if (typeof window === 'undefined') return;

      const cookieOptions: string[] = [];

      if (options.expires) {
        if (options.expires instanceof Date) {
          cookieOptions.push(`expires=${options.expires.toUTCString()}`);
        } else {
          const expiryDate = new Date();
          expiryDate.setSeconds(expiryDate.getSeconds() + options.expires);
          cookieOptions.push(`expires=${expiryDate.toUTCString()}`);
        }
      }

      if (options.path) cookieOptions.push(`path=${options.path}`);
      if (options.domain) cookieOptions.push(`domain=${options.domain}`);
      if (options.secure) cookieOptions.push('secure');
      if (options.sameSite) cookieOptions.push(`sameSite=${options.sameSite}`);

      const stringValue =
        typeof newValue === 'object'
          ? JSON.stringify(newValue)
          : String(newValue);

      document.cookie = `${key}=${stringValue}${
        cookieOptions.length ? `; ${cookieOptions.join('; ')}` : ''
      }`;

      setValue(newValue);
    },
    [key],
  );

  const removeCookie = useCallback(
    (options: Omit<CookieOptions, 'expires'> = {}) => {
      setCookie('' as T, {
        ...options,
        expires: new Date(0),
      });
      setValue(undefined);
    },
    [setCookie],
  );
  return { value, setCookie, removeCookie };
}
