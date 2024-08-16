import React from "react";
import { DataContextType } from "./types";


export const DataContext = React.createContext<DataContextType>({} as DataContextType);