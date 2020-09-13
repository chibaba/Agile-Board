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
        const targetColumn = columnId;
    },
});
export const Card = ({ text }: CardProps) => {
    return <CardContainer>{text}</CardContainer>;
};
