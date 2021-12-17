import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../../store/reducers/auth/action-creators";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { FilterActionCreators } from "../../store/reducers/filter/action-creator";
import { getDate } from "../../utils/getDate";

import Navbar from "./Navbar";
import Drawer from "./Drawer";
import NavigationItems from "./NavigationItems";

// import { useMediaQuery } from "react-responsive";
import { ContainerDrawer, ContainerNav } from "../../styled/style";
import ModalAddEdit from "../ModalAddEdit";
import CategoryCreateModal from "./CategoryCreateModal/CategoryCreateModal";

const NavigationContainer = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const { lists, searchText } = useSelector((state) => state.lists);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [color, setColor] = useState('#141E30');

  const colorPics = (e) => {
    setColor(e.target.value)
    console.log(e.target.value);
  }

  const [listTitle, setListTitle] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  // 
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleFilter = () => {
    dispatch(FilterActionCreators.setFilter(!filterFavorites));
    setFilterFavorites(!filterFavorites);
  };

  const handleSearch = (e) => {
    dispatch(FilterActionCreators.setSearchText(e.target.value));
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
  //! Create Category
  const handleCreateCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      name: category,
      color: color
    }
    dispatch(ListsActionCreators.addCategory(newCategory));
    setShowCategoryModal(false);
  };
  // !
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

  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const showSidebar = () => setToggleDrawer(!toggleDrawer);

  const onCloseModalHandler = () => {
    setListTitle("");
    setCategory("");
    setInputList([{ itemValue: "", isComplete: false, id: `${Date.now()}` }]);
    setIsFavorites(false);
    setShowModal(false);
  }

  return (
    <>
      {/* ADD */}
      <ModalAddEdit
        showModal={showModal}
        onClose={onCloseModalHandler}
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
      {/* {isTabletOrMobile && ( */}
      <Drawer showSidebar={showSidebar} toggleDrawer={toggleDrawer}>
        <ContainerDrawer toggleDrawer={toggleDrawer}>
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
        </ContainerDrawer>
      </Drawer>
      {/* )} */}
      <Navbar scrolled={scrolled}>
        <ContainerNav>
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
            showSidebar={showSidebar}
            openAddCategoryModal={setShowCategoryModal}
          />
        </ContainerNav>
      </Navbar>

      {/* //!add category */}
      {showCategoryModal && (
        <CategoryCreateModal
          showCategoryModal={showCategoryModal}
          setShowCategoryModal={setShowCategoryModal}
          handleCreateCategory={handleCreateCategory}
          setCategory={setCategory}
          setColor={colorPics}
          color={color}
        />
      )}
    </>
  );
};

export default NavigationContainer;
