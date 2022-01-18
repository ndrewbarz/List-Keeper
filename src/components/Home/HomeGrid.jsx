import React from "react";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import {
  CardItem,
  FilterRemoveButtonStyled,
  FilterRemoveIconStyled,
  GridTableHeader,
  Label,
  RemoveFilterBox,
  ShareLink,
  TextStyled,
} from "../../styled/style";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardGrid from "../CardGrid";
import upDownArrow from "../../assets/upDownArrow.png";
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
  sortByTitle,
  sortByCount,
  sortByCategory,
  sortByDate,
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
      <GridTableHeader>
        <span onClick={() => sortByTitle()}>
          Title
          <img src={upDownArrow} alt="" />
        </span>
        <span onClick={() => sortByCategory()}>
          Category <img src={upDownArrow} alt="" />
        </span>
        <span onClick={() => sortByDate()}>
          Date <img src={upDownArrow} alt="" />
        </span>
        <span onClick={() => sortByCount()}>
          Count items <img src={upDownArrow} alt="" />
        </span>
        <span>Is Favorite</span>
        <span>Options</span>
      </GridTableHeader>
      {filteredCards?.length ? (
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
            shareList={shareList}
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
