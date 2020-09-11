import React from "react";
import { AppContainer } from "./styles";
import { Column } from "./Column";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";

const App = () => {
    return (
        <AppContainer>
            <Column text="To Do">
                <Card text="Generate App Scaffold" />
            </Column>
            <Column text="In progress">
                <Card text="Learn Typescript" />
            </Column>
            <Column text="Done">
                <Card text="Begin to use the static typing" />
            </Column>
            <AddNewItem
                toggleButtonText="+ Add another list"
                onAdd={console.log}
            />
        </AppContainer>
    );
};

export default App;
