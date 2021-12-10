import React from 'react'
import { ButtonStyled } from "../styled/style";



const Button = ({ children }) => {
    return (
        <ButtonStyled>
            {children}
        </ButtonStyled>
    )
}

export default Button
