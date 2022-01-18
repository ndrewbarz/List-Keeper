import React from "react";
import {
  FavoriteIcon,
  FavoriteIconActive,
  CardWrapperGrid,
  ShareLink,
} from "../styled/style";
import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hexToRGB } from "../utils/hexToRGBA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faShareSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const CardGrid = ({
  onClick,
  onEdit,
  onDelete,
  isFavorites,
  id,
  list,
  thunk,
  shareList,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.userData);
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
          }}
        >
          <FontAwesomeIcon
            icon={faEdit}
            size="lg"
            cursor="pointer"
            color="#ffffff"
            onClick={onEdit}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            cursor="pointer"
            color="tomato"
            style={{ margin: "0 5px" }}
            onClick={onDelete}
          />
          <ShareLink
            rel="noreferrer"
            target="_blank"
            href={`https://t.me/share/url?url=${shareList(
              list.listTitle,
              list.date,
              list.category,
              list.listItem
            )}`}
          >
            <FontAwesomeIcon
              icon={faShareSquare}
              size="lg"
              cursor="pointer"
              color="lightblue"
            />
          </ShareLink>
        </span>
      </CardWrapperGrid>
    </>
  );
};

export default CardGrid;
