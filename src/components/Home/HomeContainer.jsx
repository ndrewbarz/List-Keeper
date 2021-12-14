import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterActionCreators } from "../../store/reducers/filter/action-creator";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { LoadersStyled, Text } from "../../styled/style";
import { getDate } from "../../utils/getDate";
import { shareList } from "../../utils/shareList";
import Home from "./Home";
import ModalAddEdit from "../ModalAddEdit";
import Confirmation from "../Confirmation/Confirmation";
import CustomButton from "../../common/Button/CustomButton";
import CustomModal from "../../common/Modal/CustomModal";
import ConfirmationModalDelete from "./ConfirmationModalDelete/ConfirmationModalDelete";

const HomeContainer = () => {
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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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

  const handleShowConfirmationDeleteModal = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  //! Delete list card
  const handleDelete = (deleteId) => {
    setShowConfirmation(!showConfirmation);
    dispatch(ListsActionCreators.deleteList(deleteId));
  };

  const handleEdit = (list) => {
    setShowModal(!showModal);
    dispatch(ListsActionCreators.setCurrentList(list));
  };

  // Filtering lists by date, search text or is favorites
  const filteredCards = useMemo(() => {
    if (lists) {
      return lists.filter(
        (list) =>
          list.listTitle.toLowerCase().includes(searchText.toLowerCase()) &&
          (filterByDate !== "" ? list.date === filterByDate : true) &&
          (filter ? list.isFavorites : true)
      );
    }
  }, [filterByDate, lists, searchText, filter]);

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

      <Home
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

      {/* //* CONFIRMATION DELETE MODAL */}
      {showConfirmation && (
        <ConfirmationModalDelete
          setShowConfirmation={setShowConfirmation}
          handleDelete={handleDelete}
          deleteId={deleteId}
        />
      )}

      {/* //* EDIT MODAL */}
      <ModalAddEdit
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

export default HomeContainer;
