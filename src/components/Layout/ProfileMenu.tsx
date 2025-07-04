import { AlignJustify } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileMenuDrawer } from '@/components/Layout/ProfileMenuDrawer';
import { ProfilePicture } from '@/components/Layout/ProfilePicture';

export const ProfileMenu = async () => {
  // TODO: update with clerk
  // const session = await getSession();
  const session = {
    user: '1',
  };

  return (
    <ProfileMenuDrawer>
      <div
        className={cn(
          'flex',
          'h-8',
          'w-8',
          'justify-center',
          'items-center',
          'gap-1',
          'animate-fade',
          'animate-once',
          'animate-duration-500',
          'animate-ease-linear',
          'rounded-full',
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
        {session?.user ? <ProfilePicture /> : <AlignJustify className="h-5" />}
      </div>
    </ProfileMenuDrawer>
  );
};
