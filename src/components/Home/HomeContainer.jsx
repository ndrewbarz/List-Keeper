import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterActionCreators } from "../../store/reducers/filter/action-creator";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import {
  GridViewIconStyled,
  LoadersStyled,
  RowViewIconStyled,
} from "../../styled/style";
import { getDate } from "../../utils/getDate";
import { shareList } from "../../utils/shareList";
import Home from "./Home";
import ModalAddEdit from "../ModalAddEdit";
import ConfirmationModalDelete from "./ConfirmationModalDelete/ConfirmationModalDelete";
import { useAlert } from "react-alert";
import HomeGrid from "./HomeGrid";

import GridView from "../../assets/gridView.png";
import RowView from "../../assets/rowView.png";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);
  const { lists, current, loading } = useSelector((state) => state.userData);
  const { filterFavorites, filterByDate, searchText } = useSelector(
    (state) => state.filter
  );

  const [isFetched, setIsFetched] = useState(false);
  const [isToggle, setIsToggle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#141E30");
  const [date, setDate] = useState(getDate());
  const [listItem, setInputList] = useState(current?.listItem || []);
  const [isCompleteItems, setIsCompleteItems] = useState([]);
  const [isFavorites, setIsFavorites] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const alert = useAlert();
  const [sortedCards, setSortedCards] = useState(lists);

  const colorPics = (e) => setColor(e.target.value);

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

  //! HANDLE FUNC

  //! Create Category
  const handleCreateCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      name: category,
      color: color,
    };
    dispatch(ListsActionCreators.addCategory(newCategory));
    setCategory("");
    alert.success("Category created!");
  };
  // !

  const handleCardDate = (e) => {
    let day = e.target.value;
    setDate(day.split("-").reverse().join("."));
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
  // Delete  card
  const handleDelete = (deleteId) => {
    setShowConfirmation(!showConfirmation);
    dispatch(ListsActionCreators.deleteList(deleteId));
    alert.info("Card deleted!");
  };
  // Edit  card
  const handleEdit = (list) => {
    setShowModal(!showModal);
    dispatch(ListsActionCreators.setCurrentList(list));
  };

  const handleShowConfirmationDeleteModal = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  // Save changed list
  const saveList = (e) => {
    e.preventDefault();
    const updList = {
      id: current._id,
      listTitle,
      date,
      category,
      listItem,
      isFavorites,
    };
    dispatch(ListsActionCreators.updateList(updList));

    if (!loading) {
      dispatch(ListsActionCreators.clearCurrentList(current));
      setShowModal(false);
    }
    alert.info("Card changed!");
  };

  // Filtering lists by date, search text or is favorites
  const filteredCards = useMemo(() => {
    if (sortedCards) {
      return sortedCards.filter(
        (list) =>
          list.listTitle
            .toLowerCase()
            .replace(/ /g, "")
            .includes(searchText.toLowerCase().replace(/ /g, "")) &&
          (filterByDate !== "" ? list.date === filterByDate : true) &&
          (filterFavorites ? list.isFavorites : true)
      );
    }
  }, [filterByDate, sortedCards, searchText, filterFavorites]);
  // Clear filters
  const clearFilterDateHandler = () => {
    dispatch(FilterActionCreators.clearFilterDate());
  };
  const clearSearchTextHandler = () => {
    dispatch(FilterActionCreators.clearSearchText());
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(ListsActionCreators.fetchLists(id));
      setIsFetched(true);
    } else {
      setSortedCards(lists)
    }

    // Set complete list/card items
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
    if (current) {
      setListTitle(current?.listTitle);
      setDate(current?.date);
      setCategory(current?.category);
      setInputList(current?.listItem);
      setIsFavorites(current?.isFavorites);
    }
  }, [current]);

  const onCloseEditModalHandler = () => {
    if (current) {
      setListTitle(current?.listTitle);
      setCategory(current?.category);
      setDate(current?.date);
      setInputList(current?.listItem);
      setIsFavorites(current?.isFavorites);
    } else {
      setListTitle("");
      setCategory("");
      // setDate(date);
      setInputList([{ itemValue: "", isComplete: false, id: `${Date.now()}` }]);
      setIsFavorites(false);
    }
    setShowModal(false);
  };

  // !CARD VIEW
  const localGrid = JSON.parse(localStorage.getItem("gridView"))
  const [gridView, setGridView] = useState(localGrid);
  const changeViewHandler = () => {
    localStorage.setItem("gridView", !gridView);
    setGridView(!gridView);
  };
  // !SORT

  const sortByDate = () => {
    const sortedArr = [...sortedCards]?.sort((a, b) => {
      return (
        Date.parse(new Date(b.date.split(".").reverse().join("-"))) -
        Date.parse(new Date(a.date.split(".").reverse().join("-")))
      );
    });
    setSortedCards(sortedArr);
  };

  const sortByTitle = () => {
    const sortedArr = [...filteredCards]?.sort((a, b) =>
      a.listTitle.toLowerCase().localeCompare(b.listTitle.toLowerCase())
    );
    setSortedCards(sortedArr);
  };

  const sortByCategory = () => {
    const sortedArr = [...filteredCards]?.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    setSortedCards(sortedArr);
  };
  const sortByCount = () => {
    const sortedArr = [...filteredCards]?.sort((a, b) => {
      if (a.listItem.length < b.listItem.length) return -1;
      if (a.listItem.length > b.listItem.length) return 1;
      return 0;
    });
    setSortedCards(sortedArr);
  };

  return (
    <>
      {loading && (
        <LoadersStyled type="Rings" color="#00BFFF" height={80} width={80} />
      )}
      {
        <div style={{ position: "absolute", top: "65px", right: "105px" }}>
          {gridView ? (
            <GridViewIconStyled src={GridView} onClick={changeViewHandler} />
          ) : (
            <RowViewIconStyled src={RowView} onClick={changeViewHandler} />
          )}
        </div>
      }
      {!gridView ? (
        <Home
          setSortedCards={setSortedCards}
          filteredCards={filteredCards}
          onEdit={handleEdit}
          onDelete={handleShowConfirmationDeleteModal}
          onToggle={handleToggle}
          isToggle={isToggle}
          isCompleteItems={isCompleteItems}
          handleCheckbox={handleCheckbox}
          shareList={shareList}
          searchText={searchText}
          filterByDate={filterByDate}
          clearFilterDateHandler={clearFilterDateHandler}
          clearSearchTextHandler={clearSearchTextHandler}
        />
      ) : (
        <HomeGrid
          // filteredCards={sortedCards}
          filteredCards={filteredCards}
          onEdit={handleEdit}
          onDelete={handleShowConfirmationDeleteModal}
          onToggle={handleToggle}
          isToggle={isToggle}
          isCompleteItems={isCompleteItems}
          handleCheckbox={handleCheckbox}
          shareList={shareList}
          searchText={searchText}
          filterByDate={filterByDate}
          clearFilterDateHandler={clearFilterDateHandler}
          clearSearchTextHandler={clearSearchTextHandler}
          sortByTitle={sortByTitle}
          sortByCount={sortByCount}
          sortByCategory={sortByCategory}
          sortByDate={sortByDate}
        />
      )}

      {/* //* CONFIRMATION DELETE MODAL */}
      {showConfirmation && (
        <ConfirmationModalDelete
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          handleDelete={handleDelete}
          deleteId={deleteId}
          filteredCards={filteredCards}
        />
      )}

      {/* //* EDIT MODAL */}
      <ModalAddEdit
        showModal={showModal}
        onClose={onCloseEditModalHandler}
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
        setDate={setDate}
        handleCardDate={handleCardDate}
        handleCreateCategory={handleCreateCategory}
        category={category}
        setColor={colorPics}
        color={color}
      />
    </>
  );
};

export default HomeContainer;
