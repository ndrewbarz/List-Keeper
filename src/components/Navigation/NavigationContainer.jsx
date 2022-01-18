import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../../store/reducers/auth/action-creators";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { FilterActionCreators } from "../../store/reducers/filter/action-creator";
import { getDate } from "../../utils/getDate";

import Navbar from "./Navbar";
import Drawer from "./Drawer";
import NavigationItems from "./NavigationItems";

import { ContainerDrawer, ContainerNav, DrawerButton } from "../../styled/style";
import ModalAddEdit from "../ModalAddEdit";
import CategoryCreateModal from "./CategoryCreateModal/CategoryCreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

const NavigationContainer = () => {
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.userData);
  const { filterByDate, searchText } = useSelector((state) => state.filter);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState('#141E30');
  const [date, setDate] = useState(getDate())
  const [listTitle, setListTitle] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);

  const alert = useAlert();


  const colorPics = (e) => setColor(e.target.value)

  const handleFilter = () => {
    dispatch(FilterActionCreators.setFilter(!filterFavorites));
    setFilterFavorites(!filterFavorites);
  };

  const handleSearch = (e) => {
    dispatch(FilterActionCreators.setSearchText(e.target.value));
  };

  const handleFilterByDayClick = (day) => {
    dispatch(FilterActionCreators.setFilterByDate(day.toLocaleDateString()));
    setShowCalendar(false);
  };

  const handleCardDate = (e) => {
    let day = e.target.value
    setDate(day.split('-').reverse().join('.'))
  }

  //* generate inputs
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

  //*

  const saveList = (e) => {
    e.preventDefault();
    const newList = {
      listTitle,
      date,
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
    alert.success('Card added!')

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
    setColor('#141E30')
    alert.success('Category created!')
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


  const [toggleDrawer, setToggleDrawer] = useState(false);
  const showSidebar = () => setToggleDrawer(!toggleDrawer);

  const onCloseModalHandler = () => {
    setListTitle("");
    setCategory("");
    // setDate('');
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
        handleCardDate={handleCardDate}
        handleCreateCategory={handleCreateCategory}
        category={category}
        date={date}
        setColor={colorPics}
        color={color}
      />

      <Drawer showSidebar={showSidebar} toggleDrawer={toggleDrawer}>
        <ContainerDrawer toggleDrawer={toggleDrawer}>
          <DrawerButton onClick={showSidebar}  >
            <FontAwesomeIcon icon={faTimes} />
          </DrawerButton>
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
            openAddCategoryModal={setShowCategoryModal}
            user={user}
            handleDayClick={handleFilterByDayClick}
            filterByDate={filterByDate}
          />
        </ContainerDrawer>
      </Drawer>

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
            handleDayClick={handleFilterByDayClick}
            filterByDate={filterByDate}
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
