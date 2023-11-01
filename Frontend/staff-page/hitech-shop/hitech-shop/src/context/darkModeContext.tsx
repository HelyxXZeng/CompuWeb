import { ReactNode, createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

type DarkModeAction = {
    type: "LIGHT" | "DARK" | "TOGGLE";
};

interface DarkModeContextProps {
    darkMode: boolean;
    dispatch: React.Dispatch<DarkModeAction>;
}

const INITIAL_STATE = {
    darkMode: false,
    dispatch: () => null
};

export const DarkModeContext = createContext<DarkModeContextProps>(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};
