import type {HTMLAttributes} from "react";

export const SystemIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <path fill="none" stroke="#F8F7FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M5 5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2zm0 12a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2zM15 5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2zm0 12a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2zm-6 1h6M9 6h6m-3 .5V6v12"/>
    </svg>);
};
