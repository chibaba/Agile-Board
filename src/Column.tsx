import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import { Card } from "./Card";
import { useDrop } from "react-dnd";

interface ColumnProps {
    text: String;
    index: number;
}

const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
    },
});
export const Column = ({ text, index, id }: ColumnProps) => {
    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);

    const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

    drag(drop(ref));
    return (
        <ColumnContainer ref={ref}>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card text={task.text} key={task.id} index={i} />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={(text) =>
                    dispatch({
                        type: "ADD_TASK",
                        payload: { text, taskId: id },
                    })
                }
                dark
            />
        </ColumnContainer>
    );
};
