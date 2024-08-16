import {ContextProviderProps} from '../types';
import {DataContext} from '..';
import {useRef} from "react";


export const CarEntryContextProvider = (props: ContextProviderProps) => {
    const {children} = props;
    const carEntryRef = useRef<HTMLFormElement>(null);


    return (<DataContext.Provider
        value={{
            carEntryRef,
        }}>
        {children}
    </DataContext.Provider>);
};