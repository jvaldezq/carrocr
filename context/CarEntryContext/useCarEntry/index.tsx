import {useContext} from "react";
import {DataContext} from "..";

export const useCarEntryData = () => useContext(DataContext);