import { useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const usePersistedState = <T>(key: string, defaultValue: (T | (() => T))): [T, SetValue<T>] => {
  const provider = useMemo(() => getLocalStorageProvider(), []);
  const resolvedDefaultValue = useMemo(() => (
    defaultValue instanceof Function ? defaultValue() : defaultValue
  ), [defaultValue]);

  const [value, _setValue] = useState<T>(resolvedDefaultValue);
  
  useEffect(() => {
    _setValue(getValue());
  }, []);

  const getValue = (): T => {
    if (!provider) { return resolvedDefaultValue; }
    try {
      const val = provider.getItem(key);
      if (val === null) { return resolvedDefaultValue; }
      return JSON.parse(val) as T;
    } catch (e) {
      return resolvedDefaultValue;
    }
  }

  const setValue: SetValue<T> = (val) => {
    if (!provider) { return; }
    try {
      val = val instanceof Function ? val(value) : val;
      provider.setItem(key, JSON.stringify(val));
      _setValue(val);
    } catch (e) {
      return;
    }
  }

  return [value, setValue];
};

const getLocalStorageProvider = (): Storage | null => {
  if (typeof globalThis !== 'undefined' && globalThis?.localStorage) {
    return globalThis.localStorage;
  }
  if (typeof global !== 'undefined' && global?.localStorage) {
    return global.localStorage;
  }
  if (typeof window !== 'undefined' && window?.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }

  return null;
}
