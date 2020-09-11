import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
    text: String;
}

// export const Column = ({text}: ColumnProps) => {
//     return (
//         <ColumnContainer>
//         <ColumnTitle>{text}</ColumnTitle>
//         </ColumnContainer>
//     )
// }
export const Column = ({
    text,
    children,
}: React.PropsWithChildren<ColumnProps>) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
        </ColumnContainer>
    );
};
