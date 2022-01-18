import React from "react";
import { useState } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  ListItem,
  ListItemMenuBox,
} from "./CustomSelect.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  ModalFormInput,
  OptionDeleteIconStyled,
  OptionMenuIconStyled,
  OptionSaveIconStyled,
} from "../../styled/style";
import OptionMenuIcon from "../../assets/option-menu.png";
import OptionSaveIcon from "../../assets/option-save.png";
import OptionDeleteIcon from "../../assets/option-delete.svg";
import ColorPicker from "../../components/ColorPicker";

const CustomSelect = ({
  title,
  options,
  setCategory,
  handleCreateCategory,
  category,
  color,
  setColor,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isOptionMenuActive, setIsOptionMenuActive] = useState(false);
  const [selected, setSelected] = useState(title);

  const createCategoryInSelect = (e) => {
    if (category !== "") {
      handleCreateCategory(e);
      setCategory("");
      setIsOptionMenuActive(false);
      // setColor("#141E30");
    }
  };
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
          <ListItem>
            <ModalFormInput
              type="text"
              placeholder="Create category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <ColorPicker setColor={setColor} color={color} />
            <ListItemMenuBox>
              {/* {category && ( */}
              {/* {isOptionMenuActive && category && ( */}
              {isOptionMenuActive && (
                <OptionSaveIconStyled
                  src={OptionSaveIcon}
                  onClick={createCategoryInSelect}
                />
              )}
              {/* {category && ( */}
              {/* {isOptionMenuActive && category && ( */}
              {isOptionMenuActive && (
                <OptionDeleteIconStyled
                  src={OptionDeleteIcon}
                  onClick={() => {
                    setCategory("");
                    setIsOptionMenuActive(false);
                  }}
                />
              )}
              <OptionMenuIconStyled
                src={OptionMenuIcon}
                onClick={() => setIsOptionMenuActive(!isOptionMenuActive)}
              />
            </ListItemMenuBox>
          </ListItem>

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
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: `${option.color}`,
                }}
              >
                {""}
              </div>
            </ListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default CustomSelect;
