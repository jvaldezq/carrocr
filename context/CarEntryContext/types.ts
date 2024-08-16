import {ReactNode, RefObject} from 'react';

export type DataState = {
    carEntryRef?: RefObject<HTMLFormElement> | null;
};

export interface DataContextType extends DataState {
}

export interface ContextProviderProps {
    children: ReactNode;
}
