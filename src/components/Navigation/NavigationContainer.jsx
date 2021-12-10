import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../../store/reducers/auth/action-creators";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { FilterActionCreators } from "../../store/reducers/filter/action-creator";
import { getDate } from "../../utils/getDate";

import Modal from "../Modal";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import NavigationItems from "./NavigationItems";

import { useMediaQuery } from "react-responsive";

const NavigationContainer = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const { lists, searchText } = useSelector((state) => state.lists);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [listTitle, setListTitle] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);

  const handleFilter = () => {
    dispatch(FilterActionCreators.setFilter(!filterFavorites));
    setFilterFavorites(!filterFavorites);
  };

  const handleSearch = (e) => {
    dispatch(ListsActionCreators.setSearchText(e.target.value));
  };

  // generate inputs
  const [listItem, setInputList] = useState([
    { itemValue: "", isComplete: false, id: `${Date.now()}` },
  ]);
  const handleInputChange = (idx, e) => {
    const values = [...listItem];
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

  //

  const saveList = (e) => {
    e.preventDefault();
    const newList = {
      listTitle,
      date: getDate(),
      category,
      listItem,
      isFavorites,
    };
    dispatch(ListsActionCreators.addList(newList));
    setListTitle("");
    setCategory("");
    setInputList([{ itemValue: "", isComplete: false, id: `${Date.now()}` }]);
    setIsFavorites(false);
    setShowModal(false);
  };

  const handleLogout = () => {
    dispatch(AuthActionCreators.logout());
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    window.onscroll = () => {
      window.scrollY > 1 ? setScrolled(true) : setScrolled(false);
    };
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  return (
    <>
      {/* ADD */}
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
      />
      {isTabletOrMobile ? (
        <Drawer>
          <NavigationItems
            lists={lists}
            searchText={searchText}
            isAuth={isAuth}
            handleLogout={handleLogout}
            toggleModal={toggleModal}
            toggleCalendar={toggleCalendar}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            filterFavorites={filterFavorites}
            user={user}
          />
        </Drawer>
      ) : (
        <Navbar scrolled={scrolled}>
          <NavigationItems
            lists={lists}
            searchText={searchText}
            isAuth={isAuth}
            handleLogout={handleLogout}
            toggleModal={toggleModal}
            toggleCalendar={toggleCalendar}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            filterFavorites={filterFavorites}
            user={user}
          />
        </Navbar>
      )}
    </>
  );
};

export default NavigationContainer;
