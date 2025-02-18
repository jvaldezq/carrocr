import { AlignJustify, User } from 'lucide-react';
import { ProfileMenuDrawer } from '@/components/Layout/ProfileMenuDrawer';

export const ProfileMenu = () => {
  return (
    <section>
      <ProfileMenuDrawer>
        <div className="flex justify-center items-center gap-2 animate-fade animate-once animate-duration-500 animate-ease-linear p-1 rounded-full border-[0.7px] border-tertiary border-solid cursor-pointer transition-all duration-500">
          <AlignJustify className="h-5 text-tertiary" />
          <User className="h-5 text-tertiary" />
        </div>
      </ProfileMenuDrawer>
    </section>
  );
};
