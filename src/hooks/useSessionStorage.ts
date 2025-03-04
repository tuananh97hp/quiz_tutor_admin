import { Dispatch, SetStateAction, useState } from 'react';

export type SetValue<T> = Dispatch<SetStateAction<T>>;

const useSessionStorage = <T>(key: string, initialValue?: T): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      if (!item && typeof initialValue !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(initialValue));
      }

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (typeof initialValue !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(initialValue));
      }

      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useSessionStorage;
