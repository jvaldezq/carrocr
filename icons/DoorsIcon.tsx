import type {HTMLAttributes} from "react";

export const DoorsIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <path fill="#F8F7FF" d="M19 14h-3v2h3zm3 7H3V11l8-8h10a1 1 0 0 1 1 1zM11.83 5l-6 6H20V5z"/>
    </svg>);
};
