"use client"

import {ReactNode} from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HelpIcon} from "@/icons/HelpIcon";
import {ContactOutlineIcon} from "@/icons/ContactOutlineIcon";
import Link from 'next/link';
import {useUser,} from "@auth0/nextjs-auth0/client";
import {LoginOutlineIcon} from "@/icons/LoginOutlineIcon";
import {ProfileOutlineIcon} from "@/icons/ProfileOutlineIcon";

interface ProfileMenuDrawerProps {
    children: ReactNode
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
    const {user} = useUser();
    console.log('user', user)
    const {children} = props

    return (<DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" collisionPadding={20}>
            {/*<DropdownMenuLabel></DropdownMenuLabel>*/}
            <DropdownMenuGroup>
                {
                    !user ? <Link key="login" href="/api/auth/login">
                            <DropdownMenuItem className='cursor-pointer'>
                                <LoginOutlineIcon className="mr-2 h-5 w-5"/>
                                <span className="text-tertiary">Ingreso / Registro</span>
                            </DropdownMenuItem>
                        </Link> :
                        <Link key="login" href="/api/auth/login">
                            <DropdownMenuItem className='cursor-pointer'>
                                <ProfileOutlineIcon className="mr-2 h-5 w-5"/>
                                <span className="text-tertiary">{user.name}</span>
                            </DropdownMenuItem>
                        </Link>
                }
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <Link key="how" href="/how">
                    <DropdownMenuItem className='cursor-pointer'>
                        <HelpIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Como publicar?</span>
                    </DropdownMenuItem>
                </Link>
                <Link key="contact" href="/contact">
                    <DropdownMenuItem className='cursor-pointer'>
                        <ContactOutlineIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Contactanos</span>
                    </DropdownMenuItem>
                </Link>
                <Link key="car-entry" href="/car-entry">
                    <DropdownMenuItem className='cursor-pointer'>
                        <ContactOutlineIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Temp Crear</span>
                    </DropdownMenuItem>
                </Link>
                {
                    user && <Link key="how" href="/api/auth/logout">
                        <DropdownMenuItem className='cursor-pointer'>
                            <LoginOutlineIcon className="mr-2 h-5 w-5 rotate-180"/>
                            <span className="text-tertiary">Logout</span>
                        </DropdownMenuItem>
                    </Link>
                }
            </DropdownMenuGroup>

        </DropdownMenuContent>
    </DropdownMenu>)
}
