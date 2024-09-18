import type {HTMLAttributes} from "react";

export const ProfileOutlineIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <g fill="none" stroke="#50514F" strokeWidth="2">
            <path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
            <circle cx="12" cy="7" r="3"/>
        </g>
    </svg>);
};
