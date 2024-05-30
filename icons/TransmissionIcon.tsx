import type {HTMLAttributes} from "react";

export const TransmissionIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <g fill="none" stroke="#50514F" strokeWidth="1.5">
                <path strokeLinecap="round"
                      d="M8 9v6m4-6v6m-4-3h5c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C16 10.398 16 9.932 16 9"/>
                <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Z" opacity=".5"/>
            </g>
        </svg>
    );
};
