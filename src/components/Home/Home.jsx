import React, { useEffect, useState } from "react";
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
  setSortedCards
}) => {

  // const [cardList, setCardList] = useState(filteredCards)
  const [currentDragCard, setCurrentDragCard] = useState(null)

  const dragStartHandler = (e, list) => {
    setCurrentDragCard(list)
    setTimeout(() => {
      e.target.style.display = 'none'

    }, 0);

  }
  const dragEndHandler = (e) => {
    setTimeout(() => {
      e.target.style.display = 'flex'
    }, 0);
  }

  const dragLeaveHandler = (e) => {
    setTimeout(() => {
    }, 0);
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
  }
  const dropHandler = (e, list) => {
    e.preventDefault()
    const dropArr = [...filteredCards]
    const currentIndex = dropArr.indexOf(currentDragCard)
    const [rearderedItem] = dropArr.splice(currentIndex, 1)

    const dropIndex = filteredCards.indexOf(list)
    dropArr.splice(dropIndex, 0, rearderedItem)
    setSortedCards(dropArr)

    // filteredCards = filteredCards.filter((item) => item !== item[currentIndex])
    // setCardList(items)
  }

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

            onDragStart={(e) => dragStartHandler(e, list)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, list)}
            draggble={true}
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
