import { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type DataType = string | string[] | number | undefined | null;

export type StateSearchParamsMapping<T> = Record<keyof T, string>;

export type StateSearchParamsMappingConfig<T> = Record<keyof T, boolean>;

export function useStateSearchParams<T extends Record<string, DataType>>(
  defaultValue: T,
  mappingUrl: StateSearchParamsMapping<T>,
  option: {
    arrayDef?: Partial<StateSearchParamsMappingConfig<T>>;
    numberDef?: Partial<StateSearchParamsMappingConfig<T>>;
  } = {},
) {
  const location = useLocation();
  const navigate = useNavigate();

  const mappingRef = useRef(mappingUrl);
  const mapping = mappingRef.current;

  // Tạo URLSearchParams từ location.search
  const searchParams = new URLSearchParams(location.search);

  const { arrayDef } = option;
  const stateFromSearchParams = {} as T;

  for (const key of Object.keys(mapping)) {
    const keyURL = mapping[key as keyof T];
    const valueFromUrl = searchParams.get(keyURL);
    const isArray = arrayDef?.[key as keyof T];
    const isNumber = option.numberDef?.[key as keyof T];

    if (isArray) {
      Object.assign(stateFromSearchParams, {
        [key]:
          typeof valueFromUrl === 'string'
            ? valueFromUrl.split(',')
            : defaultValue[key as keyof T],
      });
    } else if (isNumber) {
      Object.assign(stateFromSearchParams, {
        [key]:
          typeof valueFromUrl === 'string'
            ? Number(valueFromUrl)
            : defaultValue[key as keyof T],
      });
    } else {
      Object.assign(stateFromSearchParams, {
        [key]: valueFromUrl || defaultValue[key as keyof T],
      });
    }
  }

  const [state, setState] = useState<T>(stateFromSearchParams);

  const handleChange = useCallback(
    (newValue: T) => {
      setState(newValue);

      const updated: { key: string; value: string }[] = [];
      const deleted: string[] = [];

      for (const key of Object.keys(mapping)) {
        const value = newValue[key as keyof T];
        const keyURL = mapping[key as keyof T];

        if (!value) {
          deleted.push(keyURL);
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            deleted.push(keyURL);
          } else {
            updated.push({ key: keyURL, value: value.join(',') });
          }
        } else {
          updated.push({ key: keyURL, value: value.toString() });
        }
      }

      const newSearchParams = new URLSearchParams(location.search);

      for (const { key, value } of updated) {
        newSearchParams.set(key, value);
      }

      for (const key of deleted) {
        newSearchParams.delete(key);
      }

      // Tạo URL mới với search params
      const newSearch = newSearchParams.toString();
      const newUrl = newSearch
        ? `${location.pathname}?${newSearch}`
        : location.pathname;

      // Sử dụng navigate với replace để không tạo history entry mới
      navigate(newUrl, { replace: true });
    },
    [mapping, location.pathname, location.search, navigate],
  );

  return [state, handleChange] as [typeof state, typeof handleChange];
}
