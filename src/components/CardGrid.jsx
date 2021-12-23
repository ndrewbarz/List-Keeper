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
  CardWrapperGrid,
} from "../styled/style";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import arrow from "../assets/arrow.png";
import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hexToRGB } from "../utils/hexToRGBA";

const CardGrid = ({
  onClick,
  children,
  onEdit,
  onDelete,
  onToggle,
  isFavorites,
  id,
  list,
  thunk,
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
    <>
      <CardWrapperGrid
        onClick={onClick}
        style={{
          background: !!cardCategory
            ? hexToRGB(cardCategory?.color, 0.5)
            : "none",
          border: `1px solid ${cardCategory?.color}`,
        }}
      >
        <span>{list.listTitle}</span>
        <span>{list.category}</span>
        <span>{list.date}</span>
        <span>{list.listItem.length}</span>
        <span>
          {" "}
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
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            "& > img": { margin: "0 5px" },
          }}
        >
          <EditIcon src={editIcon} width="25px" onClick={onEdit} />
          <DeleteIcon src={deleteIcon} width="25px" onClick={onDelete} />
        </span>
      </CardWrapperGrid>
    </>
  );
};

export default CardGrid;
