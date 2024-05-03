import { SearchIcon } from "@/icons/SearchIcon";
import { FilterIcon } from "@/icons/FilterIcon";

export const Search = () => {
  return (
    <>
      <button className="min-h-[45px] animate-flip-down animate-once animate-duration-500 animate-delay-500 animate-ease-linear flex items-center justify-center gap-2 py-2 px-4 shadow-2xl rounded-full text-tertiary/[0.7] w-full md:w-[300px] bg-secondary">
        <SearchIcon />
        <span className="text-sm grow text-left">Buscar automóvil</span>
        <FilterIcon className="p-1 rounded-full border border-tertiary border-solid shadow-xl cursor-pointer transition-all duration-500 hover:scale-110" />
      </button>
    </>
  );
};
