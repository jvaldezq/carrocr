import {SearchIcon} from "@/icons/SearchIcon";
import {FilterIcon} from "@/icons/FilterIcon";

export const Search = () => {
    return (
        <>
            <button
                className="min-h-[45px] animate-flip-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear flex items-center justify-center gap-2 py-2 px-4 shadow-2xl rounded-full text-tertiary/[0.7] w-fit md:w-[300px] bg-primary border-primary focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 dark:focus-visible:ring-0">
                <SearchIcon/>
                <span className="text-sm text-secondary grow text-left hidden md:flex">Buscar automóvil</span>
                <FilterIcon
                    className="p-1 rounded-full border border-secondary border-solid shadow-xl cursor-pointer transition-all duration-500 hover:scale-110 hidden md:flex"/>
            </button>
        </>
    );
};
