"use client"

import {ReactNode, useCallback} from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LoginOutlineIcon} from "@/icons/LoginOutlineIcon";
import {HelpIcon} from "@/icons/HelpIcon";
import {ContactOutlineIcon} from "@/icons/ContactOutlineIcon";
import {authConfig} from "@/store/authStore";

interface ProfileMenuDrawerProps {
    children: ReactNode
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
    const {children} = props

    const handleLogIn = useCallback(() => {
        authConfig.set({isLogInOpen: true});
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" collisionPadding={20}>
                {/*<DropdownMenuLabel></DropdownMenuLabel>*/}
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={handleLogIn}>
                        <LoginOutlineIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Ingreso / Registro</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer'>
                        <HelpIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Como publicar?</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <ContactOutlineIcon className="mr-2 h-5 w-5"/>
                        <span className="text-tertiary">Contactanos</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
