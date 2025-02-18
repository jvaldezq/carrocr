'use client';

import { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
// import { useUser } from '@auth0/nextjs-auth0/client';
import { CircleHelp, Contact, LogIn, User } from 'lucide-react';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';

interface ProfileMenuDrawerProps {
  children: ReactNode;
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
  // const { user } = useUser();
  const { setOpen } = useCarEntry();
  const { children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" collisionPadding={20}>
        {/*<DropdownMenuLabel></DropdownMenuLabel>*/}
        <DropdownMenuGroup>
          <Link key="login" href="/api/auth/login">
            <DropdownMenuItem className="cursor-pointer">
              <LogIn className="mr-2 h-5 text-tertiary" />
              <span className="text-tertiary">Ingreso / Registro</span>
            </DropdownMenuItem>
          </Link>
          {/*{!user ? (*/}
          {/*  <Link key="login" href="/api/auth/login">*/}
          {/*    <DropdownMenuItem className="cursor-pointer">*/}
          {/*      <LogIn className="mr-2 h-5 text-tertiary" />*/}
          {/*      <span className="text-tertiary">Ingreso / Registro</span>*/}
          {/*    </DropdownMenuItem>*/}
          {/*  </Link>*/}
          {/*) : (*/}
          {/*  <Link key="login" href="/api/auth/login">*/}
          {/*    <DropdownMenuItem className="cursor-pointer">*/}
          {/*      <User className="mr-2 h-5 text-tertiary" />*/}
          {/*      <span className="text-tertiary">{user?.name}</span>*/}
          {/*    </DropdownMenuItem>*/}
          {/*  </Link>*/}
          {/*)}*/}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link key="how" href="/how">
            <DropdownMenuItem className="cursor-pointer">
              <CircleHelp className="mr-2 h-5 text-tertiary" />
              <span className="text-tertiary">Como publicar?</span>
            </DropdownMenuItem>
          </Link>
          <Link key="contact" href="/contact">
            <DropdownMenuItem className="cursor-pointer">
              <Contact className="mr-2 h-5 text-tertiary" />
              <span className="text-tertiary">Contactanos</span>
            </DropdownMenuItem>
          </Link>
          <div key="car-entry" onClick={() => setOpen(true)}>
            <DropdownMenuItem className="cursor-pointer">
              <Contact className="mr-2 h-5 text-tertiary" />
              <span className="text-tertiary">Temp Crear</span>
            </DropdownMenuItem>
          </div>
          {/*{user && (*/}
          {/*  <a key="how" href="/api/auth/logout">*/}
          {/*    <DropdownMenuItem className="cursor-pointer">*/}
          {/*      <LogIn className="mr-2 h-5 text-tertiary rotate-180" />*/}
          {/*      <span className="text-tertiary">Logout</span>*/}
          {/*    </DropdownMenuItem>*/}
          {/*  </a>*/}
          {/*)}*/}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
