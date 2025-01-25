import {ProfileMenu} from "@/components/Header/ProfileMenu";
import Link from 'next/link';
import {Car} from "lucide-react";
import React from "react";

export const Header = () => {
    return (
        <header
            className="flex justify-between items-center py-3 px-2 gap-4 fixed top-0 z-10 w-full bg-secondary/[0.98] shadow-sm">
            <Link key='Home' href="/">
                <div className="flex items-center">
                    <Car className="h-8 w-8"/>
                    <span className="ml-2 text-xl font-bold">CARROCR</span>
                </div>
            </Link>
            {/*<Search/>*/}
            <ProfileMenu/>
        </header>
    )
}
