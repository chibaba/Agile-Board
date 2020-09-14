import React from "react";

import { CardContainer } from "./styles";
import { CardDragItem } from "./DragItem";

interface CardProps {
    text: string;
}

const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
        if (item.id === id) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceColumn = item.columnId;
        const targetColumn = item.columnId;

        dispatch({
            type: "MOVE_TASK",
            payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        });
        item.index = hoverIndex;
        item.columnId = targetColumn;
    },
});
export const Card = ({ text }: CardProps) => {
    return <CardContainer>{text}</CardContainer>;
};
