import type {HTMLAttributes} from "react";

export const CloseIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="#d32f2f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M18 6L6 18M6 6l12 12"/>
        </svg>
    );
};
