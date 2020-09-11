import React, { createContext, useReducer, useContext } from "react";

type Action =
    | {
          type: "ADD_LIST";
          payload: string;
      }
    | {
          type: "ADD_TASK";
          payload: { text: string; taskId: string };
      };
const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // Reducer logic here...
            return {
                ...state,
            };
        }
        case "ADD_TASK": {
            // Reducer logic here...
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }
};

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
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData);
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};
