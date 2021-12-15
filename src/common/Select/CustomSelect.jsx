import React from 'react'
import { useState } from 'react'
import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem } from './CustomSelect.style';

const CustomSelect = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
    };

    return (

        <DropDownContainer>
            <DropDownHeader onClick={toggling}>
                {selectedOption || "Select Category"}
            </DropDownHeader>
            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {options.map(option => (
                            <ListItem onClick={onOptionClicked(option)} key={option.id}>
                                {option.name}
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );

}

export default CustomSelect
