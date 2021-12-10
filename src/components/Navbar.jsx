import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { ListsActionCreators } from "../store/reducers/userData/action-creators";
import { FilterActionCreators } from "../store/reducers/filter/action-creator";
import { getDate } from "../utils/getDate";
import Link, {
  AddIcon,
  FavoriteIcon,
  LogoutIcon,
  Navigation,
  Container,
  AddIconPulseAnimation,
  NavTitleStyled,
  CalendarIcon,
  LogoIcon,
} from "../styled/style";
import plus from "../assets/add.png";
import logOut from "../assets/logout.png";
import favoriteIcon from "../assets/favoriteIcon.png";
import calendarIcon from "../assets/calendar.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";
import logoIcon from "../assets/logo.png";

import Button from "./Button";

import Modal from "./Modal";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import Calendar from "./Calendar";

const Navbar = ({ children }) => {
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
  // const [selectedDay, setSelectedDay] = useState(null);

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

      <Navigation scrolled={scrolled}>
        {isAuth ? (
          <Container>
            <NavTitleStyled>
              <LogoIcon src={logoIcon} />
              List Keeper
            </NavTitleStyled>
            <SearchBar
              type="text"
              value={searchText}
              placeholder="Type to search by Title"
              onChange={handleSearch}
            />
            <div>
              <CalendarIcon
                src={calendarIcon}
                width="25px"
                height="25px"
                onClick={toggleCalendar}
              />
              <Calendar
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
              />
              {filterFavorites ? (
                <FavoriteIcon
                  src={favoriteIconActive}
                  width="25px"
                  height="25px"
                  onClick={handleFilter}
                />
              ) : (
                <FavoriteIcon
                  src={favoriteIcon}
                  width="25px"
                  height="25px"
                  onClick={handleFilter}
                />
              )}
              {!lists.length ? (
                <AddIconPulseAnimation
                  src={plus}
                  width="25px"
                  alt="Add List"
                  onClick={toggleModal}
                />
              ) : (
                <AddIcon
                  src={plus}
                  width="25px"
                  alt="Add List"
                  onClick={toggleModal}
                />
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{user.email}</span>
              <Link to={"/login"}>
                <LogoutIcon src={logOut} width="25px" onClick={handleLogout} />
              </Link>
            </div>
          </Container>
        ) : (
          <>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button>
              <Link to={"/registration"}>Registration</Link>
            </Button>
          </>
        )}
      </Navigation>

    </>
  );
};

export default Navbar;
