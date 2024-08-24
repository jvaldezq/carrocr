import type {HTMLAttributes} from "react";

export const CylinderIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <path fill="#F8F7FF"
              d="M13 16.18c.5.17.9.45 1.23.82H15v4h-.79c-.32.35-.71.63-1.21.8c-1.15.42-2.42.07-3.22-.8H9v-4h.77c.33-.37.73-.65 1.23-.82V12h2zM12 20a1 1 0 0 0 1-1a1 1 0 0 0-1-1a1 1 0 0 0-1 1a1 1 0 0 0 1 1m5-16h-2v1h2v6H7V5h2V4H7V2h10zm-5 5a1 1 0 0 0 1-1a1 1 0 0 0-1-1a1 1 0 0 0-1 1a1 1 0 0 0 1 1"/>
    </svg>);
};
