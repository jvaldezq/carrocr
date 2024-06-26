import type {HTMLAttributes} from "react";

export const CarRepairIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <path fill="#50514F"
                  d="M11 22v-3H4v-2h16v2h-7v3zM9 11.5q.425 0 .713-.288T10 10.5q0-.425-.288-.712T9 9.5q-.425 0-.712.288T8 10.5q0 .425.288.713T9 11.5m6 0q.425 0 .713-.288T16 10.5q0-.425-.288-.712T15 9.5q-.425 0-.712.288T14 10.5q0 .425.288.713T15 11.5M5 8.6l1.65-4.8q.125-.35.413-.575T7.7 3h8.6q.35 0 .638.225t.412.575L19 8.6v6.6q0 .35-.225.575T18.2 16h-.4q-.35 0-.575-.225T17 15.2V14H7v1.2q0 .35-.225.575T6.2 16h-.4q-.35 0-.575-.225T5 15.2zM7.65 7h8.7l-.7-2h-7.3zM7 9v3zm0 3h10V9H7z"/>
        </svg>
    );
};
