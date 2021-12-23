import React from "react";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import {
  CardItem,
  FilterRemoveButtonStyled,
  FilterRemoveIconStyled,
  Label,
  RemoveFilterBox,
  ShareLink,
  TextStyled,
} from "../../styled/style";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardGrid from "../CardGrid";
const HomeGrid = ({
  filteredCards,
  onEdit,
  onDelete,
  onToggle,
  isToggle,
  isCompleteItems,
  handleCheckbox,
  shareList,
  searchText,
  filterByDate,
  clearFilterDateHandler,
  clearSearchTextHandler,
}) => {
  return (
    <>
      <RemoveFilterBox>
        {filterByDate ? (
          <FilterRemoveButtonStyled onClick={clearFilterDateHandler}>
            {filterByDate} <FilterRemoveIconStyled icon={faTimes} />
          </FilterRemoveButtonStyled>
        ) : null}
        {searchText !== "" ? (
          <FilterRemoveButtonStyled onClick={clearSearchTextHandler}>
            <span style={{ marginRight: "7px" }}>{searchText}</span>{" "}
            <FilterRemoveIconStyled icon={faTimes} />
          </FilterRemoveButtonStyled>
        ) : null}
      </RemoveFilterBox>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 0.5fr",
          justifyItems: "center",
          width: "80%",
          margin: "10px",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        <span>Title</span>
        <span>Category</span>
        <span>Date</span>
        <span>Count of items</span>
        <span>Is Favorite</span>
        <span>Options</span>
      </div>
      {filteredCards.length ? (
        filteredCards?.map((list) => (
          <CardGrid
            key={list._id}
            isFavorites={list.isFavorites}
            id={list._id}
            list={list}
            onEdit={() => onEdit(list)}
            onDelete={() => onDelete(list._id)}
            onToggle={() => onToggle(list._id)}
            thunk={ListsActionCreators.updateList}
          >
            {isToggle.includes(list._id) &&
              list.listItem.map((item) => (
                <CardItem key={item.id}>
                  <Label htmlFor={item.id} isComplete={item.isComplete}>
                    {item.itemValue}
                    <input
                      type="checkbox"
                      key={item.id}
                      id={item.id}
                      value={item.id}
                      checked={isCompleteItems.includes(item.id)}
                      onChange={(e) => handleCheckbox(e, list)}
                    />
                  </Label>
                </CardItem>
              ))}
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
              Share
            </ShareLink>
          </CardGrid>
        ))
      ) : (
        <TextStyled color="#fff">
          {searchText ? "Nothing found" : "Please add Your first list"}
        </TextStyled>
      )}
    </>
  );
};

export default HomeGrid;
