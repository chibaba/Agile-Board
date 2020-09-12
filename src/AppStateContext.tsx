import React, { createContext, useReducer, useContext } from "react";
import { findItemIndexById } from "./utils/findItemById";
import uuid from "uuid";

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
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: action.payload, tasks: [] },
                ],
            };
        }
        case "ADD_TASK": {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            );
            state.lists[targetLaneIndex].tasks.push({
                id: uuid(),
                text: action.payload.text,
            });
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

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData);
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};

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
