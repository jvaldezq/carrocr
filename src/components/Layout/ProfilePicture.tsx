'use client';
import { Loader, User } from 'lucide-react';
import { useUser } from '@/context/UserContext/UserContext';
import Image from 'next/image';

export const ProfilePicture = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Loader className="animate-spin animate-infinite animate-duration-1000 animate-delay-0 animate-ease-linear" />
    );
  }

  if (user?.profileImage) {
    return (
      <Image
        src={user.profileImage}
        height={32}
        width={32}
        alt={`${user.firstName}-profile-picture`}
        className="rounded-full object-fit h-8 w-8 animate-once animate-duration-1000 animate-delay-0 animate-ease-linear"
      />
    );
  }

  return (
    <User className="h-5 animate-once animate-duration-1000 animate-delay-0 animate-ease-linear" />
  );
};
