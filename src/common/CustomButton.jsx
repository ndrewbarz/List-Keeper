import React from "react";
import { Button } from "./customButton.styles";

const CustomButton = ({color, buttonText, onClick, icon}) => {
    return <Button color={color} onClik={onClick}>
        <span>{buttonText}</span>
        <img src={icon} alt="icon"/>
    </Button>
}

export default CustomButton