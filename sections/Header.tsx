import LogoImage from '@/assets/carrocr-logo.webp';
import Image from 'next/image'
import {Search} from "@/components/Header/Search";
import {ProfileMenu} from "@/components/Header/ProfileMenu";

export const Header = () => {
    return (
        <header
            className="flex justify-between items-center py-3 px-4 gap-4 fixed top-0 z-10 w-full bg-secondary/[0.9] shadow-sm">
            <Image className="hidden md:flex aspect-auto" src={LogoImage} alt="A bird sitting on a nest of eggs."/>
            <Search />
            <ProfileMenu />
        </header>
    )
}
