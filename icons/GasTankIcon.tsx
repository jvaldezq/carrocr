import type {HTMLAttributes} from "react";

export const GasTankIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <g fill="none" stroke="#F8F7FF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5"
           strokeWidth="1.5">
            <path strokeWidth="1.493"
                  d="M3 7.562A2.56 2.56 0 0 1 5.563 5H7V3h5v2h2.002A7 7 0 0 1 21 11.998v6.442a2.56 2.56 0 0 1-2.563 2.562H5.563A2.565 2.565 0 0 1 3 18.44z"
                  clip-rule="evenodd"/>
            <path strokeWidth="1.502" d="m8 8.878l8 8.238l-4-4.121l-4 4.12l4-4.12l4-4.121"/>
        </g>
    </svg>);
};
