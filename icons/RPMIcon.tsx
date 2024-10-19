import type {HTMLAttributes} from "react";

export const RPMIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
        <path fill="#1E40AF"
              d="M10.758 15.192q.452.452 1.18.415q.73-.038 1.078-.515l5.253-7.323l-7.361 5.216q-.496.334-.559 1.035t.409 1.172M5.1 19q-.28 0-.512-.141q-.232-.142-.392-.386q-.592-1.021-.894-2.158T3 14q0-1.864.71-3.506q.711-1.642 1.927-2.857Q6.852 6.42 8.494 5.71T12 5q1.858 0 3.485.698t2.852 1.901t1.938 2.817t.72 3.472q.005 1.24-.294 2.409t-.903 2.253q-.14.244-.382.347q-.241.103-.522.103z"/>
    </svg>);
};
