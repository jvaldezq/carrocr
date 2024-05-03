import type {HTMLAttributes} from "react";

export const ProfileOutlineIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
            <g fill="none" stroke="#50514F" stroke-width="1.5">
                <path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
                <circle cx="12" cy="7" r="3"/>
            </g>
        </svg>
    );
};
