import {ProfileOutlineIcon} from "@/icons/ProfileOutlineIcon";
import {MenuOutlineIcon} from "@/icons/MenuOutlineIcon";
import {ProfileMenuDrawer} from "@/components/ProfileMenuDrawer";
import LogInDialog from "@/sections/LogInDialog/LogInDialog";

export const ProfileMenu = () => {
    return <section>
        <ProfileMenuDrawer>
            <div
                className="flex justify-center items-center gap-2 animate-fade animate-once animate-duration-500 animate-ease-linear p-1 rounded-full border-[0.5px] border-tertiary border-solid cursor-pointer transition-all duration-500">
                <MenuOutlineIcon/>
                <ProfileOutlineIcon/>
            </div>
        </ProfileMenuDrawer>
        <LogInDialog/>
    </section>
}