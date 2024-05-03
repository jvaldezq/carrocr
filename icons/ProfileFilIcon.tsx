import type {HTMLAttributes} from "react";

export const ProfileFillIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#50514F" fill-rule="evenodd"
                  d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                  clip-rule="evenodd"/>
        </svg>
    );
};
