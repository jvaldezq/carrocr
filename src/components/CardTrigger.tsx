'use client';
import { useCallback } from 'react';
import { usePreview } from '@/context/PreviewContext';

interface CardTriggerProps {
  id: number;
}

export default function CardTrigger(props: CardTriggerProps) {
  const { id } = props;
  const { setId } = usePreview();

  const handleClick = useCallback(() => {
    setId(id);
  }, [id]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full cursor-pointer z-10"
      onClick={handleClick}
    ></div>
  );
}
