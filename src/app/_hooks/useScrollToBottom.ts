import { useRef, useEffect } from 'react';

export default function useScrollToBottom(dependency: unknown) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);

  return endRef;
}
