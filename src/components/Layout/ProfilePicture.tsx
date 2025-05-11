'use client';
import { User } from 'lucide-react';
import { useUser } from '@/context/UserContext/UserContext';
import Image from 'next/image';

export const ProfilePicture = () => {
  const { user } = useUser();

  if (user?.profileImage) {
    return (
      <Image
        src={user.profileImage}
        height={32}
        width={32}
        alt={`${user.firstName}-profile-picture`}
        className="rounded-full object-fit h-8 w-8"
      />
    );
  }

  return <User className="h-5" />;
};
