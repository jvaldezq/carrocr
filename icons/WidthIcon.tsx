import type {HTMLAttributes} from "react";

export const WidthIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 {...props}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17 3l4 4l-14 14l-4 -4z"/>
        <path d="M16 7l-1.5 -1.5"/>
        <path d="M13 10l-1.5 -1.5"/>
        <path d="M10 13l-1.5 -1.5"/>
        <path d="M7 16l-1.5 -1.5"/>
    </svg>);
};
