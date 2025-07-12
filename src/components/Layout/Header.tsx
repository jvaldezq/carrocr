import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tw } from '@/lib/utils';
import Logo from '@/assets/logo.webp';
import { TokenCopier } from '@/components/new/BrandonsHelper';

export const Header = () => {
  return (
    <header className="flex w-full pt-[env(safe-area-inset-top)] px-4 pb-2 items-center justify-center bg-white bg-gradient-to-t from-0% to-25% from-white to-transparent">
      <Link href="/">
        <Image
          src={Logo}
          width={400}
          height={50}
          alt="Logo"
          id="logo"
          className={
            tw(
              'w-auto',
              'h-[50px]',
              'object-cover'
            )
          }
        />
      </Link>
      <TokenCopier />
    </header>
  );
};
