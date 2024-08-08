import type {HTMLAttributes} from "react";

export const FilterIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
        >
            <path
                fill="#F5F5F7"
                d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"
            />
        </svg>
    );
};
