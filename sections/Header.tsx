import LogoImage from '@/assets/carrocr-logo.webp';
import Image from 'next/image'
import {ProfileMenu} from "@/components/Header/ProfileMenu";
import Link from 'next/link';

export const Header = () => {
    return (
        <header
            className="flex justify-between items-center py-3 px-4 gap-4 fixed top-0 z-10 w-full bg-secondary/[0.98] shadow-sm">
            <Link key='Home' href="/">
                <Image className="flex aspect-auto object-cover" src={LogoImage} alt="Carro CR Logo"
                       priority={true}/>
            </Link>
            {/*<Search/>*/}
            <ProfileMenu/>
        </header>
    )
}
