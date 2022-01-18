import React, { useState } from "react";
import {
  CardWrapper,
  CardTitle,
  CardBody,
  CardCategory,
  CardInfoLeft,
  CardInfoRight,
  CardInfo,
  DeleteIcon,
  ArrowIcon,
  EditIcon,
  FavoriteIcon,
  FavoriteIconActive,
} from "../styled/style";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import arrow from "../assets/arrow.png";
import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hexToRGB } from "../utils/hexToRGBA";

const Card = ({
  onClick,
  children,
  onEdit,
  onDelete,
  onToggle,
  isFavorites,
  id,
  list,
  thunk,

  draggble,
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,

}) => {
  const dispatch = useDispatch();
  const [toggleRotate, setToggleRotate] = useState(false);

  const { categories } = useSelector((state) => state.userData);

  const toggleRotateEffect = () => {
    setToggleRotate(!toggleRotate);
    onToggle();
  };

  const cardCategory = categories.find((cat) => cat.name === list.category);

  const updateIsFavorite = () => {
    const updList = {
      ...list,
      id,
      isFavorites: !isFavorites,
    };
    dispatch(thunk(updList));
  };

  return (
    // <CardWrapper onClick={onClick} style={{ background: !!cardCategory ? cardCategory.color : 'none' }} >
    <CardWrapper
      onClick={onClick}
      style={{
        background: !!cardCategory ? hexToRGB(cardCategory.color, 0.7) : "none",
        border: `1px solid ${cardCategory?.color}`,
      }}
      draggable={draggble}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <CardInfo>
        <CardInfoLeft>
          <CardTitle>{list.listTitle}</CardTitle>
          <CardCategory>{list.category}</CardCategory>
        </CardInfoLeft>
        <CardInfoRight>
          {!isFavorites ? (
            <FavoriteIcon
              src={favoriteIcon}
              width="25px"
              height="25px"
              onClick={updateIsFavorite}
            />
          ) : (
            <FavoriteIconActive
              src={favoriteIconActive}
              width="25px"
              height="25px"
              onClick={updateIsFavorite}
            />
          )}
          <EditIcon src={editIcon} width="25px" onClick={onEdit} />
          <DeleteIcon src={deleteIcon} width="25px" onClick={onDelete} />
          <span>{list.date}</span>
        </CardInfoRight>
        {toggleRotate ? (
          <ArrowIcon
            src={arrow}
            width="25px"
            style={{
              transform: "rotate(180deg)",
            }}
            onClick={toggleRotateEffect}
          />
        ) : (
          <ArrowIcon src={arrow} width="25px" onClick={toggleRotateEffect} />
        )}
      </CardInfo>
      <CardBody>{children}</CardBody>
    </CardWrapper>
  );
};

export default Card;
