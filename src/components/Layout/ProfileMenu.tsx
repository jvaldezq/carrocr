import { AlignJustify, User } from 'lucide-react';
import { getSession } from '@auth0/nextjs-auth0';
import { cn } from '@/lib/utils';
import { ProfileMenuDrawer } from '@/components/Layout/ProfileMenuDrawer';

export const ProfileMenu = async () => {
  const session = await getSession();
  return (
    <ProfileMenuDrawer>
      <div
        className={cn(
          'flex',
          'py-1.5',
          'px-1',
          'justify-center',
          'items-center',
          'gap-1',
          'animate-fade',
          'animate-once',
          'animate-duration-500',
          'animate-ease-linear',
          'rounded-xl',
          'border-[0.5px]',
          'border-tertiary/[0.5]',
          'border-solid',
          'cursor-pointer',
          'transition-all',
          'duration-300',
          'hover:shadow-sm',
          'text-tertiary/[0.9]',
          'hover:bg-primary',
          'hover:border-primary',
          'hover:text-white',
        )}
      >
        {session?.user ? (
          <User className="h-5" />
        ) : (
          <AlignJustify className="h-5" />
        )}
      </div>
    </ProfileMenuDrawer>
  );
};
