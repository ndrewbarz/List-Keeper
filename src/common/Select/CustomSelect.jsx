import React from "react";
import { useState } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  ListItem,
} from "./CustomSelect.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CustomSelect = ({ title, options, setCategory }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(title);

  return (
    <DropDownContainer>
      <DropDownHeader onClick={() => setIsActive(!isActive)}>
        {selected}
        <span>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </DropDownHeader>
      {isActive && (
        <DropDownList>
          {options.map((option) => (
            <ListItem
              onClick={() => {
                setSelected(option.name);
                setIsActive(false);
                setCategory(option.name);
              }}
              key={option.id}
            >
              {option.name}
            </ListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default CustomSelect;
