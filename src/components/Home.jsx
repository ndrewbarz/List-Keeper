import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterActionCreators } from "../store/reducers/filter/action-creator";
import { ListsActionCreators } from "../store/reducers/userData/action-creators";
import {
  CardItem,
  FilterRemoveButtonStyled,
  FilterRemoveIconStyled,
  Label,
  LoadersStyled,
  RemoveFilterBox,
  ShareLink,
  TextStyled,
} from "../styled/style";
import Card from "./Card";
import Modal from "./Modal";
import { getDate } from "../utils/getDate";
import { shareList } from "../utils/shareList";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);
  const { lists, current, loading, searchText } = useSelector(
    (state) => state.lists
  );
  const { filter, filterByDate } = useSelector((state) => state.filter);

  const [isFetched, setIsFetched] = useState(false);
  const [isToggle, setIsToggle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [category, setCategory] = useState("");
  const [listItem, setInputList] = useState(current?.listItem || []);
  const [isCompleteItems, setIsCompleteItems] = useState([]);
  const [isFavorites, setIsFavorites] = useState(false);
  const [filtered, setFiltered] = useState(filter);

  //* generate inputs
  const handleInputChange = (idx, e) => {
    let values = [...listItem];
    values[idx][e.target.name] = e.target.value;
    setInputList(values);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...listItem];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    listItem.itemValue !== "" &&
      setInputList([
        ...listItem,
        { itemValue: "", isComplete: false, id: `${Date.now()}` },
      ]);
  };
  //* generate inputs END

  const saveList = (e) => {
    e.preventDefault();
    const updList = {
      id: current._id,
      listTitle,
      date: getDate(),
      category,
      listItem,
      isFavorites,
    };
    dispatch(ListsActionCreators.updateList(updList));

    if (!loading) {
      dispatch(ListsActionCreators.clearCurrentList(current));
      setShowModal(false);
    }
  };

  const handleCheckbox = (e, list) => {
    if (isCompleteItems.includes(e.target.value)) {
      setIsCompleteItems(isCompleteItems.filter((i) => i !== e.target.value));
    } else {
      setIsCompleteItems([...isCompleteItems, e.target.value]);
    }

    const targetListItem = list.listItem.map((i) => {
      if (e.target.value === i.id && !isCompleteItems.includes(i.id)) {
        return {
          ...i,
          isComplete: true,
        };
      } else if (e.target.value === i.id && isCompleteItems.includes(i.id)) {
        return {
          ...i,
          isComplete: false,
        };
      }
      return i;
    });

    const updListIsComplete = {
      ...list,
      id: list._id,
      listItem: targetListItem,
    };
    dispatch(ListsActionCreators.updateList(updListIsComplete));
  };

  // Toggle list card
  const handleToggle = (id) => {
    if (isToggle.includes(id)) {
      setIsToggle(isToggle.filter((item) => item !== id));
    } else {
      setIsToggle([...isToggle, id]);
    }
  };

  // Delete list card
  const handleDelete = (id) => {
    dispatch(ListsActionCreators.deleteList(id));
  };

  const handleEdit = (list) => {
    setShowModal(!showModal);
    dispatch(ListsActionCreators.setCurrentList(list));
  };

  // Filtering lists by date and search text
  const filteredListsByDateOrText = useMemo(() => {
    if (lists) {
      return lists.filter(
        (list) =>
          list.listTitle.toLowerCase().includes(searchText.toLowerCase()) &&
          (filterByDate !== "" ? list.date === filterByDate : lists)
      );
    }
  }, [filterByDate, lists, searchText]);

  const clearFilterDateHandler = () => {
    dispatch(FilterActionCreators.clearFilterDate());
  };
  const clearSearchTextHandler = () => {
    dispatch(ListsActionCreators.clearSearchText());
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(ListsActionCreators.fetchLists(id));
      setIsFetched(true);
    }

    const arr = lists.reduce((acc, list) => [...acc, ...list.listItem], []);

    setIsCompleteItems(
      arr.reduce((acc, item) => {
        if (item.isComplete) {
          acc = [...acc, item.id];
        }
        return acc;
      }, [])
    );
  }, [lists]);

  useEffect(() => {
    setFiltered(filter);
  }, [filter]);

  useEffect(() => {
    if (current) {
      setListTitle(current?.listTitle);
      setCategory(current?.category);
      setInputList(current?.listItem);
      setIsFavorites(current?.isFavorites);
    }
  }, [current]);

  return (
    <>
      {loading && (
        <LoadersStyled type="Rings" color="#00BFFF" height={80} width={80} />
      )}
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
      {filteredListsByDateOrText.length ? (
        filteredListsByDateOrText?.map((list) =>
          filtered ? (
            list.isFavorites && (
              <Card
                key={list._id}
                isFavorites={list.isFavorites}
                id={list._id}
                list={list}
                onEdit={() => handleEdit(list)}
                onDelete={() => handleDelete(list._id)}
                onToggle={() => handleToggle(list._id)}
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
                    list.category,
                    list.date,
                    list.listItem
                  )}`}
                >
                  Share
                </ShareLink>
              </Card>
            )
          ) : (
            <Card
              key={list._id}
              isFavorites={list.isFavorites}
              id={list._id}
              list={list}
              onEdit={() => handleEdit(list)}
              onDelete={() => handleDelete(list._id)}
              onToggle={() => handleToggle(list._id)}
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
          )
        )
      ) : (
        <TextStyled color="#fff">
          {searchText ? "Nothing found" : "Please add Your first list"}
        </TextStyled>
      )}

      {/* //* EDIT MODAL */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        saveList={saveList}
        setCategory={setCategory}
        setListTitle={setListTitle}
        setIsFavorites={setIsFavorites}
        isFavorites={isFavorites}
        listItem={listItem}
        handleInputChange={handleInputChange}
        handleRemoveClick={handleRemoveClick}
        handleAddClick={handleAddClick}
        current={current}
      />
    </>
  );
};

export default Home;
