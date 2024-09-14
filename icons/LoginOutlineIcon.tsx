import type {HTMLAttributes} from "react";

export const LoginOutlineIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#50514F" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="48" stroke-dashoffset="48"
                      d="M8 5v-1c0 -0.55 0.45 -1 1 -1h9c0.55 0 1 0.45 1 1v16c0 0.55 -0.45 1 -1 1h-9c-0.55 0 -1 -0.45 -1 -1v-1">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/>
                </path>
                <path stroke-dasharray="12" stroke-dashoffset="12" d="M4 12h11">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"/>
                </path>
                <path stroke-dasharray="8" stroke-dashoffset="8" d="M15 12l-3.5 -3.5M15 12l-3.5 3.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0"/>
                </path>
            </g>
        </svg>
    );
};
