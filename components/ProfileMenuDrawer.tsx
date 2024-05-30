"use client"

import {ReactNode} from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import Link from "next/link";

interface ProfileMenuDrawerProps {
    children: ReactNode
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
    const {children} = props
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-transparent hover:bg-transparent">{children}</NavigationMenuTrigger>
                    <NavigationMenuContent className='right-0'>
                        <ul className="grid grid-cols-1 gap-3 p-4 w-[700px]">
                            <li>
                                <Link href="hello"> hello</Link>
                            </li>
                            <li>
                                <Link href="hello"> hello</Link>
                            </li>
                            <li>
                                <Link href="hello"> hello</Link>
                            </li>
                        </ul>
                        <NavigationMenuIndicator className="hidden"/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
