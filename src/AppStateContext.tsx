import React, { createContext, useReducer, useContext } from "react";

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
);

interface AppStateContextProps {
    state: AppState;
}

interface Task {
    id: string;
    text: string;
}

interface List {
    id: string;
    text: string;
    tasks: Task[];
}
export const useAppState = () => {
    return useContext(AppStateContext);
};
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <AppStateContext.Provider value={{ state: appData }}>
            {children}
        </AppStateContext.Provider>
    );
};

export interface AppState {
    lists: List[];
}

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate App Scaffold" }],
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }],
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }],
        },
    ],
};
