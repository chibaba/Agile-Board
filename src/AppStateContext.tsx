import React, { createContext, useReducer, useContext } from "react";
import { findItemIndexById } from "./utils/findItemById";
import { nanoid } from "nanoid";

import { moveItem } from "./utils/moveItem";
import { DragItem } from "./DragItem";

const appData: AppState = {
    draggedItem: undefined,
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
interface Task {
    id: string;
    text: string;
}

interface List {
    id: string;
    text: string;
    tasks: Task[];
}

export interface AppState {
    draggedItem: DragItem | undefined;
    lists: List[];
}

type Action =
    | {
          type: "ADD_LIST";
          payload: string;
      }
    | {
          type: "ADD_TASK";
          payload: { text: string; taskId: string };
      }
    | {
          type: "SET_DRAGGED_ITEM";
          payload: DragItem | undefined;
      }
    | {
          type: "MOVE_TASK";
          payload: {
              dragIndex: number;
              hoverIndex: number;
              sourceColumn: string;
              targetColumn: string;
          };
      }
    | {
          type: "MOVE_LIST";
          payload: {
              dragIndex: number;
              hoverIndex: number;
          };
      };

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: nanoid(), text: action.payload, tasks: [] },
                ],
            };
        }

        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload };
        }

        case "ADD_TASK": {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            );
            state.lists[targetLaneIndex].tasks.push({
                id: nanoid(),
                text: action.payload.text,
            });
            return {
                ...state,
            };
        }

        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload;
            state.lists = moveItem(state.lists, dragIndex, hoverIndex);
            return { ...state };
        }
        case "MOVE_TASK": {
            const {
                dragIndex,
                hoverIndex,
                sourceColumn,
                targetColumn,
            } = action.payload;
            const sourceLaneIndex = findItemIndexById(
                state.lists,
                sourceColumn
            );
            const targetLaneIndex = findItemIndexById(
                state.lists,
                targetColumn
            );
            const item = state.lists[sourceLaneIndex].tasks.splice(
                dragIndex,
                1
            )[0];
            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);
            return { ...state };
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
    dispatch: React.Dispatch<any>;
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext);
};
