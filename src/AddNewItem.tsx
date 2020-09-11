import React, { useState } from "react";

import { NewItemForm } from "./NewItemForm";

// import { AddItemButton, NewItemButton } from "./styles";

interface AddNewItemProps {
    onAdd(text: string): void;
    toggleButtonText: string;
    dark?: boolean;
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const { onAdd, toggleButtonText } = props;

    if (showForm) {
        return (
            // We show item creation form here
            <NewItemForm
                onAdd={(text) => {
                    onAdd(text);
                    setShowForm(false);
                }}
            />
        );
    }
    return (
        <button onClick={() => setShowForm(true)}>{toggleButtonText}</button>
    );
};
