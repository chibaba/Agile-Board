import React, { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

interface NewItemFormProps {
    onAdd(text: string): void;
}
