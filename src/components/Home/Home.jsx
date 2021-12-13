import React from "react";
import Card from "../Card";
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
const Home = ({
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
      {filteredCards.length ? (
        filteredCards?.map((list) => (
          <Card
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
          </Card>
        ))
      ) : (
        <TextStyled color="#fff">
          {searchText ? "Nothing found" : "Please add Your first list"}
        </TextStyled>
      )}
    </>
  );
};

export default Home;
