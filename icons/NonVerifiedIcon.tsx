import type {HTMLAttributes} from "react";

export const NonVerifiedIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g fill="none" stroke="#50514F">
                <path
                    d="M14.049 5.54a1 1 0 0 1 1.071.443l.994 1.587a1 1 0 0 0 .316.316l1.587.994a1 1 0 0 1 .444 1.072l-.42 1.824a1 1 0 0 0 0 .448l.42 1.825a1 1 0 0 1-.444 1.07l-1.587.995a.993.993 0 0 0-.316.316l-.994 1.587a1 1 0 0 1-1.071.444l-1.825-.42a1 1 0 0 0-.447 0l-1.825.42a1 1 0 0 1-1.071-.444l-.994-1.587a1.001 1.001 0 0 0-.317-.316l-1.586-.994a1 1 0 0 1-.444-1.071l.419-1.825a1 1 0 0 0 0-.448l-.42-1.824a1 1 0 0 1 .445-1.072l1.586-.994a1 1 0 0 0 .317-.316l.994-1.587a1 1 0 0 1 1.07-.443l1.826.419a1 1 0 0 0 .447 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.515 12.536l2.035 1.949l2.935-4.97"/>
            </g>
        </svg>
    );
};
