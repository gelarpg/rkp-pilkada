import { useRef, useEffect } from 'react';

export default function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const handler = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, []);

  return (...args: any[]) => {
    if (handler.current) {
      clearTimeout(handler.current);
    }
    handler.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
