'use client';
import { Undo, Car } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const BackButton = () => {
  const path = usePathname();

  return (
    <>
      {path.includes('draft') ? (
        <Link href="/profile">
          <Button type="button" variant="outline">
            <Undo className="h-5 w-5" />
            Terminar más tarde
          </Button>
        </Link>
      ) : (
        <Link key="Home" href="/">
          <div className="flex items-center">
            <Car className="h-5 w-5" />
            <span className="text-sm font-ligh">CARROCR</span>
          </div>
        </Link>
      )}
    </>
  );
};
